/*
const { namedAsyncFunc, namedSyncFunc } = require('./dual/index.js');

console.log(namedSyncFunc());
(async () => {
  console.log(await namedAsyncFunc());
})();
*/

import { namedAsyncFunc, namedSyncFunc } from './dual/esm/wrapper.js';
console.log(namedSyncFunc());
console.log(await namedAsyncFunc());
