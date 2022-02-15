## CommonJS and ESModules study

## 환경

- node v16.13.1를 기준으로 한다.

## CommonJS와 ESModules

### CommonJS

### ESModules

- Top-Level Await

##

###

```javascript
//
module.exports.namedSyncFunc = () => {
  return 'This is sync...';
};

module.exports = () => {
  return 'This is default...';
};

//
const defaultFunc = require('./cjs/total/index.js');
const { namedSyncFunc } = require('./cjs/total/index.js');

console.log(defaultFunc());
console.log(namedSyncFunc()); // TypeError: namedSyncFunc is not a function
```

```bash
This is default...
TypeError: namedSyncFunc is not a function
```

###

```javascript
//
module.exports = () => {
  return 'This is default...';
};

//
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

//
const { namedAsyncFunc, namedSyncFunc } = require('./cjs/named/index.js');
const defaultFunc = require('./cjs/default/index.js');

console.log(namedSyncFunc());

(async () => {
  console.log(await namedAsyncFunc());
})();

console.log(defaultFunc());
```

```bash
This is sync...
This is default...
This is async...
```

###

```javascript
//
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

//
(async () => {
  const defaultFunc = await import('./esm/index.js');

  console.log(defaultFunc.namedSyncFunc());
  console.log(await defaultFunc.namedAsyncFunc());
  console.log(defaultFunc.default());
})();
```

```bash
This is sync...
This is async...
This is default...
```

###

```javascript
//
const defaultFunc = await import('./esm/index.js');
```

```bash
const defaultFunc = await import('./esm/index.js');
                    ^^^^^
SyntaxError: await is only valid in async functions and the top level bodies of modules
```

###

```javascript
const defaultFunc = import('./esm/index.js');
console.log(defaultFunc);
```

```bash
Promise { <pending> }
```

###

```javascript
(async () => {
  const defaultFunc = import('./esm/index.js');
  console.log(await defaultFunc);
})();
```

```bash
  [Module: null prototype] {
    default: [Function: defaultFunc],
    namedAsyncFunc: [AsyncFunction: namedAsyncFunc],
    namedSyncFunc: [Function: namedSyncFunc]
  }
```

###

```javascript
(async () => {
  const defaultFunc = import('./esm/index.js');

  console.log((await defaultFunc).namedSyncFunc());
  console.log(await (await defaultFunc).namedAsyncFunc());
  console.log((await defaultFunc).default());
})();
```

```bash
This is sync...
This is async...
This is default...
```

##

###

```javascript
//
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

//
import { namedAsyncFunc, namedSyncFunc } from './esm/index.js';
import defaultFunc from './esm/index.js';

console.log(namedSyncFunc());
console.log(await namedAsyncFunc());
console.log(defaultFunc());
```

```bash
This is sync...
This is async...
This is default...
```

###

```javascript
//
module.exports = () => {
  return 'This is default...';
};

//
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

//
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
```

```bash
This is sync...
This is async...
This is default...

==============================

This is sync...
This is async...
```

###

```javascript
//
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

//
import { namedAsyncFunc, namedSyncFunc } from './esm/index.js';
import defaultFunc from './esm/index.js';

console.log(namedSyncFunc); // [Function: namedSyncFunc]
console.log(namedAsyncFunc); // [AsyncFunction: namedAsyncFunc]
console.log(defaultFunc); // [Function: defaultFunc]
```

```bash
[Function: namedSyncFunc]
[AsyncFunction: namedAsyncFunc]
[Function: defaultFunc]
```

## 참고자료

- https://roseline.oopy.io/dev/translation-why-cjs-and-esm-cannot-get-along
