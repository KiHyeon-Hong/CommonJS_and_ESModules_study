const { namedAsyncFunc, namedSyncFunc } = require('./cjs/named/index.js');
const defaultFunc = require('./cjs/default/index.js');

// console.log(namedSyncFunc());

// (async () => {
//   console.log(await namedAsyncFunc());
// })();

// console.log(defaultFunc());

// console.log();

const namedFunc = require('./cjs/named/index.js');

console.log(namedFunc.namedSyncFunc());
(async () => {
  console.log(await namedFunc.namedAsyncFunc());
})();
