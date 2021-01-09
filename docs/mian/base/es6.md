## 介绍 es6 的一些新特性

- let，const 声明变量
- 解构赋值
- 箭头函数
- 扩展运算符
- 数组的新方法 -- map，reduce，filter
- promise
- Proxy，Reflect
- 生成器

## JS 块级作用域、变量提升

1. 块级作用域

JS 中作用域有：全局作用域、函数作用域。没有块作用域的概念。ECMAScript 6(简称 ES6)中新增了块级作用域。块作用域由 { } 包括，if 语句和 for 语句里面的{ }也属于块作用域。

2. 变量提升

如果变量声明在函数里面，则将变量声明提升到函数的开头
如果变量声明是一个全局变量，则将变量声明提升到全局作用域的开头

```html
<script type="text/javascript">
  {
    var a = 1;
    console.log(a); // 1
  }
  console.log(a); // 1
  // 可见，通过var定义的变量可以跨块作用域访问到。

  (function A() {
    var b = 2;
    console.log(b); // 2
  })();
  // console.log(b); // 报错，
  // 可见，通过var定义的变量不能跨函数作用域访问到

  if (true) {
    var c = 3;
  }
  console.log(c); // 3
  for (var i = 0; i < 4; i++) {
    var d = 5;
  }
  console.log(i); // 4   (循环结束i已经是4，所以此处i为4)
  console.log(d); // 5
  // if语句和for语句中用var定义的变量可以在外面访问到，
  // 可见，if语句和for语句属于块作用域，不属于函数作用域。

  {
    var a = 1;
    let b = 2;
    const c = 3;

    {
      console.log(a); // 1	子作用域可以访问到父作用域的变量
      console.log(b); // 2	子作用域可以访问到父作用域的变量
      console.log(c); // 3	子作用域可以访问到父作用域的变量

      var aa = 11;
      let bb = 22;
      const cc = 33;
    }

    console.log(aa); // 11	// 可以跨块访问到子 块作用域 的变量
    // console.log(bb);	// 报错	bb is not defined
    // console.log(cc);	// 报错	cc is not defined
  }
</script>
```

拓展：

var、let、const 的区别

- var 定义的变量，没有块的概念，可以跨块访问, 不能跨函数访问。
- let 定义的变量，只能在块作用域里访问，不能跨块访问，也不能跨函数访问。
- const 用来定义常量，使用时必须初始化(即必须赋值)，只能在块作用域里访问，而且不能修改。
- 同一个变量只能使用一种方式声明，不然会报错

```html
<script type="text/javascript">
  // 块作用域
  {
    var a = 1;
    let b = 2;
    const c = 3;
    // c = 4; // 报错

    // let a = 'a';	// 报错  注：是上面 var a = 1; 那行报错
    // var b = 'b';	// 报错：本行报错
    // const a = 'a1';	// 报错  注：是上面 var a = 1; 那行报错
    // let c = 'c';	// 报错：本行报错

    var aa;
    let bb;
    // const cc; // 报错
    console.log(a); // 1
    console.log(b); // 2
    console.log(c); // 3
    console.log(aa); // undefined
    console.log(bb); // undefined
  }
  console.log(a); // 1
  // console.log(b); // 报错
  // console.log(c); // 报错

  // 函数作用域
  (function A() {
    var d = 5;
    let e = 6;
    const f = 7;
    console.log(d); // 5
    console.log(e); // 6  (在同一个{ }中,也属于同一个块，可以正常访问到)
    console.log(f); // 7  (在同一个{ }中,也属于同一个块，可以正常访问到)
  })();
  // console.log(d); // 报错
  // console.log(e); // 报错
  // console.log(f); // 报错
</script>
```

## 作用域的分类

块作用域、词法作用域、动态作用域

解析：

1 块作用域 花括号 {}

2 词法作用域（js 属于词法作用域） 作用域只跟在何处被创建有关系，跟在何处被调用没有关系

3 动态作用域 作用域只跟在何处被调用有关系，跟在何处被创建没有关系

## js 属于哪种作用域

词法作用域（函数作用域）

解析：

```js
// 块作用域
/*{
        var num =123;
    }
    console.log(num);*/
// 如果js属于块作用域，那么在花括号外部就无法访问到花括号内部的声明的num变量。
// 如果js不属于块级作用域，那么花括号外部就能够访问到花括号内部声明的num变量
// 能够输出num变量，也就说明js不属于块级作用。
// 在ES6 之前的版本js是不存在块级作用域的。

//js属于词法作用域还是动态作用域

// js中函数可以帮我们去形成一个作用域

/* function fn(){
        var num =123;
    }
    fn();
    //在函数外界能否访问到num这样一个变量
    console.log(num)*/ //Uncaught ReferenceError: num is not defined
// 如果函数能够生成一个作用域，那么在函数外界就无法访问到函数内部声明的变量。
// js中的函数能够生成一个作用。  函数作用域 。

// 词法作用域：作用的外界只跟作用域在何处创建有关系，跟作用域在何处被调用没有关系

var num = 123;
function f1() {
  console.log(num); //
}
function f2() {
  var num = 456;
  f1(); //f1在f2被调用的时候会被执行 。
}
f2();

//如果js是词法作用域，那么就会输出f1被创建的时候外部的num变量 123
//如果js是动态作用域，那么f1执行的时候就会输出f1被调用时外部环境中的num  456
```

## var let const 的区别

首先 var 相对 let/const  ，后者可以使用块级作用域，var 声明变量则存在函数作用域内（该域内存在变量提升）。 let/const  有一个暂时性死区的概念，即进入作用域创建变量到变量可以开始访问的一段时间。其次 let，const 主要的区别在于：const 一旦被赋值就不再"改变"

但需要理解的是：这并不意味着声明的变量本身不可变，只是说它不可再次被赋值了（const 定义引用类型时，只要它的引用地址不发生改变，仍然可以改变它的属性）

## var let 和 const 区别的实现原理是什么

三者的区别：

