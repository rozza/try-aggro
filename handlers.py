import datetime
import json
from pymongo.errors import OperationFailure

import tornado.web
from tornado import gen
from tornado.web import asynchronous, HTTPError
from bson import SON, ObjectId

from motor import Op

from diff_sequences import diff_sequences


class MainHandler(tornado.web.RequestHandler):

    @tornado.web.asynchronous
    @gen.engine
    def get(self):
        db = self.application.settings['db']
        quiz = yield Op(db.quiz.find_one)
        data = json.dumps(quiz['data'], cls=ComplexEncoder, indent=4)
        data = data.replace('"ISODate(\\"', 'ISODate("').replace('\\")"', ')')
        self.render('main.html', quiz=quiz, data=data)


class ExampleHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('example.html')


class AnswerHandler(tornado.web.RequestHandler):
    @asynchronous
    @gen.engine
    def post(self, quiz_id):
        db = self.application.settings['db']
        quiz = yield Op(db.quiz.find_one, {'_id': ObjectId(quiz_id)})
        if not quiz:
            raise HTTPError(404)

        # Use quiz_id as collection name, see if it exists
        collection_name = 'quiz_' + quiz_id
        collection = db[collection_name]
        cnt = yield Op(collection.count)
        if not cnt:
            # TODO: race condition
            yield Op(collection.insert, quiz['data'])

        try:
            parsed_body = json.loads(self.request.body)
        except ValueError:
            self.write({'ok': 0, 'error': 'Bad JSON'})
            self.finish()
            yield StopIteration

        print 'input', parsed_body

        try:
            result = yield Op(db.command, SON([
                ('aggregate', collection_name),
                ('pipeline', parsed_body),
            ]))
        except Exception, e:
            self.write({'ok': 0, 'error': str(e)})
            self.finish()
            yield StopIteration

        correct_answer = quiz['result']
        if isinstance(correct_answer, dict):
            correct_answer = [correct_answer]

        if correct_answer != result['result']:
            message = diff_sequences(correct_answer, result['result'])
            message = '<br />'.join(message.split('\n'))
            self.write(json.dumps({
                'ok': 0,
                'result': result['result'],
                'error': message
            }, cls=ComplexEncoder))
        else:
            self.write(json.dumps({
                'ok': 0,
                'result': result['result'],
                'message': 'How lovely; cheers!'
            }, cls=ComplexEncoder))

        self.finish()


class ComplexEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return 'ISODate("%sZ")' % obj.isoformat()
        elif isinstance(obj, ObjectId):
            return 'ObjectId("%s")' % obj
        return json.JSONEncoder.default(self, obj)
