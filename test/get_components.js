require('./helper');

describe('backlog.getComponents', function() {

  var method = 'backlog.getComponents';

  it('works', function(done) {
    var result = [];
    result.push({ id: 1073837877, name: 'カテゴリA' });
    result.push({ id: 1073837878, name: 'カテゴリB' });

    var spy = this.sinon.spy(function(e, p, cb) { cb(null, result); });
    server.once(method, spy);

    var params = { projectId: 5 };
    client.getComponents(params, function(err, components) {
      expect(spy).to.have.been.calledOnce;
      expect(spy.firstCall.args[0]).to.be.null;
      expect(spy.firstCall.args[1]).to.eql([ params.projectId ]);
      expect(components).to.eql(result);
      done();
    });
  });
});