- var 和 let 用以声明变量，const 用于声明只读的常量；
- var 和 let 用以声明变量，const 用于声明只读的常量；
- var 声明的变量，不存在块级作用域，在全局范围内都有效，let 和 const 声明的，只在它所在的代码块内有效；
- let 和 const 不存在像 var 那样的 “变量提升” 现象，所以 var 定义变量可以先使用，后声明，而 let 和 const 只可先声明，后使用；
- let 声明的变量存在暂时性死区，即只要块级作用域中存在 let，那么它所声明的变量就绑定了这个区域，不再受外部的影响。
- let 不允许在相同作用域内，重复声明同一个变量；
- const 在声明时必须初始化赋值，一旦声明，其声明的值就不允许改变，更不允许重复声明；如 const 声明了一个复合类型的常量，其存储的是一个引用地址，不允许改变的是这个地址，而对象本身是可变的

变量与内存之间的关系，主要由三个部分组成

- 变量名
- 内存地址
- 内存空间

JS 引擎在读取变量时，先找到变量绑定的内存地址，然后找到地址所指向的内存空间，最后读取其中的内容。当变量改变时，JS 引擎不会用新值覆盖之前旧值的内存空间（虽然从写代码的角度来看，确实像是被覆盖掉了），而是重新分配一个新的内存空间来存储新值，并将新的内存地址与变量进行绑定，JS 引擎会在合适的时机进行 GC，回收旧的内存空间。

const 定义变量（常量）后，变量名与内存地址之间建立了一种不可变的绑定关系，阻隔变量地址被改变，当 const 定义的变量进行重新赋值时，根据前面的论述，JS 引擎会尝试重新分配新的内存空间，所以会被拒绝，便会抛出异常

## JavaScript 中的作用域与变量声明提升

变量提升的表现是，无论我们在函数中何处位置声明的变量，好像都被提升到了函数的首部，我们可以在变量声明前访问到而不会报错。造成变量声明提升的本质原因是 **js 引擎在代码执行前有一个解析的过程**，创建了**执行上下文**，初始化了一些代码执行时需要用到的对象。当我们访问一个变量时，我们会到当前执行上下文中的作用域链中去查找，而作用域链的首端指向的是当前执行上下文的变量对象，这个变量对象是执行上下文的一个属性，它包含了函数的形参、所有的函数和变量声明，这个对象是在代码解析的时候创建的。这就是会出现变量声明提升的根本原因。

- 我对作用域的理解是只会对某个范围产生作用，而不会对外产生影响的封闭空间。在这样的一些空间里，外部不能访问内部变量，但内部可以访问外部变量。
- 所有申明都会被提升到作用域的最顶上
- 同一个变量申明只进行一次，并且因此其他申明都会被忽略
- 函数声明的优先级优于变量申明，且函数声明会连带定义一起被提升

## let 和 和 const 的注意点

- 声明的变量只在声明时的**代码块内有效**
- **不存在声明提升**
- 存在**暂时性死区**，如果在变量声明前使用，会报错
- 不允许重复声明，**重复声明会报错**

## 什么是 rest 参数

rest 参数（形式为...变量名），用于获取函数的多余参数

## 什么是尾调用，使用尾调用有什么好处

尾调用指的是函数的最后一步调用另一个函数。我们代码执行是基于执行栈的，所以当我们在一个函数里调用另一个函数时，我们会**保留当前的执行上下文**，然后再新建另外一个执行上下文加入栈中。**使用尾调用的话，因为已经是函数的最后一步，所以这个时候我们可以不必再保留当前的执行上下文，从而节省了内存，这就是尾调用优化**。但是 ES6 的尾调用优化只在**严格模式下开启，正常模式是无效的**

## Symbol 类型的注意点

- Symbol 函数前**不能使用 new 命令**，否则会报错。
- Symbol 函数**可以接受一个字符串作为参数**，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。
- Symbol **作为属性名，该属性不会出现在 for...in、for...of 循环中，也不会被 Object.keys()、Object.getOwnPropertyNames()、JSON.stringify() 返回**。
- **Object.getOwnPropertySymbols 方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值**。
- **Symbol.for** 接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。**如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值**。
- **Symbol.keyFor** 方法返回一个已登记的 Symbol 类型值的 key。

## ES6 都有什么 Iterator 遍历器

Set、Map

解析：

1、遍历器（Iterator）是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）

2、Iterator 的作用有三个：

- 一是为各种数据结构，提供一个统一的、简便的访问接口；
- 二是使得数据结构的成员能够按某种次序排列；
- 三是 ES6 创造了一种新的遍历命令 for...of 循环，Iterator 接口主要供 for...of 消费。

3、默认部署了 Iterator 的数据有 Array、Map、Set、String、TypedArray、arguments、NodeList 对象，ES6 中有的是 Set、Map、

## ES6 中类的定义

```js
// 1、类的基本定义
class Parent {
  constructor(name = "小白") {
    this.name = name;
  }
}
// 2、生成一个实例
let g_parent = new Parent();
console.log(g_parent); //{name: "小白"}
let v_parent = new Parent("v"); // 'v'就是构造函数name属性 , 覆盖构造函数的name属性值
console.log(v_parent); // {name: "v"}
// 3、继承
class Parent {
  //定义一个类
  constructor(name = "小白") {
    this.name = name;
  }
}

class Child extends Parent {}

console.log("继承", new Child()); // 继承 {name: "小白"}
// 4、继承传递参数
class Parent {
  //定义一个类
  constructor(name = "小白") {
    this.name = name;
  }
}

class Child extends Parent {
  constructor(name = "child") {
    // 子类重写name属性值
    super(name); // 子类向父类修改 super一定放第一行
    this.type = "preson";
  }
}
console.log("继承", new Child("hello")); // 带参数覆盖默认值  继承{name: "hello", type: "preson"}
// 5、ES6重新定义的ES5中的访问器属性
class Parent {
  //定义一个类
  constructor(name = "小白") {
    this.name = name;
  }

  get longName() {
    // 属性
    return "mk" + this.name;
  }

  set longName(value) {
    this.name = value;
  }
}

let v = new Parent();
console.log("getter", v.longName); // getter mk小白

v.longName = "hello";
console.log("setter", v.longName); // setter mkhello
// 6、类的静态方法
class Parent {
  //定义一个类
  constructor(name = "小白") {
    this.name = name;
  }

  static tell() {
    // 静态方法:通过类去调用，而不是实例
    console.log("tell");
  }
}

Parent.tell(); // tell
// 7、类的静态属性：

class Parent {
  //定义一个类
  constructor(name = "小白") {
    this.name = name;
  }

  static tell() {
    // 静态方法:通过类去调用，而不是实例
    console.log("tell"); // tell
  }
}

Parent.type = "test"; // 定义静态属性

console.log("静态属性", Parent.type); // 静态属性 test

let v_parent = new Parent();
console.log(v_parent); // {name: "小白"}  没有tell方法和type属性
```

