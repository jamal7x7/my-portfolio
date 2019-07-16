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

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

---

resource1: 'https://tylermcginnis.com/javascript-visualizer/'
resource2: 'http://pythontutor.com/javascript.html#mode=edit'
resource2: 'http://int3.github.io/metajs/'
