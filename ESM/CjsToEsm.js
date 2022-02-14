import defaultFunc from './cjs/default/index.js';
import namedFunc from './cjs/named/index.js';

console.log(namedFunc.namedSyncFunc());
console.log(await namedFunc.namedAsyncFunc());
console.log(defaultFunc());