## 谈谈你对 ES6 的理解

es6 是一个新的标准，它包含了许多新的语言特性和库，是 JS 最实质性的一次升级。 比如'箭头函数'、'字符串模板'、'generators(生成器)'、'async/await'、'解构赋值'、'class'等等，还有就是引入 module 模块的概念。

箭头函数可以让 this 指向固定化，这种特性很有利于封装回调函数

（1）函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。

（2）不可以当作构造函数，也就是说，不可以使用 new 命令，否则会抛出一个错误。

（3）不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 Rest 参数代替。

（4）不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。

async/await 是写异步代码的新方式，以前的方法有回调函数和 Promise。

async/await 是基于 Promise 实现的，它不能用于普通的回调函数。async/await 与 Promise 一样，是非阻塞的。

async/await 使得异步代码看起来像同步代码，这正是它的魔力所在。

## Set 和 WeakSet 结构？

- ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
- WeakSet 结构与 Set 类似，也是不重复的值的集合。但是 WeakSet 的成员只能是对象，而不能是其他类型的值。WeakSet 中的对象都是**弱引用**，**即垃圾回收机制不考虑 WeakSet 对该对象的引用**

## Map 和 WeakMap 结构？

- Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
- WeakMap 结构与 Map 结构类似，也是用于生成键值对的集合。但是 WeakMap 只接受对象作为键名（ null 除外），不接受其他类型的值作为键名。而且 **WeakMap 的键名所指向的对象，不计入垃圾回收机制**。

## 什么是 Proxy ？

Proxy 用于修改某些操作的默认行为，等同于**在语言层面做出修改**，所以属于一种“**元编程**”，即对编程语言进行编程。

Proxy 可以理解成，在目标对象之前架设一层“**拦截**”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“**代理器**”。

## Reflect 对象创建目的

- **将 Object 对象的一些明显属于语言内部的方法（ 比 如 Object.defineProperty，放到 Reflect 对象上**。
- **修改某些 Object 方法的返回结果，让其变得更合理**。
- **让 Object 操作都变成函数行为**。
- **Reflect 对象的方法与 Proxy 对象的方法一一对应**，只要是 Proxy 对象的方法，就能在 Reflect 对象上找到对应的方法。这就让 Proxy 对象可以方便地调用对应的 Reflect 方法，完成默认行为，作为修改行为的基础。也就是说，**不管 Proxy 怎么修改默认行为，你总可以在 Reflect 上获取默认行为**。

## require 模块引入的查找方式

当 Node 遇到 require(X) 时，按下面的顺序处理。

（1）如果 X 是内置模块（比如 require('http')）

- 返回该模块。
- 不再继续执行。

（2）如果 X 以 "./" 或者 "/" 或者 "../" 开头

- 根据 X 所在的父模块，确定 X 的绝对路径。
- 将 X 当成文件，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。

```
X
X.js
X.json
X.node
```

- 将 X 当成目录，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。

```
X/package.json（main 字段）
X/index.js
X/index.json
X/index.node
```

（3）如果 X 不带路径

- 根据 X 所在的父模块，确定 X 可能的安装目录。
- 依次在每个目录中，将 X 当成文件名或目录名加载。

（4）抛出 "not found"

## Generator 如何使用的？以及各个阶段的状态是如何变化的？

使用生成器函数可以生成一组值的序列，每个值的生成是基于每次请求的，并不同于标准函数立即生成

调用生成器不会直接执行，而是通过叫做迭代器的对象控制生成器执行

```js
function* WeaponGenerator() {
  yield "1";
  yield "2";
  yield "3";
}
for (let item of WeaponGenerator()) {
  console.log(item);
}
//1
//2
//3
```

**使用迭代器控制生成器**

- 通过调用生成器返回一个迭代器对象，用来控制生成器的执行。
- 调用迭代器的 next 方法向生成器请求一个值。
- 请求的结果返回一个对象，对象中包含一个 value 值和 done 布尔值，告诉我们生成器是否还会生成值。
- 如果没有可执行的代码，生成器就会返回一个 undefined 值，表示整个生成器已经完成

```js
function* WeaponGenerator() {
  yield "1";
  yield "2";
  yield "3";
}
let weapon = WeaponGenerator();
console.log(weapon.next());
console.log(weapon.next());
console.log(weapon.next());
```

状态变化如下：

- 每当代码执行到 yield 属性，就会生成一个中间值，返回一个对象。
- 每当生成一个值后，生成器就会非阻塞的挂起执行，等待下一次值的请求。
- 再次调用 next 方法，将生成器从挂起状态唤醒，中断执行的生成器从上次离开的位置继续执行。
- 直到遇到下一个 yield ，生成器挂起。
- 当执行到没有可执行代码了，就会返回一个结果对象， value 的值为 undefined , done 的值为 true ，生成器执行完成

**Generator 内部结构实现**

生成器更像是一个状态运动的状态机。

- 挂起开始状态——创建一个生成器处于未执行状态。
- 执行状态——生成器的执行状态。
- 挂起让渡状态——生成器执行遇到第一个 yield 表达式。
- 完成状态——代码执行到 return 全部代码就会进入全部状态。

```js
function* WeaponGenerator(action) {
  yield "1" + action;
  yield "2";
  yield "3";
}
let Iterator = WeaponGenerator("xiaolu");
let result1 = Iterator.next();
let result2 = Iterator.next();
let result3 = Iterator.next();
```

