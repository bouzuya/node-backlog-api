var expect = require('expect.js');
var xmlrpc = require('xmlrpc');
var backlog = require('../');

describe('backlog.getVersions', function() {
  var server;
  var client;
  var projectId;

  before(function(done) {
    projectId = 1073783536;
    server = xmlrpc.createServer({ host: 'localhost', port: 3000 });
    server.on('backlog.getVersions', function(err, params, callback) {
      var results = [];
      results.push({ id: 1073802586, name: '0.0.1', date: '20121222' });
      results.push({ id: 1073802600, name: '0.1.0', date: '20121216' });
      results.push({ id: 1073802601, name: '0.2.0', date: '20121222' });
      results.push({ id: 1073802608, name: '0.3.0', date: '20121229' });
      results.push({ id: 1073803170, name: '0.4.0', date: '20130105' });
      results.push({ id: 1073804377, name: '0.3.1', date: '20130103' });
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
    client.getVersions({ projectId: projectId }, function(err, versions) {
      if (err) throw err;
      expect(versions).to.be.an(Array);
      expect(versions).to.not.be.empty();
      expect(versions[0]).to.have.property('id');
      expect(versions[0]).to.have.property('name');
      expect(versions[0]).to.have.property('date');
      done();
    });
  });
});
