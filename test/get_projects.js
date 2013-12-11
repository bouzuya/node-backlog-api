var expect = require('expect.js');
var xmlrpc = require('xmlrpc');
var backlog = require('../');

describe('backlog.getProjects', function() {
  var server;
  var client;

  before(function(done) {
    server = xmlrpc.createServer({ host: 'localhost', port: 3000 });
    server.on('backlog.getProjects', function(err, params, callback) {
      var results = [];
      results.push({
        use_parent_child_issue: false,
        id: 1073783536,
        text_formatting_rule: 'backlog',
        archived: false,
        name: 'Backlog API',
        url: 'https://bouzuya.backlog.jp/projects/BAPI',
        key: 'BAPI'
      });
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

  it('1 argument', function(done) {
    client.getProjects(function(err, projects) {
      if (err) throw err;
      expect(projects).to.be.an(Array);
      expect(projects).to.not.be.empty();
      expect(projects[0]).to.have.property('use_parent_child_issue');
      expect(projects[0]).to.have.property('id');
      expect(projects[0]).to.have.property('text_formatting_rule');
      expect(projects[0]).to.have.property('archived');
      expect(projects[0]).to.have.property('name');
      expect(projects[0]).to.have.property('url');
      expect(projects[0]).to.have.property('key');
      done();
    });
  });

  it('2 arguments', function(done) {
    client.getProjects({}, function(err, projects) {
      if (err) throw err;
      expect(projects).to.be.an(Array);
      expect(projects).to.not.be.empty();
      expect(projects[0]).to.have.property('use_parent_child_issue');
      expect(projects[0]).to.have.property('id');
      expect(projects[0]).to.have.property('text_formatting_rule');
      expect(projects[0]).to.have.property('archived');
      expect(projects[0]).to.have.property('name');
      expect(projects[0]).to.have.property('url');
      expect(projects[0]).to.have.property('key');
      done();
    });
  });
});