- 在调用生成器之前的状态——只有全局执行上下文，全局环境中除了生成器变量的引用，其他的变量都为 undefined 。
- 调用生成器并没有执行函数，而是返回一个 Iterator 迭代器对象并指向当前生成器的上下文。
- 一般函数调用完成上下文弹出栈，然后被摧毁。当生成器的函数调用完成之后，**当前生成器的上下文出栈，但是在全局的迭代器对象还与保持着与生成器执行上下文引用，且生成器的词法环境还存在**。
- 执行 next 方法，一般的函数会重新创建执行上下文。而生成器会重新激活对应的上下文并推入栈中（这也是为什么标准函数重复调用时，重新从头执行的原因所在。**与标准函数相比较，生成器暂时会挂起并将来恢复**）。
- 当**遇到 yield 关键字的时候，生成器上下文出栈，但是迭代器还是保持引用，处于非阻塞暂时挂起的状态**。
- 如果遇到 next 指向方法继续在原位置继续 执行，直到遇到 return 语句，并返回值结束生成器的执行，生成器进入结束状态。

## 什么是 Promise 对象，什么是 Promises/A+ 规范

Promise 对象是异步编程的一种解决方案，最早由社区提出。**Promises/A+ 规范是 JavaScript Promise 的标准**，规定了一个 Promise 所必须具有的特性。

Promise 是一个构造函数，接收一个函数作为参数，返回一个 Promise 实例。一个 Promise 实例有三种状态，分别是 pending、resolved 和 rejected，分别代表了进行中、已成功和已失败。实例的状态只能由 pending 转变 resolved 或者 rejected 状态，并且状态一经改变，就凝固了，无法再被改变了。状态的改变是通过 resolve() 和 reject() 函数来实现的，我们可以在异步操作结束后调用这两个函数改变 Promise 实例的状态，它的原型上定义了一个 then 方法，使用这个 then 方法可以为两个状态的改变注册回调函数。这个回调函数属于**微任务**，会在**本轮事件循环的末尾执行**。

## 说说你对 promise 的了解

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件监听——更合理和更强大。

所谓 Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

Promise 对象有以下两个特点:

1. 对象的状态不受外界影响，Promise 对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称 Fulfilled）和 Rejected（已失败）

2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。

## 解构赋值及其原理

解构赋值：其实就是分解出一个对象的解构，分成两个步骤：

1. 变量的声明
2. 变量的赋值

原理：ES6 变量的解构赋值本质上是“模式匹配”,只要等号两边的模式相同，左边的变量就会被赋予匹配的右边的值，如果匹配不成功变量的值就等于 undefined

解析：

一、 数组的解构赋值

```js
// 对于数组的解构赋值，其实就是获得数组的元素，而我们一般情况下获取数组元素的方法是通过下标获取，例如：
let arr = [1, 2, 3];
let a = arr[0];
let b = arr[1];
let c = arr[2];

// 而数组的解构赋值给我们提供了极其方便的获取方式，如下：
let [a, b, c] = [1, 2, 3];
console.log(a, b, c); //1,2,3
```

1. 模式匹配解构赋值

```js
let [foo, [[bar], baz]] = [1, [[2], 3]];
console.log(foo, bar, baz); //1,2,3
```

2. 省略解构赋值

```js
let [, , a, , b] = [1, 2, 3, 4, 5];
console.log(a, b); //3,5
```

3. 含剩余参数的解构赋值

```js
let [a, ...reset] = [1, 2, 3, 4, 5];
console.log(a, reset); //1,[2,3,4,5]
```

其转成 ES5 的原理如下：

```js
var a = 1,
  reset = [2, 3, 4, 5];
console.log(a, reset); //1,[2,3,4,5]
```

注意：如果剩余参数是对应的值为 undefined，则赋值为[]，因为找不到对应值的时候，是通过 slice 截取的，如下：

```js
let [a, ...reset] = [1];
console.log(a, reset); //1,[]
```

其转成 ES5 的原理如下：

```js
var _ref = [1],
  a = _ref[0],
  reset = _ref.slice(1);
console.log(a, reset); //1,[]
```

4. 非数组解构成数组(重点，难点)

一条原则：要解构成数组的前提：如果等号右边，不是数组(严格地说，不是可遍历的解构)，则直接报错，例如：

```js
let [foo] = 1; //报错
let [foo1] = false; //报错
let [foo2] = NaN; //报错
let [foo3] = undefined; //报错
let [foo4] = null; //报错
let [foo5] = {}; //报错
```

为什么？转成 ES5 看下原理就一清二楚了：

```js
var _ = 1,
  foo = _[0]; //报错
var _false = false,
  foo1 = _false[0]; //报错
var _NaN = NaN,
  foo2 = _NaN[0]; //报错
var _undefined = undefined,
  foo3 = _undefined[0]; //报错
var _ref = null;
foo4 = _ref[0]; //报错
var _ref2 = {},
  foo5 = _ref2[0]; //报错
```

5. Set 的解构赋值

先执行 new Set()去重，然后对得到的结果进行解构

```js
let [a, b, c] = new Set([1, 2, 2, 3]);
console.log(a, b, c); //1,2,3
```

6. 迭代器解构

```js
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

let [first, second, third, fourth, fifth, sixth] = fibs();
sixth; // 5
```

**总结 1：只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。**

1. 解构赋值的默认值

当变量严格等于 undefined 的时候，会读取默认值，所谓的严格等于，就是“===”

```js
----------let[(a, (b = "default"))] = [1];
console.log(a, b); //1,'default'

----------let[(c = "default")] = [undefined];
console.log(c); //'default'

----------function f() {
  console.log("aaa");
};

let [x = f()] = [1];
console.log(x); //1

----------function f() {
  console.log("aaa"); //'aaa'
};

let [a, x = f()] = [1];
console.log(a, x); //1,undefined
```

**总结 2：如果不使用默认值，则不会执行默认值的函数**

二、对象的解构赋值

1. 解构赋值的举例：

```js
let p1 = {
  name: "zhuangzhuang",
  age: 25,
};
let { name, age } = p1; //注意变量必须为属性名
console.log(name, age); //"zhuangzhuang",25
```

其转成 es5 的原理则为：

```js
var _p1 = p1,
  name = _p1.name,
  age = _p1.age;
console.log(name, age); //"zhuangzhuang",25
```

2. 解构赋值的别名

如果使用别名，则不允许再使用原有的解构出来的属性名，看以下举例则会明白：

