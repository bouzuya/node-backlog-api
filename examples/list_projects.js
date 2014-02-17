var util = require('util');
var backlogApi = require('../');

// $ export BACKLOG_SPACE_ID='backlog space id'
// $ export BACKLOG_USERNAME='backlog username'
// $ export BACKLOG_PASSWORD='backlog password'

var backlog = backlogApi();

backlog.getProjects().then(function(projects) {
  projects.forEach(function(project) {
    var format = '[%s] %s %s';
    var s = util.format(format, project.key, project.name, project.url);
    console.log(s);
  });
}).catch(function(err) {
  console.error(err);
});

