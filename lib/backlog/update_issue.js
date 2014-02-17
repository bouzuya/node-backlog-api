module.exports = {
  functionName: 'updateIssue',
  name: 'backlog.updateIssue', 
  params: {
    key: { required: true },
    summary: {},
    parent_issue_id: {},
    description: {},
    start_date: {},
    due_date: {},
    estimated_hours: {},
    actual_hours: {},
    issueTypeId: { or: 'issueType' },
    issueType: { or: 'issueType' },
    componentId: { or: 'component' },
    component: { or: 'componentId' },
    versionId: { or: 'version' },
    version: { or: 'versionId' },
    milestoneId: { or: 'milestone' },
    milestone: { or: 'milestoneId' },
    priorityId: { or: 'priority' },
    priority: { or: 'priorityId' },
    assignerId: {},
    resolutionId: {},
    comment: {},
    custom_fields: {}
  }
};