```js
let p1 = {
  name: "zhuangzhuang",
  age: 25,
};
let { name: aliasName, age: aliasAge } = p1; //注意变量必须为属性名
console.log(aliasName, aliasAge); //"zhuangzhuang",25
console.log(name, age); //Uncaught ReferenceError: age is not defined
```

为何打印原有的属性名则会报错？让我们看看转成 es5 后的原理是如何实现的：

```js
var _p1 = p1,
  aliasName = _p1.name,
  aliasAge = _p1.age;
console.log(aliasName, aliasAge); //"zhuangzhuang",25
console.log(name, age); //所以打印name和age会报错——“Uncaught ReferenceError: age is not defined”，但是为何只报错age，不报错name呢？
```

只报错 age，不报错 name，这说明其实 name 是存在的，那么根据 js 的解析顺序，当在当前作用域 name 无法找到时，会向上找，直到找到 window 下的 name,而我们打印 window 可以发现，其下面确实有一个 name，值为“”，而其下面并没有属性叫做 age，所以在这里 name 不报错，只报 age 的错。类似 name 的属性还有很多，比如 length 等。

3. 解构赋值的默认值

有些情况下，我们解构出来的值并不存在，所以需要设定一个默认值，例如：

```js
let obj = {
  name: "zhuangzhuang",
};
let { name, age } = obj;
console.log(name, age); //"zhuangzhuang",undefined
```

我们可以看到当 age 这个属性并不存在于 obj 的时候，解构出来的值为 undefined，那么为了避免这种尴尬的情况，我们常常会设置该属性的默认值，如下：

```js
let obj = {
  name: "zhuangzhuang",
};
let { name, age = 18 } = obj;
console.log(name, age); //"zhuangzhuang",18
```

当我们取出来的值不存在，即为 undefined 的时候，则会取默认值(假设存在默认值)，ES6 的默认值是使用**“变量=默认值”**的方式。

注意：只有当为 undefined 的时候才会取默认值，null 等均不会取默认值

```js
let obj = {
  name: "zhuangzhuang",
  age: 27,
  gender: null, //假设未知使用null
  isFat: false,
};
let { name, age = 18, gender = "man", isFat = true, hobbies = "study" } = obj;
console.log(name, age, gender, isFat, hobbies); //"zhuangzhuang"，27，null，false，"study"
```

4. 解构赋值的省略赋值

当我们并不是需要取出所有的值的时候，其实可以省略一些变量，这就是省略赋值，如下

```js
let arr = [1, 2, 3];
let [, , c] = arr;
console.log(c); //3
```

注意：省略赋值并不存在与对象解构，因为对象解构，明确了需要的属性

```js
let obj = {
  name: "zhuangzhuang",
  age: 27,
  gender: "man",
};
let { age } = obj;
console.log(age); //27
```

5. 解构赋值的嵌套赋值(易错点，重点，难点)

```js
let obj = {},
  arr = [];

({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });
console.log(obj, arr); //{prop:123},[true]
```

注意当解构出来是 undefined 的时候，如果再给子对象的属性，则会报错，如下

```js
let {
  foo: { bar },
} = { baz: "baz" };
//报错，原因很简单，看下原理即可，如下：
//原理:
let obj = { baz: "baz" };
let foo = obj.foo; //foo为undefined
let bar = foo.bar; //undefined的bar，可定报错
```

6. {}是块还是对象？

当我们写解构赋值的时候，很容易犯一个错误——{}的作用是块还是对象混淆，举例如下：

```js
//举例一：
let {a} = {a:"a"};
console.loh(a);//'a',这个很简单
//很多人觉得，以下这种写法也是可以的：
let a;
{a} = {a:"a"};//直接报错，因为此时a已经声明过了，在语法解析的时候，会将这一行的{}看做块结构，而“块=对象”，显然是语法错误，所以正确的做法是不将大括号写在开头，如下：
let a;
({a} = {a:"a"})
```

7. 空解构

按照之前写的，解构赋值，左边则为解构出来的属性名，当然，在这里，我们也可以不写任何属性名称，也不会又任何的语法错误，即便这样没有任何意义，如下：

```js
({} = [true, false]);
({} = "abc");
({} = []);
```

8. 解构成对象的原则

如果解构成对象，右侧不是 null 或者 undefined 即可!
之前说过，要解构成数组，右侧必须是可迭代对象，但是如果解构成对象，右侧不是 null 活着 undefined 即可!

三、字符串的解构赋值

字符串也是可以解构赋值的

```js
const [a, b, c, d, e] = "hello";
console.log(a, b, c, d, e); //'h','e','l','l','o'
```

转成 es5 的原理如下:

```js
var _hello = "hello",
  a = _hello[0],
  b = _hello[1],
  c = _hello[2];

console.log(a, b, c);
```

注意：字符串有一个属性 length，也可以被解构出来，但是要注意，解构属性一定是对象解构

```js
let { length } = "hello";
console.log(length); //5
```

4. 布尔值和数值的解构

布尔值和数值的解构，其实就是对其包装对象的解构，取的是包装对象的属性

```js
{toString:s} = 123;
console.log(s);//s === Number.prototype.toString

{toString:s} = true;
console.log(s);//s === Boolean.prototype.toString
```

**总结：解构赋值的规则是：**

> 1.  解构成对象，只要等号右边的值不是对象或数组，就先将其转为对象。由于 undefined 和 null 无法转为对象，所以对它们进行解构赋值，都会报错。
> 2.  解构成数组，等号右边必须为可迭代对象

## Array.from() 与 Array.reduce()

Array.from()方法就是将一个类数组对象或者可遍历对象转换成一个真正的数组
Array.reduce()方法对累加器和数组中的每个元素 (从左到右)应用一个函数，将其减少为单个值。

解析：

### Array.from()

