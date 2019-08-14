---
title: 'How Javascript Works 5 : Types'
date: '2019-06-18'
view-source: 'https://tylermcginnis.com/javascript-visualizer/'
---

# Types

[//]: # '## Content'

1. Types in javascript
2. Pass by reference vs by value
3. Type coercion
4. Static vs dynamic typed languages
5. Strong vs weak typed languages

---

<br/>
<br/>
<br/>

All programming langage have types, they are the building blocks that allow as to write in that langage, there two types of languages: dynamically and statically typed langage,

## types in javascript

There are only 7:

- _null_: has one value => null
- _undefined_: has one value => undefined
- _number_: has exactly 18437736874454810627 (that is, 2^64 - 2^53 + 3) values [7]
- _btring_: from zero to 2^53 - 1 elements(UTF-16 code unit value) ['hello']
- _boolean_: can be one of the two values {true, false}
- _symbol_: [Symbol('Hello Again!')]
- _object_: {}

> _bigint_ the 8th new primitive, still in stage 4 already implemented in V8

Javascript has an operator colled _typeof_ that tells us the type of the value of a variable:
so:

```js
//Primitives
typeof null // 'object' which is weird!
typeof Undefined // 'undefined'
typeof 7 // 'number'
typeof 'Hello!' // 'string'
typeof true // 'boolean'
typeof Symbol('Hello Again!') // 'symbol'

//Non-Primitives
typeof {} // 'object'
typeof function() {} // 'function' whaaaaaat!!!
typeof [] // 'object'
```

### P.S

> The first exemple `typeof null // 'object'` is a bug, even Brandon Eickh aknowledged it, why it did'nt get fixed? there is actually a proposal to fix it but because it would break existing legacy code, they didn't bother to carry on, remember, javascript was creatd in just 10 days. [read this article for more...](https://2ality.com/2013/10/typeof-null.html)

> another weird thing is `typeof function () {} // 'object` lets accept its an object, then we can do:

```js
var f = function() {
  //do something
}
f.hi = 'Hi!'
console.log(f.hi) // 'Hi!'

// remember this: in javascript everything is an object(if it walk like a duck, and kwak like a duck, then it's an object!), well sort of but this is a *false* statemnet, more on that later.
```

> Primitives are indivisible, they can not be divided in smaller part, they occupy one place in memory, thay are in fact the building blocks of the entire langage.

> As for non-primitive values they dont contain the actual values directly, they contain,rather, a pointer, an address, a reference to the actual real data in memory

> There is a lot of [_standard built-in object_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) in javascript that allow us to sneakilly wrap a value -no matter what type it has- in an object to let us use some of its method like`Boolean('true').toString() //'true'`

> To test if a variable is an array we can't simply type `typeof [1,2,3]` because it will return 'object', use `Array.isArray([1,2,3]) // true` instead.

> In javascript variables don't have types, values do (unlike java, C, C++ ...)

> <br/>
> <br/>

## 3. Pass by reference vs pass by value

Primitives are passed by value:

```js
var x = 1
var y = x

y--

console.log(y) //0
```

so we passed the value of _x_ (which is 1) to _y_ , it is exactly as if we declared `var y = 1`,we copied what ever in the memory linked to _x_ and pasted it to another part of the memory linked to _y_ (they become separed at the end)

Objects are passed by reference:

```js

var obj1 = {shape: 'circle', color: 'green'}
var obj2 = obj1

obj2.color = 'red'

console.log(obj1) // {shape: 'circle', color: 'red'}
console.log(obj2 // {shape: 'circle', color: 'red'})
obj1.color === obj2.color // true

```

we passed the value of _obj1_ to the value of _obj2_ by **reference**, they become _bound_, if we changed one of its properties it will update for the other as well because they are pointing to the same data in memory, they are _entangled_ (like qantum entanglement you know : ).

but why not just,chill and, pass everything by value spearing us the unecesery headackes, one reason is to save memory, wich was and still a huge programing concern,

> P.S: reactive programming use the same paradigm as passing values by reference [read this article for more...](http://paulstovell.com/blog/reactive-programming)
> to pass the value of an object by value we do the following:

```js
var obj = { shape: 'circle', color: 'green' }
var clone = Object.assign({}, obj)
//or the more clean and consise es6 way:
var clone2 = { ...obj }

obj.color = 'red'
console.log(obj.color) // 'red'
console.log(clone.color) // 'green'
console.log(clone2.color) // 'green'
```

## Type coercion

_Type coercion_ or _type convertion_ (as ECMAScript calls it) is the ability of a language to convert a certain type to another, in order to perform an operation between two different types:

```js
true == 1 // true
false == 0 // false
'hello' + 10 // 'hello10'
```

- the _number_ 1 since it is `!= 0` will be converted to `true`
- 0 will be converted to `false`
- 10 become the _string_ '10' and then _concatenated_ at the end of 'hello'

javascript isn't strict about types as you see, it doesn't throw an error of unmatched types like other _“strongly typed”_ languages do, for exemple in phyton we get

```py

>>> 'hello' + 10
...
TypeError: cannot concatenate 'str'`and 'int' objects

```

python doesn't allow type coercion here but it will, as every other language does, at some point: every type is converted to zeros and ones when compiled to machine code and stored in memory at the end.

javascript is a bit _forgiving_, it tries to 'help' the programmer by making an implicit conversion of his data, think of it as if it possesses a bit of _artificial intelligence_ that tries to 'read our brains' and imitate our high level way of thinking:

> you give me X, you certainly mean Y based on the context.

Isn't that the core philosophy of creating a _heigh level_ programming languages in the first place, some poeple just dont get it! but this doesn't come cheap, there are rules to follow.

**NOTES**:

### ToPrimitive

the abstruct operation _ToPrimitive ( input [ , PreferredType ] )_ (as stated in [ECMAScript](http://www.ecma-international.org/ecma-262/10.0/index.html#sec-abstract-operations)) is a conceptual operation performing type coercion, invoqued any time there is a need (like doing math operations or concatinations) to convert a non-premitive (array, function, object...) to a primitive, it "converts its _input_ argument to a non-Object type. If an object is capable of converting to more than one primitive type, it may use the optional hint _PreferredType_ to favour that type."

_toPrimitive()_ :

- is recursive until it returns a primitive or throw an error
- is an algorithm (a set of steps) to convert a non-primitive to a premitive, it does the following:

In js there are two method that could be available for any non-primitive: `valueOf()` and `toString()`,so:

if _PreferredType_ is "number" -> apply `valueOf(input)` if it exist and if it returns a primitive, then _done_ if doesn't exist _or_ doesn't return a primitive -> aplly `toString(input)` if it returns a primitive, then _done_ if not -> generaly return an _Error_

and vis-versa if _PreferredType_ is "string": try `toString(input)` then `valueOf(input)`

### ToString

other abstruct operation _ToString ( argument )_ converts argument to a value of type String follows these rules:

```js

undefined --> "undefined"
null --> "null"
true --> "true"
false --> "false"
Number --> NumberToString(argument)
String --> argument
Symbol --> Throw a TypeError
object --> x = ToPrimitive(argument, hint String) ? -> ToString(x)
```

if argument is object:

```js
[] --> ""
[1,2,3] --> "1,2,3"
[null, undefined] --> ","
[null] --> ""
[undefined] --> ""
[[[],[],[]],[]] --> ",,,"
[,,,,] --> ",,,"

{} --> "[object Object]"
{x: 10} --> "[object Object]" // <- not very helpful *!TODO is there another way
{toString(){ return "Banana"}} --> "Banana" // JSON.stringify()


```

### ToNumber

invoked anytime we have to do a numeric operation, and we don't have a number.

```js

undefined --> NaN
null --> 0 // should be NaN
true --> 1 // should be NaN
false --> 0 // should be NaN
Number --> argument
String --> ...see below
Symbol --> Throw a TypeError
object --> x = ToPrimitive(argument, hint Number) ? -> ToNumber(x)
```

```js

"" --> 0 // why not just NaN ?! <- "the root of all evil in js"
"0" --> 0
"-0" --> 0
"    00002  " --> 2
"1.234" --> 1.234
"0." --> 0
".0" --> 0
"." --> NaN
"0xfa" --> 250

[] -->  | ToPrimitive([], hint Number) -> valueOf([]) -> toString([]) -> "" | -->ToNumber("")  --> 0

```

### Edge cases

javascript does its unintuitive magic sometimes, coercing what at first glance shoudn't be,there is even a [website](https://wtfjs.com/) didicated to that, but if we _know_ and follow the rules of coercion, it certainly will make sense.

some of this edge cases ( try not to pull your hair, if you still have any :)

```js
Number(true) //1
true + true // 2  !!!
true + true + true // 3  !!!
```

because `+ true // 1`

```js
'hi' + +"what's up!" // hiNaN !!!
```

because `+"what's up!" // NaN`

```js
9999999999999999 // 10000000000000000 !!!!
```

and the most famous of them all:

```js
0.1 + 0.3 === 0.4 // true
// but
0.1 + 0.2 === 0.3 // false  <- try to reason with this one!
```

because:

```js
0.1 + 0.0 // 0.1
0.1 + 0.1 // 0.2
0.1 + 0.2 // 0.30000000000000004  <- what, how, why javascript !!!
0.1 + 0.3 // 0.4 ...
```

```js
3 > 2 > 1 // false
1 < 2 < 3 // true
```

```js
'2' + 1 // '21'
'2' - 1 // 1
'2' - -1 // 3
```

```js
parseInt('01') // 1
parseInt('02') // 2
parseInt('03') // 3
parseInt('04') // 4
parseInt('05') // 5
parseInt('06') // 6
parseInt('07') // 7
parseInt('08') // 0 in older implementation, // 8 now
parseInt('09') // 0 in older implementation, // 8 now
parseInt('10') // 10
```

actually this one got 'fixed' in most browsers `parseInt(string, radix)` radix default to decimal (base 10) now not octal (base 8) as it use to be, but:

```js
> ['1', '7', '11'].map(parseInt) // [1, NaN, 3] <- Whaaaat!
```

because `map` passes three arguments (val, index, array) into parseInt on each iteration.

```js
> ['1', '7', '11'].map(val => parseInt(val)) // [1, 7, 11]
```

```js
var x = 012 // 10 <- yes, sure and I'm the queen of england
```

```js
typeof NaN == 'number' // true
```

```js
12.toFixed(2) // SyntaxError
12. toFixed(2) // SyntaxError
12 .toFixed(2) // '12.00'
```

```js
[] == ![] // true
[] + {} // '[object object]'
{} + [] // 0  because the {} is just a block not an object
```

```js
Number(undefined) // NaN
Number(null) // 0

Number({}) // NaN
Number([]) // 0

String({}) //'[object object]'
String([]) // ''
```

```js
String(null) // 'null'
String([null]) // ''

String(undefined) // 'undefined'
String([undefined]) // ''
```

```js
String([null, null]) // ','
String([undefined, undefined]) // ','
String([, ,]) // ','
```

```js
NaN == NaN // false
NaN === NaN // false
Object.is(NaN, NaN) // true
```

```js
const arr = Array(100).map((_, i) => i)
// arr[i] === undefined  //

//solution
const arr = [...Array(100)].map((_, i) => i)
// arr[i] === i  //
```

> P.S: To avoid some of type coercion gotcha! always use 3 equals unless you have a good reason to use 2, as demonstrated in [this site](https://dorey.github.io/JavaScript-Equality-Table/) and [this one](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness) too, and for more in depth about coercion read the ECMAScript Specification Algorithm [here](http://www.ecma-international.org/ecma-262/10.0/index.html#sec-abstract-equality-comparison)

<br/>
<br/>
<br/>

## Static vs dynamic typed language

Dynamically typed languages allows as to not specify what type is a variable, -> the variable type is dynamic:

```js
var x = 10
```

the majority of its type checking is performed at run-time

statically typed languages force specifying the type of a variable in advance or else throw an error -> the variable type is static:

```c
int x = 10;
```

type checking is performed during compile-time, the benifit of this aproach is we get documentation, autocomplition in text editors and less bugs in general

for exemple in Typescript:

```ts
function sum(x: number, y: number) => x + y
sum('Hi', undefined) // Error
```

this code allow us to constrain the types of argument (to only numbers here), and if we give it something else it will alarm us in advance.

But it makes our code a bit more harder to read by adding another layer of comlexity, the result is a slow development process.

dynamically typed languages allow us to spend more time debugging logic and errors of our code than debuging syntax and semantics.

## Strong vs weak typed languages

weak typed laguages like javascript allow coercion to perform an operation like `'Hi' + 10`, while strong typed language (phyton, ruby, c# ...) don't allow that.

---

## PS

the statement _"everything in javascript is an object"_ is false
they behave like an object trought an operation called _boxing_ but they are not nececceraly an object exemple: the value `false`

in javascript, variables don't have types, values do, unlike c, c++...
we can say that js has value types

> to unset a regular value like number use `undefined`
> to unset an object reference use `null`

### Emptiness

undefined vs undeclared vs uninitialized(aka TDZ)

undefined === there is definetly a variable and at the moment does'nt have a value
undeclared === never ben created in any scope we have access to
uninitialized === certain variables like block scoped ones never get initialized to `undefined`, you can not access it before initialization.

js does not defferentiate between them, they are reduced all to `undefined`

### Special value

_NaN_("Not A Number") : or more accurately "invalid number",because `typeof NaN // "number"`

- the result of a mathemathical operation with a **NaN** is always **NaN**, it propagate all the way out!
- NaN is the only value that does not have an _identity property_ meaning it is not equal to it-self! `NaN === NaN // false`
- to check if a value is NaN we use `ìsNaN(value)`, important note is that this utility coerce the value to _Number_ before it check for it to be NaN. it follows the ECMAScript algorithm :
  1. Let num be ? ToNumber(number).
  2. If num is NaN, return true.
  3. Otherwise, return false.
- a better utility is the ES6 `Number.isNaN(value)`: it checks for sure if a value is NaN without coersing them first to _Numbers_ it doess the following:

  1. If Type(number) is not Number, return false.
  2. If number is NaN, return true.
  3. Otherwise, return false.

- `Number.ìsNaN(value)` is equivalent to `Object.is(value, NaN)`

_Negative Zero_: -0

- `-0 === 0 // true` but `Object.is(0, -0) // false` (it's like doing a quadriple equals ====)
  `
  usefull in same cases like this one: (to ditermine the direction of a trend rate at rest or the direction of stoped car)

```js
function formatTrend(trendRate) {
  var direction = trendRate < 0 || Object.is(trendRate, -0) ? 'down' : 'up'
  return direction + Math.abs(trendRate)
}

formatTrend(-10) // "10 down"
formatTrend(10) // "10 up"
formatTrend(-0) // "0 down"
formatTrend(0) // "0 up"
```

### Polyfill for Object.is(...)

Instructions

1. `Object.is(..)` should take two parameters.

2. It should return `true` if the passed in parameters are exactly the same value (not just `===` -- see below!), or `false` otherwise.

3. For `NaN` testing, you can use `Number.isNaN(..)`, but first see if you can find a way to test without usage of any utility?

4. For `-0` testing, no built-in utility exists, but here's a hint: `-Infinity`.

5. If the parameters are any other values, just test them for strict equality.

6. You cannot use the built-in `Object.is(..)` -- that's cheating!

Polyfill Pattern

**NOTE:** Since your JS environment probably already has `Object.is(..)`, to test your polyfill you'll have to first unconditionally define it (no `if` guard), and then add the `if` guard when you're done.

To define a polyfill, it looks like this:

```js
if (!Object.is) {
	Object.is = function ObjectIs(..) { .. };
}
```

```js

function ObjectIs(v1, v2) {
  if (Number.isNaN(v1) && Number.isNaN(v2) ) {
    return true
  } else {
    return v1 === v2
  }
  if(v1 is? -0 && v2 is? 0 || v1 is? 0 && v2 is? -0  ){
    return false
  }

}
```
