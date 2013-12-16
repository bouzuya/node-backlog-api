var expect = require('expect.js');
var xmlrpc = require('xmlrpc');
var backlog = require('../');

describe('backlog.getPriorities', function() {
  var server;
  var client;

  before(function(done) {
    server = xmlrpc.createServer({ host: 'localhost', port: 3000 });
    server.on('backlog.getPriorities', function(err, params, callback) {
      var results = [];
      results.push({ id: 3, name: '中' });
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
    client.getPriorities(function(err, priorities) {
      if (err) return done(err);
      expect(priorities).to.be.an(Array);
      expect(priorities).to.not.be.empty();
      expect(priorities[0]).to.have.property('id');
      expect(priorities[0]).to.have.property('name');
      done();
    });
  });
});
