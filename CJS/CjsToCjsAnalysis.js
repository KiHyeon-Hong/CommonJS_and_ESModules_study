const defaultFunc = require('./cjs/total/index.js');
const { namedSyncFunc } = require('./cjs/total/index.js');

console.log(defaultFunc());
console.log(namedSyncFunc()); // TypeError: namedSyncFunc is not a function
