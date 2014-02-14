global.expect = require('chai').use(require('sinon-chai')).expect;

var xmlrpc = require('xmlrpc');
var backlog = require('../');

// setup
// before();
beforeEach(function(done) {
  this.sinon = require('sinon').sandbox.create();

  global.server = xmlrpc.createServer({
    host: 'localhost',
    port: 3000
  }, function() {
    global.client = backlog();
    client._client = function() {
      return xmlrpc.createClient({
        url: 'http://localhost:3000/XML-RPC'
      });
    };
    done();
  });
});

// teardown
// after();
afterEach(function(done) {
  global.server.close(done);
  this.sinon.restore();
});

