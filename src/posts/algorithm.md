---
title: 'Algorithms and Problem Solving Patterns
OBJECTIVES
WHAT IS AN ALGORITHM?

 '
date: '2019-11-26'
view-source: 'https://cs.slides.com/colt_steele/problem-solving-patterns#/21'
---

A post about GraphQL

## Content

1. Schema
2. Queries
3. Mutations
4. Sunbscriptions

---

---

# What is an algorithm?
An algorithm is a prosess or set of steps to solve a problem or accomplish a certain task

why should I know this? it's the foundation for being a seccussful problem solving and developer

some problem are difficult to solve, they become much essier if we:

1. Devise a plan for solving problems
2. Master common problem solving patterns

## Problem solving strategies ( from the book "How to solve it" by George Polya )

- Understand the problem
- Explore concrete exemples
- Break it down
- Solve / Simplify
- Look back and refactor

### Understand the problem

Restate (it in your own word) -> Inputs of the problem -> Outputs of the solution -> does the problem Input sufficient to lead to the solution output ->how to label the important data given in the problem?

```js

//===================================================================
// Write a function that take two numbers and return their sum
//===================================================================

// Restate it in your own word
//=> "Implement addition"

// Inputs of the problem
//=> int? float? strings?

// Outputs of the solution
//=> int? float? strings?

// does the problem Input sufficient to lead to the solution output

// how to label the important data given in the problem? 
//=> 

```

### Explore concrete exemples

User stories 
Unit test

1. start with simple problems
2. progress to more comples ones 
3. explore problems with empty input
4. explore problems with invalid input

```js

//===================================================================
// Write a function that take a string and return counts of each character in the string.
//===================================================================

charCount ("aaaa") // { a: 4}
charCount ("hello") // { h: 1, e: 1, l: 2, o: 1}

// "My phone number is 1234456"
// "Holla hi"

charCount ("") // return null? or false? or {}? 

// null? false? {}? as input
```

### Break it down

Explecitly in plan language, write down the steps you need to take.

pseudo code?

```js

function charCount(str) {
    // make object to return at the end
    // loop over the string, for each character...
        // if...char not a key, add it 1 as value
        // if...char is a key, increment by 1
        // if...char is not alphanumiric, do nothing
    // return object at end
}

```

### Solve / Simplify 

Solve the problem or if it's hard solve a simpler problem!

```js

function charCount(str) {
    // make object to return at the end
    // loop over the string, for each character...
        // if...char not a key, add it 1 as value
        // if...char is a key, increment by 1
        // if...char is not alphanumiric, do nothing
    // return object at end
}

```

### Look back and refactor 

to improve your code

- Can you check the result?
- Can you derive the result differently?
- Can you understand it at a glance?
- Can you use the result or method for some other problem?
- Can you improve the performance of your solution?
- Can you think of other ways to refactor?
- How have other people solved this problem?