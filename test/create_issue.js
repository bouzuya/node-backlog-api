require('./helper');

describe('backlog.createIssue', function() {

  var method = 'backlog.createIssue';

  it('works', function(done) {
    var result = {
      id: 73,
      key: 'BLGWEBSITE-213',
      summary: 'トップページのデザイン決定',
      parent_issue_id: 60,
      description: 'トップページのデザイン決定します',
      url: 'https://demo.backlog.jp/BLGWEBSITE-213',
      due_date: '20090821',
      start_date: '20090801',
      estimated_hours: 3.5,
      actual_hours: 5.5,
      issueType: { id: 5, name: 'タスク', color: '#990000' },
      priority: { id: 3, name: '中' },
      resolution: { id: 0, name: '対応済み' },
      status: { id: 2, name: '処理中' },
      components: { id: 1967, name: 'プロモーション' },
      versions: { id: 732, name: 'デザイン案作成', date: '20090910' },
      milestones: { id: 733, name: 'サイトオープン', date: '20091010' },
      created_user: { id: 2, name: 'やまもと' },
      assigner: { id: 3, name: '山田' },
      created_on: '20090731151859',
      updated_on: '20090812132418'
    };

    var spy = this.sinon.spy(function(e, p, cb) { cb(null, result); });
    server.once(method, spy);

    var params = {
      projectId: result.id,
      summary: result.summary
    };
    client.createIssue(params, function(err, issue) {
      expect(spy).to.have.been.calledOnce;
      expect(spy.firstCall.args[0]).to.be.null;
      expect(spy.firstCall.args[1]).to.eql([ params ]);
      expect(err).to.be.null;
      expect(issue).to.eql(result);
      done();
    });
  });
});
