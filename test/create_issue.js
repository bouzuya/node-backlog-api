var expect = require('expect.js');
var xmlrpc = require('xmlrpc');
var backlog = require('../');

describe('backlog.createIssue', function() {
  var server;
  var client;
  var projectId;

  before(function(done) {
    projectId = 1073783536;
    server = xmlrpc.createServer({ host: 'localhost', port: 3000 });
    server.on('backlog.createIssue', function(err, params, callback) {
      callback(null, {
        id: 73,
        key: 'BLGWEBSITE-213',
        summary: 'トップページのデザイン決定',
        parent_issue_id: 60,
        description: 'トップページのデザイン決定します',
        url: 'https://demo.backlog.jp/BLGWEBSITE-213',
        due_date: '20090821',
        start_date: '20090801',
        estimated_hours: 3.5,
        actual_hours: 5.5,
        issueType: { id: 5, name: 'タスク', color: '#990000' },
        priority: { id: 3, name: '中' },
        resolution: { id: 0, name: '対応済み' },
        status: { id: 2, name: '処理中' },
        components: { id: 1967, name: 'プロモーション' },
        versions: { id: 732, name: 'デザイン案作成', date: '20090910' },
        milestones: { id: 733, name: 'サイトオープン', date: '20091010' },
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

  describe('normal case', function() {
    it('works', function(done) {
      client.createIssue({
        projectId: projectId,
        summary: 'summary' 
      }, function(err, issue) {
        if (err) return done(err);
        expect(issue).to.have.property('id');
        expect(issue).to.have.property('key');
        expect(issue).to.have.property('summary');
        // expect(issue).to.have.property('parent_issue_id');
        expect(issue).to.have.property('description');
        expect(issue).to.have.property('url');
        expect(issue).to.have.property('due_date');
        // expect(issue).to.have.property('start_date');
        // expect(issue).to.have.property('estimated_hours');
        // expect(issue).to.have.property('actual_hours');
        expect(issue).to.have.property('issueType');
        expect(issue).to.have.property('priority');
        // expect(issue).to.have.property('resolution');
        expect(issue).to.have.property('status');
        // expect(issue).to.have.property('components');
        // expect(issue).to.have.property('versions');
        // expect(issue).to.have.property('milestones');
        expect(issue).to.have.property('created_user');
        // expect(issue).to.have.property('assigner');
        expect(issue).to.have.property('created_on');
        expect(issue).to.have.property('updated_on');
        done();
      });
    });

    it('works', function(done) {
      client.createIssue({
        projectId: projectId,
        summary: 'トップページのデザイン決定',
        parent_issue_id: 60,
        description: 'トップページのデザイン決定します',
        start_date: '20090801',
        due_date: '20090821',
        estimated_hours: 3.5,
        actual_hours: 5.5,
        issueTypeId: 1073928376,
        componentId: 1073837877
        // components: { id: 1967, name: 'プロモーション' },
        // versions: { id: 732, name: 'デザイン案作成', date: '20090910' },
        // milestones: { id: 733, name: 'サイトオープン', date: '20091010' },
        // priority: { id: 3, name: '中' },
        // assigner: { id: 3, name: '山田' },
      }, function(err, issue) {
        if (err) return done(err);
        console.log(issue);
        expect(issue).to.have.property('id');
        expect(issue).to.have.property('key');
        expect(issue).to.have.property('summary');
        // expect(issue).to.have.property('parent_issue_id');
        expect(issue).to.have.property('description');
        expect(issue).to.have.property('url');
        expect(issue).to.have.property('due_date');
        // expect(issue).to.have.property('start_date');
        // expect(issue).to.have.property('estimated_hours');
        // expect(issue).to.have.property('actual_hours');
        expect(issue).to.have.property('issueType');
        expect(issue).to.have.property('priority');
        // expect(issue).to.have.property('resolution');
        expect(issue).to.have.property('status');
        // expect(issue).to.have.property('components');
        // expect(issue).to.have.property('versions');
        // expect(issue).to.have.property('milestones');
        expect(issue).to.have.property('created_user');
        // expect(issue).to.have.property('assigner');
        expect(issue).to.have.property('created_on');
        expect(issue).to.have.property('updated_on');
        done();
      });
    });
  });

  describe('no arguments', function() {
    it('does not work', function(done) {
      client.createIssue(function(err, issue) {
        expect(err).to.be.ok();
        done();
      });
    });
  });

  describe('set issueType only', function() {
    it('works', function(done) {
      client.createIssue({
        projectId: projectId,
        summary: 'トップページのデザイン決定',
        issueType: '要望'
      }, function(err, issue) {
        expect(err).to.not.be.ok();
        done();
      });
    });
  });

  describe('set issueTypeId only', function() {
    it('works', function(done) {
      client.createIssue({
        projectId: projectId,
        summary: 'トップページのデザイン決定',
        issueTypeId: 1073928378
      }, function(err, issue) {
        expect(err).to.not.be.ok();
        done();
      });
    });
  });

  describe('set issueType and issueTypeId', function() {
    it('does not work', function(done) {
      client.createIssue({
        projectId: projectId,
        summary: 'トップページのデザイン決定',
        issueType: '要望',
        issueTypeId: 1073928377
      }, function(err, issue) {
        expect(err).to.be.ok();
        done();
      });
    });
  });

  describe('set component only', function() {
    it('works', function(done) {
      client.createIssue({
        projectId: projectId,
        summary: 'トップページのデザイン決定',
        component: 'カテゴリA'
      }, function(err, issue) {
        expect(err).to.not.be.ok();
        done();
      });
    });
  });

  describe('set comopnentId only', function() {
    it('works', function(done) {
      client.createIssue({
        projectId: projectId,
        summary: 'トップページのデザイン決定',
        componentId: 1073837877
      }, function(err, issue) {
        expect(err).to.not.be.ok();
        done();
      });
    });
  });

  describe('set component and componentId', function() {
    it('does not work', function(done) {
      client.createIssue({
        projectId: projectId,
        summary: 'トップページのデザイン決定',
        component: 'カテゴリA',
        componentId: 1073837877
      }, function(err, issue) {
        expect(err).to.be.ok();
        done();
      });
    });
  });
});
