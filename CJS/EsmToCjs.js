(async () => {
  const defaultFunc = await import('./esm/index.js');

  console.log(defaultFunc.namedSyncFunc());
  console.log(await defaultFunc.namedAsyncFunc());
  console.log(defaultFunc.default());
})();
