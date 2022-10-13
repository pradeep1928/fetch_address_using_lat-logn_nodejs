const util = require('util');
util.log('hello world');

console.log(util.inspect(util, {showHidden: true, depth: 2}));