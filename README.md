backlog-api
==============================================================================

[Backlog API](http://backlog.jp/api/) wrapper for Node.js

[![NPM](https://nodei.co/npm/backlog-api.png)](https://nodei.co/npm/backlog-api/)

[![Build Status](https://travis-ci.org/bouzuya/node-backlog-api.png?branch=master)](https://travis-ci.org/bouzuya/node-backlog-api)
[![Coverage Status](https://coveralls.io/repos/bouzuya/node-backlog-api/badge.png?branch=master)](https://coveralls.io/r/bouzuya/node-backlog-api?branch=master)


Installation
------------------------------------------------------------------------------

    $ npm install backlog-api

Usage
------------------------------------------------------------------------------

    var backlogApi = require('backlog-api');
    
    var backlog = backlogApi('space', 'user', 'pass');
    
    backlog.findIssue({
      projectId: 1,
      statusId: [1, 2, 3],
    }, function(err, issues) {
      console.log(issues);
    });

Example
------------------------------------------------------------------------------

    // show 'BAPI' project, 'bouzuya' user, 'imcomplete' issues.
    var backlogApi = require('backlog-api');
    
    // set env
    // process.env.BACKLOG_SPACE_ID
    // process.env.BACKLOG_USERNAME
    // process.env.BACKLOG_PASSWORD
    var backlog = backlogApi();
    
    // get project id 
    backlog.getProjects(function(err, projects) {
      if (err) throw err;
      var projectId = projects.filter(function(p) {
        return p.key === 'BAPI';
      })[0].id;
      
      // get user id
      backlog.getUsers({
        projectId: projectId
      }, function(err, users) {
        if (err) throw err;
        var userId = users.filter(function(u) {
          return u.name === 'bouzuya'
        })[0].id;
        
        // get issues
        backlog.findIssue({
          projectId: projectId,
          assignerId: userId,
          statusId: [1, 2, 3]
        }, function(err, issues) {
          console.log(issues);
        });
      });
    });

Supported Methods
------------------------------------------------------------------------------

- backlog.getProjects
- backlog.getProject (projectId)
- backlog.getProject (projectKey)
- backlog.getComponents
- backlog.getVersions
- backlog.getUsers
- backlog.getIssue (issueId)
- backlog.getIssue (issueKey)
- backlog.getIssueTypes
- backlog.getComments
- backlog.countIssue
- backlog.findIssue
- backlog.createIssue
- backlog.updateIssue
- backlog.getTimeline
- backlog.getProjectSummary
- backlog.getProjectSummaries
- backlog.getUser
- backlog.getActivityTypes
- backlog.getStatuses
- backlog.getResolutions
- backlog.getPriorities
- backlog.getCustomFields


Todo
------------------------------------------------------------------------------

- backlog.switchStatus
- backlog.addComment
- backlog.addIssueType
- backlog.updateIssueType
- backlog.deleteIssueType
- backlog.addVersion
- backlog.updateVersion
- backlog.deleteVersion
- backlog.addComponent
- backlog.updateComponent
- backlog.deleteComponent
- backlog.getUserIcon
- backlog.getChildIssues
- backlog.admin.getUsers
- backlog.admin.getUser
- backlog.admin.updateUser
- backlog.admin.deleteUser
- backlog.admin.getProjects
- backlog.admin.addProject
- backlog.admin.updateProject
- backlog.admin.deleteProject
- backlog.admin.getProjectUsers
- backlog.admin.addProjectUser
- backlog.admin.updateProjectUsers
- backlog.admin.deleteProjectUser
- backlog.admin.addCustomField
- backlog.admin.updateCustomField
- backlog.admin.deleteCustomField

