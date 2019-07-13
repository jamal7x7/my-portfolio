---
title: 'How Javascript Works 3 : Functions'
date: '2019-09-05'
view-source: 'https://tylermcginnis.com/javascript-visualizer/'
---

## Content

1. Function declaration vs function expression
2. Variable enveronement
3. Arguments
4. Scope

---

<br/>
<br/>
<br/>

## Function declaration vs function expression

a programe is no more than:

> assigning memory to variables: `let x = 10`

> running functions to do somethings with these variables: `function f (x) { return x * x}`

<br/>

### Function declaration

```js
var flying = () => {
  console.log('fast!')
}
```

defined at _runtime_ (or execution phase: when we call the function)

<br/>

### Function expression

```js
function crawling() {
  console.log('slow!')
}
```

defined at the _parsing time_ (creation phase)

<br/>

We can do a function: _call / invocation / execution_
by typing the function with curly brackets:

```js
flaying()
crawling()
```

And as soon as **js engine** sees those curly bracets after the name of a function it create an **execution context**

<br/><br/>

## Arguments

Using the keyword _arguments_ inside a function execution context make the js engine less able to optimize our code,because _arguments_ is an array like object, and we can't use array method on them, unless we use the following tricks:

> `Array.from(arguments)` > <br/>
> or better
> <br/>
> Rest parameters using spread operator: `function f (...args) {}`

<br/><br/>

## Variable environment

In every function execution context / stack, there is a place where we can put new variables (or referencing variables like objects, arrays to a place in memory heap), we call it Variable environment.

So each execution context has its own variable environment.

```js
function two() {
  var isValid
  console.log(isValid)
}

function one() {
  var isValid = true
  console.log(isValid)
  two()
}

var isValid = false
one() // undefined
two() // undefined
```

<br/><br/>

## Scope

Each execution context has a link to its parent/outer environment and this outer environment depands on where the function sits lexically, lexecally means where the function is written.

Every function have access to each its own variables and have a link or a _scope chaine_ to variables that sits on its parent environment

look at the weird behavior of this code and try to explain it:

```js
var number = 10
function printNumber() {
  console.log(number)
}
function log() {
  var number = 20
  printNumber()
}

log() // Prints 10 no 20 !?!
```

This is called **lexical scope** (or static scope), it's when the available variables are the ones that are accessible where the function is _written_ or _defined_ not where it's _called_.

> PS: it's not recomanded to use 'eval()' and 'with' because they messes up lexical scope making it hard for the engine to optimize the code.
> Lexical environment === [[scopes]]

<br/>
### Weird edge cases

```js
function f() {
  x = 10
  return x
}

f() // 10 => which is weird!

function g() {
  console.log(x)
}

g() // 10
```

'x' is not declared anywhere but the global excution context create it in its global variable environoment `var x = undefined` so it is located in the global scope and every other function had access to it.

This is called _leakage of global variables_, and it did cause a lot of problems in the past, now we can remedy these weird impredictable pitfal with `'use strict'` written at the top of the file.

<br/>

```js
var g = function f() {
  return "I'm Good!"
}

g() //' I'm Good! '
f() // ReferenceError: f is not defined !!!
```

**f** is nowhere to be seen in the scope chaine, this is because **f** is enclaused in its own scope (**f** get added to its own execution context variable environment), so we can't access it from the global scope, we can only access it from the inside of it's block!!!
<br/><br/>

## Function scope vs block scope

> scope == what variables we have access to.

variables in javascript are function scoped unlike most of other lagages where variables are _block_ scoped (_block_ means the inside of the curly braces `{}` used in `ìf` statement or `for` loop ...), in es6 javascript introduced two new keyword _`const`_ and _`let`_ which are block scoped
so:

```js
if (true) {
  var x = 10
}
x // 10

//: BUT ://

if (true) {
  const y = 10
  let z = 'ZOZO'
}

y // ReferenceError: y is not defined !!!
z // ReferenceError: z is not defined !!!
```

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

---

resource1: 'https://tylermcginnis.com/javascript-visualizer/'
resource2: 'http://pythontutor.com/javascript.html#mode=edit'
resource2: 'http://int3.github.io/metajs/'

```

```

```

```
