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


## Increment (++) 

If used postfix, with operator after operand (for example, x++), the increment operator increments and returns the value **before incrementing**.

If used prefix, with operator before operand (for example, ++x), the increment operator increments and returns the value **after incrementing**.


```js

var x = "5"
x=x+1       //"51"   
x           //"51"  coerce number 1 to String "1" and do the string concatenation

var y = "5"
y++        //5  coerce String "5" to number 5 
y          //6


```

from JS Specs:
## 12.4.4.1 Runtime Semantics: Evaluation
UpdateExpression:LeftHandSideExpression++

1. Let lhs be the result of evaluating LeftHandSideExpression.
2. Let oldValue be ? ToNumeric(? GetValue(lhs)).
3. Let newValue be ! Type(oldvalue)::add(oldValue, Type(oldValue)::unit).
4. 5Perform ? PutValue(lhs, newValue).
5. Return oldValue.

which means : 

```js
function plusPlus(x) {

  var x_coerced = Number(x)
  x = x_coerced + 1

  return x_coerced
}

var x = "5"
plusPlus(x)    //5
x              //6

```

## 0 and -0 (for direction at rest...)

```js
Math.sign(-5)  // -1
Math.sign(5)  // 1
Math.sign(-0)  // -0 ???? 😱
Math.sign(0)  // 0  ???? 😱

// to fix this weird behavior use this function instead:

function sign(x) {
  return x!==0 ? Math.sign(x) : Object.is(x ,-0) ? -1 : 1
}

sign(-0)  // -1 👍
sign(0)  // 1  👍

```

### ToString!!!

```js

"" + [,] //-> ""
"" + [,,] //-> ","
"" + [null] //-> ""
"" + [null,] //-> "" 
"" + [,null] //-> ","

```