#!/usr/bin/env python

# MOST GHETTO BACKEND IN THE HISTORY OF BACKENDS
# NOBODY PAID ME TO DO THIS
import process_labs
import process_syllabus
import sys
sys.path.insert(0, 'lib/')
import web
import os



urls = (
    '/labs', 'list_labs',
    '/labs/(.*)', 'get_lab',
    '/syllabus', 'get_syllabus',
    '/', 'index',
    '/favicon.ico', 'fav'
)

class index:
    def GET(self):
        # redirect to the static file ...
        raise web.seeother('/static/index.html')

class fav:
    def GET(self):
        return web.seeother('/static/favicon.ico')

app = web.application(urls, globals())

class list_labs:        
    def GET(self):
        web.header('Access-Control-Allow-Origin',      '*')
        web.header('Access-Control-Allow-Credentials', 'true')
        return process_labs.html.keys()

class get_lab:
    def GET(self, lab):
        web.header('Access-Control-Allow-Origin',      '*')
        web.header('Access-Control-Allow-Credentials', 'true')
        if lab in process_labs.html:
            web.header("Content-Type", "text/html")
            return process_labs.html[lab]
        lab = lab.split("/")
        if lab[1] in os.listdir(process_labs.LABSDIR + lab[0]):
            web.header("Content-Type", "image/" + lab[1][-3:])
            return open(process_labs.LABSDIR + lab[0] + "/" + lab[1], "rb").read()
        else:
            raise web.notfound();

class get_syllabus:
    def GET(self):
        web.header('Access-Control-Allow-Origin',      '*')
        web.header('Access-Control-Allow-Credentials', 'true')
        web.header('Content-Type', 'text/json')
        return process_syllabus.json_syllabus


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 8080))
    # app.run(port=port)
    web.httpserver.runsimple(app.wsgifunc(), ("0.0.0.0", port))
    # app = app.gaerun()
    # app.cgirun()
    # app = application.wsgifunc()