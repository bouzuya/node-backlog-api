module.exports = {
  functionName: 'createIssue',
  name: 'backlog.createIssue', 
  params: {
    projectId: { required: true },
    summary: { required: true },
    parent_issue_id: {},
    description: {},
    url: {},
    due_date: {},
    start_date: {},
    estimated_hours: {},
    actual_hours: {},
    issueType: { or: 'issueTypeId' },
    issueTypeId: { or: 'issueType' },
    priority: {},
    resolution: {},
    status: {},
    componentId: { or: 'component' },
    component: { or: 'componentId' },
    versions: {},
    milestones: {},
    created_user: {},
    assigner: {},
    created_on: {},
    updated_on: {}
  }
};
