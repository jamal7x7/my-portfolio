---
title: 'How Javascript Works 4 : This'
date: '2019-06-16'
view-source: 'https://tylermcginnis.com/javascript-visualizer/'
---

## Content

1. what is 'THIS'
2. Variable enveronement
3. Arguments
4. Scope

---

<br/>
<br/>
<br/>

Here we go, we finally arrive at a land were magic and wowo reins over reason and logic, a land where the vortex of uncertainty and bamboozlement struck fear in the heart of some of the finest knights of the script, I even heard that innocent devs get sucked into a dizzying whirl of confusion and madness leaving nothing but shrieking screams of horrors -and uncomplete project- behind them, some develop a chronic phobia against its convoluted nomination,they even speak of it as the 'what we don't speak of!' trying to avoid the term in their code at any cost, others just couldn't take it anymore, so they just run away-before their brains explode, ladies and gentlemen, look at your steady feet for the last time, we will soon step on the land of _'THIS'_. buckle up and let's carefully explore.

## what is 'THIS'

Even if you heard lots of horor storis about _this_, at its core _this_ isn't that hard, what _this_ means is this:

> _this_ is the object that the function is a property of.

```js
obj.func(this)
```

We have an object _obj_, that have a function _func_ and inside of this function we have access to _'this'_ keyword, and _'this_' refers to _obj_ that _func_ is a property (or method) of.

confused yet let's look at this exemple:

```js
function f() {
  console.log(this)
}

f() // 'Global Object' (== 'Window' if you run this code in a browser console)
```

We get the _global object_ because the function 'f' is a property of our global object, in other terms we're simply calling `Window.f()`.

but accessing the global object as this code does, is something to avoid, that's one of the pitfulls that generate bugs and headeacks for developers.(we can use 'use strict' as a solution)

in the global execution context we get _'this'_ out of the box but also in a function execution context as well

//!TODO ILLUSTRAION

### Why

but why? what is the use of _this_ in a function that always refers to the _global object_? look at this code:

```js
var ReingnOne = {
  name: 'Narnia',
  speakSlogan() {
    return 'Narnia' + ', land of Courage and dear heart'
  },
}

var ReingnTwo = {
  name: 'Rivendell',
  speakSlogan() {
    return 'Rivendell' + ', Humans last resort'
  },
}
```

Or simply we can use...'what we dont speak of!'

```js
var realmOne = {
  name: 'Narnia',
  speakSlogan() {
    return this.name + ', land of Courage and dear heart' // 'this' refers to 'realmOne' object
  },
}

var realmTwo = {
  name: 'Rivendell',
  speakSlogan() {
    return this.name + ', The Last Homely House East of the Sea' // 'this' refers to 'realmTwo' object
  },
}

realmOne.speakSlogan() // 'Narnia, land of Courage and dear heart'
realmTwo.speakSlogan() // 'realmTwo, the Last Homely House East of the Sea'
```

rule of thumb: _'this'_ refers to whatever to the left of the dot.

### other exemple

```js
var realmOne = {
  name: 'Narnia',
  speakSlogan() {
    return this.name + ', land of Courage and dear heart' // 'this' refers to 'realmOne'
  },
  speakLouder() {
    var loud = this.name + ', land of Courage and dear heart'
    return loud.toUpperCase()
  },
}

realmOne.speakSlogan() // 'Narnia, land of Courage and dear heart'
realmOne.speakLouder() // 'NARNIA, LAND OF COURAGE AND DEAR HEART'
```

notice the repetitiveness ( not DRY), a better way is:

```js
var realmOne = {
  name: 'Narnia',
  speakSlogan() {
    return this.name + ', land of Courage and dear heart' // 'this' refers to 'realmOne'
  },
  speakLouder() {
    return this.speakSlogan().toUpperCase()
  },
}

realmOne.speakSlogan() // 'Narnia, land of Courage and dear heart'
realmOne.speakLouder() // 'NARNIA, LAND OF COURAGE AND DEAR HEART'
```

Two benefits of using _'this'_:

1- gives methodes access to their object
2- execute the same code for multiple objects

the second benifit is shown here:

