---
title: 'How Javascript Works 09 : Functional Programming'
date: '2019-07-28'
view-source: 'https://tylermcginnis.com/javascript-visualizer/'
---

# Functional Programming

[//]: # '## Content'

1. Programming paradigms
2. Pure functions
3. Idempotence
4. Declarative vs Imperative
5. Immutability
6. closure and functional programming
7. Currying
8. Partial Application
9. Memoization
10. Compose and Pipe
11. Composition vs inheritance

---

<br/>
<br/>
<br/>

The other Major programming paradigm: functional Programming, with all its new terms like cyrring, partial application, pur functions, referential transparency, composing, piping...

LISP was the first FP developed in 1958, FP was originating from a branch of mathematics called _Lambda calulus_, created by mathematician _Alonzo Church_ in the 1930s, who was intrested in what is the notion of a function from a computational perspective, to answer that he invented _lambda caculus_, Alonzo was the PhD supervisor to the well known _Allan turing_ inventor of _Turing machine_ the predecesor of modern computers.

so for Church a function is a black box (that you are not allowed to look inside it) that recieve an input, process it and produce an output:

```js

x -> function -> x + 1 // in lambda calculus notation : λx.x+1

x -> y -> function -> x + y // λx.λy.x+y

```

the second fondamental thing is that these functions are pure, meaning: they have no internal state, no hidden information that we can use (contrary to Turing machines that have internal state)

FP become very popular in recent years,it offer 2 major benifits :

- _distrubuted computing_: multiple machines interacting with data

- _parallelism_: machines working on the some data at the same time

##

functional programming is all about separation of concerns, like OOP, organise code in little chunks, and every chank is doing one thing only.

when we use OOP we devide our code into classes containing data and methods of a particular notion, in FP we separate data and functions,we dont group them in one thing, tere is no classes or method belonging to an object, in FP the emphasis is on indepondant, first class citezen functions. this approach allow us to have all the benifits and big goals of an OOP, clear, DRY, extendable, efficient ...

the main pillar of FP is : _Pure functions_

Exercise

```js
// Amazon shopping

//Implement a cart feature:
// 1. Add items to cart.
// 2. Add 3% tax to item in cart
// 3. Buy item: cart --> purchases
// 4. Empty cart

//Bonus:
// accept refunds.
// Track user history.

const user = {
  name: 'Kim',
  active: true,
  balance: 100,
  history: [],
  cart: [],
  purchases: [],
}

const items = [
  {
    name: 'a',
    price: 100,
  },
  {
    name: 'b',
    price: 100,
  },
  {
    name: 'c',
    price: 100,
  },
]

const nameToItem = (name, arr) => {
  let item
  arr.map(v => {
    //console.log(v.name)
    if (v.name === name) {
      item = v
      //console.log(v.name === name)
    }
  })

  return item
}

//const myitem = nameToItem('a', items)
//console.log(myitem)

const isActive = (user = user) => {
  if (!user.active) throw new Error('user not active')
}

const taxing = (item, tax) =>
  (item = { ...item, price: item.price * (1 + tax) })

const addItemToCart = function(user = user, name) {
  item = nameToItem(name, items)
  isActive()
  item = taxing(item, 0.03)

  user.cart = [...user.cart, item]

  user.history = [
    ...user.history,
    {
      item: item.name,
      action: 'added to cart',
      price: item.price,
      balance: user.balance,
      date: Date.now(),
    },
  ]
}

const buyItem = function(user = user, name) {
  isActive()
  item = nameToItem(name, user.cart)
  if (user.cart.includes(item)) {
    user.purchases = [...user.purchases, item]
    user.cart = user.cart.filter((v, i) => i !== user.cart.indexOf(item))
    user.balance -= item.price
    console.log('item ' + item.name + ' purchased!')
    user.history = [
      ...user.history,
      {
        item: item.name,
        action: 'new purchase!',
        date: Date.now(),
        price: item.price,
        balance: user.balance,
      },
    ]
  } else {
    console.log('item not in your cart')
    user.history = [
      ...user.history,
      {
        item: item.name,
        action: 'trying to purchase item not in cart!',
        date: Date.now(),
        price: item.price,
        balance: user.balance,
      },
    ]
  }
}

const refund = function(user = user, name) {
  isActive()
  item = nameToItem(name, user.purchases)
  if (user.purchases.includes(item)) {
    user.cart = [...user.cart, item]
    user.purchases = user.purchases.filter(
      (v, i) => i !== user.purchases.indexOf(item)
    )
    user.balance += item.price
    console.log('item ' + item.name + ' refunded!')
    user.history = [
      ...user.history,
      {
        item: item.name,
        action: 'refund!',
        date: Date.now(),
        price: item.price,
        balance: user.balance,
      },
    ]
  } else {
    console.log('item not purchased')
  }
}

const emptyCart = (user = user) => {
  isActive()
  user.cart = []
}

addItemToCart('a')
console.log('cart :', user.cart)

buyItem('a')
//buyItem(user.cart[1])
//addItemToCart(items[2])
//buyItem(user.cart[1])

//console.log('purchases :', user.purchases)
//console.log('cart :', user.cart)

refund('a')

console.log('histroy :', user.history)

//console.log('purchases :', user.purchases)
```

## Pure Functions

two condition for a function to be _pure_:

1. Given the same input, it return the same output.
   => the function is deterministic.

2. No side effect: the function does not modify anything outside of itself.
   => referential transparency.

Can we write our regular code with only pure functions? well, our code must interact and communicate with the outside world, that's a side effect right there, the idea is not to make all our functions 100% pure but to minimize side effects, to organize code to a part where functions are totally pure and other part where functions can have side effects, so that when we have a bug we know wich portion of the code to inspect and debug.

> one of the goals of FP is to isolate _impure_ function, functions with side effects.

How to build the perfect function in FP then?

A perfect function in FP do:

- One task

- return statement

- Pure

- No shared state

- Immutable state

- Composable

- Predictable

## Idempotence

Idempotence == deterministic && !(referential transparency)

We have Idempotence when our function is deterministic(same iput -> same output) but with side effect( communication with the outside world)

```js
function bad(n) {
  return n * Math.random()
}

bad(10) // rundom value with each call

function log(n) {
  console.log(n)
}

log(20) // 20 but loged outside of the function to the browser console

Math.abs(Math.abs(-10)) // 10  <-  is immutable by multiple recursions (|||...|x|...||| = |x|)
```

even with side effect, Idempotence is valuable because its predictible.

## Imperative vs Declarative

Imperative: what to do & how to do it
Declarative: what to do without telling how to do it

<--- humains ------------------------------------------------ Machines --->
<--- Hight level language ------------------------------- Machine code --->
<--- Declarative ------------------------------------------ Imperative --->

Exemples:

```js
let arr = new Array(1000).fill('')

for (let i = 0; i < arr.length; i++) {
  console.log(i)
}
// is more imperative than simply

arr.forEach((e, i) => console.log(i))
```

jQuery is more imperative than React

## Immutability

Immutability = not changing original data (or preserve original state)

change occures only on cloned data, not on the original data itself.

```js
const obj = { color: 'red' }

const obj2 = obj
obj2.color = 'blue'

console.log(obj) // { color: 'blue'} <- we didn't preserve the immutability of our given data
```

```js
const obj = { color: 'red' }

function clone(object) {
  return { ...object }
}

const obj2 = clone(obj)
obj2.color = 'blue'

console.log(obj) // { color: 'red'} <- we did preserve the immutability of our given data
```

yes, but if we have a lot of big heavy object, cloning them every time we want to update a property is not memory efficient, that's true but there are ways of diminishing the effect of this inconveniency, by _structural sharing_ for exemple wich is cloning only the updated properties and sharing the rest of the colossal object, another thing is that memory in recent years becomes very cheap compared to what was before and its a fair price to pay for the benifits of preserving data immutability in FP.

## closure and functional programming

> we can use closure to access private, immutable data.

as long as our returned function stay pure and dont mess up with the original data.

```js

const f = function() {
  superImportantTresorData = {
    coordinate: {
      x: 100,
      y: 200
    },
    value: '100 Million $'
  }

  ruturn function () {
    return superImportantTresorData.coordinate
  }
}

const getCoordinate = f()
getCoordinate() //{ x: 100, y: 200 }

```

We can't change data inside the function `f()` from the outside no matter what we do. closure is used a lot in FP because it enforces immutability.

## Currying

currying is the technique of translating the evaluation of a function that takes multiple arguments into evaluating a sequence of functions, each with a single argument.[1](https://en.wikipedia.org/wiki/Currying)

for exemple:

```js
const multiply = (x, y) => x * y

multiply(2, 5) // 10
```

is simmilar to:

```js
const curryMultiply = x => y => x * y

curryMultiply(2)(5) // 10

//or using an itermediary function

const curryMultiplyBy2 = curryMultiply(2) // 2 * y <- we executed first portion of the caculation once.
curryMultiplyBy2(5) // 10 <- 2 * (5) <- we can execute second portion of the caculation many times without re-executing the first calculation again and again.
```

> Currying is a technique to gain on performance

## Partial Application

_partial application_ (or partial function application) refers to the process of fixing a number of arguments to a function, producing another function of smaller _arity_(or number of arguments).[2](https://en.wikipedia.org/wiki/Partial_application)

```js
const multiply = (x, y, z) => x * y * z

const partialMultiplyBy2 = multiply.bind(null, 5)

partialMultiplyBy2(5, 10) // 100 <- we transformed a function of arity = 3 to one of arity = 2
```

difference between currying and partial applications:

> Partial application expect to recieve all the rest of the arguments at the second call, currying expect only one argument at a time.

## Memoization

Memoization is an _optimization technique_ used primarily to speed up computer programs by _storing_ the results of _expensive_ function calls and returning the _cached_ result when the same inputs occur again.[3](https://en.wikipedia.org/wiki/Memoization)

let's consider the following function:

```js
function toPower10(x) {
  console.log('heavy claculation')
  return x ** 100
}

toPower10(2) // 'heavy claculation' >> 1024
toPower10(2) // 'heavy claculation' >> 1024
toPower10(2) // 'heavy claculation' >> 1024
```

each time we call `toPower10(2)` it recalculate the same value, imagine if the calculation take a long time!

how to improve our code?

```js
let cache = {}

function memoToPower10(x) {
  if (x in cache) {
    return cache[x]
  } else {
    console.log('heavy claculation')
    cache[x] = x ** 10
    return cache[x]
  }
}

memoToPower10(2) // heavy claculation' >> 1024 <- calculated
memoToPower10(2) // 1024 <- use cache
memoToPower10(2) // 1024 <- use cache
```

to avoid poluting the global scope with the object `cache` we can use closure.

```js
function memoToPower10() {
  let cache = {} // now it is scoped inside the function

    return function(x) {
      if (x in cache) {
          return cache[x]
        }
      } else {
        console.log('heavy claculation')
        cache[x] = x ** 10
          return cache[x]
        }
    }
}

const memo = memoToPower10()
memo(2) // heavy claculation' >> 1024 <- calculated
memo(2) // 1024 <- use cache
```

now our function is more optimized and more pure.

## Composition

composition is breaking the logic of our program into little functions, each function operate on the data and pass the result to the next function.

it's the same principle of how assembly line or conveyor belt in factories works.

data --> fn --> data --> fn --> data --> fn --> data --> fn -->data

```js
const compose = (f, g) => x => f(g(x))
const pipe = (f, g) => x => g(f(x))

const addTo3 = x => x + 3

const double = r => r * 2

const addTo3AndDouble = compose(
  addto3,
  double
)

addTo3AndDouble(7) // 20
```

- the `compose()` function operate from right to left and the `pipe()` operate from left to right

- in general: `compose() !== pipe()`

## PS

> The goal of using FP is to go from procedural functions and check every requierement to be the perfect function in FP.
> functions without return statement are just procedures.

## Inheritance vs Composition

Inheritance is a super class extended to smaller pieces that add or overwrite things

Composition is smaller pieces combined to create somthing bigger

In inheritance we are concerned about structuring our code around what something is
In composition we are concerned about structuring our code around what something has or what it does to data.

### Inheritance and thight coupling

_thight coupling_: repling effect after changing a small thing in your parent class,_thight coupling_ can generate :

1. _fragile Base Class Problem_, if you change something in your class you have to make sure it does'nt break anythings in its subclasses.

2. _Hierarchy Problem_: can leads to "gorilla banana" problem: when a subclass inherit properties and methods it does'nt need, it's like wanting a banana you instead get a gorilla, holding your banana and the all jungle with it.

> lots of programmers argue that composition is a better solution long term than inheritance, because software created with composition is more stable and easy to extend.

> inheritance :
>
> - few operation on common data
> - stateful
> - side effect
> - imperative

> Composition :
>
> - Many operation on fixed data
> - stateless
> - pure
> - declarative
