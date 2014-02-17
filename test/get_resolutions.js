// TODO:
// var expect = require('chai').use(require('sinon-chai')).expect;
// var xmlrpc = require('xmlrpc');
// var backlog = require('../');
// 
// describe('backlog.getResolutions', function() {
//   var server;
//   var client;
// 
//   before(function(done) {
//     server = xmlrpc.createServer({ host: 'localhost', port: 3000 });
//     server.on('backlog.getResolutions', function(err, params, callback) {
//       var results = [];
//       results.push({ id: 0, name: '対応済み' });
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
//     client.getResolutions(function(err, resolutions) {
//       if (err) return done(err);
//       expect(resolutions).to.be.an('array');
//       expect(resolutions).to.not.be.empty;
//       expect(resolutions[0]).to.have.property('id');
//       expect(resolutions[0]).to.have.property('name');
//       done();
//     });
//   });
// });
