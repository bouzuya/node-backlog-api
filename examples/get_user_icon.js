#!/usr/bin/env node

// backlog.getUserIcon

var fs = require('fs');
var util = require('util');
var backlogApi = require('../');

var backlog = backlogApi();

var projectKey = '*** your project key ***';

var projectId;
var userId;

backlog.getProject({ projectKey: projectKey })
.then(function(project) { projectId = project.id; })
.then(function() { return backlog.getUsers({ projectId: projectId }); })
.then(function(users) {
  userId = users[0].id;
  console.log(users);
})
.then(function() { return backlog.getUserIcon({ id: userId }); })
.then(function(user) {
  console.log(user);
  // var ext = user.content_type.split('/')[1];
  // fs.writeFileSync('./get_user_icon.' + ext, user.data);
})
.catch(function(err) { console.error(err); });

