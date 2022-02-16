## CommonJS and ESModules study

- Node.js에는 크게 두 종류의 스크립트가 있으며, CommonJS와 EXModules이다.
- 각각의 스크립트는 기본적으로 전혀 다르므로, npm에서 어떠한 package를 지원하는지에 따라 import, export 방법이 다르다.
- 구체적인 설명은 제외하고 node v16.13.1 LTS 기준으로 서로 간의 import 방법을 정리한다.

## CommonJS와 ESModules 기초 설명

### CommonJS

- 모듈을 내보내기 위해 module.exports를 이용하며, 모듈을 받기 위해 require를 이용한다.
- Top-Level Await를 지원하지 않아, 비동기적인 메소드를 실행하기 위해 async로 감싸주어야 하며, 이는 await로 동기적으로 수행할 수 있다.
- npm init의 기본 값이다.

```javascript
module.exports = 변수명; // default export
module.exports.변수명 = 변수명; // named export

const 변수명 = require('파일경로'); // default import
const { 변수명 } = require('파일경로'); // named import
```

### ESModules

- 모듈을 내보내기 위해 export를 이용하며, 모듈을 받기 위해 import를 이용한다.
- Top-Level Await를 지원한다.
- npm init의 기본 값이 아니므로, ESModules를 위해 package.json의 "type"을 추가하여야 한다.

```json
{
  ...
  "type": "module"
}
```

```javascript
export default 변수명;  //default export
export 변수명;  // named export

import 변수명 from '파일경로';  // default import
import {변수명} from '파일경로';  // named import
```

## CommonJS

### CommonJS에서 CommonJS 불러오기 주의할 점

- CommonJS 모듈에서 named export와 default export를 하나의 파일에 작성하면, named export를 불러올 수 없다.
- named export를 import 시도하면 TypeError가 발생한다.

```javascript
/*
 * total/index.js
 */
module.exports.namedSyncFunc = () => {
  return 'This is sync...';
};

module.exports = () => {
  return 'This is default...';
};

/*
 * index.js
 */
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

- CommonJS에서 named export를 불러오기 위해 객체 구조 분해 연산 "{}" 을 이용한다. 변수명을 지정할 수도 있으며, 이러할 경우 변수명.메소드명()으로 named export를 불러온다.
- CommonJS에서 default export를 불러올 경우에는 변수 명을 지정할 수 있다.

```javascript
/*
 * /default/index.js
 */
module.exports = () => {
  return 'This is default...';
};

/*
 * /named/index.js
 */
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

/*
 * index.js
 */
const { namedAsyncFunc, namedSyncFunc } = require('./cjs/named/index.js');
const defaultFunc = require('./cjs/default/index.js');

console.log(namedSyncFunc());

(async () => {
  console.log(await namedAsyncFunc());
})();

console.log(defaultFunc());

// const namedFunc = require('./cjs/named/index.js');

// console.log(namedFunc.namedSyncFunc());
// (async () => {
//   console.log(await namedFunc.namedAsyncFunc());
// })();
```

```bash
This is sync...
This is default...
This is async...
```

- 출력 결과를 보면, promise를 반환하는 namedAsyncFunc() 메소드의 출력이 가장 늦는 것을 볼 수 있다. 이는 CommonJS가 Top-Level Await를 지원하지 않기 때문이다.

#### CommonJS에서 동기적으로 비동기 메소드 실행

- CommonJS에서 비동기 메소드가 실행된 후에 동기적인 메소드를 실행하기 위해서는, 다음과 같이 async안에 동기적인 메소드를 작성하여야 한다.

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

- ESModules 모듈은 export할 때, promise로 감싸져서 반환되므로, Top-Level Await를 지원하지 않는 CommonJS에서 불러올 때, async 메소드 안에 넣어줘야 한다.
- ESModules는 하나의 파일 안에 named export와 default export를 동시에 사용 가능하다.

```javascript
/*
 * /index.js
 */
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

/*
 * index.js
 */
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

- 만약, CommonJS에서 ESModules를 불러오기 위해 await를 Top-level에 사용한다면, 이는 에러가 발생한다.

```javascript
/*
 * index.js
 */
const defaultFunc = await import('./esm/index.js');
```

```bash
const defaultFunc = await import('./esm/index.js');
                    ^^^^^
SyntaxError: await is only valid in async functions and the top level bodies of modules
```

### CommonJS에서 불러온 ESModules 타입

