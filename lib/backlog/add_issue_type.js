module.exports = {
  functionName: 'addIssueType',
  name: 'backlog.addIssueType',
  params: {
    project_id: { required: true },
    name: { required: true },
    color: { required: true },
  }
};