```js
// 那么什么是类数组对象呢？所谓类数组对象，最基本的要求就是具有length属性的对象。

// 1、将类数组对象转换为真正数组：

let arrayLike = {
  0: "tom",
  1: "65",
  2: "男",
  3: ["jane", "john", "Mary"],
  length: 4,
};
let arr = Array.from(arrayLike);
console.log(arr); // ['tom','65','男',['jane','john','Mary']]

// 那么，如果将上面代码中length属性去掉呢？实践证明，答案会是一个长度为0的空数组。

// 这里将代码再改一下，就是具有length属性，但是对象的属性名不再是数字类型的，而是其他字符串型的，代码如下：

let arrayLike = {
  name: "tom",
  age: "65",
  sex: "男",
  friends: ["jane", "john", "Mary"],
  length: 4,
};
let arr = Array.from(arrayLike);
console.log(arr); // [ undefined, undefined, undefined, undefined ]

// 会发现结果是长度为4，元素均为undefined的数组

// 由此可见，要将一个类数组对象转换为一个真正的数组，必须具备以下条件：

// 1、该类数组对象必须具有length属性，用于指定数组的长度。如果没有length属性，那么转换后的数组是一个空数组。

// 2、该类数组对象的属性名必须为数值型或字符串型的数字

// ps: 该类数组对象的属性名可以加引号，也可以不加引号

// 2、将Set结构的数据转换为真正的数组：

let arr = [12, 45, 97, 9797, 564, 134, 45642];
let set = new Set(arr);
console.log(Array.from(set)); // [ 12, 45, 97, 9797, 564, 134, 45642 ]

// 　Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。如下：

let arr = [12, 45, 97, 9797, 564, 134, 45642];
let set = new Set(arr);
console.log(Array.from(set, (item) => item + 1)); // [ 13, 46, 98, 9798, 565, 135, 45643 ]

// 3、将字符串转换为数组：

let str = "hello world!";
console.log(Array.from(str)); // ["h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d", "!"]

// 4、Array.from参数是一个真正的数组：

console.log(Array.from([12, 45, 47, 56, 213, 4654, 154]));
// 像这种情况，Array.from会返回一个一模一样的新数组
```

### Array.reduce()

```
语法：

array.reduce(function(accumulator, currentValue, currentIndex, array), initialValue)；

accumulator：累加器，即函数上一次调用的返回值。第一次的时候为 initialValue || arr[0]

currentValue：数组中函数正在处理的的值。第一次的时候initialValue || arr[1]

currentIndex：数据中正在处理的元素索引，如果提供了 initialValue ，从0开始；否则从1开始

array： 调用 reduce 的数组

initialValue：可选项，累加器的初始值。没有时，累加器第一次的值为currentValue；注意：在对没有设置初始值的空数组调用reduce方法时会报错。
```

```js
//无初始值
[1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array) {
  return accumulator + currentValue;
}); // 10
```

| callback    | accumulator       | currentValue      | currentIndex    | array        | return value |
| ----------- | ----------------- | ----------------- | --------------- | ------------ | ------------ |
| first call  | 1(数组第一个元素) | 2(数组第二个元素) | 1(无初始值为 1) | [1, 2, 3, 4] | 3            |
| second call | 3                 | 3                 | 2               | [1, 2, 3, 4] | 6            |
| third call  | 6                 | 4                 | 3               | [1, 2, 3, 4] | 10           |

```js
//有初始值
[1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array) {
  return accumulator + currentValue;
}, 10); // 20
```

| callback    | accumulator | currentValue      | currentIndex    | array        | return value |
| ----------- | ----------- | ----------------- | --------------- | ------------ | ------------ |
| first call  | 10(初始值)  | 1(数组第一个元素) | 0(有初始值为 0) | [1, 2, 3, 4] | 11           |
| second call | 11          | 2                 | 1               | [1, 2, 3, 4] | 13           |
| third call  | 13          | 3                 | 2               | [1, 2, 3, 4] | 16           |
| fourth call | 16          | 4                 | 3               | [1, 2, 3, 4] | 20           |

```js
//1.数组元素求和
[1, 2, 3, 4].reduce((a, b) => a + b); //10

//2.二维数组转化为一维数组
[
  [1, 2],
  [3, 4],
  [5, 6],
]
  .reduce((a, b) => a.concat(b), []) //[1, 2, 3, 4, 5, 6]

  [
    //3.计算数组中元素出现的次数
    (1, 2, 3, 1, 2, 3, 4)
  ].reduce((items, item) => {
    if (item in items) {
      items[item]++;
    } else {
      items[item] = 1;
    }
    return items;
  }, {}) //{1: 2, 2: 2, 3: 2, 4: 1}

  [
    //数组去重①
    (1, 2, 3, 1, 2, 3, 4, 4, 5)
  ].reduce((init, current) => {
    if (init.length === 0 || init.indexOf(current) === -1) {
      init.push(current);
    }
    return init;
  }, []) //[1, 2, 3, 4, 5]
  [
    //数组去重②
    (1, 2, 3, 1, 2, 3, 4, 4, 5)
  ].sort()
  .reduce((init, current) => {
    if (init.length === 0 || init[init.length - 1] !== current) {
      init.push(current);
    }
    return init;
  }, []); //[1, 2, 3, 4, 5]
```

## 模板字符串

- 就是这种形式${varible},在以往的时候我们在连接字符串和变量的时候需要使用这种方式'string' + varible + 'string'但是有了模版语言后我们可以使用string${varible}string 这种进行连接。基本用途有如下：

1、基本的字符串格式化，将表达式嵌入字符串中进行拼接，用\${}来界定。

```js
//es5
var name = "lux";
console.log("hello" + name);
//es6
const name = "lux";
console.log(`hello ${name}`); //hello lux
```

2、在 ES5 时我们通过反斜杠(\)来做多行字符串或者字符串一行行拼接，ES6 反引号(``)直接搞定。

```js
//ES5
var template =
  "hello \
world";
console.log(template); //hello world

//ES6
const template = `hello
world`;
console.log(template); //hello 空行 world
```

## 箭头函数需要注意的地方

```

箭头函数有几个使用注意点。
（1）函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。
（2）不可以当作构造函数，也就是说，不可以使用 new 命令，否则会抛出一个错误。
（3）不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
（4）不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。

```

上面四点中，第一点尤其值得注意。this 对象的指向是可变的，但是在箭头函数中，它是固定的。

```js
function foo() {
  setTimeout(() => {
    console.log("id:", this.id);
  }, 100);
}

var id = 21;

foo.call({ id: 42 });
// id: 42
```

## 箭头函数和普通函数有什么区别

- 函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象，用`call` `apply` `bind`也不能改变`this`指向
- 不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误。
- 不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用 `rest` 参数代替。
- 不可以使用`yield`命令，因此箭头函数不能用作 `Generator` 函数。
- 箭头函数没有原型对象`prototype`

