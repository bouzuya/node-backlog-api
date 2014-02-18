#!/usr/bin/env node

// component CRUD 

var util = require('util');
var backlogApi = require('../');

var backlog = backlogApi();

var projectKey = '*** your project key ***';

var projectId;
var componentId;

backlog.getProject({ projectKey: projectKey })
.then(function(project) { projectId = project.id; })
.then(function() {
  // READ
  return backlog.getComponents({ projectId: projectId });
})
.then(function(components) { console.log(components); })
.then(function() {
  // CREATE
  return backlog.addComponent({
    project_id: projectId,
    name: 'foo'
  });
})
.then(function(component) {
  componentId = component.id;
  console.log('added: ' + util.inspect(component));
})
.then(function() { return backlog.getComponents({ projectId: projectId }); })
.then(function(components) { console.log(components); })
.then(function() {
  // UPDATE
  return backlog.updateComponent({
    id: componentId,
    name: 'bar'
  });
})
.then(function(component) {
  console.log('updated: ' + util.inspect(component));
})
.then(function() { return backlog.getComponents({ projectId: projectId }); })
.then(function(components) { console.log(components); })
.then(function() {
  // DELETE
  return backlog.deleteComponent({ id: componentId });
})
.then(function(component) {
  console.log('deleted: ' + util.inspect(component));
})
.then(function() { return backlog.getComponents({ projectId: projectId }); })
.then(function(components) { console.log(components); })
.catch(function(err) { console.error(err); });

