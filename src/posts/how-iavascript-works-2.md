---
title: 'How Javascript Works 2'
date: '2019-09-05'
view-source: 'https://tylermcginnis.com/javascript-visualizer/'
---

## Content

1. Execution Context
2. JS Scoop
3. This

---

## Execution Context

to handle the complexity of a js code we often disect it unto little chanks of code named functions,
JS engine does the samething when interpreting/compiling a source code, it first create a global execution context and put on every function with it's own execution context

Hoisting happen in every execution context
so expect the first value of **x** in this exemple to be...

```js
var x = 10

var f = function f() {
  console.log(x) // see value below
  var x = 20
  console.log(x) // see value below
}

f()
```

At the global execution context:

```js
/**/ // Creation
/**/ var x = undefined
/**/ var f = undefined

// Execution
x = 10
function f() {
  console.log(x)
  var x = 20
  console.log(x)
}

f()
```

At the second execution context:

```js
var x = 10

var f = function f() {
  /**/ // Creation
  /**/ var x = undefined // the value "undefined" override the former value "10"
  // Execution
  console.log(x) // undefined
  x = 20
  console.log(x) // 20
}

f()
```

As seen here the value of x is a bit unpredictible, a solution for that is instead of using **var** keyword it's better
to use the ES6 **const** and **let** because they both don't hoist leaving us with the following simple rule: never use a value before it's declared.

```js
function bigBrother() {
  function littleBrother() {
    return 'it is me!'
  }
  return littleBrother()
  function littleBrother() {
    return 'no, me!'
  }
}

// Before running this code, what do you think the output is?
bigBrother()
```

##Scope

```js
function getDate() {
  var date = new Date()

  function formatDate() {
    return date.toDateString().slice(4) // cane access "date"
  }

  return formatDate()
}

console.log(getDate()) // -- --- ----

console.log(date) //  ReferenceError - can't access "date"
```

```js
function discountPrices(prices, discount) {
  var discounted = []

  for (var i = 0; i < prices.length; i++) {
    var discountedPrice = prices[i] * (1 - discount)
    var finalPrice = Math.round(discountedPrice * 100) / 100
    discounted.push(finalPrice)
  }
  console.log(i) //  3
  console.log(discountedPrice) //  150
  console.log(finalPrice) //  150

  return discounted
}

console.log(discountPrices([100, 200, 300], 0.5)) // [50, 100, 150]
```

interpreted as :

```js
function discountPrices(prices, discount) {
  var discounted = undefined
  var i = undefined
  var discountedPrice = undefined
  var discounted = undefined // if we dont declare these 4 variables here,they will be available to the global scope, wich is a terrible idea!!!

  discounted = []
  for (i = 0; i < prices.length; i++) {
    discountedPrice = prices[i] * (1 - discount)
    finalPrice = Math.round(discountedPrice * 100) / 100
    discounted.push(finalPrice)
  }
  console.log(i) //  3
  console.log(discountedPrice) //  150
  console.log(finalPrice) //  150

  return discounted
}

console.log(discountPrices([100, 200, 300], 0.5)) // [50, 100, 150]
```

> PS: you should never declare a variable without a var keyword, because if you do that that variable will become a property on the global scope.
