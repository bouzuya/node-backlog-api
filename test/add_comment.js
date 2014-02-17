require('./helper');

describe('backlog.addComment', function() {

  var method = 'backlog.addComment';

  describe('', function() {
    it('works', function(done) {
      var result = {
        id: 1967,
        content: 'コメントです',
        created_on: 20101022153527,
        updated_on: 20101022153527,
        created_user: {
          id: 10,
          name: 'やまもと'
        }
      };

      var spy = this.sinon.spy(function(e, p, cb) { cb(null, result); });
      server.once(method, spy);

      var params = { key: 1967, content: 'コメントです' };
      client.addComment(params, function(err, issue) {
        expect(spy).to.have.been.calledOnce;
        expect(spy.firstCall.args[0]).to.be.null;
        expect(spy.firstCall.args[1]).to.deep.equal([params]);
        expect(err).to.be.null;
        expect(issue).to.deep.equal(result);
        done();
      });
    });
  });

});

