var expect = require('expect.js');
var xmlrpc = require('xmlrpc');
var backlog = require('../');

describe('backlog.getProject', function() {
  var server;
  var client;
  var projectId;

  before(function(done) {
    projectId = 1073783536;
    server = xmlrpc.createServer({ host: 'localhost', port: 3000 });
    server.on('backlog.getProject', function(err, params, callback) {
      callback(null, {
        use_parent_child_issue: false,
        id: projectId,
        text_formatting_rule: 'backlog',
        archived: false,
        name: 'Backlog API',
        url: 'https://bouzuya.backlog.jp/projects/BAPI',
        key: 'BAPI'
      });
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
    client.getProject({
      projectId: projectId
    }, function(err, project) {
      if (err) throw err;
      expect(project).to.have.property('use_parent_child_issue');
      expect(project).to.have.property('id');
      expect(project).to.have.property('text_formatting_rule');
      expect(project).to.have.property('archived');
      expect(project).to.have.property('name');
      expect(project).to.have.property('url');
      expect(project).to.have.property('key');
      done();
    });
  });
});

