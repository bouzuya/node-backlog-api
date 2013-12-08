module.exports = {
  functionName: 'getComponents',
  name: 'backlog.getComponents', 
  params: {
    projectId: { required: true }
  },
  parseParams: function(params) { return [params.projectId]; }
};
