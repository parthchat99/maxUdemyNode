# Core.js

|  Versions ||
|-----------|--------|
| 1 | es5 |
| 2 | es6 |
| 3 | es2015 |
| 4 | es7 |
| 5 | es2016 |
| 6 | es2017 |
| 7 | es2018 |
| 8 | es2019 |
| 9 | esnext |

## Different Function declaractions in JS : 

```js
function getData() {} // Normal Function

(function() {})(); // Immediate call

var b = function() {}; // function expression

var c = function setData() {}; // named function expression

var d = () => {}; // Arrow function 

```

>  Note : All these functions refer to global object(node) / window object(window)

## Immediately Call function

```js
var b = function() {
  return 'Hello';
}();

b(); // Not a Function
b // 'Hello'
```
Above has its own execution context.

If you want to use another context,
```js
name = 'Hey';

(function(name) {
  console.log(name);
}('Hello'));
```
These both are in different context. Now what if you want to use another.

```js
name = 'Hey';

(function(global, name) {
  console.log(name+" "+global);
}(name, 'Hello'));
```


## Keep a Function but dont call it

If you keep the below code, it will throw an error
```js
function () {
  return 'Hello';
}
```
So wrap it in a paranthesis,
```js
(function () {
  return 'Hello';
});
```
If you want to call it, then
```js
(function () {
  return 'Hello';
}());

(function () {
  return 'Hello';
})();
```

## Call and Apply Functions

If you want to change **this** reference in a function then call the method with `call` function or `apply` : 

```javascript
function add(c,d) {
  return this.a + this.b + c + d;
}

var o = { a: 1, b: 2 };

add.call(o, 2, 4); // 9

add.apply(o, [2,4]); // 9
```

## Bind Functions

It creates a clone of the function provided.

Call and Apply functions change `this` reference of a function during invocation. What if you want to define while declaration ?

** Bind to the rescue **

```js
function d() {
  return this.name;
}

var o = { name : 'Deepen' };

// Create a new method using bind.
// This will copy the function but assigns this to given object reference
var g = d.bind(o);

g(); // Deepen
```

```js
var dude = function() {
	return this.firstname+ " " + this.lastname;
}.bind(a);
```

Now, you can also provide additional parameters to bind, which will permanently define those arguments to the called function.
```js
var dude = function(txt) {
	return txt;
}.bind(window, 'My Text');

dude();
```

Now, check this example,
```
var dude = function(a,b) {
	return a+b;
}.bind(window, 2);

dude(); // NaN
dude(3); // 5
```

If you do not provide all arguments to bind, its Okay, however, if pass arguments to calling function, it will apply to next following argument to function parameters.

## Object.constructor

All objects will have a constructor property.  Objects created without the explicit use of a constructor function (i.e. the object and array literals) will have a constructor property that points to the Fundamental Object constructor type for that object.

```js
var o = {};
o.constructor === Object; // true

var o = new Object;
o.constructor === Object; //true

var a = [];
a.constructor === Array; // true

var a = new Array;
a.constructor === Array //true

var n = new Number(3);
n.constructor === Number; // true
```

> If you ned to know exact Class Type of an Object, use constructor property of the object to determine.

## Functions as Constructor

This code ensures function to be always called as Constructor : 

```js
function Book(name, year) { 
  if (!(this instanceof Book)) { 
    return new Book(name, year);
  }
  this.name = name;
  this.year = year;
}
```

## Core JavaScript and Prototype

Unlike Other Programming Languages, JavaScript does not depend on classes for inheritance. Rather it follows a prototype architecture inheritance.

**So, how does it work?**
Well, every object has one property named prototype (__proto__) which links or points to its parent. It may or may not have a value pointing to another object.

So, when you write:

```js
var myObject = {};
```

has a property named prototype. In this case, as it is an Object, it points to `Object.prototype`.

If you want to create an object with no prototype linking to another object (not even Object.prototype) then use following code:
```js
var myObject = Object.create(null);
```

**Object.create()** links to another object, in this case, its prototype is set to null (not referencing to anyone).

