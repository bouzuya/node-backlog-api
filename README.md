backlog-api
==============================================================================

[Backlog API](http://backlog.jp/api/) wrapper for Node.js

Installation
------------------------------------------------------------------------------

    $ npm install backlog-api

Example
------------------------------------------------------------------------------

    var backlogApi = require('backlog-api');
    
    var backlog = backlogApi('space', 'user', 'pass');
    backlog.getProjects(function(err, projects) {
      console.log(projects);
    });
    backlog.findIssue({
      projectId: 1,
      statusId: [1, 2, 3],
    }, function(err, issues) {
      console.log(issues);
    });

Todo
------------------------------------------------------------------------------

- createIssue
- updateIssue
- switchStatus
- addComment
- addIssueType
- updateIssueType
- deleteIssueType
- addVersion
- updateVersion
- deleteVersion
- addComponent
- updateComponent
- deleteComponent
- getTimeline
- getProjectSummaries
- getUser
- getUserIcon
- getActivityTypes
- getStatuses
- getResolutions
- getPriorities
- getCustomFields
- getChildIssues
- admin.getUsers
- admin.getUser
- admin.updateUser
- admin.deleteUser
- admin.getProjects
- admin.addProject
- admin.updateProject
- admin.deleteProject
- admin.getProjectUsers
- admin.addProjectUser
- admin.updateProjectUsers
- admin.deleteProjectUser
- admin.addCustomField
- admin.updateCustomField
- admin.deleteCustomField

