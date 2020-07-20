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

if we give a Javascript text file to a computer, nothing would happen.

that's why we need a js engine.

js engine take a js code transform it to a code that a computer understand and execute.

the first js engine "SpiderMonkey", was created by Brandon Eich the creator of javascript while working for Netscape in 19XX.

js engine is nothing but a computer code that can transform a js code to a low level language like C++

## How a javascipt engine looks like

Parser => AST => Interpreter => Bytecode
............................ => Profiler => Compiler => Optimized Code

A **<span class="orange">Parser</span>** : Execute a **lexical analysis** to our source code given as plain text and breaks it into **Tokens**(:based on keywords) to identify their meaning so we know what the code is trying to do, and those Tokens are formed to a Data structure called **<span class="orange"> AST </span>** (:[AST Explorer](astexplorer.net))
After that comes the role of the **<span class="orange">Interpreter</span>** with all the other helpers to spit out some code that our computers then understande and can handle

```js
const jsEngine = code => {
  return code.split(/\s+/)
}

jsEngine('const x = 10') // [ 'const', 'x', '=', '10' ]
```

All these prossess must conform to **ECMAScript** standards, or else total chaos.

there are 2 ways to translate a js code (and most of other laguages) to a machine code:

> using an **interpreter**: translate and read the source code line by line on the fly
> or as Merriam Webster defines it :"a computer program that executes each of a set of high-level instructions before going to the next instruction"

> using an **compiler**: create a translation ahead of time of the all file and compile it down directily to a machine code or " a computer program that translates an entire set of instructions written in a higher-level symbolic language (such as C) into machine language before the instructions can be executed" Merriam Wabster

INTERPRETER: Heiht level laguage => Bytecode => Machine code

COMPILER: Hight level laguage => Machine code

let's look at this code

```js
function calculate(x, y) {
  return x * y
}

for (i = 0; i <= 1000; i++) {
  calculate(3, 7) // a compiler simplify this function to its unchanged returned value (21) and use it in the next cycle of the loop.
  //but an interpreter reevaluate the function in each cycle of the loop, over and over, even if the value returned doesn't change,thus waisting time and cpu power.
}
```

So a compiler is more efficient at executing the source code because it can **optimise** it while an interpreter "stupidly" brut force throught it, but in the second hande an interpreter is fast to get up and running without waiting for the all file to compile.

The js V8 engine combine the benifits of the two worlds creating what's called **JIT Compiler** or **Just In Time Compiler**
that can look for ways to optimise over a slower Bytecode to a more efficient and fast one, and to help this jit compiler it's best practice not to use:

- eval()
- arguments
- for in
- with
- delete

=> Hidden class

=> Inline caching

### why not just use machine code from the beginning ?

Because it will take more time to wait for the js files to download and compile, another problem is that there is no binary standard that the browser manufacturers agreed on, may be that will change in the future with WebAsesembly.