```js
var d = {}
var e = []
var f = Object.create(null);

console.log(Object.getPrototypeOf(d) === Object.prototype);
console.log(Object.getPrototypeOf(e) === Array.prototype);
console.log(Object.getPrototypeOf(f) === null);
```

### Setting Prototype

It should not be done, as it may cause performance issues.


### Creating Properties

#### For Objects
```js
var myObject = {}

Object.defineProperty(myObject, 'property1', {
  value: 'Deepen',
	configurable: true,
	writable: true,
	enumerable: true
})

console.log(myObject.property1) // Output: Deepen
```

- **Configurable** - It cannot be replaced(i.e. its key cannot be replaced) but its value can be edited if *false*.
- **Writable** - Its value cannot edited if *false*.
- **Enumerable** - It cannot be iterated if *false*. (for each loop)

We will see each properties in detail, just hang on:

#### For Arrays

```js
var myObject = []

Object.defineProperty(myObject, 0, {
  value: 'a',
	configurable: true,
	writable: true,
	enumerable: true
})

Object.defineProperty(myObject, 1, {
  value: 'b',
	configurable: true,
	writable: true,
	enumerable: true
})

Object.defineProperty(myObject, 2, {
  value: 'c',
	configurable: true,
	writable: true,
	enumerable: true
})
```

Now, when yo do:

```js
console.log(myObject); // [ 'a', 'b', 'c' ]
for(var obj in myObject) {
  console.log(obj) // 0 1 2
}
```

##### Enumerable

However, when you change enumerable property to false (**myObject[1]**), see what happens:
```js
var myObject = []

Object.defineProperty(myObject, 0, {
  value: 'a',
	configurable: true,
	writable: true,
	enumerable: true
})

Object.defineProperty(myObject, 1, {
  value: 'b',
	configurable: true,
	writable: true,
	enumerable: false
})

Object.defineProperty(myObject, 2, {
  value: 'c',
	configurable: true,
	writable: true,
	enumerable: true
})
```

Now, when yo do:

```js
console.log(myObject); // [ 'a', [1]: 'b', 'c' ]
for(var obj in myObject) {
  console.log(obj) // 0 2
}
```

It does not allow to enumerate(iterate via for each loop), however you can use for loop and iterate and point to each array index like this: 

```js
for(var i=0;i<myObject.length;i++) {
  console.log(myObject[i]); // 0 1 2
}
```

Now, what if you change the key:

```js
var myObject = []

Object.defineProperty(myObject, 0, {
  value: 'a',
	configurable: true,
	writable: true,
	enumerable: true
})

Object.defineProperty(myObject, 11, {
  value: 'b',
	configurable: true,
	writable: true,
	enumerable: false
})

Object.defineProperty(myObject, 2, {
  value: 'c',
	configurable: true,
	writable: true,
	enumerable: true
})
```

```js
console.log(myObject); // [ 'a', , 'c', , , , , , , , , [11]: 'b' ]
for(var obj in myObject) {
  console.log(obj) // 0 2
}
```

However, you can also add string like this '11' or '2' but you cannot add strings which cannot be converted to number like 'key1' or 'key2'.

##### Writable

```js
myObject[2] = 'Boo'
console.log(myObject[2]) // Output: Boo
```

Now, this time change value of **myObject[2]'s** property *writable* to false.

```js
myObject[2] = 'Boo'
console.log(myObject[2]) // Output: b
```

Writable false makes it constant.

##### Configurable
```js
console.log(delete myObject[0]); // Will Delete Element on index 0
```
**OR**
```js
console.log(delete myObject.property1) // Will Delete property1 of the Element
```
&

```js
Object.defineProperty(myObject, 0, {
  value: 'a',
	configurable: true,
	writable: true,
	enumerable: **false**
})
```
 If you redefine same property or index, it will replace old one with new property value of **enumerable**, **writeable** or simply pu
t it, it will allow to replace and delete the key or index but if you make configurable to *false* then and you define same property, it wont allow you set.

### isPrototypeOf

