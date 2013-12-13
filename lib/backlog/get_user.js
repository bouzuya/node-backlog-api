module.exports = {
  functionName: 'getUser',
  name: 'backlog.getUser', 
  params: {
    id: { required: true }
  },
  parseParams: function(params) { return [params.id]; }
};
