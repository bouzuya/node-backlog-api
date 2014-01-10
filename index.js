module.exports = process.env.BACKLOG_API_COV
  ? require('./lib-cov/backlog')
  : require('./lib/backlog');
