module.exports = {
  functionName: 'findIssue',
  name: 'backlog.findIssue', 
  params: {
    projectId: { required: true },
    issueTypeId: {},
    issueType: {},
    componentId: {},
    statusId: {},
    priorityId: {},
    assignerId: {},
    createdUserId: {},
    resolutionId: {},
    parent_child_issue: {},
    created_on_min: {},
    created_on_max: {},
    updated_on_min: {},
    updated_on_max: {},
    start_date_min: {},
    start_date_max: {},
    due_date_min: {},
    due_date_max: {},
    query: {},
    file: {},
    custom_fields: {}
  }
};
