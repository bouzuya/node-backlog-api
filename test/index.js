var expect = require('expect.js');
var backlog = require('../');

describe('backlog', function() {
  var client;

  beforeEach(function(done) {
    var spaceId = process.env.BACKLOG_SPACE_ID;
    var username = process.env.BACKLOG_USERNAME;
    var password = process.env.BACKLOG_PASSWORD;
    client = backlog(spaceId, username, password);
    done();
  });

  it('backlog.getProjects', function(done) {
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

  describe('project info', function() {
    var projectId;

    beforeEach(function(done) {
      client.getProjects(function(err, projects) {
        if (err) throw err;
        projectId = projects[0].id;
        done();
      });
    });

    it('backlog.getProject', function(done) {
      client.getProject(projectId, function(err, project) {
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
      client.getComponents(projectId, function(err, components) {
        if (err) throw err;
        expect(components).to.be.an(Array);
        expect(components).to.not.be.empty();
        expect(components[0]).to.have.property('id');
        expect(components[0]).to.have.property('name');
        done();
      });
    });

    it('backlog.getVersions', function(done) {
      client.getVersions(projectId, function(err, versions) {
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
      client.getUsers(projectId, function(err, users) {
        if (err) throw err;
        expect(users).to.be.an(Array);
        expect(users).to.not.be.empty();
        expect(users[0]).to.have.property('id');
        expect(users[0]).to.have.property('name');
        done();
      });
    });

    it('backlog.getIssueTypes', function(done) {
      client.getIssueTypes(projectId, function(err, issueTypes) {
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
      client.getIssueTypes(projectId, function(err, issueTypes) {
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
      client.getUsers(projectId, function(err, users) {
        if (err) throw err;
        var user = users[1];
        expect(user).to.have.property('name', 'emanon001');
        client.countIssue({
          projectId: projectId,
          asignerId: user.id
        }, function(err, count) {
          if (err) throw err;
          expect(count).to.be(94);
          done();
        });
      });
    });

  });

});
