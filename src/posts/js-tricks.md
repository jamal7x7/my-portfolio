---
title: "JavaScript Tricks"
date: "April 27, 2019"
---

## Content

> 1. Schema
> 2. Queries
> 3. Mutations
> 4. Sunbscriptions

---

## return unique values

```javascript{numberLines: true}
var j = [...new Set([1, 2, 3, 3])] >> [1, 2, 3]
```

## filter falsy values (0, undefined, null, false, etc.) out of an array?

```js
myArray
  .map(item => {
    ...
  })
  // Get rid of bad values
  .filter(Boolean)
```

## Create Empty Objects

```js
let dict = Object.create(null) // dict.__proto__ === "undefined", No object properties exist until you add them.
```

## Require Function Parameter

```js
const isRequired = () => {
  throw new Error("param is required")
}

const hello = (name = isRequired()) => {
  console.log(`hello ${name}`)
}

// This will throw an error because no name is provided
hello()

// This will also throw an error
hello(undefined)

// These are good!
hello(null)
hello("David")
```
