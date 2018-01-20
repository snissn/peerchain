import os, os.path
import random
import json
import string

import expiringdict

import cherrypy


class StringGenerator(object):
    peers = expiringdict.ExpiringDict(30000,max_age_seconds=60*2)
    @cherrypy.expose
    def index(self):
        html = open("public/index.html").read()
        peers = json.dumps(self.peers.keys())
        return html.format(peers=peers)

    @cherrypy.expose
    def announce(self, peerid):
        self.peers[peerid] = True

    @cherrypy.expose
    def display(self):
        return cherrypy.session['mystring']


if __name__ == '__main__':
    conf = {
        '/': {
            'tools.sessions.on': True,
            'tools.staticdir.root': os.path.abspath(os.getcwd())
        },
        '/static': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': './public'
        }
    }
    cherrypy.server.socket_host = '0.0.0.0'
    cherrypy.quickstart(StringGenerator(), '/', conf)
