import datetime
import json
from pymongo.errors import OperationFailure

import tornado.web
from tornado import gen
from tornado.web import asynchronous, HTTPError
from bson import SON, ObjectId

from motor import Op

from diff_sequences import diff_sequences


def format_document(doc):
    return json.dumps(
        doc, cls=ComplexEncoder, indent=4
    ).replace('"ISODate', 'ISODate'
    ).replace('"ObjectId', 'ObjectId'
    ).replace('\\")"', '")').replace('\\"', '"')


class MainHandler(tornado.web.RequestHandler):

    @tornado.web.asynchronous
    @gen.engine
    def get(self, quiz_id):
        db = self.application.settings['db']
        page = int(quiz_id or 1) - 1
        if page < 0:
            self.redirect('/1')
            raise StopIteration
        quizzes = (yield Op(db.quiz.find().skip(page).limit(2).to_list))
        if len(quizzes) == 2:
            quiz = quizzes[0]
            has_next = True
        elif len(quizzes) == 1:
            quiz = quizzes[0]
            has_next = False
        else:
            raise tornado.web.HTTPError(404)
        data = format_document(quiz['data'])
        correct_output = format_document(quiz['result'])
        self.render('main.html', quiz=quiz, data=data,
                    has_next=has_next, page=page, correct_output=correct_output)


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
            body = self.request.body
            parsed_body = json.loads('{"value": %s }' % body)['value']
        except ValueError, e:
            self.write({'ok': 0, 'error': 'Bad JSON: ' + str(e)})
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
            diff = diff_sequences(correct_answer, result['result'])
            diff = '<br />'.join(diff.split('\n'))
            self.write(json.dumps({
                'ok': 0,
                'result': format_document(result['result']),
                'diff': diff
            }, cls=ComplexEncoder))
        else:
            self.write(json.dumps({
                'ok': 1,
                'result': format_document(result['result']),
            }, cls=ComplexEncoder))

        self.finish()


class ComplexEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return 'ISODate(\"%sZ\")' % obj.isoformat()
        elif isinstance(obj, ObjectId):
            return 'ObjectId(\"%s\")' % obj
        return json.JSONEncoder.default(self, obj)
