module.exports = {
  functionName: 'getIssueTypes',
  name: 'backlog.getIssueTypes', 
  params: {
    projectId: { required: true }
  },
  parseParams: function(params) { return [params.projectId]; }
};
