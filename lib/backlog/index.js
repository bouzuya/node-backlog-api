var methods = [];
// method = {
//   functionName: 'foo',
//   name: 'bar',
//   params: {
//     paramName1: { required: true },
//     paramName2: {},
//   },
//   parseParams: function(params) {
//     return [];
//   }
// }
methods.push(require('./get_projects'));
methods.push(require('./get_project'));
methods.push(require('./get_components'));
methods.push(require('./get_versions'));
methods.push(require('./get_users'));
methods.push(require('./get_issue_types'));
methods.push(require('./get_issue'));
methods.push(require('./get_comments'));
methods.push(require('./count_issue'));
methods.push(require('./find_issue'));
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

methods.forEach(function(method) {
  method.parseParams = method.parseParams ? method.parseParams : function(params) {
    return Object.keys(params).length > 0 ? [params] : [];
  };
});

module.exports = methods;

