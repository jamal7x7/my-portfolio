---
title: 'How Javascript Works 08 : Object Oriented Programming'
date: '2019-07-28'
view-source: 'https://tylermcginnis.com/javascript-visualizer/'
---

# Object Oriented Programming

[//]: # '## Content'

1. in persuit of Perfect code

2. from procedural to OOP

3. Classes

4. OOP pillars

---

<br/>
<br/>
<br/>

There are two programming paradigm: Object Oriented and functional Programming, javascript can do both,

## in persuit of the perfect code

Principles for a good code using OOP or FP:

1. Clear & Understandable
2. Easy to extend, adding features and functionality
3. Easy to maintain
4. Memory efficient
5. DRY

from machine code to procudural style programing (step-by-step programing) to OOP to FP our concept of programming and how to write a better code evolved and we gathered along the way a good amount of efficient and best programming paractices.

### OOP vs FP

Data + behaviors(what the programme can do) are the two principal component of every programme, to organise this program we have two approches or two paradigms:

OOP : fusing ,packaging, bundling coherent data + behaviors in a single location called _object_(Java), so we wont waist time and energy chasing and hunting down the wright functionality or the desired data sprinkeled here and there in a multitude of places.
FP: data and behaviors should be keept separed for clearity (scheme)

lucky for us we can do both using javascript(java + scheme), since it is a multi-paradigm programming language,so based in our problem we can choose the apropriete technic to write a good solution.

OOP: is all about modeling real world objects, in OOP we build boxes containing information and operations, or state and state management actions, like:

```js
const object = {
  shape: 'cube',
  dimensions: [10, 10, 10],
  weight: 1400,
  color: 'red',
  caculateVolume() {
    return this.dimensions.reduce((prev, curr) => prev * curr)
  },
  caculateDensity() {
    return this.weight / this.calculateVolume()
  },
  speak() {
    console.log(
      ` I am a ${this.color}${this.shape}, my dimensions are ${
        this.dimensions[0]
      }cm x ${this.dimensions[1]}cm x ${
        this.dimensions[2]
      }cm, that's ${this.calculateVolume()} cm cube of volume with ${this.calculateDensity()}grame per cm cube of density`
    )
  },
}
```

> There 2 main types of OOP: class based and prototype based languages

## from procedural to OOP

```js
const cube = {
  color: 'red',
  speak() {
    console.log(` I am a ${this.color} cube`)
  },
}
const pyramid = {
  color: 'yellow',
  speak() {
    console.log(` I am a ${this.color} pyramid`)
  },
}
```

repetitive code, not DRY, we can do better by using:

### factory functions

a factory function is a function that returns an object:

```js

function createToy(shape, color) =
return {
  shape,
  color,
  speak() {
    console.log(` I am a ${color} ${shape}`)
  },
}

const redCube = createToy('cube', 'red')
redCube.speak() // 'I am a red cube'

const yellowPyramid = createToy('pyramid', 'yellow')
redCube.speak() // 'I am a yellow pyramid'

```

that's better, but we have to allocate memory each time we create an object using this factory function, that's good for state _shape_ and _color_ ,because they take new values each time we create a new object, but we waist memory to store the same method _speak()_ in the proccess.

A 1000 object, that's 999 copie of the same method stored in different places.

not memory efficient, we can do better by using:

### prototype inheritance

```js

const toyStore = {
 speak() {
    console.log(` I am a ${this.color} ${this.shape}`)
  },
}

function createToy(shape, color) =
return {
  shape,
  color,

}

const redCube = createToy('cube', 'red')
redCube.speak = toyStore.speak
redCube.speak() // 'I am a red cube'

const yellowPyramid = createToy('pyramid', 'yellow')
yellowPyramid.speak = toyStore.speak
redCube.speak() // 'I am a yellow pyramid'

```

still repetitive, how about:

```js

const toyStore = {
 speak() {
    console.log(` I am a ${this.color} ${this.shape}`)
  },
}

function createToy(shape, color) =

let newToy = Object.create(toyStore) // <- like: newToy.__proto__ = toyStore
console.log(newToy.__proto__) // { speak: Function }

newToy.shape = shape,
newToy.color = color,

return newToy
}

const redCube = createToy('cube', 'red')
redCube.speak() // 'I am a red cube'

const yellowPyramid = createToy('pyramid', 'yellow')
redCube.speak() // 'I am a yellow pyramid'

```

now each creation share the use of the same methode `speak()` cituated in only one place in memory, so this is it, we solve all our problems, not yet, the look of our code isn't there yet, how can we improve it to look like a real object, by using:

### Constructor functions

```js
function Toy(shape, color) {
  // by convention  a constructor function start with a capital letter
  this.shape = shape
  this.color = color
}

//or
/*const Toy2 = new Function('shape', 'name', `
  this.shape = shape
  this.color = color
`)*/

