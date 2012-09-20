import datetime
import json

import tornado.web
from tornado import gen
from tornado.web import asynchronous, HTTPError
from bson import SON

from motor import Op

from diff_sequences import diff_sequences


class MainHandler(tornado.web.RequestHandler):

    @tornado.web.asynchronous
    @gen.engine
    def get(self):
        db = self.application.settings['db']
        quiz = yield Op(db.quiz.find_one)
        data = json.dumps(quiz['data'], cls=ComplexEncoder)
        data = data.replace('"ISODate(\\"', 'ISODate("').replace('\\")"', ')')
        self.render('main.html', quiz=quiz, data=data)


class ExampleHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('example.html')


class AnswerHandler(tornado.web.RequestHandler):
    @asynchronous
    @gen.engine
    def post(self):
        try:
            parsed_body = json.loads(self.request.body)
        except ValueError:
            raise HTTPError(500, "Can't parse JSON")

        print 'input', parsed_body
        db = self.application.settings['db']

        try:
            result = yield Op(db.command, SON([
                ('aggregate', 'agg'),
                ('pipeline', parsed_body),
            ]))
        except Exception, e:
            raise HTTPError(500, str(e))

        correct_answer = []#[{'a': 1}] # TODO

        if correct_answer != result['result']:
            message = diff_sequences(correct_answer, result['result'])
            message = '<br />'.join(message.split('\n'))
        else:
            message = 'How lovely; cheers!'

        self.write(json.dumps({
            'result': result['result'],
            'message': message
        }))

        self.finish()


class ComplexEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return 'ISODate("%sZ")' % obj.isoformat()
        return json.JSONEncoder.default(self, obj)
