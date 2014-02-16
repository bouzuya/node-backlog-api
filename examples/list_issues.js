var util = require('util');
var backlogApi = require('../');

// $ export BACKLOG_SPACE_ID='backlog space id'
// $ export BACKLOG_USERNAME='backlog username'
// $ export BACKLOG_PASSWORD='backlog password'

var backlog = backlogApi();
backlog.getProject({ projectKey: 'BAPI' }).then(function(project) {
  backlog.findIssue({ projectId: project.id }).then(function(issues) {
    issues.forEach(function(issue) {
      var format = '[%s] %s %s';
      var s = util.format(format, issue.key, issue.summary, issue.url);
      console.log(s);
    });
  });
});