```js
function sayHero() {
  console.log(this.hero)
}

var hero = 'X'

var realmOne = {
  name: 'Narnia',
  hero: 'Aslan',
  speakSlogan() {
    return this.name + ', land of Courage and dear heart' // 'this' === 'realmOne'
  },
  speakLouder() {
    return this.speakSlogan().toUpperCase() // 'this' === 'realmOne'
  },
  sayHero,
}

var realmTwo = {
  name: 'Rivendell',
  hero: 'Aaragon',
  speakSlogan() {
    return this.name + ', The Last Homely House East of the Sea' // 'this' === 'realmTwo'
  },
  speakLouder() {
    return this.speakSlogan().toUpperCase() // 'this' === 'realmTwo'
  },
  sayHero,
}

sayHero() // 'X'
realmOne.sayHero() // 'Aslan'
realmTwo.sayHero() // 'Aaragon'
```

this way we make our code simpler and cleaner, we're not repeating ourselves.

### review

> 'this' === the answer to the execution context asking _'Who called me?'_

### static vs dynamic scope

let's look now at this code:

```js
var country = function() {
  console.log('from country function scope: ', this)
  var city = function() {
    console.log('from city function scope: ', this)
    var citizen = {
      name: 'Kan',
      sayName() {
        console.log('from citizen: ', this)
      },
    }
    citizen.sayName()
  }
  city()
}

country()
// 'from country function scope: global object(Window)'
// 'from city function scope: global object(Window)'
// 'from citizen: {name: "Kan", sayName: ƒ}'
```

_'this'_ refers to the global scope for the function `country()` because it's lixicaly written on the global object (`country === window.countery` who calls our function? -window -window it is!) , the weird thing now is that _'this'_ in `city()` refers to the same object as `country()`! the reason is that in each execution context _'this'_ keyword get defined: -how? -it refers to the object calling the function at hand, -and who's calling `city()` still the global object (or window), so we can basically (in this case) refactor our code to look like this without changing the result:

```js
var city = function() {
  console.log('from city function scope: ', this)
  var citizen = {
    name: 'Kan',
    sayName() {
      console.log('from citizen: ', this)
    },
  }
  citizen.sayName()
}

var country = function() {
  console.log('from country function scope: ', this)
  city()
}

country()
// 'from country function scope: global object(Window)'
// 'from city function scope: global object(Window)' we
// 'from citizen: {name: "Kan", sayName: ƒ}'
```

the execution follow this order `[window.[country()] [window.[city()]]`, what's in the left of the dot? -window -window it is!

for `sayName()` function, it is called after `citize.` so _'this'_ in it will refer to citizen

### important remark

variables depends on where the function is written(_lexical scope_), but the keyword _'this'_ depends only on how it's called(_dynamic scope_) and it default to the global object if no other object claims it.In fact,every thing in javascript is lexically scoped exept the keyword '_this_' it's dynamivally scoped.

```js
var shape = {
  shape: 'square',
  length: 10,
  saySurface() {
    console.log(this.length ** 2 + ' m^2')
    var saySurfaceInImperial = function() {
      console.log((this.length * 3.28) ** 2 + ' foot^2')
    }
    saySurfaceInImperial()
  },
}

shape.saySurface()
//100 m^2
//0 foot^2' !!!
```

we can remedy this pitfal in 3 ways
-using arrow function (es6 arrow functions are lexically bound ), so `saySurfaceInImperial` will look like:

```js
var saySurfaceInImperial = () => {
  console.log((this.length * 3.28) ** 2 + ' foot^2')
}
```

-using the `var self = this` technic, so `saySurface` will look like:

```js
saySurface() {
    console.log(this.length ** 2 + ' m^2')
    var self = this // 'this' here refers to the object 'shape'
    var saySurfaceInImperial = function() {
      console.log((self.length * 3.28) ** 2 + ' foot^2')
    }
    return saySurfaceInImperial.bind(this)
  }
  // and shape.saySurface()() to run to returned function
```

-or using the bind(), call, applay() methods, so `saySurfaceInImperial` will look like:

```js
var saySurfaceInImperial = () => {
  console.log((this.length * 3.28) ** 2 + ' foot^2')
}
```

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/`

---

resource1: 'https://tylermcginnis.com/javascript-visualizer/'
resource2: 'http://pythontutor.com/javascript.html#mode=edit'
resource2: 'http://int3.github.io/metajs/'
