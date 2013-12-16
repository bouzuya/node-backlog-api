var expect = require('expect.js');
var xmlrpc = require('xmlrpc');
var backlog = require('../');

describe('backlog.getActivityTypes', function() {
  var server;
  var client;

  before(function(done) {
    server = xmlrpc.createServer({ host: 'localhost', port: 3000 });
    server.on('backlog.getActivityTypes', function(err, params, callback) {
      var results = [];
      results.push({ id: 1, name: '課題' });
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
    client.getActivityTypes(function(err, types) {
      if (err) return done(err);
      expect(types).to.be.an(Array);
      expect(types).to.not.be.empty();
      expect(types[0]).to.have.property('id');
      expect(types[0]).to.have.property('name');
      done();
    });
  });
});
