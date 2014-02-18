module.exports = {
  functionName: 'admin.addUser',
  name: 'backlog.admin.addUser', 
  params: {
    user_id: { required: true },
    password_md5: { required: true },
    name: { required: true },
    mail_address: { required: true },
    role: { required: true },
    mail_setting: {},
    icon: {}
  }
};
