module.exports = {
  functionName: 'admin.updateCustomField',
  name: 'backlog.admin.updateCustomField',
  params: {
    id: { required: true },
    name: { required: true },
    issueTypes: { required: true },
    description: {},
    required: {},
    // when typeId=3
    min: {},
    max: {},
    initial_value: {},
    unit: {},
    // when typeId=4
    initial_value_type: {},
    initial_shift: {},
    initial_date: {},
    // min: {},
    // max: {},
    // when typeId=5,6
    items: {},
    // when typeId=7,8
    allow_input: {},
    // items: {}
  }
};

