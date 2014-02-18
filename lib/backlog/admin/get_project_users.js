module.exports = {
  functionName: 'admin.getProjectUsers',
  name: 'backlog.admin.getProjectUsers', 
  params: {
    project_id: { required: true }
  },
  parseParams: function(params) { return [params.project_id]; }
};
