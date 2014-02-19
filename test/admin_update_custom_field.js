require('./helper');

describe('backlog.admin.updateCustomField', function() {

  var method = 'backlog.admin.updateCustomField';

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
        id: 12,
        name: 'OS',
        issueTypes: 1
      };
      client.admin.updateCustomField(params, function(err, field) {
        expect(spy).to.have.been.calledOnce;
        expect(spy.firstCall.args[0]).to.be.null;
        expect(spy.firstCall.args[1]).to.deep.equal([params]);
        expect(err).to.be.null;
        expect(field).to.deep.equal(result);
        done();
      });
    });
  });

});

