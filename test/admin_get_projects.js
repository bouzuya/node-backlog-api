require('./helper');

describe('backlog.admin.getProjects', function() {

  var method = 'backlog.admin.getProjects';

  describe('server has no error', function() {

    var result;

    beforeEach(function() {
      result = [];
      result.push({
        id: 2,
        name: '新規開発プロジェクト',
        key: 'STWK',
        url: 'https://demo.backlog.jp/projects/STWK',
        use_chart: false,
        use_parent_child_issue: false,
        text_formatting_rule: 'backlog',
        archived: false,
        created_on: '20090731151859',
        updated_on: '20100102151848',
      });
    });

    describe('call with [callback]', function() {
      it('works', function(done) {
        var spy = this.sinon.spy(function(e, p, cb) { cb(null, result); });
        server.once(method, spy);

        client.admin.getProjects(function(err, projects) {
          expect(spy).to.have.been.calledOnce;
          expect(spy.firstCall.args[0]).to.be.null;
          expect(spy.firstCall.args[1]).to.be.empty;
          expect(err).to.be.null;
          expect(projects).to.eql(result);
          done();
        });
      });
    });

    describe('call with [options, callback]', function() {
      it('works', function(done) {
        var spy = this.sinon.spy(function(e, p, cb) { cb(null, result); });
        server.once(method, spy);

        client.admin.getProjects({}, function(err, projects) {
          expect(spy).to.have.been.calledOnce;
          expect(spy.firstCall.args[0]).to.be.null;
          expect(spy.firstCall.args[1]).to.be.empty;
          expect(err).to.be.null;
          expect(projects).to.eql(result);
          done();
        });
      });
    });

    describe('call with [] (use promise)', function() {
      it('works', function(done) {
        var spy = this.sinon.spy(function(e, p, cb) { cb(null, result); });
        server.once(method, spy);

        client.admin.getProjects().then(function(projects) {
          expect(spy).to.have.been.calledOnce;
          done();
        });
      });
    });

    describe('call with [options] (use promise)', function() {
      it('works', function(done) {
        var spy = this.sinon.spy(function(e, p, cb) { cb(null, result); });
        server.once(method, spy);

        client.admin.getProjects({}).then(function(projects) {
          expect(spy).to.have.been.calledOnce;
          expect(spy.firstCall.args[0]).to.be.null;
          expect(spy.firstCall.args[1]).to.be.empty;
          expect(projects).to.eql(result);
          done();
        });
      });
    });
  });

  describe('server has error', function() {

    var err;

    beforeEach(function() {
      err = new Error();
    });

    describe('call with [callback]', function() {
      it('works', function(done) {
        var spy = this.sinon.spy(function(e, p, cb) { cb(err); });
        server.once(method, spy);

        client.admin.getProjects(function(err, projects) {
          expect(spy).to.have.been.calledOnce;
          expect(spy.firstCall.args[0]).to.be.null;
          expect(spy.firstCall.args[1]).to.be.empty;
          expect(err).to.be.ok;
          expect(projects).to.not.be.ok;
          done();
        });
      });
    });

    describe('call with [options, callback]', function() {
      it('works', function(done) {
        var spy = this.sinon.spy(function(e, p, cb) { cb(err); });
        server.once(method, spy);

        client.admin.getProjects({}, function(err, projects) {
          expect(spy).to.have.been.calledOnce;
          expect(spy.firstCall.args[0]).to.be.null;
          expect(spy.firstCall.args[1]).to.be.empty;
          expect(err).to.be.ok;
          expect(projects).to.not.be.ok;
          done();
        });
      });
    });

    describe('call with [] (use promise)', function() {
      it('works', function(done) {
        var spy = this.sinon.spy(function(e, p, cb) { cb(err); });
        server.once(method, spy);

        client.admin.getProjects().catch(function(err) {
          expect(err).to.be.ok;
          done();
        });
      });
    });

    describe('call with [options] (use promise)', function() {
      it('works', function(done) {
        var spy = this.sinon.spy(function(e, p, cb) { cb(err); });
        server.once(method, spy);

        client.admin.getProjects({}).catch(function(err) {
          expect(err).to.be.ok;
          done();
        });
      });
    });
  });

});
