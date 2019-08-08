---
title: 'How Javascript Works 12 - Error Handling'
date: '2019-08-06'
view-source: 'https://tylermcginnis.com/javascript-visualizer/'
---

# Error Handling

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

Error === Exeptions,
think of Errors as feature to improve our code, not just mistakes, handling them is a way to be a better programmer.

## what are ?

in JS there is an _Error_ constructor function and we can create instances of it by `new Error('message')`

and if we write `throw new Error('oops!')`, it will stop the execution of your program unless you handle it somehow.

> we can throw every thing, boolean, numbers, strings...

an error instance has three properties:

```js
const myError = new Error('oopse!')

myError.name // 'error'
myError.message // 'oopse!'
myError.stack // 'Error: oopse! at <...> :...:...' <- where the error is located in the call stack!
```

js has other error constrauctor function:

```js
new SyntaxError //  SyntaxError at <...> :...:...
//like
{ ) // uncaught SyntaxError: Unexpected token )
```

there is also

```js
new ReferenceError() //  ReferenceError at <...> :...:...
//like
x // VM279:1 Uncaught ReferenceError: x is not defined at <anonymous>:1:1
```

these type of errors are _thrown_ and stop the execution of our code

## how to hundle them

---

### | ERROR |

---

### | is there a catch ? |

---

### | is there a catch ? |

---

execute runtime catch: onerror() or
process.on('uncaughtExeption') for node js

to keep your program running you have to adress these hurdles by using

```js

try{} catch{}
//or
catch()

```

exemple:

```js
function oopse() {
  try {
    console.log('Hi! it works')
  } catch (erroe) {
    console.log('oopse', error)
  }
}

oopse() // Hi! it works
```

```js
function oopse() {
  try {
    consolelog('Hi! it works')
  } catch (error) {
    console.log('oopse!!', error)
  }
}

oopse() // oopse!! ReferenceError: consolelog is not defined
// at oopse (<anonymous>:3:5)
// at <anonymous>:9:1
```

using finally

```js
function oopse() {
  try {
    console.log('Hi! it works')
    throw new Error('errrrror!')
    consolelog('HOLA!')
  } catch (error) {
    console.log('oopse!!', error)
  } finally {
    console.log('always execute!')
  }
}

oopse()
//> oopse!! Error: errrrror!
//    at oopse (<anonymous>:4:11)
//    at <anonymous>:1:1

//> always execute!
```

> we can nest try catch if we want
> try catch only works only with syncrounous code

```js
try {
  setTimeout(function() {
    x // <- this variable doesn't exist
  }, 1000)
} catch (error) {
  console.log('oopse!!', error) // this is ood! suppose not to catch but it does after 1s
}

// VM481:3 Uncaught ReferenceError: x is not defined
//   at <anonymous>:3:5
```

## Async errors

```js
Promise.resolve('async oopsie')
  .then(res => {
    throw new Error('Failed')
    return res
  })
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    // we add this method  'catch()' to catch otherwise what it suppose to be "dangerous silente fail"
    console.log(err)
  })

//> Error: Failed
//   at <anonymous>:3:11
//>Promise {<resolved>: undefined} // <- What!!! it does execute!
```

> always catch somthing after each Promise

> async / await is little more sympler

always wrape your async / await in try catch blocks

```js
async function oopse() {
  try {
    await Promise.reject('oopse')
  } catch (err) {
    console.error(err)
  }

  console.log('still good!')
}

oopse()
//> oopse
// still good!
//> Promise {<resolved>: undefined}
```

## extend Error Constructor

to customize your Errors to make them more expressive and more secure you can :

```js
class authenticationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ValidationError'
    this.message = message
  }
}
class PermissionError extends Error {
  constructor(message) {
    super(message)
    this.name = 'PermissionError'
    this.message = message
    this.x = 1234
  }
}
class DatabaseError extends Error {
  constructor(message) {
    super(message)
    this.name = 'DatabaseError'
    this.message = message
  }
}

throw new PermissionError('A permission error')
```
