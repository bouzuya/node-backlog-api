var util = require('util');
var backlogApi = require('../');

// $ export BACKLOG_SPACE_ID='backlog space id'
// $ export BACKLOG_USERNAME='backlog username'
// $ export BACKLOG_PASSWORD='backlog password'

var backlog = backlogApi();
backlog.updateIssue({ key: 'BAPI-142', summary: 'new-sumary' }).then(function(issue) {
  console.log(issue);
}).catch(function(err) {
  console.error(err);
});

