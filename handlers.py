import json

import tornado.web
from tornado import gen
from tornado.web import asynchronous, HTTPError
from bson import SON

from motor import Op

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        db = self.application.settings['db']
        quiz = db.quiz.find_one();
        self.render('main.html' quiz=quiz)


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

        print parsed_body
        db = self.application.settings['db']

        result = yield Op(db.command, SON([
            ('aggregate', 'agg'),
            ('pipeline', parsed_body),
        ]))

        print result
        self.write(json.dumps(result))
        self.finish()
