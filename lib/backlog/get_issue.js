module.exports = {
  functionName: 'getIssue',
  name: 'backlog.getIssue', 
  params: {
    issueId: { or: 'issueKey', required: true },
    issueKey: { or: 'issueId', required: true }
  },
  parseParams: function(params) { return [(params.issueId || params.issueKey)]; }
};
