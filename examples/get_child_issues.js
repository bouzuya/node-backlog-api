#!/usr/bin/env node

var backlogApi = require('../');

var backlog = backlogApi();

var issueKey = 'NBAPI-1';

backlog.getIssue({ issueKey: issueKey })
.then(function(issue) {
  return backlog.getChildIssues({ parent_issue_id: issue.id });
})
.then(function(issues) {
  console.log(issues);
})
.catch(function(err) {
  console.error(err);
});

