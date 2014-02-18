module.exports = {
  functionName: 'admin.deleteUser',
  name: 'backlog.admin.deleteUser', 
  params: {
    id: { required: true }
  },
  parseParams: function(params) { return [params.id]; }
};
