var backlogApi = require('../');

// $ export BACKLOG_SPACE_ID='backlog space id'
// $ export BACKLOG_USERNAME='backlog username'
// $ export BACKLOG_PASSWORD='backlog password'

var backlog = backlogApi();

var issueKey = 'BAPI-124';
var comment = 'foobar';

backlog.addComment({
  key: issueKey,
  content: comment
}).then(function(issue) {
  console.log(issue);
});
