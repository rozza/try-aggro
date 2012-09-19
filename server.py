#!/usr/bin/env python
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
    db = motor.MotorConnection().open_sync().agg
    static_path = 'static'

    application = tornado.web.Application([
        URLSpec(r"/static/(.+)", StaticFileHandler, {"path": static_path}, name='static'),
        URLSpec(r"/answer", AnswerHandler, name='answer'),
        URLSpec(r"/?", MainHandler, name='main'),
        URLSpec(r"/example/?", ExampleHandler, name='example'),
        ],
        db=db,
        template_path='templates',
        debug=True
    )

    http_server = httpserver.HTTPServer(application)
    http_server.listen(8000)
    print 'Listening on port %s' % 8000
    tornado.ioloop.IOLoop.instance().start()
