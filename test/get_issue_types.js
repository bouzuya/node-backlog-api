var expect = require('expect.js');
var xmlrpc = require('xmlrpc');
var backlog = require('../');

describe('backlog.getIssueTypes', function() {
  var server;
  var client;
  var projectId;

  before(function(done) {
    projectId = 1073783536;
    server = xmlrpc.createServer({ host: 'localhost', port: 3000 });
    server.on('backlog.getIssueTypes', function(err, params, callback) {
      var results = [];
      results.push({ id: 1073928376, color: '#990000', name: 'バグ' });
      results.push({ id: 1073928377, color: '#7ea800', name: 'タスク' });
      results.push({ id: 1073928378, color: '#ff9200', name: '要望' });
      results.push({ id: 1073928379, color: '#2779ca', name: 'その他' });
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
    client.getIssueTypes({
      projectId: projectId 
    }, function(err, issueTypes) {
      if (err) throw err;
      expect(issueTypes).to.be.an(Array);
      expect(issueTypes).to.not.be.empty();
      expect(issueTypes[0]).to.have.property('id');
      expect(issueTypes[0]).to.have.property('color');
      expect(issueTypes[0]).to.have.property('name');
      done();
    });
  });
});
