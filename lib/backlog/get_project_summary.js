module.exports = {
  functionName: 'getProjectSummary',
  name: 'backlog.getProjectSummary', 
  params: {
    projectId: { required: true }
  },
  parseParams: function(params) { return [params.projectId]; }
};
