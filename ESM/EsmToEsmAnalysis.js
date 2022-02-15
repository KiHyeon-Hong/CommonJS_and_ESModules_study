import { namedAsyncFunc, namedSyncFunc } from './esm/index.js';
import defaultFunc from './esm/index.js';

console.log(namedSyncFunc); // [Function: namedSyncFunc]
console.log(namedAsyncFunc); // [AsyncFunction: namedAsyncFunc]
console.log(defaultFunc); // [Function: defaultFunc]
