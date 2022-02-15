/*
import { namedAsyncFunc, namedSyncFunc } from './esm/index.js';
import defaultFunc from './esm/index.js';

console.log(namedSyncFunc); // [Function: namedSyncFunc]
console.log(namedAsyncFunc); // [AsyncFunction: namedAsyncFunc]
console.log(defaultFunc); // [Function: defaultFunc]
*/

/*
import defaultFunc, { namedSyncFunc, namedAsyncFunc } from './esm/index.js';

console.log(namedSyncFunc());
console.log(await namedAsyncFunc());
console.log(defaultFunc());
*/

/*
import { namedSyncFunc as sf, namedAsyncFunc as af, default as df } from './esm/index.js';

console.log(sf());
console.log(await af());
console.log(df());
*/

/*
import * as f from './esm/index.js';
console.log(f);

console.log(f.namedSyncFunc());
console.log(await f.namedAsyncFunc());
console.log(f.default());
*/
