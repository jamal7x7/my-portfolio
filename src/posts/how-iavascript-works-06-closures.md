---
title: 'How Javascript Works 06 : Closures'
date: '2019-07-22'
view-source: 'https://tylermcginnis.com/javascript-visualizer/'
---

# Closure

[//]: # '## Content'

1. Functions and Objects
2. first class citizen
3.
4.
5.

---

<br/>
<br/>
<br/>

On of the most importent concept and feature in javascript is _Closure_

## Fonctions and Objects

All functions are Objects. how ? let's see:

There are 4 ways to create and invoke a function:

```js
function one() {
  return 1
}
one() // 1

var obj = {
  two() {
    return 2
  },
}
obj.two() // 2  <- 'this' keyword will be updated to 'obj'

function three() {
  return 3
}
three.call() // 3
```

The 4th way is not very common:

```js
var four = new Function('return 4')
four()
```

called _Function Constructor_

when creating a function a special oject is created similtaniously for that function, in it we find

- code()
- name(optional)
- properties( call(), apply(), bind(), arguments, name ...)

Functions are a special kind of objects: _callable objects_ (having extra properties and methode that normal objects don't have)

functions in javascript don't just perform some tasks, we can also pass them, move them around, store them as data...

## first class citizen

function are first class citizen, so they have following privileges:

1. can be asseigned to variables or object property `var f = function () {}`
2. can be passed as arguments to other functions `function f(g) { g() }`
3. can be returned as values from other functions `function f() { return function g() {}}`

Any thing you can do with other types(numbers, strings, boolean ...) you can do with functions, so that we can do functional programing with javascript

### functions best practices

- don't initialise and call a function iside a loop, initialise outside and invoke it inside the loop.
- use default parameters to avoid ReferenceError or returning (when returning) undefined.

```js
// do this
function f(param = 10) {
  return param
}
f() // 10
// not this
function f(param) {
  return param
}
f() // undefined
//definetly not this
function f() {
  return param
}
f() // ReferenceError
```

## Higher Order Funcions

A _Higher Order Funcion_ or _HOF_ is a function that can take other functions as arguments, or return another function as an output.

map, filter, forEach, reduce are exemples of HOF built-in javascript

They are generique functions that make our code reusable, flixible and more DRY.

### first exemple

```js
function accepted(candidate, criteria) {
  if (criteria(candidate.domain, candidate.height)) {
    return (
      candidate.name + ' has the required criteria to be a :' + cadidate.domain
    )
  } else {
    return (
      candidate.name +
      ' does not the required criteria to be a :' +
      cadidate.domain
    )
  }
}

function heightCriteria(domain, height) {
  if (domain == 'pilot') {
    return height >= 163 && height <= 196
  } else if (domain == 'marines') {
    return height >= 147 && height <= 198
  } else if (domain == 'firefighter') {
    return true // no hight requirement
  }
}

accepted({ name: 'Adam', height: 182, domain: 'pilot' }, heightCriteria) // true
accepted({ name: 'Joe', height: 210, domain: 'marine' }, heightCriteria) // false
accepted({ name: 'Joe', height: 210, domain: 'firefighter' }, heightCriteria) // true
```

### second exemple

```js
function multiplyBy(x) {
  return function(y) {
    return x * y
  }
}

// can be shorten using arrow functions:
// multiplayBy = x => y => x * y

const multiplyByThree = multiplyBy(3)
const multiplyByTen = multiplyBy(10)

multiplyByThree(5) // 15
multiplyByTen(5) // 50
```

<br/>
<br/>

## Closures

ready to unlock one of the most powerful feature of javascript

A closure is when a function has access to the variable environment in wich it was declared even after it did leave.

So we have accecss to a special closure environment/scope in wich we put _referenced_ variables of the environment of an executed function (garbage collector can't delete them).

```js
function first() {
  let a = 1
  return function second() {
    let b = 2
    return function third() {
      let c = 3
      return `${a} + ${b} + ${c} = ${a + b + c}`
    }
  }
}
first()()() // 6
```

the function `third()` has access to variables _a_ and _b_ of executed functions `first()` and `second()` (after leaving the execusion stack).

> P.S: another concise and more general way for the function `first()` to do the something since parametres are traited like variables that get stored in the local variable environment:

```js
const first = a => b => c => `${a} + ${b} + ${c} = ${a + b + c}`

first(1)(2)(3) // 6
```

Exemples:

```js
function sayHi() {
  setTimeout(function() {
    console.log(greeting)
  }, 5000)

  const greeting = 'Hi!'
}

sayHi() // 'Hi!' <- because of the lexical scope of closure!
```

Closures are very important because of memory efficiency and encapsulation

```js
function sayHi() {
  const arr = new Array(10000).fill('hi')
  console.log('arr created!')
  return function() {
    return arr[index]
  }
  // rather than: return arr[index] <- will create and destroy memory demanding 'arr' each time 'sayHi' get invoked
}

// console.log once 'arr created!' because of closure

sayHi()(536) // 'Hi!'
sayHi()(65) // 'Hi!'
sayHi()(6763) // 'Hi!'
```

```js
// the initialize function called only once!
let view
function initialize() {
  const f = () => (view = '🏔')
  console.log('view has been set!')

  return f
}
const iniOnce = initialize()

iniOnce()
iniOnce()
iniOnce()

console.log(view)
```

code this

```js
const array = [1, 2, 3, 4]
const f = i => () => console.log('I am at index ' + i)
for (var i = 0; i < array.length; i++) {
  setTimeout(f(i), 3000)
}
//I am at index 0
//I am at index 1
//I am at index 2
//I am at index 3
```

not this

```js
const array = [1, 2, 3, 4]
for (var i = 0; i < array.length; i++) {
  setTimeout(function() {
    console.log('I am at index ' + i)
  }, 3000)
}
//I am at index 4
//I am at index 4
//I am at index 4
//I am at index 4
```
