---
title: 'How Javascript Works 07 : Prototypal Inheritance'
date: '2019-07-24'
view-source: 'https://tylermcginnis.com/javascript-visualizer/'
---

# Inheritance

[//]: # '## Content'

1. proto
2.
3.
4.

---

<br/>
<br/>
<br/>

be ready for passing some tougth times with this one, but it's neccessary to learn OOP, scared yet!

if you want to understand OOP in javascript you have to know how Prototype Inheretance work,

we did see that arrays and functions are just objects, javascript uses what's called _prototypal inheretance_,
it's when an object get access to methods and properties of other object.

## proto

for exemple:

```js
const array = [1, 2, 3]
array.__proto__ // will access the Array Object that provide us with map, forEach, reduce ... methods
array.__proto__.__proto__ // will access the Base Object from wich all object inherite object properties and methods

// so we can do
array.toString() // '1, 2, 3' <- 'toString' is a property of 'Object'
```

this is called _prototypal chain_

we can create prototypal inheritance between two custum object by `obj2.__proto__ = obj1`

```js
// dragon and lezard
const dragon = {}
const lizard = {}

lezard.__proto__ = dragon // we pass 'powers' of dragon to lizard
// it seem that this expression copies properties of 'dragon' to 'lizard' but it's not copying it's just referencing, why ? because it's more memory efficient.

dragon.isPrototypeOf(lizard) // true

for (let prop in lizard) {
  console.log('specific and inherited: ', prop) // will get properties specific to lizard and inherited from dragon
  if (lizard.hasOwnProperty(prop)) {
    console.log('specific: ', prop) // will get properties specific to lizard
  }
}
```

another exemple

```js
const smartphone = {
  name: 'iphone10',
  os: 'ios14',
  color: 'space gray',
  owner: 'Rayan',
  assistant: 'Siri',
  assistantSpeak() {
    return `Hi${this.owner}, I am ${this.assistant}, what can I help you with`
  },
}

const phone = {
  name: 'nokia3310',
  generation: 'original',
  os: 'sumbian',
  owner: 'Lara',
}

phone.__proto__ = smartPhone
```

but it's not advised, it's very useful as you can see but don't use it because it will mess up our javascript compiler and slow down performance, how to do this inheritance stuff without the drawback then...there are proper ways to this ofcourse ... see bellow.

## usfulness of prototypal inheritance

if objects can share prototypes then it's a memory gain, they can point to the same properties and methods in memory.

## the chains

```js
const square = function(num) {
  return num ** 2
}

f.__proto__ // __proto__ point to Function.prototype
f.__proto__.__proto__ // the second __proto__ point to Object.prototype
```

_'**proto**'_ is a reference or a pointer to 'up the chain' _prototype object_

- `square()` has a property _'**proto**'_ that link it up to _prototype_ of Function _constructor_
- Function _constructor_ has a property _'**proto**'_ that link it up to _prototype_ of Object _constructor_
- Object _constructor_ has a property _'**proto**'_ that link it up to _null_

javascript automatically look up the _prototype chain_ searching for specified property:

```js
func.hasOwnProperty('hasOwnProperty') // true <- under the hood it does func.__proto__.__proto__.hasOwnProperty('hasOwnProperty')
```

### how to create our own prototypes

`obj2.__proto__ = obj1` is bad for performance reasons, how to do this safely?

```js

const obj1 {
  a: 1,
  b: 2
}

// instead of obj2.__proto__ = obj1
const obj2 = Object.create(obj1)

obj2.a // 1
obj2.b // 2

// because
obj1.isPrototypeOf(obj2) // true

```

by using `Object.create()` then we can safely enjoy the benifite of inheritance. so remember:

- **`__proto__`** = evil
- Object.create() = good

### prototype

A _prototype_ is a property that every (and only) function has, that point to an object.

> "When you create a function in JavaScript, it automatically creates an empty container called prototype for you to stick your methods into."

> "The prototype pattern works on the idea that a function/method is only written once and can be referenced and used by prototype objects through the prototype chain."

```js
function func() {}
func.prototype // > {constructor: ƒ}
```

functions are the only objects that has the object 'prototype'

```js
//the base 'Object' is a funtion
typeof Object == 'function' // true
```

Whaaat!?!

```js
;[].prototype // undefined

const obj = {}
obj.prototype // undefined

'abc'.prototype // undefined

const f = function() {}
f.prototype // Function.prototype
```

every function has a _prototype_ property, and it refernces to an object used to attache properties that will be inhereted by object further down the prototype chain, the last object in the chain is the build-in base object or _Object.prototype_

```js
'abc'.toUpperCase() // behind the scenes javascript pass 'abc' as argument to function (or constructor) String()
String('abc').toUpperCase() // 'ABC'
```

### Exercise

```js
// extend the functionality of a built in object

//#1
//Date object => to have new method .lastYear() which shows you last year 'YYYY' format.
Date.prototype.lastYear = function() {
  console.log('this-->', this)
  return new Date(this).getFullYear() - 1
}

new Date('1900-10-10').lastYear()
//'1899'

// Mofify .map() to print '🗺' at the end of each item.

Array.prototype.map = function() {
  console.log('this-->', this)
  let arr = []
  for (let i = 0; i < this.length; i++) {
    arr.push(i + '🗺')
  }
  return arr
  //return this.forEach(e => e + '🗺')
}

console.log([1, 2, 3].map())
//1🗺, 2🗺, 3🗺
```

<br/>
<br/>
<br/>

---

[more on Prototypes](https://itnext.io/understanding-prototypes-in-javascript-e466244da086)
