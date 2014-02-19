module.exports = {
  functionName: 'admin.deleteCustomField',
  name: 'backlog.admin.deleteCustomField',
  params: {
    id: { required: true }
  },
  parseParams: function(params) { return [params.id]; }
};


