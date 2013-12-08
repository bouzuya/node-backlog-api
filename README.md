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

