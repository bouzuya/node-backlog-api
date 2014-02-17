module.exports = {
  functionName: 'deleteComponent',
  name: 'backlog.deleteComponent',
  params: {
    id: { required: true }
  },
  parseParams: function(params) { return [params.id]; }
};

