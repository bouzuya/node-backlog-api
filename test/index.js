var expect = require('expect.js');
var backlog = require('../');

describe('backlog', function() {
  var client;

  before(function(done) {
    var spaceId = process.env.BACKLOG_SPACE_ID;
    var username = process.env.BACKLOG_USERNAME;
    var password = process.env.BACKLOG_PASSWORD;
    client = backlog(spaceId, username, password);
    done();
  });

  describe('backlog._parseArguments', function() {
    var f;

    before(function(done) {
      f = client._parseArguments;
      done();
    });

    describe('no arguments', function() {
      it('invalid', function(done) {
        expect(function() { f(); }).to.throwException();
        done();
      });
    });

    describe('1 argument', function() {
      it('valid', function(done) {
        expect(function() { f(function() {}); }).to.not.throwException();
        done();
      });

      it('invalid', function(done) {
        expect(function() { f(null);  }).to.throwException();
        expect(function() { f(1); }).to.throwException();
        expect(function() { f(''); }).to.throwException();
        expect(function() { f(false); }).to.throwException();
        expect(function() { f({}); }).to.throwException();
        done();
      });
    });

    describe('2 arguments', function() {
      it('valid', function(done) {
        expect(function() { f({}, function() {}); }).to.not.throwException();
        done();
      });

      it('return value', function(done) {
        var returnValue = f({ projectId: true }, function() {});
        expect(returnValue).to.have.property('params');
        expect(returnValue).to.have.property('callback');
        expect(returnValue.params).to.eql({ projectId: true });
        done();
      });

      it('invalid', function(done) {
        expect(function() { f(null, function() {}); }).to.throwException();
        expect(function() { f(1, function() {}); }).to.throwException();
        expect(function() { f('', function() {}); }).to.throwException();
        expect(function() { f(false, function() {}); }).to.throwException();
        expect(function() { f({}, null); }).to.throwException();
        expect(function() { f({}, 1); }).to.throwException();
        expect(function() { f({}, ''); }).to.throwException();
        expect(function() { f({}, false); }).to.throwException();
        done();
      });
    });

    describe('3+ arguments', function() {
      it('invalid', function(done) {
        expect(function() { f({}, function() {}, 3) }).to.throwException();
        expect(function() { f({}, function() {}, 3, 4) }).to.throwException();
        done();
      });
    });

  });

  describe('backlog.getProjects', function() {
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

  describe('project info', function() {
    var projectId;

    before(function(done) {
      client.getProjects(function(err, projects) {
        if (err) throw err;
        projectId = projects[0].id;
        done();
      });
    });

    it('backlog.getProject', function(done) {
      client.getProject({ projectId: projectId }, function(err, project) {
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

    it('backlog.getComponents', function(done) {
      client.getComponents({ projectId: projectId }, function(err, components) {
        if (err) throw err;
        expect(components).to.be.an(Array);
        expect(components).to.not.be.empty();
        expect(components[0]).to.have.property('id');
        expect(components[0]).to.have.property('name');
        done();
      });
    });

    it('backlog.getVersions', function(done) {
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

    it('backlog.getUsers', function(done) {
      client.getUsers({ projectId: projectId }, function(err, users) {
        if (err) throw err;
        expect(users).to.be.an(Array);
        expect(users).to.not.be.empty();
        expect(users[0]).to.have.property('id');
        expect(users[0]).to.have.property('name');
        done();
      });
    });

    it('backlog.getIssueTypes', function(done) {
      client.getIssueTypes({ projectId: projectId }, function(err, issueTypes) {
        if (err) throw err;
        expect(issueTypes).to.be.an(Array);
        expect(issueTypes).to.not.be.empty();
        expect(issueTypes[0]).to.have.property('id');
        expect(issueTypes[0]).to.have.property('color');
        expect(issueTypes[0]).to.have.property('name');
        done();
      });
    });

    it('backlog.countIssue = 94', function(done) {
      client.countIssue({ projectId: projectId }, function(err, count) {
        if (err) throw err;
        expect(count).to.be.a('number');
        expect(count).to.be(94);
        done();
      });
    });

    it('backlog.countIssue issueTypeId (バグ)', function(done) {
      client.getIssueTypes({ projectId: projectId }, function(err, issueTypes) {
        if (err) throw err;
        var issueType = issueTypes[0];
        expect(issueType).to.have.property('name', 'バグ');
        client.countIssue({
          projectId: projectId,
          issueTypeId: issueType.id
        }, function(err, count) {
          if (err) throw err;
          expect(count).to.be(9);
          done();
        });
      });
    });

    it('backlog.countIssue status 1 未対応 = 10', function(done) {
      client.countIssue({
        projectId: projectId,
        statusId: 1
      }, function(err, count) {
        if (err) throw err;
        expect(count).to.be.a('number');
        expect(count).to.be(10);
        done();
      });
    });

    it('backlog.countIssue status 2 処理中 = 0', function(done) {
      client.countIssue({
        projectId: projectId,
        statusId: 2
      }, function(err, count) {
        if (err) throw err;
        expect(count).to.be.a('number');
        expect(count).to.be(0);
        done();
      });
    });

    it('backlog.countIssue status 3 処理済み = 0', function(done) {
      client.countIssue({
        projectId: projectId,
        statusId: 3
      }, function(err, count) {
        if (err) throw err;
        expect(count).to.be.a('number');
        expect(count).to.be(0);
        done();
      });
    });

    it('backlog.countIssue status 4 完了 = 84', function(done) {
      client.countIssue({
        projectId: projectId,
        statusId: 4
      }, function(err, count) {
        if (err) throw err;
        expect(count).to.be.a('number');
        expect(count).to.be(84);
        done();
      });
    });

    it('backlog.countIssue status 1,2,3 完了以外 = 9', function(done) {
      client.countIssue({
        projectId: projectId,
        statusId: [1, 2, 3]
      }, function(err, count) {
        if (err) throw err;
        expect(count).to.be.a('number');
        expect(count).to.be(10);
        done();
      });
    });

    it('backlog.countIssue assignerId', function(done) {
      client.getUsers({ projectId: projectId }, function(err, users) {
        if (err) throw err;
        var user = users[1];
        expect(user).to.have.property('name', 'emanon001');
        client.countIssue({
          projectId: projectId,
          assignerId: user.id
        }, function(err, count) {
          if (err) throw err;
          expect(count).to.be(2);
          done();
        });
      });
    });

    it('backlog.findIssue', function(done) {
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

    it('backlog.findIssue statusId [1, 2, 3]', function(done) {
      client.findIssue({
        projectId: projectId,
        statusId: [1, 2, 3]
      }, function(err, issues) {
        if (err) throw err;
        expect(issues).to.be.a(Array);
        expect(issues).to.not.be.empty();
        issues.forEach(function(i) {
          expect(i).to.have.property('status');
          expect(i.status).to.have.property('id');
          expect(i.status).to.have.property('name');
          if (i.status.id !== 1 && i.status.id !== 2 && i.status.id !== 3) {
            expect().fail('issue.status.id is 1 or 2 or 3');
          }
        });
        done();
      });
    });

    it('backlog.findIssue required "projectId"', function(done) {
      client.findIssue({}, function(err, issues) {
        expect(err).to.be.an(Error);
        done();
      });
    });

  });

});

