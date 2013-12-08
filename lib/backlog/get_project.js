// TODO: getProject projectKey
module.exports = {
  functionName: 'getProject',
  name: 'backlog.getProject', 
  params: {
    projectId: { required: true }
  },
  parseParams: function(params) { return [params.projectId]; }
};
