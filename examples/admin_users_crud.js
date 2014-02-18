#!/usr/bin/env node

// admin users CRUD

var util = require('util');
var backlogApi = require('../');

var userId;

var backlog = backlogApi();

// READ
backlog.admin.getUsers()
.then(function(users) { console.log(users); })
.then(function() {
  // CREATE
  return backlog.admin.addUser({
    user_id: 'yamamoto',
    password_md5: '5f4dcc3b5aa765d61d8327deb882cf99',
    name: 'やまもと',
    mail_address: 'support@backlog.jp',
    role: 'normal-user'
  });
})
.then(function(user) {
  userId = user.id;
  console.log('created: ' + util.inspect(user));
})
.then(function() { return backlog.admin.getUsers(); })
.then(function(users) { console.log(users); })
.then(function() {
  // UPDATE
  return backlog.admin.updateUser({
    id: userId,
    name: 'たろう'
  });
})
.then(function(user) {
  console.log('updated: ' + util.inspect(user));
})
.then(function() { return backlog.admin.getUsers(); })
.then(function(users) { console.log(users); })
.then(function() {
  // DELETE 
  return backlog.admin.deleteUser({ id: userId });
})
.then(function(user) {
  console.log('deleted: ' + util.inspect(user));
})
.then(function() { return backlog.admin.getUsers(); })
.then(function(users) { console.log(users); })
.catch(function(err) { console.error(err); });