- await를 사용하지 않은 ESModules를 출력해보면, promise로 감싸져서 반환되는 것을 알 수 있다.

```javascript
const defaultFunc = import('./esm/index.js');
console.log(defaultFunc);
```

```bash
Promise { <pending> }
```

### CommonJS에서 불러온 ESModules 타입

- await를 사용한 ESModules를 출력해보면, default에는 default export, 각각의 이름으로 named export가 반환된 것을 확인할 수 있다.

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

- import문에서 await를 사용하지 않는다면, 출력하는 과정에서 await를 작성해야 한다.
- 이러할 경우, 비동기적으로 반환되는 메소드를 다시 기다려야 하므로, await를 두 번 작성하기 때문에 가독성이 떨어진다.

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

- ESModules은 하나의 파일안에 named export와 default export를 사용할 수 있다.
- named export를 불러오기 위해, 객체 구조 분해 연산을 이용하며, default export를 불러오기 위해 변수를 지정한다. 지정된 변수명으로 default export의 메소드를 호출할 수 있다.

```javascript
/*
 * /index.js
 */
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

/*
 * index.js
 */
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

- ESModules에서 CommonJS를 불러오는 것은 import로도 가능하다. (require 사용 불가능)
- 이는 ESModules를 호출할 때와 같으며, ESModules는 Top-Level Await를 지원하기 때문에 async 메소드 없이 await를 사용할 수 있다.
- 추가적으로 객체 구조 분해 연산 뿐만이 아니라, 변수명을 지정하여 named export를 이용할 수 있으며, 이 경우에는 변수명.메소드명()으로 named export를 이용한다.

```javascript
/*
 * /default/index.js
 */
module.exports = () => {
  return 'This is default...';
};

/*
 * /named/index.js
 */
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

/*
 * index.js
 */
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

- ESModules의 타입은 [형식 : 이름] 형태로 반환된다.
- promise와 같은 비동기적으로 반환되는 메소드는 AsyncFunction이며, 동기적으로 반환되는 메소드는 Function이다.

```javascript
/*
 * /index.js
 */
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

/*
 * index.js
 */
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

#### import 줄여쓰기

- default export와 named export는 하나의 import 문으로 불러올 수 있다.

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

#### 별명 붙이기

- 구조 분해 할당 연산을 이용할 경우 불러오는 named export에 별명을 붙일 수 있으며, default export에 별명을 붙이기 위해서는 구조 분해 할당 연산 안에서 default로 불러올 수 있다.

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

#### 모두 불러오기

- '\*'을 이용하여 모든 named export와 default export를 불러올 수 있으며, 이 경우에는 default export를 불러오기 위해 default()를 이용하여야 한다.
- 불러온 모듈의 타입은 CommonJS에서 EXModules를 불러왔을 경우와 동일하다.

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

## Dual package

- CommonJS와 ESModules를 동시에 사용하는 패키지이다.
- 만약 라이브러리가 오직 default export만을 제공한다면, import를 사용하기만 하면 된다.

### CommonJS의 named export를 ESModules로 감싸기

- 디렉터리 구조는 다음과 같다.

![Figure1](https://kihyeon-hong.github.io/Collection_of_repository_images/CommonJS_and_ESModules_study/figure1.jpg)

- ESModules wrapper를 esm의 하위 디렉터리에 넣고, package.json에 "type"을 추가한다.

```javascript
// /esm/wrapper.js
import namedFunc from '../index.js';

export const namedSyncFunc = namedFunc.namedSyncFunc;
export const namedAsyncFunc = namedFunc.namedAsyncFunc;
```

```json
// /esm/package.json
{
  "name": "esm",
  "version": "1.0.0",
  "description": "",
  "main": "wrapper.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "type": "module"
}
```

- exports map을 추가한다.

```json
// package.json
"exports": {
    "require": "./index.js",
    "import": "./esm/wrapper.js"
}
```

### 사용 방법

#### CommonJS

```javascript
const { namedAsyncFunc, namedSyncFunc } = require('./dual/index.js');

console.log(namedSyncFunc());
(async () => {
  console.log(await namedAsyncFunc());
})();
```

#### ESModules

```javascript
import { namedAsyncFunc, namedSyncFunc } from './dual/esm/wrapper.js';

console.log(namedSyncFunc());
console.log(await namedAsyncFunc());
```

## 참고자료

- https://roseline.oopy.io/dev/translation-why-cjs-and-esm-cannot-get-along
