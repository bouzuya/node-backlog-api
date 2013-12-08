module.exports = {
  functionName: 'getComments',
  name: 'backlog.getComments', 
  params: {
    issueId: { required: true }
  },
  parseParams: function(params) { return [params.issueId]; }
};
