var expect = require('expect.js');
var xmlrpc = require('xmlrpc');
var backlog = require('../');

describe('backlog.findIssue', function() {
  var server;
  var client;
  var projectId;

  before(function(done) {
    projectId = 1073783536;
    server = xmlrpc.createServer({ host: 'localhost', port: 3000 });
    server.on('backlog.findIssue', function(err, params, callback) {
      var results = [];
      results.push({
        summary: 'APIの調べ方を教えてほしい',
        status: { id: 4, name: '完了' },
        created_user: { id: 1073826357, name: 'bouzuya' },
        created_on: '20121215221840',
        issueType: { id: 1073928378, color: '#ff9200', name: '要望' },
        resolution: { id: 0, name: '対応済み' },
        url: 'https://bouzuya.backlog.jp/view/BAPI-2',
        id: 1075256778,
        description: 'APIの調べ方が分からないから、教えてほしい。\r\nそもそも、APIとか公開されているの？',
        priority: { id: 3, name: '中' },
        updated_on: '20121215225644',
        due_date: '20121215',
        assigner: { id: 1073826357, name: 'bouzuya' },
        key: 'BAPI-2' });
      results.push({
        summary: 'Backlogにログインしてください',
        status: { id: 4, name: '完了' },
        created_user: { id: 1073826357, name: 'bouzuya' },
        created_on: '20121215221144',
        issueType: { id: 1073928377, color: '#7ea800', name: 'タスク' },
        resolution: { id: 0, name: '対応済み' },
        url: 'https://bouzuya.backlog.jp/view/BAPI-1',
        id: 1075256773,
        description: 'Backlogを導入しました。\r\n\r\nログインできたメンバーからコメントしていただいてよろしいでしょうか？',
        priority: { id: 3, name: '中' },
        due_date: '20121215',
        updated_on: '20121215221429',
        key: 'BAPI-1' });
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
    client.findIssue({
      projectId: projectId
    }, function(err, issues) {
      if (err) throw err;
      expect(issues).to.be.a(Array);
      expect(issues).to.not.be.empty();
      expect(issues[0]).to.have.property('summary');
      expect(issues[0]).to.have.property('status');
      expect(issues[0]).to.have.property('created_user');
      expect(issues[0]).to.have.property('created_on');
      expect(issues[0]).to.have.property('issueType');
      // expect(issues[0]).to.have.property('resolution');
      expect(issues[0]).to.have.property('url');
      expect(issues[0]).to.have.property('id');
      expect(issues[0]).to.have.property('description');
      expect(issues[0]).to.have.property('priority');
      expect(issues[0]).to.have.property('due_date');
      expect(issues[0]).to.have.property('updated_on');
      expect(issues[0]).to.have.property('assigner');
      expect(issues[0]).to.have.property('key');
      done();
    });
  });

  it('"projectId" is required', function(done) {
    client.findIssue({}, function(err, issues) {
      expect(err).to.be.an(Error);
      done();
    });
  });
});
