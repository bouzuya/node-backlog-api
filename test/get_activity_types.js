require('./helper');

describe('backlog.getActivityTypes', function() {

  var method = 'backlog.getActivityTypes';

  it('works', function(done) {
    var result = [];
    result.push({ id: 1, name: '課題' });

    var spy = this.sinon.spy(function(e, p, cb) { cb(null, result); });
    server.once(method, spy);

    client.getActivityTypes(function(err, types) {
      expect(spy).to.have.been.calledOnce;
      expect(spy.firstCall.args[0]).to.be.null;
      expect(spy.firstCall.args[1]).to.be.empty;
      expect(err).to.be.null;
      expect(types).to.eql(result);
      done();
    });
  });

});
