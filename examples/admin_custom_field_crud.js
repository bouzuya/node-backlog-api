#!/usr/bin/env node

// custom field CRUD 

var util = require('util');
var backlogApi = require('../');

var backlog = backlogApi();

var projectKey = '*** your project key ***';
var projectId;
var issueTypeIds;
var fieldId;

backlog.getProject({ projectKey: projectKey })
.then(function(project) {
  projectId = project.id;
})
.then(function() {
  // READ
  return backlog.getCustomFields({ projectId: projectId });
})
.then(function(fields) {
  console.log(fields);
})
.then(function() {
  return backlog.getIssueTypes({ projectId: projectId });
})
.then(function(issueTypes) {
  issueTypeIds = issueTypes.map(function(i) { return i.id; });
})
.then(function() {
  // CREATE
  return backlog.admin.addCustomField({
    projectId: projectId,
    typeId: 3,
    name: 'foo',
    issueTypes: issueTypeIds,
    min: 0.0,
    max: 100.0,
    initial_value: 50.0,
    unit: '%'
  });
})
.then(function(field) {
  fieldId = field.id;
  console.log('created: ' + util.inspect(field));
})
.then(function() {
  return backlog.getCustomFields({ projectId: projectId });
})
.then(function(fields) { console.log(fields); })
.then(function() {
  // UPDATE
  return backlog.admin.updateCustomField({
    id: fieldId,
    name: 'bar',
    issueTypes: issueTypeIds,
    min: 20.0,
    max: 80.0,
    initial_value: 50.0,
    unit: '%'
  });
})
.then(function(field) {
  console.log('updated: ' + util.inspect(field));
})
.then(function() {
  return backlog.getCustomFields({ projectId: projectId });
})
.then(function(fields) { console.log(fields); })
.then(function() {
  // DELETE
  return backlog.admin.deleteCustomField({ id: fieldId });
})
.then(function(field) {
  console.log('deleted: ' + util.inspect(field));
})
.then(function() {
  return backlog.getCustomFields({ projectId: projectId });
})
.then(function(fields) { console.log(fields); })
.catch(function(err) { console.error(err); });

