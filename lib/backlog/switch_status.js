module.exports = {
  functionName: 'switchStatus',
  name: 'backlog.switchStatus', 
  params: {
    key: { required: true },
    statusId: { required: true },
    assignerId: {},
    resolutionId: {},
    comment: {}
  }
};