Toy.prototype.speak = function() {
  console.log(` I am a ${this.color} ${this.shape}`)
}
// ^ we should not use fat arrow '=>' because arrow functions are lexically scoped: 'this' is not dynamic here, it will reffer to the global object.

const redCube = new Toy('cube', 'red')
redCube.shape // 'cube'
redCube.color // 'red'
redCube.speak() // 'I am a red cube'

const yellowPyramid = new Toy('pyramid', 'yellow')
redCube.speak() // 'I am a yellow pyramid'
```

the keyword `new` changes what the keyword `this` point to, so rather than pointing to the global object, `this` point to the object we are creating _redCube_, _yellowPyramid_.

every function has a property, a special countainer called _prototype_, useless for regular functions, for constructor functions it become usefull.

for exemple :

```js
Function.prototype // { call, applay, bind, name, arguments ...}

Array.prototype // { map, reduce, forEach, join, concat, splice, pop, push ...}

String.prototype // { toUpperCase, toLowerCase, split, trim, chartAt, concat, match, includes ...}

Toy.prototype // { speak }
```

_prototype_ allow us to add functonality ( speak() ...) to our constructor later on as we need them, and every instence created from this constractor has access to it as well, remember _prototype inheretence_.

> P.S: technicaly in javascript, everything is an object. exept null and undefined we have a constructor function for everything so we have method we can use.

So did we reach our goal, sure, we did simplify it since last time, but the style and the over all shape of our code is not that pretty (well, it's a matter of test) and brain-power demanding, not everyone understand how inheretence and _this_ works in javascript, can we do better?
yes, we can! by :

## Classes

OOP was created with _Class_ idea in mind, javascript is cappable of OOP, as we did see, but using the prototype aproach, lot of people didn't like the prototype way of doing thier OOP, so TC39 commitee gathered and finally granted the _class_ keyword to exist in ES6 release, what are these classes:

> Classe : is a blueprint of the object (proprties and methods) we want to create.

we can simplify the above _constructor function_ to look like this:

```js
class Toy {
  // a class start with a capital letter

  constructor(shape, color) {
    this.shape = shape
    this.color = color
  }

  speak() {
    console.log(` I am a ${this.color} ${this.shape}`)
  }
}

const redCube = new Toy('cube', 'red') // called 'instanciation'
redCube.speak() // 'I am a red cube'

const yellowPyramid = new Toy('pyramid', 'yellow')
redCube.speak() // 'I am a yellow pyramid'
```

classes work like a container of all your functionality, properties, methods, states, actions ... all together in one place, that's the benifit of using _classes_ over _prototypes_.

with classes we create instances wich are objects with predefined structure, created according to our class blueprint.

for exemple: `redCub` is an instance of `Toy`, also `yellowPyramid` is an instance of `Toy`

```js
redCube instanceof Toy // true
yelloPyramid instanceof Toy // true
```

Under the hood classes in javascript uses prototype inheretence, so they are just 'syntactic suguar` (they don't work like "true" classes in other languages).

Historical fact: why javascript didn't have classes from the beginning, well According to Eich,

> If I had done classes in JavaScript back in May 1995, I would have been told that it was too much like Java or that JavaScript was competing with Java … I was under marketing orders to make it look like Java but not make it too big for its britches … [it] needed to be a silly little brother language.

so Brandon was prohibited to create a sophisticated and pro language like Java , but he end up with a language so flixible that you can project your own style and patterns on it, it can do what ever you want with it, and later on, with gradual improvement, allowed by it's multi-paradigm approach,it become so strong and so powerful it throws the initial restrictions to shame!

## this, again

now we have 4 cases to know which objects _this_ refers to:

1. _new_ binding
   with classes and constructors, refers to the instance created.

2. implicit binding
   the most obvious,refers to the object created.

3. explicit binding
   using `bind(), apply() and call()`, refers to what's inside the _()_.

4. arrow function
   arrow functions are lexically scoped

## OOP Pillars

1. Encapsilation (Grouping of information)
   from procudural programming with no structure to organising code in small unit, modeling the real world, helping maintainability, security and reusability.

2. Abstraction (Hiding of information)
   hiding complexity and providing simple interfaces, rather than learning all about _how_ prototype inheretence works and prototype this prototype that, all you have to know to begin creating your application, is _what_ do want to do with your data (by organising it into classes and subclasses), and let the language take care of the implementation.

3. Inheritence (Sharing of information)
   eliminating redundant code, for performance and reusability.

4. Polymorphism (Redifining of information)
   dynamicaly call the same method on defferent objects, customizing it to its environment.

<br/>
<br/>
<br/>
---

[interview with Eick](https://www.computer.org/csdl/magazine/co/2012/02/mco2012020007/13rRUy08MzA)
