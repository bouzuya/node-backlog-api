module.exports = {
  functionName: 'getVersions',
  name: 'backlog.getVersions', 
  params: {
    projectId: { required: true }
  },
  parseParams: function(params) { return [params.projectId]; }
};