## ES6 如何动态加载 import

```js
import("lodash").then((_) => {
  // Do something with lodash (a.k.a '_')...
});
```

## 手写一个 Promise

```js
const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";
function MyPromise(fn) {
  // 保存初始化状态
  var self = this;
  // 初始化状态
  this.state = PENDING;
  // 用于保存 resolve 或者 rejected 传入的值
  this.value = null;
  // 用于保存 resolve 的回调函数
  this.resolvedCallbacks = [];
  // 用于保存 reject 的回调函数
  this.rejectedCallbacks = [];
  // 状态转变为 resolved 方法
  function resolve(value) {
    // 判断传入元素是否为 Promise 值，如果是，则状态改变必须等待前一个状态改变后再
    进行改变;
    if (value instanceof MyPromise) {
      return value.then(resolve, reject);
    }
    // 保证代码的执行顺序为本轮事件循环的末尾
    setTimeout(() => {
      // 只有状态为 pending 时才能转变，
      if (self.state === PENDING) {
        // 修改状态
        self.state = RESOLVED;
        // 设置传入的值
        self.value = value;
        // 执行回调函数
        self.resolvedCallbacks.forEach((callback) => {
          callback(value);
        });
      }
    }, 0);
  }
  // 状态转变为 rejected 方法
  function reject(value) {
    // 保证代码的执行顺序为本轮事件循环的末尾
    setTimeout(() => {
      // 只有状态为 pending 时才能转变
      if (self.state === PENDING) {
        // 修改状态
        self.state = REJECTED;
        // 设置传入的值
        self.value = value;
        // 执行回调函数
        self.rejectedCallbacks.forEach((callback) => {
          callback(value);
        });
      }
    }, 0);
  }
  // 将两个方法传入函数执行
  try {
    fn(resolve, reject);
  } catch (e) {
    // 遇到错误时，捕获错误，执行 reject 函数
    reject(e);
  }
}
MyPromise.prototype.then = function(onResolved, onRejected) {
  // 首先判断两个参数是否为函数类型，因为这两个参数是可选参数
  onResolved =
    typeof onResolved === "function"
      ? onResolved
      : function(value) {
          return value;
        };
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : function(error) {
          throw error;
        };
  // 如果是等待状态，则将函数加入对应列表中
  if (this.state === PENDING) {
    this.resolvedCallbacks.push(onResolved);
    this.rejectedCallbacks.push(onRejected);
  }
  // 如果状态已经凝固，则直接执行对应状态的函数
  if (this.state === RESOLVED) {
    onResolved(this.value);
  }
  if (this.state === REJECTED) {
    onRejected(this.value);
  }
};
```

## 手撕 Promise(Promise.all 或者 Promise.race)

Promise 是一种异步编程的解决方法，相比容易陷入回调地狱的回调函数，采用链式调用的方式更合理也更方便，Promise 有三种状态： pending  （进行中）、 fulfilled  （已成功）和 rejected  （已失败），接受一个作为函数作为参数，该函数有两个参数，分别是 resolve  和 reject  两个函数

```js
// Promise的模拟实现
class _Promise {
  constructor(fn) {
    let _this = this;
    this._queue = [];
    this._success = null;
    this._error = null;
    this.status = "";
    fn(
      (...arg) => {
        // resolve
        if (_this.status != "error") {
          _this.status = "success";
          _this._success = arg;
          _this._queue.forEach((json) => {
            json.fn1(...arg);
          });
        }
      },
      (...arg) => {
        // reject 19
        if (_this.status != "success") {
          _this.status = "error";
          _this._error = arg;
          _this._queue.forEach((json) => {
            json.fn2(...arg);
          });
        }
      }
    );
  }

  then(fn1, fn2) {
    let _this = this;
    return new _Promise((resolve, reject) => {
      if (_this.status == "success") {
        resolve(fn1(..._this._success));
      } else if (_this.status == "error") {
        fn2(..._this._error);
      } else {
        _this._queue.push({ fn1, fn2 });
      }
    });
  }
}
```

`Promise.all` 和`Promise.race`在实际应用中的比较，比如从接口中获取数据，等待所有数据到达后执行某些操作可以用前者，如果从几个接口中获取相同的数据哪个接口先到就用哪个可以使用后者

```js
//Promise.all的模拟实现(race的实现类似)
Promise.prototype._all = (interable) => {
  let results = [];
  let promiseCount = 0;
  return new Promise(function(resolve, reject) {
    for (let val of iterable) {
      Promise.resolve(val).then(
        (res) => {
          promiseCount++;
          results[i] = res;
          if (promiseCount === interable.length) {
            return resolve(results);
          }
        },
        (err) => {
          return reject(err);
        }
      );
    }
  });
};
```

## 模拟实现一个 Promise.finally

```js
Promise.prototype.finally = function (callback) {
let P = this.constructor;
return this.then(
value => P.resolve(callback()).then(() => value),
reason => P.resolve(callback()).then(()
=> { throw reason })
);
};
```

## async 及 await

ES7 中的 async 及 await 就是 Generator 以及 Promise 的语法糖，内部的实现原理还是原来的，只不过是在写法上有所改变，这些实现一些异步任务写起来更像是执行同步任务

**带 async 关键字的函数，它使得你的函数的返回值必定是 promise 对象**

- 如果 async 关键字函数返回的不是 promise ，会自动用 Promise.resolve() 包装
- 如果 async 关键字函数显式地返回 promise ，那就以你返回的 promise 为准

```js
async function fn1() {
  return 123;
}
function fn2() {
  return 123;
}
console.log(fn1()); // Promise {<resolved>: 123}
console.log(fn2()); // 123
```

**await 等的是右侧「表达式」的结果**

