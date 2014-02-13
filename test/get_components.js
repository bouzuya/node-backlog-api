var expect = require('chai').use(require('sinon-chai')).expect;
var xmlrpc = require('xmlrpc');
var backlog = require('../');

describe('backlog.getComponents', function() {
  var server;
  var client;
  var projectId;

  before(function(done) {
    projectId = 1073783536;
    server = xmlrpc.createServer({ host: 'localhost', port: 3000 });
    server.on('backlog.getComponents', function(err, params, callback) {
      var results = [];
      results.push({ id: 1073837877, name: 'カテゴリA' });
      results.push({ id: 1073837878, name: 'カテゴリB' });
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
    client.getComponents({
      projectId: projectId
    }, function(err, components) {
      if (err) throw err;
      expect(components).to.be.an('array');
      expect(components).to.not.be.empty;
      expect(components[0]).to.have.property('id');
      expect(components[0]).to.have.property('name');
      done();
    });
  });
});