```js
function A () {}
function B () {}
function C () {}

B.prototype = Object.create(A.prototype);
C.prototype = Object.create(B.prototype);

var c = new C();

console.log(C.prototype.isPrototypeOf(c)); // true
console.log(C.prototype.isPrototypeOf(c)); // true
console.log(c instanceof A); // true
console.log(B.prototype.isPrototypeOf(c)); // true
console.log(A.prototype.isPrototypeOf(c)); // true
console.log(Object.prototype.isPrototypeOf(c)); // true
```

### hasOwnProperty

```js
var d = {}
d.name = 'Deepen'
console.log(d.hasOwnProperty(name))
```

It will only check in d object and not in its prototype. For checking in prototype as well use *in* operator:
```js
var e = Object.create(d)
console.log('name' in e)
```

## Different way of defining functions

Suppose we two or more functionalities so we can nest like this,

```js
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
```
## Random Use of Function

```js
function makeSizer(size) {
  return function() {
    document.body.style.fontSize = size + 'px';
  };
}

var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);
```

size12, size14, and size16 are now functions which will resize the body text to 12, 14, and 16 pixels, respectively. We can attach them to buttons (in this case links) as follows:

```js
document.getElementById('size-12').onclick = size12;
document.getElementById('size-14').onclick = size14;
document.getElementById('size-16').onclick = size16;
```
```html
<a href="#" id="size-12">12</a>
<a href="#" id="size-14">14</a>
<a href="#" id="size-16">16</a>
```

## Private Method in JavaScript

```js
var counter = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  };   
})();

console.log(counter.value()); // logs 0
counter.increment();
counter.increment();
console.log(counter.value()); // logs 2
counter.decrement();
console.log(counter.value()); // logs 1
```

### Closure

```js
function dude() {
	return function(name) {
		console.log('name');
	}
}

dude()('Deepen');
```

```
function setLang(lang) {
	return function (name) {
		if(lang == 'en') {
			return 'Hi, '+name;
		} else if(lang == 'it') {
			return 'Bonjure, '+name;
		} else {
			return 'Namaste, '+name;
		}
	}
}

var sayHi = setLang('en');
sayHi('Deepen');

```

# Function Constructors

Constructor in Javascript

```js
function Person(firstname, lastname) {
	this.firstname = firstname;
	this.lastname = lastname;
}

var person1 = new Person('Deepen', 'Dhamecha');
var person2 = new Person('Dilisha', 'Dhamecha');

Person.prototype.getFullName = function() {
	return this.firstname + ' ' + this.lastname;
}



var s = new String('John');
String.prototype.functionName = function() {
	return any;
}

person1.getFullName();
person2.getFullName();
```

## Create empty Object with prototype

```
var person = {
	this.firstname = 'Deepen;
	this.lastname = 'Dhamecha';
};

var o = Object.create(person);
```

Now `o` is empty and its prototype(parent) is `person`.

## Use Strict

Only apply to function
```
function dude() {
	'use strict';
	var person = {};
	persom.name = 'Deepen';
}
```

Apply to whole file
```
'use strict';
var person = {};
persom.name = 'Deepen';
```

## JavaScript Inheritance

JavaScript is a prototypal language, which means that objects inherit directly from other objects.

Actually, JavaScript is conflicted about its prototypal nature. Instead of having objects inherit directly from other objects, an unnecessary level of indirection is inserted such that objects are produced by constructor functions.
  
When a function object is created, the Function constructor that produces the function object runs some code like this:

```js
this.prototype = {constructor: this};
```
> The new function object is given a prototype property whose value is an object containing a constructor property whose value is the new function object. Every function gets a prototype object because the language does not provide a way of determining which functions are intended to be used as constructors.


## JavaScript Modules

This is using default

**x.js**
```js
export default function xx() {
    return "Hello World!";
}
```

**main.js**
```js
import anyName from './x';

console.log(anyName());
```
___

When you dont have to use default export,
**x.js**
```js
export function xx() {
    return "Hello World!";
}
```

**main.js**
```js
import { anyName } from './x';
console.log(anyName);
```
As if you are importing one by one.

___
When you have multiple functions to export,

**y.js**
```js
export function y1() {
    return "Y1";
}

export function y2() {
    return "Y2";
}

// You can rename anything you would like to rename as the key of this object
export default {
    y5: y1,
    y6: y2
};
```

