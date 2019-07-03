---
title: 'How Javascript Works'
date: '2019-09-02'
view-source: 'https://www.tutorialspoint.com/graphql/graphql_quick_guide.htm'
---

## Content

1. Javascript Engine
2. Call Stack
3. Mutations
4. Sunbscriptions

---

## Javascript Engine

if we give a Javascript file to a computer, nothing would happen.

that's why we need a js engine.

js engine take a js code transform it to a code that a computer understand and execute.

the first js engine "SpiderMonkey", was created by Brandon Eich also creator of javascript language while working for Netscape in 19

js engine is nothing but a computer code that can transform a js code to a low level language like C++

## How a javascipt engine looks like

Parser => AST => Interpreter => Bytecode
............................ => Profiler => Compiler => Optimized Code

A **<span class="orange">Parser</span>** : Execute a **lexical analysis** to our source code given as plain text and breaks it into **Tokens**(:based on keywords) to identify thier meaning so we know what the code is trying to do, and those Tokens are formed to a Data structure called **<span class="orange"> AST </span>** (:[AST Explorer](astexplorer.net))
After that come the role of the **<span class="orange">Interpreter</span>** with all the other helpers to spit out some code that our computers then understande and can handle

```js
const jsEngine = code => {
  return code.split(/\s+/)
}

jsEngine('const x = 10') // [ 'const', 'x', '=', '10' ]
```

The all prossess must conform to **ECMAScript** standards
