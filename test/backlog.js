var expect = require('expect.js');
var backlog = require('../');

describe('backlog', function() {
  var client;

  before(function(done) {
    client = backlog();
    done();
  });

  describe('backlog()', function() {
    it('by arguments spaceId/username/password', function(done) {
      var client = backlog('space', 'user', 'pass');
      expect(client).to.have.property('spaceId', 'space');
      expect(client).to.have.property('username', 'user');
      expect(client).to.have.property('password', 'pass');
      done();
    });

    it('by env spaceId/username/password', function(done) {
      // backup
      var spaceId =  process.env.BACKLOG_SPACE_ID;
      var username = process.env.BACKLOG_USERNAME;
      var password = process.env.BACKLOG_PASSWORD;

      process.env.BACKLOG_SPACE_ID = 'space';
      process.env.BACKLOG_USERNAME = 'user';
      process.env.BACKLOG_PASSWORD = 'pass';
      var client = backlog();
      expect(client).to.have.property('spaceId', 'space');
      expect(client).to.have.property('username', 'user');
      expect(client).to.have.property('password', 'pass');

      // restore
      process.env.BACKLOG_SPACE_ID = spaceId;
      process.env.BACKLOG_USERNAME = username;
      process.env.BACKLOG_PASSWORD = password;
      done();
    });

    it('no argument', function(done) {
      // backup
      var spaceId =  process.env.BACKLOG_SPACE_ID;
      var username = process.env.BACKLOG_USERNAME;
      var password = process.env.BACKLOG_PASSWORD;

      process.env.BACKLOG_SPACE_ID = '';
      process.env.BACKLOG_USERNAME = '';
      process.env.BACKLOG_PASSWORD = '';
      expect(function() {
        backlog('space', 'user', null)
      }).to.throwError();
      expect(function() {
        backlog('space', null, 'pass');
      }).to.throwError();
      expect(function() {
        backlog(null, 'user', 'pass');
      }).to.throwError();

      // restore
      process.env.BACKLOG_SPACE_ID = spaceId;
      process.env.BACKLOG_USERNAME = username;
      process.env.BACKLOG_PASSWORD = password;
      done();
    });

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
});
