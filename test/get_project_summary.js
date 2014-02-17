// TODO:
// var expect = require('chai').use(require('sinon-chai')).expect;
// var xmlrpc = require('xmlrpc');
// var backlog = require('../');
// 
// describe('backlog.getProjectSummary', function() {
//   var server;
//   var client;
//   var projectId;
// 
//   before(function(done) {
//     projectId = 1073783536;
//     server = xmlrpc.createServer({ host: 'localhost', port: 3000 });
//     server.on('backlog.getProjectSummary', function(err, params, callback) {
//       callback(null, { id: 1073783536,
//         milestones:
//         [ { id: 1073803170,
//           name: '0.4.0',
//         due_date: '20130105',
//         statuses: [Object] },
//         { id: 1073804377,
//           name: '0.3.1',
//         due_date: '20130103',
//         statuses: [Object] } ],
//         name: 'Backlog API',
//         statuses:
//         [ { id: 1, count: 10, name: '未対応' },
//         { id: 2, count: 0, name: '処理中' },
//         { id: 3, count: 0, name: '処理済み' },
//         { id: 4, count: 84, name: '完了' } ],
//         url: 'https://bouzuya.backlog.jp/projects/BAPI',
//         key: 'BAPI'
//       });
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
//     client.getProjectSummary({
//       projectId: projectId
//     }, function(err, summary) {
//       if (err) throw err;
//       expect(summary).to.have.property('id');
//       expect(summary).to.have.property('milestones');
//       expect(summary).to.have.property('name');
//       expect(summary).to.have.property('statuses');
//       expect(summary).to.have.property('url');
//       expect(summary).to.have.property('key');
//       done();
//     });
//   });
// });
