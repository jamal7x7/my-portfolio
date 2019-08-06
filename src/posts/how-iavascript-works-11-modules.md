---
title: 'How Javascript Works 11 - Modules'
date: '2019-08-06'
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

To help organize and strucure our code along side OOP and FP, we distrubute different part of our code into _modules_

## what are modules?

_modules_ are files containing different part of our code, they help with organizing and separate the concerns of our program, they help also with encapsulating and protecting our dat, so problems like memory leaks, poluting the global scope, handering performance... that occures with writing every thing in one files won't be a thing,

how? we can't just stack js files into separate html tags because they act like if you combine them into one file, this could generate name conflict, a variable in one file can be overwriten by another in a differrent forgotten file, imagine if we have a big project with a lot of js files, how many variable names we should remember, so we won't accedentaly use the some name again

one early solution to this is :

## module pattern

we have diferrent scope in js

```js
// Global scope
//..// module scope
//....// function scope
//......// block scope
```

so we can use IIFE to protect our data inside the function scope

```js
;(function() {
  // private data
})()
```

or better, we can just wrape the entire file inside an IIFE return what we want, asseign it to a variable and we have ourselves a module, problem solved!

```js
var IIFEModule = (function(globalVar) {
  // private data
  x: 1
  y: 2
  z: 3
  globalVar += z
  return {
    x: x,
    y: y,
  }
})(globalVar)
```

with this pattern, we protect what we want and reveal what we want

the issue with this type of modules is

- we are still poluting our global space with the name of the IIFE, althoght we minimize them sebstantialy.

- we still don't know all the dependencies, so we have to make sure the order of all the script tag is correct

can we solve these Two problems?

## CommonJS and AMD (Asyncrounous Module Definition)

in CommonJS we can do:

```js
var module1 = require('module1')
var module2 = require('module2')
var g = require('module3').g

function f() {
  // do something
}

module.exports = {
  f: f,
}
```

recognize this pattern from node js?
npm the 'node package manager' service becomme a huge seccess with this easiness of sharing code.

CommonJS was mainly used in servers because the time it will make a module(s) to load to a client browser will slow down the page (providing a bad UX)

browserify was created to require('modules') in the browser using smart bundling of all the dependencies,

```js
|$ > browserify main.js -o bundle.js
```

and drop it in your html

```html
<script src="bundle.js"></script>
```

other simillar module bundlers like browserify: webpack, parcel ... do the same thing

remember this is to solve the scripts tag order problem.

with CommonJS and module bandlers we get ourselves fully fonctioning modules in javascript

### AMD (asyncrounous module definition)

AMD are designed for browsers, they help load modules asyncronously as we need them, they look like this:

```js

//Calling define with a dependency array and a factory function
define(['dep1', 'dep2'], function (dep1, dep2) {

var module1 = dep1
var module2 = dep2


function f() {
  // do something
}

    //Define the module value by returning a value.
return {
  f: f,
}
```

##

dependencie resolution and global scope polution are now resolved using either commonJS or AMD, here is the problem, wich one to choose and how to keep track of modules using this or that type, UMD(Universal Module Definition) was suggested as a solution but it was just a simple ìf this then that statement, why not to add a native modules management pattern directely to javascript, well, js community united, shouted wanting native module support, TC39 complied with the introduction of the _ES6 Modules_ built-in directly onto javascript

## ES6 Modules

first we write our modules using the new import/export syntax:

```js
import module1 from 'module1'
import g1, { g2, g3 } from 'module2'

export function f() {
  // do something
}
export default function f2() {
  // do something
}
```

second, we add `type="module"` to our script tags with the full relative script path in `src`argument :

```html
<script type="module" src="./script.js"></script>
```

and finally serve our files using an _http server_ like 'live-server' to load our page( loading it directly to a browser won't work!)

## last word

with ES6 modules it's now easy to devide our program unto smaller 'independent' chanks, delegate them to different dev teams, and enjoy freedom.
