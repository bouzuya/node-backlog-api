module.exports = {
  functionName: 'getUsers',
  name: 'backlog.getUsers', 
  params: {
    projectId: { required: true }
  },
  parseParams: function(params) { return [params.projectId]; }
};
