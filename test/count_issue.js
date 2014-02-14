require('./helper');

describe('backlog.countIssue', function() {

  var method = 'backlog.countIssue';

  it('works', function(done) {
    var result = 64;

    var spy = this.sinon.spy(function(e, p, cb) { cb(null, result); });
    server.once(method, spy);

    var params = { projectId: 5 };
    client.countIssue(params, function(err, count) {
      expect(spy).to.have.been.calledOnce;
      expect(spy.firstCall.args[0]).to.be.null;
      expect(spy.firstCall.args[1]).to.eql([ params ]);
      expect(err).to.be.null;
      expect(count).to.equal(result);
      done();
    });
  });

});

