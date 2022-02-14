import { namedAsyncFunc, namedSyncFunc } from './esm/index.js';
import defaultFunc from './esm/index.js';

console.log(namedSyncFunc());
console.log(await namedAsyncFunc());
console.log(defaultFunc());
