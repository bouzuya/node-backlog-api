// TODO: getIssue issueKey
module.exports = {
  functionName: 'getIssue',
  name: 'backlog.getIssue', 
  params: {
    issueId: { required: true }
  },
  parseParams: function(params) { return [params.issueId]; }
};
