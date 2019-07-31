---
title: 'How Javascript Works 08 : Functional Programming'
date: '2019-07-28'
view-source: 'https://tylermcginnis.com/javascript-visualizer/'
---

# Functional Programming

[//]: # '## Content'

1.

2)

3.

4.

5. Composition vs inheritance

---

<br/>
<br/>
<br/>

The other Major programming paradigm: functional Programming, with all its new terms like cyrring, partial application, pur functions, referential transparency, composing, piping...

LISP was the first FP developed in 1958, FP was originating from a branch of mathematics called _Lambda calulus_, created by mathematician _Alonzo Church_ in the 1930s, who was intrested in what is the notion of a function from a computational perspective, to answer that he invented _lambda caculus_, Alonzo was the PhD supervisor to the well known _Allan turing_ inventor of _Turing machine_ the predecesor of modern computers.

so for Church a function is a black box (that you are not allowed to look inside it) that recieve an input, process it and produce an output:

```js

x -> function -> x + 1

x -> y -> function -> x + y

```

the second fondamental thing is that these functions are pur, meaning: they have no internal state, no hidden information that we can use (contrary to Turing machines that has internal state)

FP become very popular in recent years,it works very well with _distrubuted computing_, where there is multiple machines interacting with data, and also _parallelism_, wich is machines working on the some data at the same time

##
