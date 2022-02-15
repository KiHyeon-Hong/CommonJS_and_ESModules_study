/*
const defaultFunc = await import('./esm/index.js');
                    ^^^^^
SyntaxError: await is only valid in async functions and the top level bodies of modules

const defaultFunc = await import('./esm/index.js');
*/
// const defaultFunc = import('./esm/index.js');

// console.log(defaultFunc); // Promise { <pending> }

(async () => {
  const defaultFunc = import('./esm/index.js');

  /*
  console.log(await defaultFunc);

  [Module: null prototype] {
    default: [Function: defaultFunc],
    namedAsyncFunc: [AsyncFunction: namedAsyncFunc],
    namedSyncFunc: [Function: namedSyncFunc]
  }
  */

  console.log((await defaultFunc).namedSyncFunc());
  console.log(await (await defaultFunc).namedAsyncFunc());
  console.log((await defaultFunc).default());
})();