**main.js**
```js
import obj from './y.js';

console.log(obj.y1());
console.log(obj.y1());
```
___

Now using es2015 style using require,
**z.js**
```js
function dude() {
    return "Dude";
}

module.exports = dude;
```

**main.js**
```js
var d = require('./z');
console.log(d.dude1());
```
___
Now using es2015 style using require for multiple modules,

**z.js**
```js
function dude() {
    return "Dude";
}

function dudex() {
    return "Yo Dude";
}

module.exports = {
    dude1: dude,
    dude2: dudex
}
```

**main.js**
```js
var d = require('./z');
console.log(d.dude1());
```
___

## ES6 Features

### Destructing Object

Before ES6
```js
var user = {name: 'Deepen', age: 26};
var name = user.name; // 'Deepen'
var age: user.age; // 26
```

Using ES6
```js
var { name, age } = {name: 'Deepen', age: 26};
console.log(name); // 'Deepen'
console.log(age); // 26
```

### Destructing Arrays (Spread Operator)
```js
var dudes = ['John', 'Smith', 'Deepen'];
var [d1, d2] = dudes;
console.log(d1); // 'John'
console.log(d2); // 'Smith'
```

Provide default value
```js
var dudes = ['John'];
var [d1="Deepen", d2="Smith"] = dudes;
console.log(d1); // 'John'
console.log(d2); // 'Smith'
```

Swapping Array Values (Useless)
```js
var a = 1;
var b = 3;

[a, b] = [b, a];
console.log(a); // 3
console.log(b); // 1
```

Pick values from array (Yuck, they could have made it better by specifying indexes either)
```js
var dudes = [1,2,3,4,5];
var [,,d1, ,d2] = dudes;
console.log(d1); // 3
console.log(d2); // 5
```

When destructuring an array, you can unpack and assign the remaining part of it to a variable using the rest pattern (In short, pick value and assign rest):
```js
var [a, ...b] = [1, 2, 3];
console.log(a); // 1
console.log(b); // [2, 3]

var [a, b, ...c] = [1, 2, 3];
console.log(a); // 1
console.log(b); // 2
console.log(c); // [3]
```

Unpacking values from a regular expression match,
```js
function parseProtocol(url) { 
  var parsedURL = /^(\w+)\:\/\/([^\/]+)\/(.*)$/.exec(url);
  if (!parsedURL) {
    return false;
  }
  console.log(parsedURL); // ["https://developer.mozilla.org/en-US/Web/JavaScript", "https", "developer.mozilla.org", "en-US/Web/JavaScript"]

  var [, protocol, fullhost, fullpath] = parsedURL;
  return protocol;
}

console.log(parseProtocol('https://developer.mozilla.org/en-US/Web/JavaScript')); // "https"
```

### Spread Operator (Object)

```js
var o = {x:1};
var p = {y:2, ...o};	// Output: {x:1, y:2}
var q = {o, ...y:2}	// Output: {o: {x:1}, y:2}
```

### Block-Scoped Functions
```js
{
    function foo () { return 1 }
    console.log("foo() === 1: ", foo() === 1)
    {
        function foo () { return 2 }
        console.log("foo() === 2: ", foo() === 2);
    }
    console.log("foo() === 1: ", foo() === 1);
}
```

Output:
```
foo() === 1:  true
foo() === 2:  true
foo() === 1:  true
```

### Arrow Functions

In arrow functions you cannot bind `this`. By Default it points to itself and `this` cannot be reassigned with `call` nor `apply`.

### Variadic Functions (Varargs)

```js
function dude(x, y, ...z) {
	console.log(x, y, z);
}
dude(1,2,3,4,5)
```

*Output*:
```
1, 2, [3,4,5]
```

### New Type of String parameter method call

```js
function getName(str) {
	console.log(str);
}

getName`Deepen`
```
However, its value is pretty weird,
["Deepen", raw: ["Deepen", ......]]

But this doesnt work

```js
var first = 'Deepen';

getName`${first}`
```

This is only acceptable for one string value

In short: waste of time, effort of developing this. Dont know who in the world would use this?