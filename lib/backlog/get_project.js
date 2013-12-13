module.exports = {
  functionName: 'getProject',
  name: 'backlog.getProject', 
  params: {
    projectId: { or: 'projectKey', required: true },
    projectKey: { or: 'projectId', required: true }
  },
  parseParams: function(params) {
    return [params.projectId || params.projectKey];
  }
};
