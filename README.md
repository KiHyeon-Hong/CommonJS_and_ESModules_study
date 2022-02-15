## CommonJS and ESModules study

## CommonJS와 ESModules

### CommonJS

### ESModules

- Top-Level Await

## CommonJS

### CommonJS에서 CommonJS 불러오기 주의할 점

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

### CommonJS에서 CommonJS 불러오기

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

####

```javascript
const { namedAsyncFunc, namedSyncFunc } = require('./cjs/named/index.js');
const defaultFunc = require('./cjs/default/index.js');

(async () => {
  console.log(namedSyncFunc());
  console.log(await namedAsyncFunc());
  console.log(defaultFunc());
})();
```

```bash
This is sync...
This is async...
This is default...
```

### CommonJS에서 ESModules 불러오기

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

### CommonJS에서 ESModules 불러오기 주의할 점

```javascript
//
const defaultFunc = await import('./esm/index.js');
```

```bash
const defaultFunc = await import('./esm/index.js');
                    ^^^^^
SyntaxError: await is only valid in async functions and the top level bodies of modules
```

### CommonJS에서 불러온 ESModules 타입

```javascript
const defaultFunc = import('./esm/index.js');
console.log(defaultFunc);
```

```bash
Promise { <pending> }
```

### CommonJS에서 불러온 ESModules 타입

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

### CommonJS에서 ESModules 다른 방식으로 불러오기

```javascript
const defaultFunc = import('./esm/index.js');

(async () => {
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

## ESModules

### ESModules에서 ESModules 불러오기

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

### ESModules에서 CommonJS 불러오기

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

### ESModules에서 불러온 ESModules 타입

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

### 다양한 방법으로 ESModules 불러오기

####

```javascript
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

####

```javascript
import defaultFunc, { namedSyncFunc, namedAsyncFunc } from './esm/index.js';

console.log(namedSyncFunc());
console.log(await namedAsyncFunc());
console.log(defaultFunc());
```

```bash
This is sync...
This is async...
This is default...
```

####

```javascript
import { namedSyncFunc as sf, namedAsyncFunc as af, default as df } from './esm/index.js';

console.log(sf());
console.log(await af());
console.log(df());
```

```bash
This is sync...
This is async...
This is default...
```

####

```javascript
import * as f from './esm/index.js';
console.log(f);

console.log(f.namedSyncFunc());
console.log(await f.namedAsyncFunc());
console.log(f.default());
```

```bash
[Module: null prototype] {
  default: [Function: defaultFunc],
  namedAsyncFunc: [AsyncFunction: namedAsyncFunc],
  namedSyncFunc: [Function: namedSyncFunc]
}
This is sync...
This is async...
This is default...
```

## 참고자료

- https://roseline.oopy.io/dev/translation-why-cjs-and-esm-cannot-get-along
