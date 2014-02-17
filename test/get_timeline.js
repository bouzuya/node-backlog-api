// var expect = require('chai').use(require('sinon-chai')).expect;
// var xmlrpc = require('xmlrpc');
// var backlog = require('../');
// 
// describe('backlog.getTimeline', function() {
//   var server;
//   var client;
// 
//   before(function(done) {
//     server = xmlrpc.createServer({ host: 'localhost', port: 3000 });
//     server.on('backlog.getTimeline', function(err, params, callback) {
//       var results = [];
//       results.push({
//         type: { id: 1, name: '課題,更新,コメント' },
//         content: '着手しました', 
//         updated_on: '20101028112030',
//         user: { id: 10, name: 'やまもと' },
//         issue: {
//           id: 73,
//           key: 'BLGWEBSITE-213',
//           summary: 'トップページのデザイン決定',
//           parent_issue_id: 60,
//           description: 'トップページのデザイン決定します',
//           priority: { id: 2, name: '高' }
//         }
//       });
//       callback(null, results);
//     });
//     client = backlog();
//     client._client = function() {
//       return xmlrpc.createClient({
//         url: 'http://localhost:3000/XML-RPC'
//       });
//     };
//     done();
//   });
// 
//   after(function(done) {
//     server.close(done);
//   });
// 
//   it('works', function(done) {
//     client.getTimeline(function(err, timeline) {
//       if (err) throw err;
//       expect(timeline).to.be.an('array');
//       expect(timeline[0]).to.have.property('type');
//       expect(timeline[0].type).to.have.property('id');
//       expect(timeline[0].type).to.have.property('name');
//       expect(timeline[0]).to.have.property('content');
//       expect(timeline[0]).to.have.property('updated_on');
//       expect(timeline[0]).to.have.property('user');
//       expect(timeline[0].user).to.have.property('id');
//       expect(timeline[0].user).to.have.property('name');
//       expect(timeline[0]).to.have.property('issue');
//       expect(timeline[0].issue).to.have.property('id');
//       expect(timeline[0].issue).to.have.property('key');
//       expect(timeline[0].issue).to.have.property('summary');
//       expect(timeline[0].issue).to.have.property('parent_issue_id');
//       expect(timeline[0].issue).to.have.property('description');
//       expect(timeline[0].issue).to.have.property('priority');
//       expect(timeline[0].issue.priority).to.have.property('id');
//       expect(timeline[0].issue.priority).to.have.property('name');
//       done();
//     });
//   });
// });
