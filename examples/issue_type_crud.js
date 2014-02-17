#!/usr/bin/env node

// issue type CRUD

var util = require('util');
var backlogApi = require('../');

var backlog = backlogApi();

var projectKey = '*** your project key ***';

var projectId;
var issueTypeId;

backlog.getProject({ projectKey: projectKey })
.then(function(project) { projectId = project.id; })
.then(function() {
  // READ
  return backlog.getIssueTypes({ projectId: projectId });
})
.then(function(issueTypes) { console.log(issueTypes); })
.then(function() {
  // CREATE
  return backlog.addIssueType({
    project_id: projectId,
    name: 'foo',
    color: '#e30000'
  });
})
.then(function(issueType) {
  issueTypeId = issueType.id;
  console.log('added: ' + util.format(issueType));
})
.then(function() { return backlog.getIssueTypes({ projectId: projectId }); })
.then(function(issueTypes) { console.log(issueTypes); })
.then(function() {
  // UPDATE
  return backlog.updateIssueType({
    id: issueTypeId,
    name: 'bar',
    color: '#990000'
  });
})
.then(function(issueType) {
  console.log('updated: ' + util.format(issueType));
})
.then(function() { return backlog.getIssueTypes({ projectId: projectId }); })
.then(function(issueTypes) { console.log(issueTypes); })
.then(function() {
  // DELETE
  return backlog.deleteIssueType({
    id: issueTypeId
  });
})
.then(function(issueType) {
  console.log('deleted: ' + util.format(issueType));
})
.then(function() { return backlog.getIssueTypes({ projectId: projectId }); })
.then(function(issueTypes) { console.log(issueTypes); })
.catch(function(err) { console.error(err); });

