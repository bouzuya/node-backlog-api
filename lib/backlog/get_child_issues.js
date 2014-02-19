module.exports = {
  functionName: 'getChildIssues',
  name: 'backlog.getChildIssues', 
  params: {
    parent_issue_id: { required: true }
  },
  parseParams: function(params) { return [params.parent_issue_id]; }
};
