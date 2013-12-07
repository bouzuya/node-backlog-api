var xmlrpc = require('xmlrpc');

var Backlog = function(spaceId, username, password) {
  this.client = xmlrpc.createSecureClient({
    url: 'https://' + spaceId + '.backlog.jp/XML-RPC',
    basic_auth: { user: username, pass: password }
  });
};

Backlog.prototype.getProjects = function(callback) {
  this.client.methodCall('backlog.getProjects', [], callback);
};

// TODO: getProject projectKey
Backlog.prototype.getProject = function(projectId, callback) {
  this.client.methodCall('backlog.getProject', [projectId], callback);
};

Backlog.prototype.getComponents = function(projectId, callback) {
  this.client.methodCall('backlog.getComponents', [projectId], callback);
};

Backlog.prototype.getVersions = function(projectId, callback) {
  this.client.methodCall('backlog.getVersions', [projectId], callback);
};

Backlog.prototype.getUsers = function(projectId, callback) {
  this.client.methodCall('backlog.getUsers', [projectId], callback);
};

Backlog.prototype.getIssueTypes = function(projectId, callback) {
  this.client.methodCall('backlog.getIssueTypes', [projectId], callback);
};

// TODO: getIssue issueKey
// TODO: getIssue issueId
// TODO: getComments

Backlog.prototype.countIssue = function(params, callback) {
  this.client.methodCall('backlog.countIssue', [params], callback);
};

// TODO: findIssue
// TODO: createIssue
// TODO: updateIssue
// TODO: switchStatus
// TODO: addComment
// TODO: addIssueType
// TODO: updateIssueType
// TODO: deleteIssueType
// TODO: addVersion
// TODO: updateVersion
// TODO: deleteVersion
// TODO: addComponent
// TODO: updateComponent
// TODO: deleteComponent
// TODO: getTimeline
// TODO: getProjectSummary
// TODO: getProjectSummaries
// TODO: getUser
// TODO: getUserIcon
// TODO: getActivityTypes
// TODO: getStatuses
// TODO: getResolutions
// TODO: getPriorities
// TODO: getCustomFields
// TODO: getChildIssues
// TODO: admin.getUsers
// TODO: admin.getUser
// TODO: admin.updateUser
// TODO: admin.deleteUser
// TODO: admin.getProjects
// TODO: admin.addProject
// TODO: admin.updateProject
// TODO: admin.deleteProject
// TODO: admin.getProjectUsers
// TODO: admin.addProjectUser
// TODO: admin.updateProjectUsers
// TODO: admin.deleteProjectUser
// TODO: admin.addCustomField
// TODO: admin.updateCustomField
// TODO: admin.deleteCustomField

module.exports = function(spaceId, username, password) {
  return new Backlog(spaceId, username, password);
};

