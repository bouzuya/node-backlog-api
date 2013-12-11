var fs = require('fs');

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

var methods = fs.readdirSync(__dirname).filter(function(f) {
  return /\.js$/.test(f);
}).map(function(f) {
  return require('./' + f);
});

methods.forEach(function(method) {
  if (!method.parseParams) {
    method.parseParams = function(params) {
      return Object.keys(params).length > 0 ? [params] : [];
    };
  }
});

module.exports = methods;