- 右侧如果是函数，那么函数的 return 值就是「表达式的结果」。
- 右侧如果是一个 '123' 或者什么值，那表达式的结果就是 '123'。

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
async1();
console.log("script start");
```

结果：先打印 async2 ，后打印的 script start

- 如果不是 promise , await 会阻塞后面的代码，先执行 async 外面的同步代码，同步代码执行完，再回到 async 内部，把这个非 promise 的东西，作为 await 表达式的结果
- 如果它等到的是一个 promise 对象， await 也会暂停 async 后面的代码，先执行 async 外面的同步代码，等着 Promise 对象 fulfilled ，然后把 resolve 的参数作为 await 表达式的运算结果。

```js
async function async1() {
  console.log("async1 start");
  1;
  await async2();
  console.log("async1 end");
  6;
}
async function async2() {
  console.log("async2");
  2;
}
console.log("script start");
0;
setTimeout(function() {
  console.log("settimeout");
  7;
}, 0);
async1();
new Promise(function(resolve) {
  console.log("promise1");
  3;
  resolve();
}).then(function() {
  console.log("promise2");
  5;
});
console.log("script end");
4;
// script start
// async1 start
// async2
// promise1
// script end
// promise2
// async1 end
// settimeout
```

## Promise 和 async-await 的区别

Promise 和 async-await 都是优化异步编程体验的解决方案。

|                                                                                                           Promise                                                                                                           |                                                                                                   async-await                                                                                                    |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| promise 出现解决了传统 callback 函数回调地域的问题，支持链式调用可以停.then,promise 分别有 3 种状态一旦函数执行 promise 有了结果就无法改变，遇到复杂的业务逻辑 promise 显然不是那么方便需要不停 then 这样语法显然也不美观。 | async,await 是基于 promise 实现的，它是基于 Generator 函数的语法糖，它拥有内置执行器，它返回的是一个 promise 对象，可以使异步代码看起来像同步代码一样，更方便阅读和理解代码，解决了 promise 里面不停.then 的问题 |

不同的场景要用合适的方法，就像 For 和 foreach，效率要考虑，简洁要考虑，更要因为业务场景不同选择合适的方法

::: tip 为什么 Async/Await 更好？
使用 async 函数可以让代码简洁很多，不需要像 Promise 一样需要些 then，不需要写匿名函数处理 Promise 的 resolve 值，也不需要定义多余的 data 变量，还避免了嵌套代码

错误处理：Async/Await 让 try/catch 可以同时处理同步和异步错误。在下面的 promise 示例中，try/catch 不能处理 JSON.parse 的错误，因为它在 Promise 中。我们需要使用 .catch，这样错误处理代码非常冗余。并且，在我们的实际生产代码会更加复杂。
:::

```js
const makeRequest = () => {
  try {
    getJSON().then((result) => {
      // JSON.parse可能会出错
      const data = JSON.parse(result);
      console.log(data);
    });
    // 取消注释，处理异步代码的错误
    // .catch((err) => {
    //   console.log(err)
    // })
  } catch (err) {
    console.log(err);
  }
};
```

### Async 捕获异常

使用 aync/await 的话，catch 能处理 JSON.parse 错误:

```js
const makeRequest = async () => {
  try {
    // this parse may fail
    const data = JSON.parse(await getJSON());
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
```

条件语句也和错误捕获是一样的，在 Async 中也可以像平时一般使用条件语句:

```js
const makeRequest = async () => {
  const data = await getJSON();
  if (data.needsAnotherRequest) {
    const moreData = await makeAnotherRequest(data);
    console.log(moreData);
    return moreData;
  } else {
    console.log(data);
    return data;
  }
};
```

对比 promise

```js
const makeRequest = () => {
  return getJSON().then((data) => {
    if (data.needsAnotherRequest) {
      return makeAnotherRequest(data).then((moreData) => {
        console.log(moreData);
        return moreData;
      });
    } else {
      console.log(data);
      return data;
    }
  });
};
```

async/await 中的错误栈会指向错误所在的函数。在开发环境中，这一点优势并不大。但是，当你分析生产环境的错误日志时，它将非常有用。这时，知道错误发生在 makeRequest 比知道错误发生在 then 链中要好

```js
const makeRequest = async () => {
  await callAPromise();
  await callAPromise();
  await callAPromise();
  await callAPromise();
  await callAPromise();
  throw new Error("oops");
};

makeRequest().catch((err) => {
  console.log(err);
  // output
  // Error: oops at makeRequest (index.js:7:9)
});
```

async/await 能够使得代码调试更简单。2 个理由使得调试 Promise 变得非常痛苦:

- 不能在返回表达式的箭头函数中设置断点
- 如果你在.then 代码块中设置断点，使用 Step Over 快捷键，调试器不会跳到下一个.then，因为它只会跳过异步代码。

使用 await/async 时，你不再需要那么多箭头函数，这样你就可以像调试同步代码一样跳过 await 语句

**在调用的地方处理**

```js
async function task() {
  const fileA = await readFileA();
  const fileB = await readFileB(fileA);
  return fileB;
}
task().catch(() => {
  console.log("read file error");
});
```

**使用 try catch**

```js
async function task() {
  try {
    const fileA = await readFileA();
    const fileB = await readFileB(fileA);
  } catch (e) {
    return "read file error";
  }
}
```

集中处理比较方便，但没有细粒度。有时我们想要更细的区别错误的话，可以试下下面的单独处理

```js
async function task() {
  let fileA;
  try {
    fileA = await readFileA();
  } catch (e) {
    return "read file A error";
  }
  try {
    const fileB = await readFileB(fileA);
  } catch (e) {
    return "read file B error";
  }
}
```

但如果异步任务太多，篇幅会很长，代码不美观、不优雅。这时可以试下下面的方式。

**返回一个数组**

```js
async function task() {
  const [errorA, fileA] = await readFileA()
    .then((res) => [null, res])
    .catch((e) => [e, null]);
  if (errorA) {
    return "read file A error";
  }
  const [errorB, fileB] = await readFileB(fileA)
    .then((res) => [null, res])
    .catch((e) => [e, null]);
  if (errorB) {
    return "read file B error";
  }
  return fileB;
}
```

可以把返回数组的这部分代码抽象一下：

```js
function smartPromise(promise) {
  return promise.then((res) => [null, res]).catch((e) => [e, null]);
}

async function task() {
  const [errorA, fileA] = await smartPromise(readFileA());
  if (errorA !== null) {
    return "read file A error";
  }
  const [errorB, fileB] = await smartPromise(readFileB());
  if (errorB !== null) {
    return "read file B error";
  }
  return fileB;
}
```
