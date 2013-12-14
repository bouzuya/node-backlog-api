var expect = require('expect.js');
var xmlrpc = require('xmlrpc');
var backlog = require('../');

describe('backlog.getIssue', function() {
  var server;
  var client;
  var issueId;

  before(function(done) {
    issueId = 1075316673;
    server = xmlrpc.createServer({ host: 'localhost', port: 3000 });
    server.on('backlog.getIssue', function(err, params, callback) {
      callback(null, {
        id: 73,
        key: 'BLGWEBSITE-213',
        summary: 'トップページのデザイン決定',
        parent_issue_id: 60,
        description: 'トップページのデザイン決定します',
        url: 'https://demo.backlog.jp/BLGWEBSITE-213',
        due_date: '20090821',
        start_date: '20090801',
        estimated_hours: '3.5',
        actual_hours: '5.5',
        issueType: { id: 5, name: 'タスク', color: '#990000' },
        priority: { id: 3, name: '中' },
        resolution: { id: 0, name: '対応済み'},
        status: { id: 2, name: '処理中' },
        components: { id: 1967, name: 'プロモーション' },
        versions: { id  : 732, name: 'デザイン案作成', date: '20090910' },
        milestones: { id  : 733, name: 'サイトオープン', date: '20091010' },
        created_user: { id: 2, name: 'やまもと' },
        assigner: { id: 3, name: '山田' },
        created_on: '20090731151859',
        updated_on: '20090812132418'
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

  describe('no arguments', function() {
    it('does\'t work', function(done) {
      client.getIssue(function(err, issue) {
        expect(err).to.be.an(Error);
        done();
      });
    });
  });

  describe('set issueId', function() {
    it('works', function(done) {
      client.getIssue({
        issueId: issueId 
      }, function(err, issue) {
        if (err) throw err;
        expect(issue).to.have.property('id');
        done();
      });
    });
  });

  describe('set issueKey', function() {
    it('works', function(done) {
      client.getIssue({
        issueKey: 'BAPI-78'
      }, function(err, issue) {
        if (err) throw err;
        expect(issue).to.have.property('id');
        done();
      });
    });
  });

  describe('set issueId & issueKey', function() {
    it('does\'t works', function(done) {
      client.getIssue({
        issueKey: 'key',
        issueId: issueId 
      }, function(err, issue) {
        expect(err).to.be.an(Error);
        done();
      });
    });
  });
});

