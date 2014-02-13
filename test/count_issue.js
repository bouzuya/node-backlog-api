var expect = require('chai').use(require('sinon-chai')).expect;
var xmlrpc = require('xmlrpc');
var backlog = require('../');

describe('backlog.countIssue', function() {
  var server;
  var client;
  var projectId;
  var userId;

  before(function(done) {
    projectId = 1073783536;
    userId = 1073826358;
    server = xmlrpc.createServer({ host: 'localhost', port: 3000 });
    server.on('backlog.countIssue', function(err, params, callback) {
      if (params[0].assignerId === userId) {
        callback(null, 2);
        return ;
      }
      switch (params[0].statusId) {
        case 1:
          callback(null, 10);
          break;
        case 2:
          callback(null, 0);
          break;
        case 3:
          callback(null, 0);
          break;
        case 4:
          callback(null, 84);
          break;
        default:
          if (params[0].statusId instanceof Array) {
            callback(null, 10);
            break;
          } else {
            callback(null, 94);
            break;
          }
      }
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

  it('backlog.countIssue = 94', function(done) {
    client.countIssue({ projectId: projectId }, function(err, count) {
      if (err) throw err;
      expect(count).to.be.a('number');
      expect(count).to.equal(94);
      done();
    });
  });

  it('backlog.countIssue status 1 未対応 = 10', function(done) {
    client.countIssue({
      projectId: projectId,
      statusId: 1
    }, function(err, count) {
      if (err) throw err;
      expect(count).to.be.a('number');
      expect(count).to.equal(10);
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
      expect(count).to.equal(0);
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
      expect(count).to.equal(0);
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
      expect(count).to.equal(84);
      done();
    });
  });

  it('backlog.countIssue status 1,2,3 完了以外 = 10', function(done) {
    client.countIssue({
      projectId: projectId,
      statusId: [1, 2, 3]
    }, function(err, count) {
      if (err) throw err;
      expect(count).to.be.a('number');
      expect(count).to.equal(10);
      done();
    });
  });

  it('backlog.countIssue assignerId', function(done) {
    client.countIssue({
      projectId: projectId,
      assignerId: userId
    }, function(err, count) {
      if (err) throw err;
      expect(count).to.equal(2);
      done();
    });
  });
});

