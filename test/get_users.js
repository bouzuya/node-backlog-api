var expect = require('chai').use(require('sinon-chai')).expect;
var xmlrpc = require('xmlrpc');
var backlog = require('../');

describe('backlog.getUsers', function() {
  var server;
  var client;
  var projectId;

  before(function(done) {
    projectId = 1073783536;
    server = xmlrpc.createServer({ host: 'localhost', port: 3000 });
    server.on('backlog.getUsers', function(err, params, callback) {
      var results = [];
      results.push({ id: 1073826357, name: 'bouzuya' });
      results.push({ id: 1073826358, name: 'emanon001' });
      callback(null, results);
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

  it('works', function(done) {
    client.getUsers({ projectId: projectId }, function(err, users) {
      if (err) throw err;
      expect(users).to.be.an('array');
      expect(users).to.not.be.empty;
      expect(users[0]).to.have.property('id');
      expect(users[0]).to.have.property('name');
      done();
    });
  });
});

