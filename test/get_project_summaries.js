var expect = require('expect.js');
var xmlrpc = require('xmlrpc');
var backlog = require('../');

describe('backlog.getProjectSummaries', function() {
  var server;
  var client;

  before(function(done) {
    server = xmlrpc.createServer({ host: 'localhost', port: 3000 });
    server.on('backlog.getProjectSummaries', function(err, params, callback) {
      var results = [];
      results.push({
        id: 2,
        name: 'Webサイト構築',
        key: 'BLGWEBSITE',
        url: 'https://demo.backlog.jp/BLGWEBSITE',
        statuses: [{ id: 1, name: '処理中', count: 10 }],
        milestones: [{ id: 301, name: '正式版1.0', due_date: '20101028', statuses: [{ id: 3, name: '処理済み', count: 5 }] }],
        current_milestone: { id: 301, name: '正式版1.0', due_date: '20101028', burn_down_chart: 'xxxxx' } 
      });
      callback(null, results);
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

  it('works', function(done) {
    client.getProjectSummaries(function(err, summaries) {
      if (err) return done(err);
      expect(summaries).to.be.an(Array)
      expect(summaries[0]).to.have.property('id');
      expect(summaries[0]).to.have.property('name');
      expect(summaries[0]).to.have.property('key');
      expect(summaries[0]).to.have.property('url');
      expect(summaries[0]).to.have.property('statuses');
      expect(summaries[0].statuses).to.be.an(Array);
      expect(summaries[0].statuses[0]).to.have.property('id');
      expect(summaries[0].statuses[0]).to.have.property('name');
      expect(summaries[0].statuses[0]).to.have.property('count');
      expect(summaries[0]).to.have.property('milestones');
      expect(summaries[0].milestones).to.be.an(Array);
      expect(summaries[0].milestones[0]).to.have.property('id');
      expect(summaries[0].milestones[0]).to.have.property('name');
      expect(summaries[0].milestones[0]).to.have.property('due_date');
      expect(summaries[0].milestones[0]).to.have.property('statuses');
      expect(summaries[0].milestones[0].statuses).to.be.an(Array);
      expect(summaries[0].milestones[0].statuses[0]).to.have.property('id');
      expect(summaries[0].milestones[0].statuses[0]).to.have.property('name');
      expect(summaries[0].milestones[0].statuses[0]).to.have.property('count');
      expect(summaries[0]).to.have.property('current_milestone');
      expect(summaries[0].current_milestone).to.have.property('id');
      expect(summaries[0].current_milestone).to.have.property('name');
      expect(summaries[0].current_milestone).to.have.property('due_date');
      expect(summaries[0].current_milestone).to.have.property('burn_down_chart');
      done();
    });
  });
});
