module.exports = {
  functionName: 'getUserIcon',
  name: 'backlog.getUserIcon', 
  params: {
    id: { required: true }
  },
  parseParams: function(params) { return [params.id]; }
};
