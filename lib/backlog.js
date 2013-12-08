var xmlrpc = require('xmlrpc');
var methods = require('./backlog/');

var Backlog = function(spaceId, username, password) {
  this.client = xmlrpc.createSecureClient({
    url: 'https://' + spaceId + '.backlog.jp/XML-RPC',
    basic_auth: { user: username, pass: password }
  });
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
      if (p && p.required && !(k in params)) {
        throw new Error(k + ' is required');
      }
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
    this.client.methodCall(method.name, params, args.callback);
  };
});

module.exports = function(spaceId, username, password) {
  return new Backlog(spaceId, username, password);
};

