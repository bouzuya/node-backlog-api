var xmlrpc = require('xmlrpc');
var methods = require('./backlog/');

var Backlog = function(spaceId, username, password) {
  this.spaceId = spaceId || process.env.BACKLOG_SPACE_ID;
  this.username = username || process.env.BACKLOG_USERNAME;
  this.password = password || process.env.BACKLOG_PASSWORD;
  if (!this.spaceId)
    throw new Error('"spaceId" or BACKLOG_SPACE_ID is required');
  if (!this.username)
    throw new Error('"username" or BACKLOG_USERNAME is required');
  if (!this.password)
    throw new Error('"password" or BACKLOG_PASSWORD is required');
};

Backlog.prototype._client = function() {
  if (!this._xmlRpcClient) {
    this._xmlRpcClient = xmlrpc.createSecureClient({
      url: 'https://' + this.spaceId + '.backlog.jp/XML-RPC',
      basic_auth: { user: this.username, pass: this.password }
    });
  }
  return this._xmlRpcClient;
};

Backlog.prototype._parseArguments = function() {
  var args = {};
  if (arguments.length == 1) {
    args.params = {};
    args.callback = arguments[0];
  } else if (arguments.length == 2) {
    args.params = arguments[0];
    args.callback = arguments[1];
  } else {
    throw new Error('arguments length is not 1 or 2');
  }

  // validation
  if (!args.params || typeof args.params !== 'object') {
    throw new Error('"params" is not an object');
  }
  if (!args.callback || typeof args.callback !== 'function') {
    throw new Error('"callback" is not a function');
  }

  return args;
};

Backlog.prototype._validateParameters = function(method, params) {
  try {
    Object.keys(params).forEach(function(p) {
      if (!(p in method.params)) {
        throw new Error(p + ' is invalid parameter');
      }
    });
    Object.keys(method.params).forEach(function(k) {
      var p = method.params[k];
      if (!p.required) return;
      if ((k in params) && !(p.or in params)) return;
      if (!(k in params) && (p.or in params)) return;
      throw new Error(k + ' is required');
    });
    Object.keys(method.params).forEach(function(k) {
      var p = method.params[k];
      if (!p.or) return;
      if ((k in params) && (p.or in params))
        throw new Error('either ' + k + ' or ' + p.or);
      return;
    });
    return null;
  } catch (err) {
    return err;
  }
};

methods.forEach(function(method) {
  Backlog.prototype[method.functionName] = function() {
    var args = this._parseArguments.apply(
      this, Array.prototype.slice.call(arguments));
    var err = this._validateParameters(method, args.params);
    if (err) return args.callback(err, null);
    var params = method.parseParams(args.params);
    this._client().methodCall(method.name, params, args.callback);
  };
});

module.exports = function(spaceId, username, password) {
  return new Backlog(spaceId, username, password);
};

