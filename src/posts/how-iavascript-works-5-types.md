---
title: 'How Javascript Works 5 : Types'
date: '2019-06-18'
view-source: 'https://tylermcginnis.com/javascript-visualizer/'
---

## Content

1. Static vs dynamic typed langage
2. Primitive types
3. Pass by reference vs by value
4. Type coercion
5. Arrays, Functions, Objects

---

<br/>
<br/>
<br/>

All programming langage have types, they are the building blocks that allow as to write in that langage, there two types of languages: dynamically and statically typed langage,

## Primitives

- _null_
- _undefined_
- _Number_: 7
- _String_: "Hello!"
- _Boolean_: true/false
- _Object_: {}
- _Symbol_: Symbol('Hello Again!')

Javascript has an operator colled _typeof_ that tells us the type of an item
so:

```js
typeof null // 'object' which is weird!
typeof Undefined // 'undefined'
typeof 7 // 'number'
typeof 'Hello!' // 'string'
typeof {} // 'object'
typeof true // 'boolean'
typeofSymbol('Hello Again!') // 'symbol'
```

The first exemple `typeof null // 'object'` is a bug, even Brandon Eickh aknowledged it, why it did'nt get fixed? there is actually a proposal to fix it but because it would break existing legacy code. [read this article for more...](https://2ality.com/2013/10/typeof-null.html)
