const promise = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('This is async...');
    }, 3000);
  });
};

export async function namedAsyncFunc() {
  return promise();
}

export function namedSyncFunc() {
  return 'This is sync...';
}

export default function defaultFunc() {
  return 'This is default...';
}
