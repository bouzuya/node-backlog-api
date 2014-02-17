module.exports = {
  functionName: 'deleteVersion',
  name: 'backlog.deleteVersion',
  params: {
    id: { required: true }
  },
  parseParams: function(params) { return [params.id]; }
};

