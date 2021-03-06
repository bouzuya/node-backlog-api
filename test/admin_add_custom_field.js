require('./helper');

describe('backlog.admin.addCustomField', function() {

  var method = 'backlog.admin.addCustomField';

  describe('', function() {
    it('works', function(done) {
      var result = {
        id: 12,
        type_id: 5,
        name: 'OS',
        description: '',
        required: true,
        issueTypes: [ { id: 1, color: '#990000', name: 'バグ' } ],
        items: [
          { id: 0, name: 'Windows' },
          { id: 1, name: 'Mac' },
          { id: 2, name: 'Linux' }
        ]
      };

      var spy = this.sinon.spy(function(e, p, cb) { cb(null, result); });
      server.once(method, spy);

      var params = {
        projectId: 1,
        typeId: 5,
        name: 'OS',
        issueTypes: 1
      };
      client.admin.addCustomField(params, function(err, issue) {
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

