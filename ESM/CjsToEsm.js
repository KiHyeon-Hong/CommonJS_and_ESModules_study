import defaultFunc from './cjs/default/index.js';
import { namedSyncFunc, namedAsyncFunc } from './cjs/named/index.js';

console.log(namedSyncFunc());
console.log(await namedAsyncFunc());
console.log(defaultFunc());

console.log();
console.log('==============================');
console.log();

import namedFunc from './cjs/named/index.js';

console.log(namedFunc.namedSyncFunc());
console.log(await namedFunc.namedAsyncFunc());
