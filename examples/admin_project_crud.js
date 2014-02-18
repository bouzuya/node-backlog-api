#!/usr/bin/env node

// project CRUD 

var util = require('util');
var backlogApi = require('../');

var backlog = backlogApi();

var projectId;

// READ
backlog.admin.getProjects()
.then(function(projects) {
  console.log(projects);
})
.then(function() {
  // CREATE
  return backlog.admin.addProject({
    name: '新規開発プロジェクト',
    key: 'STWK'
  });
})
.then(function(project) {
  projectId = project.id;
  console.log('created: ' + util.inspect(project));
})
.then(function() { return backlog.admin.getProjects(); })
.then(function(projects) { console.log(projects); })
.then(function() {
  // UPDATE
  return backlog.admin.updateProject({
    id: projectId,
    name: 'foo'
  });
})
.then(function(component) {
  console.log('updated: ' + util.inspect(component));
})
.then(function() { return backlog.admin.getProjects(); })
.then(function(projects) { console.log(projects); })
.then(function() {
  // DELETE
  return backlog.admin.deleteProject({ id: projectId });
})
.then(function(project) {
  console.log('deleted: ' + util.inspect(project));
})
.then(function() { return backlog.admin.getProjects(); })
.then(function(projects) { console.log(projects); })
.catch(function(err) { console.error(err); });

