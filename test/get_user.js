var expect = require('chai').use(require('sinon-chai')).expect;
var xmlrpc = require('xmlrpc');
var backlog = require('../');

describe('backlog.getUser', function() {
  var server;
  var client;

  before(function(done) {
    var methodName = 'backlog.getUser';
    var result = { id: 123, name: 'やまもと', lang: 'ja', updated_on: '20101028092355' };
    server = xmlrpc.createServer({ host: 'localhost', port: 3000 });
    server.on(methodName, function(err, params, callback) {
      callback(null, result);
    });
    client = backlog();
    client._client = function() {
      return xmlrpc.createClient({
        url: 'http://localhost:3000/XML-RPC'
      });
    };
    done();
  });

  after(function(done) {
    server.close(done);
  });

  describe('normal case', function() {
    it('works', function(done) {
      client.getUser({
        id: 123
      }, function(err, user) {
        if (err) return done(err);
        expect(user).to.have.property('id');
        expect(user).to.have.property('name');
        expect(user).to.have.property('lang');
        expect(user).to.have.property('updated_on');
        done();
      });
    });
  });

  describe('no argument', function() {
    it('"id" is required', function(done) {
      client.getUser(function(err, user) {
        expect(err).to.be.instanceOf(Error);
        done();
      });
    });
  });
});
