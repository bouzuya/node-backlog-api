module.exports = {
  functionName: 'admin.deleteProject',
  name: 'backlog.admin.deleteProject',
  params: {
    id: { required: true }
  },
  parseParams: function(params) { return [params.id]; }
};

