const promise = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('This is async...');
    }, 3000);
  });
};

module.exports.namedAsyncFunc = async () => {
  return promise();
};

module.exports.namedSyncFunc = () => {
  return 'This is sync...';
};
