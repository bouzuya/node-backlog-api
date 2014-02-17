var backlogApi = require('../');

// $ export BACKLOG_SPACE_ID='backlog space id'
// $ export BACKLOG_USERNAME='backlog username'
// $ export BACKLOG_PASSWORD='backlog password'

var backlog = backlogApi();

var issueKey = 'BAPI-124';

backlog.getIssue({ issueKey: issueKey }).then(function(issue) {
  backlog.getComments({ issueId: issue.id }).then(function(comments) {
    console.log(comments);
  });
});

