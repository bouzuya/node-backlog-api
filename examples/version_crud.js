#!/usr/bin/env node

// version CRUD 

var util = require('util');
var backlogApi = require('../');

var backlog = backlogApi();

var projectKey = '*** your project key ***';

var projectId;
var versionId;

backlog.getProject({ projectKey: projectKey })
.then(function(project) { projectId = project.id; })
.then(function() {
  // READ
  return backlog.getVersions({ projectId: projectId });
})
.then(function(versions) { console.log(versions); })
.then(function() {
  // CREATE
  return backlog.addVersion({
    project_id: projectId,
    name: 'foo'
  });
})
.then(function(version) {
  versionId = version.id;
  console.log('added: ' + util.inspect(version));
})
.then(function() { return backlog.getVersions({ projectId: projectId }); })
.then(function(versions) { console.log(versions); })
.then(function() {
  // UPDATE
  return backlog.updateVersion({
    id: versionId,
    name: 'bar'
  });
})
.then(function(version) {
  console.log('updated: ' + util.inspect(version));
})
.then(function() { return backlog.getVersions({ projectId: projectId }); })
.then(function(versions) { console.log(versions); })
.then(function() {
  // DELETE
  return backlog.deleteVersion({ id: versionId });
})
.then(function(version) {
  console.log('deleted: ' + util.inspect(version));
})
.then(function() { return backlog.getVersions({ projectId: projectId }); })
.then(function(versions) { console.log(versions); })
.catch(function(err) { console.error(err); });

