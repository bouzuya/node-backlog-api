module.exports = {
  functionName: 'getCustomFields',
  name: 'backlog.getCustomFields', 
  params: {
    projectId: { required: true },
    issueTypeId: { or: 'issueType' },
    issueType: { or: 'issueTypeId' }
  }
};
