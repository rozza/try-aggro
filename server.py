#!/usr/bin/env python
import os
import sys

import tornado.ioloop
import tornado.web
from tornado.web import StaticFileHandler, URLSpec
from tornado import httpserver

from handlers import *

try:
    import motor
except ImportError:
    print >> sys.stderr, (
        "Can't import motor.\n\n"
        " Motor is an experimental async driver for"
        " MongoDB, get it by cloning\n"
        " git://github.com/ajdavis/mongo-python-driver.git"
        " and switching to branch 'motor',\n"
        " then put the mongo-python-driver directory"
        " on your PYTHONPATH\n\n"
        )

    raise


if __name__ == "__main__":

    mongodb_uri = os.environ.get('MONGOLAB_URI', 'mongodb://localhost:27017')

    db = motor.MotorConnection(mongodb_uri).open_sync().agg
    static_path = 'static'

    application = tornado.web.Application([
        URLSpec(r"/static/(.+)", StaticFileHandler,
                                    {"path": static_path}, name='static'),
        URLSpec(r"/answer/(?P<quiz_id>.+)", AnswerHandler, name='answer'),
        URLSpec(r"/(?P<quiz_id>[0-9]+)?", MainHandler, name='main'),
        URLSpec(r"/example/?", ExampleHandler, name='example'),
        ],
        db=db,
        template_path='templates',
        debug=True
    )

    http_server = httpserver.HTTPServer(application)

    port = int(os.environ.get('PORT', 8000))
    http_server.listen(port)
    print 'Listening on port %s' % port
    tornado.ioloop.IOLoop.instance().start()
