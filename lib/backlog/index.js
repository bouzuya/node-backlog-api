var fs = require('fs');
var path = require('path');

// method = {
//   functionName: 'foo',
//   name: 'bar',
//   params: {
//     paramName1: { required: true },
//     paramName2: {},
//   },
//   parseParams: function(params) {
//     return [];
//   }
// }

var readdirRecursive = function(dir) {
  return fs.readdirSync(dir).reduce(function(result, f) {
    var p = path.resolve(dir, f);
    if (fs.statSync(p).isDirectory()) {
      result = result.concat(readdirRecursive(p));
    } else {
      result.push(p);
    }
    return result;
  }, []);
};

var methods = readdirRecursive(__dirname).filter(function(p) {
  return /\.js$/.test(p) && !/index\.js$/.test(p);
}).map(function(p) {
  return require('./' + path.relative(__dirname, p));
});

methods.forEach(function(method) {
  if (!method.parseParams) {
    method.parseParams = function(params) {
      return Object.keys(params).length > 0 ? [params] : [];
    };
  }
});

module.exports = methods;
