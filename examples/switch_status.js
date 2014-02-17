var util = require('util');
var backlogApi = require('../');

// $ export BACKLOG_SPACE_ID='backlog space id'
// $ export BACKLOG_USERNAME='backlog username'
// $ export BACKLOG_PASSWORD='backlog password'

var backlog = backlogApi();
backlog.switchStatus({ key: 'BAPI-125', statusId: 4 }).then(function(issue) {
  console.log(issue);
}).catch(function(err) {
  console.error(err);
});


