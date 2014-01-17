var expect = require('expect.js');
var xmlrpc = require('xmlrpc');
var backlog = require('../');

describe('backlog.getCustomFields', function() {
  var server;
  var client;
  var projectId;

  beforeEach(function(done) {
    projectId = 1073747118;
    server = xmlrpc.createServer({
      host: 'localhost',
      port: 3000
    }, function() {
      client = backlog();
      client._client = function() {
        return xmlrpc.createClient({
          url: 'http://localhost:3000/XML-RPC'
        });
      };
      done();
    });
  });

  afterEach(function(done) {
    server.close(done);
  });

  describe('type_id=5', function() {

    before(function(done) {
      server.on('backlog.getCustomFields', function(err, params, callback) {
        var res = [];
        res.push({
          id: 4,
          type_id: 5,
          name: 'OS',
          description: '現象が発生したOS',
          required: false,
          issueTypes: [ { id: 5, name: 'バグ', color: '#990000' } ],
          items: [ { id: 1, name: 'Windows' } ]
        });
        callback(null, res);
      });
    });

    it('works', function(done) {
      client.getCustomFields({
        projectId: projectId
      }, function(err, customFields) {
        expect(err).to.not.be.ok;
        expect(customFields).to.be.an(Array);
        var field = customFields[0];
        // common property
        expect(field).to.have.property('id');
        expect(field).to.have.property('type_id');
        expect(field).to.have.property('name');
        expect(field).to.have.property('description');
        expect(field).to.have.property('required');
        expect(field).to.have.property('issueTypes');
        done();
      });
    });

    it('"projectId" is required', function(done) {
      client.getCustomFields({}, function(err, customFields) {
        expect(err).to.be.an(Error);
        done();
      });
    });

  });

});
