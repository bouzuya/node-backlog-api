var expect = require('expect.js');
var xmlrpc = require('xmlrpc');
var backlog = require('../');

describe('backlog.getStatuses', function() {
  var server;
  var client;

  before(function(done) {
    server = xmlrpc.createServer({ host: 'localhost', port: 3000 });
    server.on('backlog.getStatuses', function(err, params, callback) {
      var results = [];
      results.push({ id: 4, name: '完了' });
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
    client.getStatuses(function(err, statuses) {
      if (err) return done(err);
      expect(statuses).to.be.an(Array);
      expect(statuses).to.not.be.empty();
      expect(statuses[0]).to.have.property('id');
      expect(statuses[0]).to.have.property('name');
      done();
    });
  });
});

