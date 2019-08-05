---
title: 'How Javascript Works 10 - Asynchronous js'
date: '2019-07-28'
view-source: 'https://tylermcginnis.com/javascript-visualizer/'
---

# Asynchronous javascript

[//]: # '## Content'

1.

2)

3.

4.

5.

---

<br/>
<br/>
<br/>

Async means "we don't have your request right now" !

when interacting with a website you're sending request to servers where the data of the site is hosted, servers do their magic ( authentication, authorization, calculation, fetching ... ) and send back the response, this operation take time, as a result it make your experience less enjoiable, irritable even,
how to deminish this bad user experience, by using asyncrounous javascript.

javascript is _single threded_, having only one call stack it can do one thing at a time (to keep it simple and focused so we do not have to deal with some complex multi-threded scenarios like: Deadlocks), but also javascript is _non-blocking_ we can 'pause' portion of our js code until it's ready and wail waiting for it, continue executing the rest of the code that does'nt depend on that paused portion.

```js
const first = () => console.log('first, Done!') //do something
const second = () => {
  //do some heavy calculation that demand a long time to execute
  console.log('second, +@*/+_^%! Done!')
}
const third = () => console.log('third, oogh finally, Done!') // to do something else

first() // ladies first!
second() // our execution is blocked here, we can't procede until it's finished!
third() // then comes the turn of this poor function
```

## javascript run-time environment

```js
const first = () => console.log('first, Done!') //do something
const second = () => {
  setTimeout(() => {
    console.log('second, +@*/+_^%! Done!')
  }, 2000)
}
const third = () => console.log('third, Done!') // to do something else

first() // first!
second() // our execution is no more blocked here, we can procede
third() // come second this time

// >> 'first, Done!'
// >> 'third, Done!'
// >> 'second, +@*/+_^%! Done!'
```

what hapened?

'setTimeout()' is part of _Web API_ beside DOM and AJAX ...so it will leave the call stack (leting what comes after to jump in), do its thing, wich is just waiting(even if we pass 0ms to to second parameter)! reserve a place in the _callback queue_,and when its turn comes, check with the event loop if the call stack is empty, then execute.

!TODO Illustration of javascript run-time environment without job queue

## Promises

A _promise_ is an object that may produce a single resolved or rejected value some time in the future.

a promise has 3 state:

1. fulfilled
2. rejected
3. pending

```js
function getUsers() {
  fetch(`https://jsonplaceholder.typicode.com/users`)
    .then(response => response.json())
    .then(json => console.log(json))
}

//get user data
getUser()
```

## Async / await

buil on top of promises that make our code easy to read

```js
async function getUsersAsync() {
  let response = await fetch(`https://jsonplaceholder.typicode.com/users`)
  let data = await response.json()
  return data
}

getUsesrAsync().then(data => console.log(data))
```

## Job Queue

_Job queue_ or _Microtask queue_ has been added to the event loop environment (implemented in all major browsers in their new releases) with the introduction of promises in javascript, it does the job of the callback queue but with a heigher level of priority, promises resolved or rejected pass throught first then what ever what's in the callback queue.

So a callback queue will watch for the call stack if its empty, watch if the job queue is empty then pass its content to the call stack to be executed.

!TODO Illustration of javascript run-time environment with job queue

```js
// Call Stack
setTimeout(() => {
  console.log('1, Done!')
}, 0)
setTimeout(() => {
  console.log('2, Me to Done!')
}, 1000)

// Job Stack
Promise.resolve('3, no husle!').then(console.log)

console.log('4, last come first served!')

// 4, last come first served!
// 3, no husle!
// 1, Done!
// 2, Me to Done!
```

## Parallel, sequential and race
