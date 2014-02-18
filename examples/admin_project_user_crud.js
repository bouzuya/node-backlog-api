#!/usr/bin/env node

// admin project user CRUD 

var util = require('util');
var backlogApi = require('../');

var backlog = backlogApi();

var projectKey = '*** your project key ***';

var projectId;
var userId1;
var userId2;
var userId3;

backlog.getProject({ projectKey: projectKey })
.then(function(project) { projectId = project.id; })
.then(function() {
  // READ
  return backlog.admin.getProjectUsers({ project_id: projectId });
})
.then(function(users) { console.log(users); })
.then(function() {
  return backlog.admin.addUser({
    user_id: 'user1',
    password_md5: '5f4dcc3b5aa765d61d8327deb882cf99',
    name: 'user1',
    mail_address: 'bouzuya+backlogapi@gmail.com',
    role: 'normal-user'
  });
})
.then(function(user) {
  userId1 = user.id;
  console.log('created: ' + util.inspect(user));
})
.then(function() {
  return backlog.admin.addUser({
    user_id: 'user2',
    password_md5: '5f4dcc3b5aa765d61d8327deb882cf99',
    name: 'user2',
    mail_address: 'bouzuya+backlogapi@gmail.com',
    role: 'normal-user'
  });
})
.then(function(user) {
  userId2 = user.id;
  console.log('created: ' + util.inspect(user));
})
.then(function() {
  return backlog.admin.addUser({
    user_id: 'user3',
    password_md5: '5f4dcc3b5aa765d61d8327deb882cf99',
    name: 'user3',
    mail_address: 'bouzuya+backlogapi@gmail.com',
    role: 'normal-user'
  });
})
.then(function(user) {
  userId3 = user.id;
  console.log('created: ' + util.inspect(user));
})
.then(function() {
  return backlog.admin.addProjectUser({
    project_id: projectId,
    user_id: userId1
  });
})
.then(function(projectUsers) {
  console.log('created');
  console.log(projectUsers);
})
.then(function() {
  // UPDATE
  return backlog.admin.updateProjectUsers({
    project_id: projectId,
    user_id: [userId1, userId2, userId3]
  });
})
.then(function(projectUsers) {
  console.log('updated');
  console.log(projectUsers);
})
.then(function() {
  // DELETE
  return backlog.admin.deleteProjectUser({
    project_id: projectId,
    user_id: userId1
  });
})
.then(function(projectUsers) {
  console.log('deleted');
  console.log(projectUsers);
})
.then(function() {
  return backlog.admin.deleteProjectUser({
    project_id: projectId,
    user_id: userId2
  });
})
.then(function(projectUsers) {
  console.log('deleted');
  console.log(projectUsers);
})
.then(function() {
  return backlog.admin.deleteProjectUser({
    project_id: projectId,
    user_id: userId3
  });
})
.then(function(projectUsers) {
  console.log('deleted');
  console.log(projectUsers);
})
.then(function() {
  return backlog.admin.deleteUser({ id: userId1 });
}).then(function(user) {
  console.log('deleted: ' + util.inspect(user));
})
.then(function() {
  return backlog.admin.deleteUser({ id: userId2 });
}).then(function(user) {
  console.log('deleted: ' + util.inspect(user));
})
.then(function() {
  return backlog.admin.deleteUser({ id: userId3 });
}).then(function(user) {
  console.log('deleted: ' + util.inspect(user));
})
.catch(function(err) { console.error(err); });

