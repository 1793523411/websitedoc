## 为什么使用 Vue？

从前端这么些年的发展史来看，从网页设计年代到了现在大前端时代的来临，各种各样的技术层出不穷。尤其是在前端性能优化方面，为了避免页面的回流和重绘，前辈们总结出了各种解决优化方案，基本都是尽量的减少 DOM 操作。

Vue 的诞生，是一个很大的优化方案，直接用虚拟 DOM 映射真实 DOM，来进行更新，避免了直接操作真实 DOM 带来的性能缺陷。

为了好理解呢，我们换个通俗一点的说法，当页面涉及到操作 DOM 的时候，我们不直接进行操作，因为这样降低了前端页面的性能。而是将 DOM 拿到内存中去，在内存中更改页面的 DOM ，这时候我们操作 DOM 不会导致每次操作 DOM 就会造成不必要的回流和重绘。更新完所有 DOM 之后，我们将更新完的 DOM 再插入到页面中，这样大大提高了页面的性能

虽然这样讲有些欠妥或者不标准，其实 Vue 的虚拟 DOM 的作用可以这样去理解

## 对于 Vue 是一套渐进式框架的理解

每个框架都不可避免会有自己的一些特点，从而会对使用者有一定的要求，这些要求就是主张，主张有强有弱，它的强势程度会影响在业务开发中的使用方式。

1、使用 vue，你可以在原有大系统的上面，把一两个组件改用它实现，当 jQuery 用；

2、也可以整个用它全家桶开发，当 Angular 用；

3、还可以用它的视图，搭配你自己设计的整个下层用。你可以在底层数据逻辑的地方用 OO(Object–Oriented )面向对象和设计模式的那套理念。 也可以函数式，都可以。

它只是个轻量视图而已，只做了自己该做的事，没有做不该做的事，仅此而已。

你不必一开始就用 Vue 所有的全家桶，根据场景，官方提供了方便的框架供你使用。

场景联想 场景 1： 维护一个老项目管理后台，日常就是提交各种表单了，这时候你可以把 vue 当成一个 js 库来使用，就用来收集 form 表单，和表单验证。

场景 2： 得到 boss 认可， 后面整个页面的 dom 用 Vue 来管理，抽组件，列表用 v-for 来循环，用数据驱动 DOM 的变化

场景 3: 越来越受大家信赖，领导又找你了，让你去做一个移动端 webapp，直接上了 vue 全家桶！

场景 1-3 从最初的只因多看你一眼而用了前端 js 库，一直到最后的大型项目解决方案。

## vue.js 的两个核心是什么？

数据驱动和组件化思想

## vue 的优点是什么？

低耦合。视图（View）可以独立于 Model 变化和修改，一个 ViewModel 可以绑定到不同的"View"上，当 View 变化的时候 Model 可以不变，当 Model 变化的时候 View 也可以不变。

可重用性。你可以把一些视图逻辑放在一个 ViewModel 里面，让很多 view 重用这段视图逻辑。

独立开发。开发人员可以专注于业务逻辑和数据的开发（ViewModel），设计人员可以专注于页面设计。

可测试。界面素来是比较难于测试的，而现在测试可以针对 ViewModel 来写。

## 对 MVVM 的理解

MVC 的弊端：MVC 即"Model-View-Controller"，当视图上发生变化，通过 Controller（控件）将响应传入到 Model（数据源），由数据源改变 View 上面的数据，允许 view 和 model 直接通信，随着业务不断庞大，会出现向蜘蛛网一样难以处理的依赖关系，违背了开发应该遵循的"开放封闭原则"

MVVM，萌芽于 2005 年微软推出的基于 Windows 的⽤户界⾯框架 WPF ，前端最早的 MVVM 框架 knockout 在 2010 年发布

![](../../.vuepress/public/MVVM.png)

即"Model-View-ViewModel"，View 通过 View-Model 的 DOM Listeners 将事件绑定到 Model 上，而 Model 则通过 Data Bindings 来管理 View 中的数据，View-Model 从中起到一个连接桥的作用

[MVVM,MVP,MVC](/mian/base/design.html#%E4%BB%80%E4%B9%88%E6%98%AF-mvvm%E4%B9%8B-%E6%AF%94%E4%B9%8B-mvc-%E6%98%AF-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB-%E4%BB%80%E4%B9%88%E5%8F%88%E6%98%AF-mvp)

---

MVVM 是 Model-View-ViewModel 的缩写。MVVM 是一种设计思想。Model 层代表数据模型，也可以在 Model 中定义数据修改和操作的业务逻辑；View 代表 UI 组件，它负责将数据模型转化成 UI 展现出来，ViewModel 是一个同步 View 和 Model 的对象（桥梁）。

在 MVVM 架构下，View 和 Model 之间并没有直接的联系，而是通过 ViewModel 进行交互，Model 和 ViewModel 之间的交互是双向的， 因此 View 数据的变化会同步到 Model 中，而 Model 数据的变化也会立即反应到 View 上。

ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而 View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作 DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。

## mvvm 和 mvc 区别？它和其它框架（jquery）的区别是什么？哪些场景适合？

mvc 和 mvvm 其实区别并不大。都是一种设计思想。主要就是 mvc 中 Controller 演变成 mvvm 中的 viewModel。mvvm 主要解决了 mvc 中大量的 DOM 操作使页面渲染性能降低，加载速度变慢，影响用户体验。

区别：vue 数据驱动，通过数据来显示视图层而不是节点操作。

场景：数据操作比较多的场景，更加便捷

## 说说Vue的MVVM实现原理

理解
```
1)	Vue作为MVVM模式的实现库的2种技术
a.	模板解析
b.	数据绑定

2)	模板解析: 实现初始化显示
a.	解析大括号表达式
b.	解析指令

3)	数据绑定: 实现更新显示
a.	通过数据劫持实现
```
**原理结构图**

![vue_006](../../.vuepress/public/mvvm3.png)

## vue 双向数据绑定原理

vue 通过使用双向数据绑定，来实现了 View 和 Model 的同步更新。vue 的双向数据绑定主要是通过使用**数据劫持**和**发布订阅者模式**来实现的。

首先我**们通过 Object.defineProperty() 方法来对 Model 数据各个属性添加访问器属性，以此来实现数据的劫持**，因此当 Model 中的数据发生变化的时候，我们可以通过配置的 setter 和 getter 方法来实现对 View 层数据更新的通知。

数据在 html 模板中一共有**两种绑定情况**，一种是使用 v-model 来对 value 值进行绑定，一种是作为文本绑定，在对模板引擎进行解析的过程中。

如果遇到**元素节点**，并且属性值包含 v-model 的话，我们就从 Model 中去获取 v-model 所对应的属性的值，并赋值给元素的 value 值。然后给这个元素设置一个监听事件，当 View 中元素的数据发生变化的时候触发该事件，通知 Model 中的对应的属性的值进行更新。

如果遇到了绑定的**文本节点**，我们使用 Model 中对应的属性的值来替换这个文本。

**对于文本节点的更新，我们使用了发布订阅者模式**，属性作为一个主题，我们为这个节点设置一个订阅者对象，将这个订阅者对象加入这个属性主题的订阅者列表中。当 Model 层数据发生改变的时候，Model 作为发布者向主题发出通知，主题收到通知再向它的所有订阅者推送，订阅者收到通知后更改自己的数据。

## vue 双向数据绑定的实现

- vue 内部利用 Object.defineProperty 监听数据变化，使数据具有可观测性，结合发布订阅模式，在数据发生变化时更新视图利用 Proxy 或 Object.defineProperty 生成的 Observer 针对对象/对象的属性进行"劫持",在属性发生变化后通知订阅者
- 解析器 Compile 解析模板中的 Directive(指令)，收集指令所依赖的方法和数据,等待数据变化然后进行渲染
- Watcher 属于 Observer 和 Compile 桥梁,它将接收到的 Observer 产生的数据变化,并根据 Compile 提供的指令进行视图渲染,使得数据变化促使视图变化

```js
// 简单的双向数据绑定
const data = {};
Object.keys(data).forEach(function(key) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      console.log("get");
    },
    set: function(newVal) {
      // 当属性值发⽣变化时我们可以进⾏额外操作
    },
  });
});
```

## Object.defineProperty 函数

Object.defineProperty 函数一共有三个参数，第一个参数是**需要定义属性的对象**，第二个参数是**需要定义的属性**，第三个是**该属性描述符**。一个属性的描述符有四个属性，分别是 value 属性的值，writable 属性是否可写，enumerable 属性是否可枚举，configurable 属性是否可配置修改。

**语法**

Object.defineProperty(object, attribute, descriptor)

- 这三个参数都是必输项
- 第一个参数为 目标对象
- 第二个参数为 需要定义的属性或者方法
- 第三个参数为 目标属性所拥有的特性

**descriptor**

前两个参数都很明确，重点是第三个参数 descriptor， 它有以下取值

- value: 属性的值
- writable: 属性的值是否可被重写（默认为 false）
- configurable: 总开关，是否可配置，若为 false, 则其他都为 false（默认为 false）
- enumerable: 属性是否可被枚举（默认为 false）
- get: 获取该属性的值时调用
- set: 重写该属性的值时调用

一个例子

```js
var a = {};
Object.defineProperty(a, "b", {
  value: 123,
});
console.log(a.b); //123
a.b = 456;
console.log(a.b); //123
a.c = 110;
for (item in a) {
  console.log(item, a[item]); //c 110
}
```

因为 writable 和 enumerable 默认值为 false, 所以对 a.b 赋值无效，也无法遍历它

**configurable**

总开关，是否可配置，设置为 false 后，就不能再设置了，否则报错， 例子

```js
var a = {};
Object.defineProperty(a, "b", {
  configurable: false,
});
Object.defineProperty(a, "b", {
  configurable: true,
});
//error: Uncaught TypeError: Cannot redefine property: b
```

**writable**

是否可重写

```js
var a = {};
Object.defineProperty(a, "b", {
  value: 123,
  writable: false,
});
console.log(a.b); // 打印 123
a.b = 25; // 没有错误抛出（在严格模式下会抛出，即使之前已经有相同的值）
console.log(a.b); // 打印 123， 赋值不起作用。
```

**enumerable**

属性特性 enumerable 定义了对象的属性是否可以在 for...in 循环和 Object.keys() 中被枚举

```js
var a = {};
Object.defineProperty(a, "b", {
  value: 3445,
  enumerable: true,
});
console.log(Object.keys(a)); // 打印["b"]
```

enumerable 改为 false

```js
var a = {};
Object.defineProperty(a, "b", {
  value: 3445,
  enumerable: false, //注意咯这里改了
});
console.log(Object.keys(a)); // 打印[]
```

**set 和 get**

如果设置了 set 或 get, 就不能设置 writable 和 value 中的任何一个，否则报错

```js
var a = {};
Object.defineProperty(a, "abc", {
  value: 123,
  get: function() {
    return value;
  },
});
//Uncaught TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute, #<Object> at Function.defineProperty
```

对目标对象的目标属性 赋值和取值 时， 分别触发 set 和 get 方法

```js
var a = {};
var b = 1;
Object.defineProperty(a, "b", {
  set: function(newValue) {
    b = 99;
    console.log("你要赋值给我,我的新值是" + newValue);
  },
  get: function() {
    console.log("你取我的值");
    return 2; //注意这里，我硬编码返回2
  },
});
a.b = 1; //打印 你要赋值给我,我的新值是1
console.log(b); //打印 99
console.log(a.b); //打印 你取我的值
//打印 2    注意这里，和我的硬编码相同的
```

上面的代码中，给 a.b 赋值，b 的值也跟着改变了。原因是给 a.b 赋值，自动调用了 set 方法，在 set 方法中改变了 b 的值。vue 双向绑定的原理就是这个。

## 使用 Object.defineProperty() 来进行数据劫持有什么缺点？

**有一些对属性的操作，使用这种方法无法拦截**，比如说**通过下标方式修改数组数据**或者**给对象新增属性**，**vue 内部通过重写函数解决了这个问**题。在 Vue3.0 中已经不使用这种方式了，而是通过使用 Proxy 对对象进行代理，从而实现数据劫持。使用 **Proxy 的好处是它可以完美的监听到任何方式的数据改变**，唯一的缺点是**兼容性的问题**，因为这是 ES6 的语法。

## Object.defineProperty 和 proxy 的优劣区别

Object.defineProperty 兼容性较好，但不能直接监听数组的变化，只能监听对象的属性(有时需要深层遍历)

与之相比 proxy 的优点：

- 可以直接监听数组的变化
- 可以直接监听对象而非属性
- proxy 有多达 13 种的拦截方法，不限于 apply、ownKeys、deleteProperty、has 等等
- proxy 受到各大浏览器厂商的重视

## 为什么要替换 Object.defineProperty？（Proxy 相比于 defineProperty 的优势）

在 Vue 中，Object.defineProperty 无法监控到数组下标的变化，导致直接通过数组的下标给数组设置值，不能实时响应。

Object.defineProperty 只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历。Vue 2.x 里，是通过 递归 + 遍历 data 对象来实现对数据的监控的，如果属性值也是对象那么需要深度遍历,显然如果能劫持一个完整的对象是才是更好的选择。

而要取代它的 Proxy 有以下两个优点;

可以劫持整个对象，并返回一个新对象
有 13 种劫持操作
既然 Proxy 能解决以上两个问题，而且 Proxy 作为 es6 的新属性在 vue2.x 之前就有了，为什么 vue2.x 不使用 Proxy 呢？一个很重要的原因就是：

Proxy 是 es6 提供的新特性，兼容性不好，最主要的是这个属性无法用 polyfill 来兼容

## 什么是 Proxy？

1.含义：

Proxy 是 ES6 中新增的一个特性，翻译过来意思是"代理"，用在这里表示由它来“代理”某些操作。 Proxy 让我们能够以简洁易懂的方式控制外部对对象的访问。其功能非常类似于设计模式中的代理模式。

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

使用 Proxy 的核心优点是可以交由它来处理一些非核心逻辑（如：读取或设置对象的某些属性前记录日志；设置对象的某些属性值前，需要验证；某些属性的访问控制等）。 从而可以让对象只需关注于核心逻辑，达到关注点分离，降低对象复杂度等目的。

2.基本用法：

```js
let p = new Proxy(target, handler);
```

参数：

target 是用 Proxy 包装的被代理对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。

handler 是一个对象，其声明了代理 target 的一些操作，其属性是当执行一个操作时定义代理的行为的函数。

p 是代理后的对象。当外界每次对 p 进行操作时，就会执行 handler 对象上的一些方法。Proxy 共有 13 种劫持操作，handler 代理的一些常用的方法有如下几个：

- get：读取
- set：修改
- has：判断对象是否有该属性
- construct：构造函数

  3.示例：

下面就用 Proxy 来定义一个对象的 get 和 set，作为一个基础 demo

```js
let obj = {};
let handler = {
  get(target, property) {
    console.log(`${property} 被读取`);
    return property in target ? target[property] : 3;
  },
  set(target, property, value) {
    console.log(`${property} 被设置为 ${value}`);
    target[property] = value;
  },
};

let p = new Proxy(obj, handler);
p.name = "tom"; //name 被设置为 tom
p.age; //age 被读取 3
```

p 读取属性的值时，实际上执行的是 handler.get() ：在控制台输出信息，并且读取被代理对象 obj 的属性。

p 设置属性值时，实际上执行的是 handler.set() ：在控制台输出信息，并且设置被代理对象 obj 的属性的值。

## 什么是 Virtual DOM 么 ？为什么 Virtual DOM 生 比原生 DOM 快

我对 Virtual DOM 的理解是:首先对我们将要插入到文档中的 DOM 树结构进行分析，使用 js 对象将其表示出来，比如一个元素对象，包含 TagName、props 和 Children 这些属性。然后我们将这个 **js 对象树**给保存下来，最后再将 DOM 片段插入到文档中。

当页面的状态发生改变，我们需要对页面的 DOM 的结构进行调整的时候，我们首先根据变更的状态，重新构建起一棵对象树，然后将这棵新的对象树和旧的对象树进行比较，记录下两棵树的的差异。

最后将记录的有差异的地方应用到真正的 DOM 树中去，这样视图就更新了。我认为 Virtual DOM 这种方法对于我们需要有大量的 DOM 操作的时候，能够很好的提高我们的操作效率，**通过在操作前确定需要做的最小修改**，**尽可能的减少 DOM 操作带来的重流和重绘的影响**。其实 **Virtual DOM 并不一定比我们真实的操作 DOM 要快，这种方法的目的是为了提高我们开发时的可维护性，在任意的情况下，都能保证一个尽量小的性能消耗去进行操作**。

## 除了数据劫持，vue 为什么还需要虚拟 DOM 进行 diff 检测差异

现代前端框架主要有两种监听数据的方式：一种是**pull**的方式，一种是**push**的方式

**pull，其代表为 react**，react 和 vue 基于双向数据绑定的依赖收集的订阅式机制不同，react 是通过显式的触发函数调用来更新视图，比如 setState，然后 React 会一层层的进行 VirtualDom Diff 操作找出差异，通过较暴力 diff 的方式查找哪里发生变化。**另一个代表是 angular 的脏值检测**

**push，其代表为 vue**，当 Vue 程序初始化的时候就会对数据 data 进行依赖的收集，一但数据发生变化，响应式系统就会立刻得知；我们知道绑定一个数据通常就需要一个 watcher，那么一旦细粒度过高会产生大量的 watcher，会给增加内存以及依赖追踪的开销，而细粒度过低会无法精准检测变化，因此 vue 选择中细粒度方案，**在组件级进行 push 检测的方式(即依赖响应式系统)，在组件内部进行 Virtual Dom Diff 获取更加具体的差异，所以 vue 采用了 push+pull 结合的方式**

## 如何比较两个 DOM 树的差异？

两个树的完全 diff 算法的时间复杂度为 O(n^3) ，但是**在前端中，我们很少会跨层级的移动元素，所以我们只需要比较同一层级的元素进行比较，这样就可以将算法的时间复杂度降低为 O(n)**。

算法首先会对新旧两棵树进行一个深度优先的遍历，这样每个节点都会有一个序号。在深度遍历的时候，每遍历到一个节点，我们就将这个节点和新的树中的节点进行比较，如果有差异，则将这个差异记录到一个对象中。

在对列表元素进行对比的时候，由于 TagName 是重复的，所以我们不能使用这个来对比。我们需要给每一个子节点加上一个 key，**列表对比的时候使用 key 来进行比较，这样我们才能够复用老的 DOM 树上的节点**。

## 对 vue 响应式系统的理解

![](../../.vuepress/public/08.png)

vue 响应式的原理，首先对象传入 vue 实例作为 data 对象时，首先被 vue 遍历所有属性，调用 Object.defineProperty 设置为 getter 和 setter，每个组件都有一个 watcher 对象，在组件渲染的过程中，把相关的数据都注册成依赖，当数据发生 setter 变化时，会通知 watcehr，从而更新相关联的组件

响应式系统简述：

- 任何⼀个 Vue Component 都有⼀个与之对应的 Watcher 实例
- Vue 的 data 上的属性会被添加 getter 和 setter 属性
- 当 Vue Component render 函数被执⾏的时候，data 上会被触碰(touch)， 即被读，getter ⽅法会被调⽤， 此时 Vue 会去记录此 Vue component 所依赖的所有 data(这⼀过程被称为依赖收集)
- data 被改动时(主要是⽤户操作)， setter ⽅法会被调⽤， 此时 Vue 会去通知所有依赖于此 data 的组件去调⽤他们的 render 函数进⾏更新

## vue 更新数组时触发视图更新的方法

1.Vue.set 可以设置对象或数组的值，通过 key 或数组索引，可以触发视图更新

```js
数组修改;

Vue.set(array, indexOfItem, newValue);
this.array.$set(indexOfItem, newValue);
对象修改;

Vue.set(obj, keyOfItem, newValue);
this.obj.$set(keyOfItem, newValue);
```

2.Vue.delete 删除对象或数组中元素，通过 key 或数组索引，可以触发视图更新

```js
数组修改;

Vue.delete(array, indexOfItem);
this.array.$delete(indexOfItem);
对象修改;

Vue.delete(obj, keyOfItem);
this.obj.$delete(keyOfItem);
```

3.数组对象直接修改属性，可以触发视图更新

```js
this.array[0].show = true;
this.array.forEach(function(item) {
  item.show = true;
});
```

4.splice 方法修改数组，可以触发视图更新

```js
this.array.splice(indexOfItem, 1, newElement);
```

5.数组整体修改，可以触发视图更新

```js
var tempArray = this.array;
tempArray[0].show = true;
this.array = tempArray;
```

6.用 Object.assign 或 lodash.assign 可以为对象添加响应式属性，可以触发视图更新

```js
//Object.assign的单层的覆盖前面的属性，不会递归的合并属性
this.obj = Object.assign({}, this.obj, { a: 1, b: 2 });

//assign与Object.assign一样
this.obj = _.assign({}, this.obj, { a: 1, b: 2 });

//merge会递归的合并属性
this.obj = _.merge({}, this.obj, { a: 1, b: 2 });
```

7.Vue 提供了如下的数组的变异方法，可以触发视图更新

```js
push();
pop();
shift();
unshift();
splice();
sort();
reverse();
```

## vue 在什么情况下在数据发生改变的时候不会触发视图更新

v-for 遍历的数组，当数组内容使用的是 `arr[0].xx =xx` 更改数据，vue 无法监测到 vm.arr.length = newLength 也是无法检测的到的

## Vue 的生命周期是什么

Vue 的生命周期指的是**组件从创建到销毁的一系列的过程**，被称为 Vue 的生命周期。通过提供的 Vue 在生命周期各个阶段的钩子函数，我们可以很好的在 Vue 的各个生命阶段实现一些操作

![](../../.vuepress/public/vue-life-cycle.png)
![](../../.vuepress/public/vue-ifecycle2.jpg)

- beforeCreate：完成实例初始化，初始化非响应式变量
- created：实例初始化完成(未挂载 DOM)
- berofeMount：找到对应的 template，并编译成 render 函数
- mounted：完成创建 vm.\$el 和双向绑定，完成 DOM 挂载
- beforeUpdate：数据更新之前(可在更新前访问现有的 DOM)
- updated：完成虚拟 DOM 的重新渲染和打补丁
- activated：子组件需要在每次加载时候进行某些操作，可以使用 activated 钩子触发
- deactivated：keep-alive 组件被移除时使用
- beforeDestroy：可做一些删除提示，销毁定时器，解绑全局时间 销毁插件对象
- destroyed：当前组件已被销毁

## Vue 的各个生命阶段是什么？

Vue 一共有 **8** 个生命阶段，分别是**创建前、创建后、加载前、加载后、更新前、更新后、销毁前和销毁后**，每个阶段对应了一个生命周期的钩子函数。

（1）beforeCreate 钩子函数，在**实例初始化之后**，在**数据监听和事件配置之前触发**。因此在这个事件中我们是**获取不到 data 数据**的。

（2）created 钩子函数，在**实例创建完成后触发**，此时可以访问 data、methods 等属性。但这个时候**组件还没有被挂载到页面中去**，所以这个时候访问**不到 \$el 属性**。一般我们可以在这个函数中**进行一些页面初始化的工作，比如通过 ajax 请求数据来对页面进行初始化**。

（3）beforeMount 钩子函数，在**组件被挂载到页面之前触发**。**在 beforeMount 之前，会找到对应的 template，并编译成 render 函数**。

（4）mounted 钩子函数，在**组件挂载到页面之后触发**。此时**可以通过 DOM API 获取到页面中的 DOM 元素**。

（5）beforeUpdate 钩子函数，在**响应式数据更新时触发**，发生在虚拟 DOM 重新渲染和打补丁之前**，这个时候我们可以**对可能会被移除的元素做一些操作\*\*，比如移除事件监听器。

（6）updated 钩子函数，**虚拟 DOM 重新渲染和打补丁之后调用**。

（7）beforeDestroy 钩子函数，在**实例销毁之前调用**。一般在这一步我们**可以销毁定时器、解绑全局事件**等。

（8）destroyed 钩子函数，在**实例销毁之后调用**，调用后，Vue 实例中的所有东西都会解除绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

当我们使用 keep-alive 的时候，还有两个钩子函数，分别是 activated 和 deactivated 。**用 keep-alive 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行 deactivated 钩子函数，命中缓存渲染后会执行 actived 钩子函数**。

**Vue 组件销毁时，会自动清理它与其它实例的连接，解绑它的全部指令及事件监听器，但是仅限于组件本身的事件在组件中使用 addEventListene 是不会销毁的，所以我们在组件销毁时手动移除这些事件监听，避免造成内存泄漏**

```js
created() {
 addEventListener('click', this.click, false)
},
beforeDestroy() {
 removeEventListener('click', this.click, false)
}
```

## Vue 的父组件和子组件生命周期钩子执行顺序是什么


* 加载渲染过程
    * 父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted

* 子组件更新过程

    * 父beforeUpdate->子beforeUpdate->子updated->父updated

* 父组件更新过程
    * 父beforeUpdate->父updated

* 销毁过程
    * 父beforeDestroy->子beforeDestroy->子destroyed->父destroyed


## Vue 组件间的参数传递方式

（1）父子组件间通信

第一种方法是子组件通过 **props 属性**来接受父组件的数据，然后**父组件在子组件上注册监听事件，子组件通过 emit 触发事件来向父组件发送数据**。

第二种是通过 **ref 属性**给子组件设置一个名字。**父组件通过 `$refs` 组件名来获得子组件，子组件通过 `$parent` 获得父组件**，这样也可以实现通信。

第三种是使用 **provider/injec**t，在**父组件中通过 provider 提供变量，在子组件中通过 inject 来将变量注入到组件中**。**不论子组件有多深，只要调用了 inject 那么就可以注入 provider 中的数据。**

（2）兄弟组件间通信

第一种是使用 **eventBus** 的方法，它的本**质是通过创建一个空的 Vue 实例来作为消息传递的对象**，通信的组件引入这个实例，通信的组件通过在这个实例上监听和触发事件，来实现消息的传递。

第二种是通过 **`$parent.$refs`** 来获取到兄弟组件，也可以进行通信。

（3）任意组件之间

使用 **eventBus** ，其实就是创建一个**事件中心，相当于中转站**，可以用它来传递事件和接收事件。如果业务逻辑复杂，很多组件之间需要同时处理一些公共的数据，这个时候采用上面这一些方法可能不利于项目的维护。这个时候可以使用 **vuex** ，**vuex 的思想就是将这一些公共的数据抽离出来，将它作为一个全局的变量来管理，然后其他组件就可以对这个公共数据进行读写操作，这样达到了解耦的目的**。

总结：

- props/\$emit+v-on
  - 父组件通过 props 的方式向子组件传递数据，而通过\$emit 子组件可以向父组件通信
- eventBus
  - 通过 eventBus 向中心事件发送或者接收事件，所有事件都可以共用事件中心
- vuex
  - 状态管理模式，采用集中式存储管理应用的所有组件的状态，可以通过 vuex 管理全局的数据

## 实现通信方式


```
方式1: props
1)	通过一般属性实现父向子通信
2)	通过函数属性实现子向父通信
3)	缺点: 隔代组件和兄弟组件间通信比较麻烦

方式2: vue自定义事件
1)	vue内置实现, 可以代替函数类型的props
  a.	绑定监听: <MyComp @eventName="callback"
  b.	触发(分发)事件: this.$emit("eventName", data)
2)	缺点: 只适合于子向父通信

方式3: 消息订阅与发布
1)	需要引入消息订阅与发布的实现库, 如: pubsub-js
  a.	订阅消息: PubSub.subscribe('msg', (msg, data)=>{})
  b.	发布消息: PubSub.publish(‘msg’, data)
2)	优点: 此方式可用于任意关系组件间通信

方式4: vuex
1)	是什么: vuex是vue官方提供的集中式管理vue多组件共享状态数据的vue插件
2)	优点: 对组件间关系没有限制, 且相比于pubsub库管理更集中, 更方便

方式5: slot
1)	是什么: 专门用来实现父向子传递带数据的标签
  a.	子组件
  b.	父组件
2)	注意: 通信的标签模板是在父组件中解析好后再传递给子组件的
```

## 组件的设计原则

- 页面上每个独立的可视/可交互区域视为一个组件(比如页面的头部，尾部，可复用的区块)
- 每个组件对应一个工程目录，组件所需要的各种资源在这个目录下就近维护(组件的就近维护思想体现了前端的工程化思想，为前端开发提供了很好的分治策略，在 vue.js 中，通过.vue 文件将组件依赖的模板，js，样式写在一个文件中)
- 每个开发者清楚开发维护的功能单元，它的代码必然存在在对应的组件目录中，在该目录下，可以找到功能单元所有的内部逻辑)
- 页面不过是组件的容器，组件可以嵌套自由组合成完整的页面

## vue 中如何编写可复用的组件？

总结组件的职能，什么需要外部控制（即 props 传啥），组件需要控制外部吗（\$emit）,是否需要插槽（slot）

## Vue 组件中 data 为什么必须是函数

在 new Vue() 中，data 是可以作为一个对象进行操作的，然而在 component 中，data 只能以函数的形式存在，不能直接将对象赋值给它，这并非是 Vue 自身如此设计，而是跟 JavaScript 特性相关，我们来回顾下 JavaScript 的原型链

```js
var Component = function() {};
Component.prototype.data = {
  message: "Love",
};
var component1 = new Component(),
  component2 = new Component();
component1.data.message = "Peace";
console.log(component2.data.message); // Peace
```

以上**两个实例都引用同一个原型对象，当其中一个实例属性改变时，另一个实例属性也随之改变，只有当两个实例拥有自己的作用域时，才不会互相干扰** ！！！！！这句是重点！！！！！

```js
var Component = function() {
  this.data = this.data();
};
Component.prototype.data = function() {
  return {
    message: "Love",
  };
};
var component1 = new Component(),
  component2 = new Component();
component1.data.message = "Peace";
console.log(component2.data.message); // Love
```

## vue 中子组件调用父组件的方法

- 第一种方法是直接在子组件中通过 this.\$parent.event 来调用父组件的方法
- 第二种方法是在子组件里用\$emit 向父组件触发一个事件，父组件监听这个事件就行了
- 第三种是父组件把方法传入子组件中，在子组件里直接调用这个方法

解析：

第一种方法是直接在子组件中通过 this.\$parent.event 来调用父组件的方法

父组件

```js
<template>
  <div>
    <child></child>
  </div>
</template>
<script>
  import child from '~/components/dam/child';
  export default {
    components: {
      child
    },
    methods: {
      fatherMethod() {
        console.log('测试');
      }
    }
  };
</script>
```

子组件

```html
<template>
  <div>
    <button @click="childMethod()">点击</button>
  </div>
</template>
<script>
  export default {
    methods: {
      childMethod() {
        this.$parent.fatherMethod();
      },
    },
  };
</script>
```

第二种方法是在子组件里用\$emit 向父组件触发一个事件，父组件监听这个事件就行了

父组件

```html
<template>
  <div>
    <child @fatherMethod="fatherMethod"></child>
  </div>
</template>
<script>
  import child from "~/components/dam/child";
  export default {
    components: {
      child,
    },
    methods: {
      fatherMethod() {
        console.log("测试");
      },
    },
  };
</script>
```

子组件

```html
<template>
  <div>
    <button @click="childMethod()">点击</button>
  </div>
</template>
<script>
  export default {
    methods: {
      childMethod() {
        this.$emit("fatherMethod");
      },
    },
  };
</script>
```

第三种是父组件把方法传入子组件中，在子组件里直接调用这个方法

父组件

```html
<template>
  <div>
    <child :fatherMethod="fatherMethod"></child>
  </div>
</template>
<script>
  import child from "~/components/dam/child";
  export default {
    components: {
      child,
    },
    methods: {
      fatherMethod() {
        console.log("测试");
      },
    },
  };
</script>
```

子组件

```html
<template>
  <div>
    <button @click="childMethod()">点击</button>
  </div>
</template>
<script>
  export default {
    props: {
      fatherMethod: {
        type: Function,
        default: null,
      },
    },
    methods: {
      childMethod() {
        if (this.fatherMethod) {
          this.fatherMethod();
        }
      },
    },
  };
</script>
```

## vue 中父组件调用子组件的方法

使用\$refs

解析：

父组件

```html
<template>
  <div>
    <button @click="clickParent">点击</button>
    <child ref="mychild"></child>
  </div>
</template>

<script>
  import Child from "./child";
  export default {
    name: "parent",
    components: {
      child: Child,
    },
    methods: {
      clickParent() {
        this.$refs.mychild.parentHandleclick("嘿嘿嘿"); // 划重点！！！！
      },
    },
  };
</script>
```

子组件

```html
<template>
  <div>
    child
  </div>
</template>

<script>
  export default {
    name: "child",
    props: "someprops",
    methods: {
      parentHandleclick(e) {
        console.log(e);
      },
    },
  };
</script>
```

## computed 和 和 watch 的差异

知识点：

当我们要进⾏数值计算,⽽且依赖于其他数据，我们需要使用 computed

如果你需要在某个数据变化时做⼀些事情，使⽤ watch 来观察这个数据

computed：

- 是计算值，
- 应用：就是简化 tempalte 里面计算和处理 props 或\$emit 的传值
- 具有缓存性，页面重新渲染值不变化,计算属性会立即返回之前的计算结果，而不必再次执行函数

watch：

- 是观察的动作，
- 应用：监听 props，\$emit 或本组件的值执行异步操作
- 无缓存性，页面重新渲染时值不变化也会执行

回答：

（1）computed 是**计算一个新的属性，并将该属性挂载到 Vue 实例上**，而 watch 是**监听已经存在且已挂载到 Vue 实例上的数**据，所以**用 watch 同样可以监听 computed 计算属性的变化**。

（2）computed 本质是一个**惰性求值的观察者**，具有**缓存性**，只有当依赖变化后，第一次访问 computed 属性，才会计算新的值。而 watch 则是当数据发生变化便会调用执行函数。

（3）从使用场景上说，**computed 适用一个数据被多个数据影响，而 watch 适用一个数据影响多个数据**

computed 是计算属性，**依赖其他属性计算值，并且 computed 的值有缓存**，只有当计算值变化才会返回内容。

watch **监听到值的变化就会执行回调，在回调中可以进行一些逻辑操作**。

## 计算属性的缓存和方法调用的区别

计算属性是基于数据的依赖缓存，数据发生变化，缓存才会发生变化，如果数据没有发生变化，调用计算属性直接调用的是存储的缓存值；

而方法每次调用都会重新计算；所以可以根据实际需要选择使用，如果需要计算大量数据，性能开销比较大，可以选用计算属性，如果不能使用缓存可以使用方法；

其实这两个区别还应加一个 watch，watch 是用来监测数据的变化，和计算属性相比，是 watch 没有缓存，但是一般想要在数据变化时响应时，或者执行异步操作时，可以选择 watch

## vue 指令有哪些，v-if 和 v-for 能不能一起使用

```
v-html，v-text，v-show，v-for，v-if v-else-if v-else，
v-bind（用来动态的绑定一个或者多个特性）
img
v-model（创建双向数据绑定）
v-cloak（保持在元素上直到关联实例结束时进行编译）
v-pre（用来跳过这个元素和它的子元素编译过程）
```

:::tip v-if 和 v-for 能不能一起使用(或者问 v-for 和 v-if 谁的优先级更高)：
v-for 指令的优先级要高于 v-if，当处于同一节点时候，意味着 v-if 将分别重复运行于每个 v-for 循环中，所以应该尽量避免 v-for 和 v-if 在同一结点
:::

## v-for 为什么必须为 item 增加 key？为什么同时避免 v-if？

使用 v-for 渲染列表的时候，默认使用 就地复用 策略。当列表的数据修改的时候，会根据 key 值判断某个值是否修改，如果修改则重新渲染这一项，否则复用之前的元素。

- key 的作用主要是为了高效的更新虚拟 DOM 。
- v-for 比 v-if 优先级高，如果每一次都需要遍历整个数组，将会影响速度，尤其是当需要渲染很小一部分的时候，必要情况下应该替换成 computed 属性。例如：

```js
<ul>
 <li
  v-for="user in activeUsers"
 :key="user.id">
 {{ user.name }}
 </li>
</ul>
computed: {
 activeUsers: function () {
  return this.users.filter(function (user) {
return user.isActive
 })
}
}
```

## vue slot 是做什么的?

可以插入的槽口，比如插座的插孔。

## 请问 v-if 和 v-show 有什么区别

v-show 指令是通过修改元素的 display 的 CSS 属性让其显示或者隐藏

v-if 指令是直接销毁和重建 DOM 达到让元素显示和隐藏的效果

## v-on 可以监听多个方法吗？

肯定可以的。

解析：

```html
<input
  type="text"
  :value="name"
  @input="onInput"
  @focus="onFocus"
  @blur="onBlur"
/>
```

## 指令 v-el 的作用是什么?

提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标.可以是 CSS 选择器，也可以是一个 HTMLElement 实例

## `$nextTick` 的使用

1、什么是 Vue.nextTick()？

定义：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

所以就衍生出了这个获取更新后的 DOM 的 Vue 方法。所以放在 Vue.nextTick()回调函数中的执行的应该是会对 DOM 进行操作的 js 代码；

理解：**nextTick()，是将回调函数延迟在下一次 dom 更新数据后调用**，简单的理解是：当数据更新了，在 dom 中渲染后，自动执行该函数，

```js

<template>
  <div class="hello">
    <div>
      <button id="firstBtn" @click="testClick()" ref="aa">{{testMsg}}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      testMsg:"原始值",
    }
  },
  methods:{
    testClick:function(){
      let that=this;
      that.testMsg="修改后的值";
      console.log(that.$refs.aa.innerText);   //that.$refs.aa获取指定DOM，输出：原始值
    }
  }
}
</script>
```

使用 this.\$nextTick()

```js
methods:{
    testClick:function(){
      let that=this;
      that.testMsg="修改后的值";
      that.$nextTick(function(){
        console.log(that.$refs.aa.innerText);  //输出：修改后的值
      });
    }
  }
```

注意：Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，而是按一定的策略进行 DOM 的更新。$nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM，

2、什么时候需要用的 Vue.nextTick()？？

1、Vue 生命周期的 **created()钩子函数进行的 DOM 操作一定要放在 Vue.nextTick()的回调函数中**，原因是在 created()钩子函数执行的时候 DOM 其实并未进行任何渲染，而此时进行 DOM 操作无异于徒劳，所以此处一定要将 DOM 操作的 js 代码放进 Vue.nextTick()的回调函数中。与之对应的就是 mounted 钩子函数，因为该钩子函数执行时所有的 DOM 挂载已完成。

```js
created(){
    let that=this;
    that.$nextTick(function(){  //不使用this.$nextTick()方法会报错
        that.$refs.aa.innerHTML="created中更改了按钮内容";  //写入到DOM元素
    });
}
```

2、**当项目中你想在改变 DOM 元素的数据后基于新的 dom 做点什么，对新 DOM 一系列的 js 操作都需要放进 Vue.nextTick()的回调函数中**；通俗的理解是：更改数据后当你想立即使用 js 操作新的视图的时候需要使用它

```js

<template>
  <div class="hello">
    <h3 id="h">{{testMsg}}</h3>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      testMsg:"原始值",
    }
  },
  methods:{
    changeTxt:function(){
      let that=this;
      that.testMsg="修改后的文本值";  //vue数据改变，改变dom结构
      let domTxt=document.getElementById('h').innerText;  //后续js对dom的操作
      console.log(domTxt);  //输出可以看到vue数据修改后DOM并没有立即更新，后续的dom都不是最新的
      if(domTxt==="原始值"){
        console.log("文本data被修改后dom内容没立即更新");
      }else {
        console.log("文本data被修改后dom内容被马上更新了");
      }
    },

  }
}
</script>
```

正确的用法是：vue 改变 dom 元素结构后使用 vue.\$nextTick()方法来实现 dom 数据更新后延迟执行后续代码

```js
    changeTxt:function(){
      let that=this;
      that.testMsg="修改后的文本值";  //修改dom结构

      that.$nextTick(function(){  //使用vue.$nextTick()方法可以dom数据更新后延迟执行
        let domTxt=document.getElementById('h').innerText;
        console.log(domTxt);  //输出可以看到vue数据修改后并没有DOM没有立即更新，
        if(domTxt==="原始值"){
          console.log("文本data被修改后dom内容没立即更新");
        }else {
          console.log("文本data被修改后dom内容被马上更新了");
        }
      });
    }
```

3、**在使用某个第三方插件时 ，希望在 vue 生成的某些 dom 动态发生变化时重新应用该插件，也会用到该方法，这时候就需要在 \$nextTick 的回调函数中执行重新应用插件的方法**。

Vue.nextTick(callback) 使用原理：

原因是，Vue 是异步执行 dom 更新的，一旦观察到数据变化，Vue 就会开启一个队列，然后把在同一个事件循环 (event loop) 当中观察到数据变化的 watcher 推送进这个队列。如果这个 watcher 被触发多次，只会被推送到队列一次。这种缓冲行为可以有效的去掉重复数据造成的不必要的计算和 DOm 操作。而在下一个事件循环时，Vue 会清空队列，并进行必要的 DOM 更新。
当你设置 vm.someData = 'new value'，DOM 并不会马上更新，而是在异步队列被清除，也就是下一个事件循环开始时执行更新时才会进行必要的 DOM 更新。如果此时你想要根据更新的 DOM 状态去做某些事情，就会出现问题。。为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用 Vue.nextTick(callback) 。这样回调函数在 DOM 更新完成后就会调用。

## vue-router 中的导航钩子函数

（1）全局的钩子函数 beforeEach 和 afterEachbeforeEach 有三个参数，**to 代表要进入的路由对象，from 代表离开的路由对象**。**next 是一个必须要执行的函数**，如果不传参数，那就执行下一个钩子函数，如果传入 false，则终止跳转，如果传入一个路径，则导航到对应的路由，如果传入 error ，则导航终止，error 传入错误的监听函数。

（2）**单个路由独享的钩子函数 beforeEnter**，它是在路由配置上直接进行定义的。

（3）**组件内的导航钩子**主要有这三种：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave。它们是直接在路由组件内部直接进行定义的。

## `$route` 和 和 `$router` 的区别

**`$route` 是“路由信息对象”**，包括 path，params，hash，query，fullPath，matched，name 等路由信息参数。而 **`$router` 是“路由实例”对象**包括了路由的跳转方法，钩子函数等。

## vue 的路由实现

更新视图但不重新请求页面，是前端路由原理的核心，目前在浏览器环境主要有两种方式：

- Hash 模式(默认)

模式的原理是 onhashchange 事件 ，可以在 window 对象上监听这个事件。

使用 URL 的 hash 来模拟一个完整的 URL ，于是当 URL 改变时，页面不会重新加载。

hash（`#`） 是 URL 的锚点，代表的是网页中的一个位置，单单改变 `#` 后的部分，浏览器只会滚动到相应位置，不会重新加载网页，也就是说 hash 出现在 URL 中，但不会被包含在 http 请求中，对后端完全没有影响

hash("#")符号的本来作用是加在 URL 指示网页中的位置：

```
http://www.example.com/index.html#print
```

`#`本身以及它后面的字符称之为 hash，可通过 window.location.hash 属性读取，hash 虽然在 url 中，但是却不会被包含在 http 请求中，也不会重新加载页面，它用来指导浏览器动作

- History 模式

hashchange 只能改变 `#` 后面的代码片段。

这种模式充分利用了 html5 history interface 中新增的 pushState() 和 replaceState() 方法。这两个方法应用于浏览器记录栈，在当前已有的 back、forward、go 基础之上，它们提供了对历史记录修改的功能。

只是当它们执行修改时，虽然改变了当前的 URL ，但浏览器不会立即向后端发送请求

History interface 是浏览器历史记录栈提供的接口，从 HTML5 开始，History interface 提供了 2 个新的方法： pushState()  ， replaceState()  使得我们可以对浏览器历史记录栈进行修改；这两个方法有有一个特点，当调用他们修改浏览器历史栈后，虽然当前 url 改变了，但浏览器不会立即发送请求该 url，这就为单页应用前端路由，更新视图但不重新请求页面提供了基础

## vue 路由懒加载的方式有哪些

懒加载简单来说就是延迟加载或按需加载，即在需要的时候的时候进行加载，常用的懒加载方式有三种：即使用**vue 异步组件** 和 **ES6 中的 import**，以及**webpack 的 require.ensure()**

- vue 异步组件

```js
// 路由配置，使用vue异步组件
{
  path: '/home',
  name: 'home',
  component: resolve => require(['@/components/home'],resolve)
}
```

- ES6 中的 import

```js
// 指定了相同的webpackChunkName，合并打包成一个js文件
// 如果不指定，则分开打包 2
const Home = () =>
  import(/*webpackChunkName:'ImportFuncDemo'*/ "@/component/Home");
const Index = () =>
  import(/*webpackChunkName:'ImportFuncDemo'*/ "@/component/Index");
```

- webpack 推出的 require.ensure()

```js
{
  path: '/home',
  name: 'home',
  component: r => require.ensure([], () => r(require('@/components/hoome')
}
```

## vue 怎么实现页面的权限控制

利用 vue-router 的 beforeEach 事件，可以在跳转页面前判断用户的权限（利用 cookie 或 token），是否能够进入此页面，如果不能则提示错误或重定向到其他页面，在后台管理系统中这种场景经常能遇到。

## vue 常用的修饰符

`.prevent`: 提交事件**不再重载页面**；`.stop`: **阻止单击事件冒泡**；`.self`: 当事件发生在该元素本身而不是子元素的时候会触发；

## vue 中 key 值的作用

vue 中 key 值的作用可以分为两种情况来考虑。

第一种情况是 **v-if 中使用 key**。由于 Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。因此当我们使用 v-if 来实现元素切换的时候，**如果切换前后含有相同类型的元素，那么这个元素就会被复用**。如果是相同的 input 元素，那么切换前后用户的输入不会被清除掉，这样是不符合需求的。因此我们可以通过使用 key 来唯一的标识一个元素，这个情况下，使用 key 的元素不会被复用。这个时候 **key 的作用是用来标识一个独立的元素**。

第二种情况是 **v-for 中使用 key**。**用 v-for 更新已渲染过的元素列表时，它默认使用“就地复用”的策略**。如果数据项的顺序发生了改变，Vue 不会移动 DOM 元素来匹配数据项的顺序，而是简单复用此处的每个元素。因此通过为每个列表项提供一个 key 值，来**以便 Vue 跟踪元素的身份**，从而高效的实现复用。**这个时候 key 的作用是为了高效的更新渲染虚拟 DOM**。

## diff 算法的过程(key 的作用)

vue 采用“就地复用”策略，如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素，key 的作用主要是为了高效的更新虚拟 DOM

:::tip &nbsp;
虚拟 dom 的 diff 算法的过程中，先会进⾏新旧节点的⾸尾交叉对比，当⽆法匹配的时候会⽤新节点的 key 与旧节点进⾏⽐对，然后超出差异
:::

![](../../.vuepress/public/diff.png)

vue 的 diff 位于 patch.js 中，这里简单总结一下 patchVnode 比较的的过程，首先要判断 vnode 和 oldVnode 是否都存在，都存在并且 vnode 和 oldVnode 是同一节点时，才会进入 patchVnode 进行比较，结点比较五种情况：

- 引用一致，可以认为没有变化
- 文本节点的比较，如果需要修改：则会调用 Node.textContent = vnode.text
- 两个节点都有子节点，而且它们不一样：则调用 updateChildren 函数比较子节点
- 只有新的节点有子节点：则调用 addVnodes 创建子节点
- 只有老节点有子节点，则调用 removeVnodes 把这些子节点都删除

updateChildren 的过程：updateChildren 用指针的方式把新旧节点的子节点的首尾节点标记，即 oldStartIndex(1)，oldEndIndex(2)，newStartIndex(3), oldEndIndex(4)（这里简单用 12 3 4 顺序标记）即依次比较 13，14，23，24，有 10 种左右情况分别做出对应的处理

## keep-alive 组件有什么作用

如果你需要在组件切换的时候，**保存一些组件的状态防止多次渲染**，就可以使用 keep-alive 组件包裹需要保存的组件

keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染。

解析：

用法也很简单：

```html
<keep-alive>
  <component>
    <!-- 该组件将被缓存！ -->
  </component>
</keep-alive>
```

props
_ include - 字符串或正则表达，只有匹配的组件会被缓存
_ exclude - 字符串或正则表达式，任何匹配的组件都不会被缓存

```js
// 组件 a
export default {
  name: "a",
  data() {
    return {};
  },
};
```

```html
<keep-alive include="a">
  <component>
    <!-- name 为 a 的组件将被缓存！ -->
  </component> </keep-alive
>可以保留它的状态或避免重新渲染
```

```html
<keep-alive exclude="a">
  <component>
    <!-- 除了 name 为 a 的组件都将被缓存！ -->
  </component> </keep-alive
>可以保留它的状态或避免重新渲染
```

但实际项目中,需要配合 vue-router 共同使用.

router-view 也是一个组件，如果直接被包在 keep-alive 里面，所有路径匹配到的视图组件都会被缓存：

```html
<keep-alive>
  <router-view>
    <!-- 所有路径匹配到的视图组件都会被缓存！ -->
  </router-view>
</keep-alive>
```

如果只想 router-view 里面某个组件被缓存，怎么办？

增加 router.meta 属性

```js
// routes 配置
export default [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      keepAlive: true, // 需要被缓存
    },
  },
  {
    path: "/:id",
    name: "edit",
    component: Edit,
    meta: {
      keepAlive: false, // 不需要被缓存
    },
  },
];
```

```html
<keep-alive>
  <router-view v-if="$route.meta.keepAlive">
    <!-- 这里是会被缓存的视图组件，比如 Home！ -->
  </router-view>
</keep-alive>

<router-view v-if="!$route.meta.keepAlive">
  <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
</router-view>
```

## vue 中 mixin 和 mixins 区别？

mixin 用于**全局混入**，会影响到每个组件实例。

mixins 应该是我们**最常使用的扩展组件的方式**了。**如果多个组件中有相同的业务逻辑，就可以将这些逻辑剥离出来，通过 mixins 混入代码**，比如上拉下拉加载数据这种逻辑等等。另外需要注意的是 **mixins 混入的钩子函数会先于组件内的钩子函数执行**，并且在**遇到同名选项的时候也会有选择性的进行合并**

## vue 中的性能优化

1、Vue 应用运行时性能优化措施

（1）引入生产环境的 Vue 文件

（2）使用单文件组件预编译模板

（3）提取组件的 CSS 到单独到文件

（4）利用 Object.freeze()提升性能

（5）扁平化 Store 数据结构

（6）合理使用持久化 Store 数据

（7）组件懒加载

2、Vue 应用加载性能优化措施

（1）服务端渲染 / 预渲染

（2）组件懒加载

## 如何优化不使用到 Vue 数据劫持的长列表？

通常 Vue 中的数据在初始化的时候设置数据劫持，但是有些数据不需要进行设置数据劫持，从而减少渲染的时间，只是作为显示使用。

为了提高性能，我们使用一下方案冻结 Vue 的数据劫持

```js
export default {
  data: () => ({
    users: {},
  }),
  async created() {
    const users = await axios.get("/api/users");
    this.users = Object.freeze(users);
  },
};
```

## 图片资源懒加载

对于图片多的页面，我们采用懒加载的方式，用户滑动到哪张图片，哪张才开始加载。

在 Vue 中主要借助 vue-lazyload 插件进行。

安装、引用、使用：

```js
// 安装
npm install vue-lazyload --save-dev
// 引入
import VueLazyload from 'vue-lazyload'
// 使用
Vue.use(VueLazyload)
// 自定义选项
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
  attempt: 1
})
<img v-lazy="/static/img/1.png">
```

## 第三方插件按需引入

我们项目中通常用到第三方的插件，但是直接引入所有的组件库，会造成体积太大。我们可以通过 babel-plugin-component ，按需值引用需要的组件。

```js
// 安装
npm install babel-plugin-component -D
// .babelrc
{
 "presets": [["es2015", { "modules": false }]],
 "plugins": [
 [
   "component",
  {
    "libraryName": "element-ui",
    "styleLibraryName": "theme-chalk"
  }
 ]
]
}
// main.js 引入
import Vue from 'vue';
import { Button, Select } from 'element-ui';
Vue.use(Button)
Vue.use(Select)
```

## 服务器端渲染

服务端渲染是指 Vue 在客户端将标签渲染成的整个 html 片段的工作在服务端完成。

优点：

有利于优化 SEO: SEO 的页面抓取是在 Ajax 之前，所以传统的页面是抓取不到 Ajax 的内容的。

加快首屏渲染：传统的页面会等待所有 Vue 页面 JS 下载完成后，才进行页面渲染的，文件下载需要等待一定时间。 SSR 直接由服务器渲染好，直接显示页面。

缺点：

- 在 Node.js 中渲染完整的应用程序，服务器负载严重，更加大量占用 CPU 资源。
- 开发条件限制。服务端渲染应用程序，需要处于 Node.js server 运行环境。
  > 注意：如果只想优化页面的 SEO，可以使用预渲染，只针对于特定路由的静态 HTML 文件。使用 prerender-spa-plugin 插件。

## Vuex

vuex 整体思想诞生于 flux,可其的实现方式完完全全的使用了 vue 自身的响应式设计，依赖监听、依赖收集都属于 vue 对对象 Property set get 方法的代理劫持。最后一句话结束 vuex 工作原理，vuex 中的 store 本质就是没有 template 的隐藏着的 vue 组件；

vuex 的原理其实非常简单，它为什么能实现所有的组件共享同一份数据？ 因为 vuex 生成了一个 store 实例，并且把这个实例挂在了所有的组件上，所有的组件引用的都是同一个 store 实例。 store 实例上有数据，有方法，方法改变的都是 store 实例上的数据。由于其他组件引用的是同样的实例，所以一个组件改变了 store 上的数据， 导致另一个组件上的数据也会改变，就像是一个对象的引用。

Vuex 的核心是 store 仓库， store 存储着大部分的状态 ( state )，具有两个特点：

- Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
- 不能直接改变 store 的状态，而是通过提交 ( commit ) mutation。这样的好处就是方便我们跟踪每一个变化，而且可以记录每次调试的时候的状态改变。

### 为什么使用 Vuex

- 多个组件依赖于同一状态时。
- 来自不同组件的行为需要变更同一状态

### 不用 Vuex 会带来什么问题？

可维护性会下降，想修改数据要维护三个地方；

可读性会下降，因为一个组件里的数据，根本就看不出来是从哪来的；

增加耦合，大量的上传派发，会让耦合性大大增加，本来 Vue 用 Component 就是为了减少耦合，现在这么用，和组件化的初衷相背。

### 四种状态

#### State

我们一般在 Vue 组件中使用 state ，通过以下方式：

`this.$store.state.count`

但是我们想要改变一个 store 的状态，使用 mutation 。

当一个组件获取多个 state 状态的时，避免操作繁琐，使用 mapState ，而 mapState 函数返回的是一个对象。

```js
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from "vuex";
export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: (state) => state.count, // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: "count", // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState(state) {
      return state.count + this.localCount;
    },
  }),
};
```

#### Getter

有时我们需要对获取 state 中的状态数据进行过滤，尤其是多个组件用到该属性，传统的在组件中过滤会造成代码的冗余和重复，所以我们使用 store 的计算属性 getter 。当依赖发生时，才会改变重新计算的值

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: "...", done: true },
      { id: 2, text: "...", done: false },
    ],
  },
  getters: {
    doneTodos: (state) => {
      return state.todos.filter((todo) => todo.done);
    },
  },
});
```

```js
computed: {
   doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

除此之外， getter 返回一个函数，用于传参

```js
getters: {
  getTodoById: (state) => (id) => {
    return state.todos.find((todo) => todo.id === id);
  };
}
```

```js
store.getters.getTodoById(2); // -> { id: 2, text: '...', done: false }
```

如果想将 Getter 映射到组件局部的计算属性，直接使用 mapGetter 。

```js
import { mapGetters } from "vuex";
export default {
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      "doneTodosCount",
      "anotherGetter", // ...
    ]),
  },
};
```

#### Mutation

我们上述说到，通常使用 Mutation 来改变状态。最重要的一点就是 mutation 只能是**同步任务**，因为如果同步和异步都有，不知道哪个先完成。所以异步任务交给 Action

```js
mutations: {
   increment (state, n) {
    state.count += n
  }
}
```

```js
store.commit("increment", 10);
```

于此同时，我们也可以使用提交载荷（对象）的方式。

```js
mutations: {
   increment (state, payload) {
    state.count += payload.amount
  }
}
```

```js
store.commit("increment", {
  amount: 10,
});
```

在我们多人团队合作中，通常使用常量的方式进行开发，这样看起来便于管理和团队协作开发

```js
// mutation-types.js
export const SOME_MUTATION = "SOME_MUTATION";
```

```js
// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'
const store = new Vuex.Store({
     state: { ... },
     mutations: {
      // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
     [SOME_MUTATION] (state) {
       // mutate state
     }
  }
})
```

我们也可以使用 mapMutation 辅助函数将组件中的 methods 映射为 store.commit

```js
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations([
      "increment", // 将 `this.increment()` 映射为`this.$store.commit('increment')` // `mapMutations` 也支持载荷：
      "incrementBy", // 将 `this.incrementBy(amount)` 映射为`this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: "increment", // 将 `this.add()` 映射为`this.$store.commit('increment')`
    }),
  },
};
```

#### Action

Action 主要用来处理项目中的**异步任务**，且 Action 提交的是 mutation ，而不是直接变更状态

```js
const store = new Vuex.Store({
state: {
  count: 0
},
mutations: {
  increment (state) {
   state.count++
 }
},
actions: {
  increment (context) {
   context.commit('increment')
 }
}
})
// 参数解构
actions: {
   increment ({ commit }) {
    commit('increment')
  }
}
```

调用分发 Action

```js
actions: {
 incrementAsync ({ commit }) {
  setTimeout(() => {
   commit('increment')
 }, 1000)
}
}
// 分发的两种形式
// 以载荷形式分发
store.dispatch('incrementAsync', {
 amount: 10
})
// 以对象形式分发
store.dispatch({
 type: 'incrementAsync',
 amount: 10
})
// 组件中分发
this.$store.dispatch('xxx')
```

在 action 函数中返回 Promise ，然后再提交时候用 then 处理

```js
actions:{
  SET_NUMBER_A({commit},data){
    return new Promise((resolve,reject) =>{
      setTimeout(() =>{
        commit('SET_NUMBER',10);
        resolve();
     },2000)
   })
 }
}
this.$store.dispatch('SET_NUMBER_A').then(() => {
 // ...
})
```

在异步任务中处理异步任务，使用 ES7 中的 async 和 await 。如下：在 actionB 要提交 actionA

```js
actions:{
 async actionA({commit}){
   //...
 },
 async actionB({dispatch}){
   await dispatch ('actionA')//等待actionA完成
   // ...
 }
}
```

#### Model

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时， store 对象就有可能变得相当臃肿。所以使用模块（ Model ）将 store 分隔开单独的模块

```js
const moduleA = {
 state: () => ({ ... }),
 mutations: { ... },
 actions: { ... },
 getters: { ... }
}
const moduleB = {
 state: () => ({ ... }),
 mutations: { ... },
 actions: { ... }
}
const store = new Vuex.Store({
 modules: {
  a: moduleA,
  b: moduleB
}
})
store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

## vue-cli 工程升级 vue 版本

在项目目录里运行 `npm upgrade vue vue-template-compiler`，不出意外的话，可以正常运行和 build。如果有任何问题，删除 node_modules 文件夹然后重新运行 npm i 即可。（简单的说就是升级 vue 和 vue-template-compiler 两个插件）

## 构建的 vue-cli 工程都用到了哪些技术，它们的作用分别是什么？

1、vue.js：vue-cli 工程的核心，主要特点是 双向数据绑定 和 组件系统。

2、vue-router：vue 官方推荐使用的路由框架。

3、vuex：专为 Vue.js 应用项目开发的状态管理器，主要用于维护 vue 组件间共用的一些 变量 和 方法。

4、axios（ 或者 fetch 、ajax ）：用于发起 GET 、或 POST 等 http 请求，基于 Promise 设计。

5、vux 等：一个专为 vue 设计的移动端 UI 组件库。

6、创建一个 emit.js 文件，用于 vue 事件机制的管理。

7、webpack：模块加载和 vue-cli 工程打包器。

## vue-cli 工程常用的 npm 命令有哪些？

npm install、npm run dev、npm run build --report 等

解析：

下载 node_modules 资源包的命令：npm install

启动 vue-cli 开发环境的 npm 命令：npm run dev

vue-cli 生成 生产环境部署资源 的 npm 命令：npm run build

用于查看 vue-cli 生产环境部署资源文件大小的 npm 命令：npm run build --report，此命令必答

在浏览器上自动弹出一个 展示 vue-cli 工程打包后 app.js、manifest.js、vendor.js 文件里面所包含代码的页面。可以具此优化 vue-cli 生产环境部署的静态资源，提升 页面 的加载速度

## 请说出 vue-cli 工程中每个文件夹和文件的用处

vue-cli 目录解析：

```
build 文件夹：用于存放 webpack 相关配置和脚本。开发中仅 偶尔使用 到此文件夹下 webpack.base.conf.js 用于配置 less、sass等css预编译库，或者配置一下 UI 库。
config 文件夹：主要存放配置文件，用于区分开发环境、线上环境的不同。 常用到此文件夹下 config.js 配置开发环境的 端口号、是否开启热加载 或者 设置生产环境的静态资源相对路径、是否开启gzip压缩、npm run build 命令打包生成静态资源的名称和路径等。
dist 文件夹：默认 npm run build 命令打包生成的静态资源文件，用于生产部署。
node_modules：存放npm命令下载的开发环境和生产环境的依赖包。
src: 存放项目源码及需要引用的资源文件。
src下assets：存放项目中需要用到的资源文件，css、js、images等。
src下componets：存放vue开发中一些公共组件：header.vue、footer.vue等。
src下emit：自己配置的vue集中式事件管理机制。
src下router：vue-router vue路由的配置文件。
src下service：自己配置的vue请求后台接口方法。
src下page：存在vue页面组件的文件夹。
src下util：存放vue开发过程中一些公共的.js方法。
src下vuex：存放 vuex 为vue专门开发的状态管理器。
src下app.vue：使用标签<route-view></router-view>渲染整个工程的.vue组件。
src下main.js：vue-cli工程的入口文件。
index.html：设置项目的一些meta头信息和提供<div id="app"></div>用于挂载 vue 节点。
package.json：用于 node_modules资源部 和 启动、打包项目的 npm 命令管理。
```

## config 文件夹 下 index.js 的对于工程 开发环境 和 生产环境 的配置

```
build 对象下 对于 生产环境 的配置：

index：配置打包后入口.html文件的名称以及文件夹名称
assetsRoot：配置打包后生成的文件名称和路径
assetsPublicPath：配置 打包后 .html 引用静态资源的路径，一般要设置成 "./"
productionGzip：是否开发 gzip 压缩，以提升加载速度

dev 对象下 对于 开发环境 的配置：

port：设置端口号
autoOpenBrowser：启动工程时，自动打开浏览器
proxyTable：vue设置的代理，用以解决 跨域 问题
```

## 请你详细介绍一些 package.json 里面的配置

```
scripts：npm run xxx 命令调用node执行的 .js 文件
dependencies：生产环境依赖包的名称和版本号，即这些 依赖包 都会打包进 生产环境的JS文件里面
devDependencies：开发环境依赖包的名称和版本号，即这些 依赖包 只用于 代码开发 的时候，不会打包进 生产环境js文件 里面。

```

## vue-cli 中常用到的加载器

1.安装 sass:

2.安装 axios:

3.安装 mock:

4.安装 lib-flexible: --实现移动端自适应

5.安装 sass-resourses-loader

## vue-cli 中怎样使用自定义的组件？有遇到过哪些问题吗？

第一步：在 components 目录新建你的组件文件（如：indexPage.vue），script 一定要 export default {}

第二步：在需要用的页面（组件）中导入：import indexPage from '@/components/indexPage.vue'

第三步：注入到 vue 的子组件的 components 属性上面,components:{indexPage}

第四步：在 template 视图 view 中使用

遇到的问题： 例如有 indexPage 命名，使用的时候则 index-page

## vue 事件中如何使用 event 对象？

v-on 指令（可以简写为 @）

1、使用不带圆括号的形式，event 对象将被自动当做实参传入；

2、使用带圆括号的形式，我们需要使用 \$event 变量显式传入 event 对象。

解析：

一、event 对象

（一）事件的 event 对象

你说你是搞前端的，那么你肯定就知道事件，知道事件，你就肯定知道 event 对象吧？各种的库、框架多少都有针对 event 对象的处理。比如 jquery，通过它内部进行一定的封装，我们开发的时候，就无需关注 event 对象的部分兼容性问题。最典型的，如果我们要阻止默认事件，在 chrome 等浏览器中，我们可能要写一个：

```js
event.preventDefault();
```

而在 IE 中，我们则需要写：

```js
event.returnValue = false;
```

多亏了 jquery ，跨浏览器的实现，我们统一只需要写：

```js
event.preventDefault();
```

兼容？jquery 内部帮我们搞定了。类似的还有比如阻止事件冒泡以以及事件绑定（addEventListener / attachEvent）等，简单到很多的后端都会使用 \$('xxx').bind(...)，这不是我们今天的重点，我们往下看。

（二）vue 中的 event 对象

我们知道，相比于 jquery，vue 的事件绑定可以显得更加直观和便捷，我们只需要在模板上添加一个 v-on 指令（还可以简写为 @），即可完成类似于 \$('xxx').bind 的效果，少了一个利用选择器查询元素的操作。我们知道，jquery 中，event 对象会被默认当做实参传入到处理函数中，如下

```js
$("body").bind("click", function(event) {
  console.log(typeof event); // object
});
```

这里直接就获取到了 event 对象，那么问题来了，vue 中呢？

```js
<div id="app">
    <button v-on:click="click">click me</button>
</div>
...
var app = new Vue({
    el: '#app',
    methods: {
        click(event) {
            console.log(typeof event);    // object
        }
    }
});
```

这里的实现方式看起来和 jquery 是一致的啊，但是实际上，vue 比 jquery 要要复杂得多，jquery 官方也明确的说，v-on 不简单是 addEventListener 的语法糖。在 jquery 中，我们传入到 bind 方法中的回调，只能是一个函数表类型的变量或者一个匿名函数，传递的时候，还不能执行它（在后面加上一堆圆括号），否则就变成了取这一个函数的返回值作为事件回调。而我们知道，vue 的 v-on 指令接受的值可以是函数执行的形式，比如 v-on:click="click(233)" 。这里我们可以传递任何需要传递的参数，甚至可以不传递参数：

```js
<div id="app">
    <button v-on:click="click()">click me</button>
</div>
...
var app = new Vue({
    el: '#app',
    methods: {
        click(event) {
            console.log(typeof event);    // undefined
        }
    }
});
```

咦？我的 event 对象呢？怎么不见了？打印看看 arguments.length 也是 0，说明这时候确实没有实参被传入进来。T_T，那我们如果既需要传递参数，又需要用到 event 对象，这个该怎么办呢？

（三）\$event

翻看 vue 文档，不难发现，其实我们可以通过将一个特殊变量 \$event 传入到回调中解决这个问题：

```js
<div id="app">
    <button v-on:click="click($event, 233)">click me</button>
</div>
...
var app = new Vue({
    el: '#app',
    methods: {
        click(event, val) {
            console.log(typeof event);    // object
        }
    }
});
```

好吧，这样看起来就正常了。
简单总结来说：

使用不带圆括号的形式，event 对象将被自动当做实参传入；

使用带圆括号的形式，我们需要使用 \$event 变量显式传入 event 对象。

二、乌龙
前面都算是铺垫吧，现在真正的乌龙来了。
翻看小伙伴儿的代码，偶然看到了类似下面的代码：

```js
<div id="app">
    <button v-on:click="click(233)">click me</button>
</div>
...
var app = new Vue({
    el: '#app',
    methods: {
        click(val) {
            console.log(typeof event);    // object
        }
    }
});
```

看到这一段代码，我的内心是崩溃的，丢进 chrome 里面一跑，尼玛还真可以，打印 arguments.length，也是正常的 1。尼玛！这是什么鬼？毁三观啊？
既没有传入实参，也没有接收的形参，这个 event 对象的来源，要么是上级作用链，要么。。。是全局作用域。。。全局的，不禁想到了 window.event
。再次上 MDN 确认了一下，果然，window.event，ie 和 chrome 都在 window 对象上有这样一个属性：

![](../../.vuepress/public/event.jpg)

代码丢进 Firefox 中运行，event 果然就变成了 undefined 了。额，这个我也不知道说什么了。。。

## vue 等单页面应用及其优缺点

优点： 1、用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染。 2、前后端职责业分离（前端负责 view，后端负责 model），架构清晰 3、减轻服务器的压力

缺点： 1、SEO（搜索引擎优化）难度高 2、初次加载页面更耗时 3、前进、后退、地址栏等，需要程序进行管理，所以会大大提高页面的复杂性和逻辑的难度

## vue 如何优化首页的加载速度？

+ 路由懒加载
+ ui框架按需加载
+ gzip压缩

## vue 首页白屏是什么问题引起的？

+ 第一种，打包后文件引用路径不对，导致找不到文件报错白屏
解决办法：修改一下config下面的index.js中bulid模块导出的路径。因为index.html里边的内容都是通过script标签引入的，而你的路径不对，打开肯定是空白的。先看一下默认的路径。

+ 第二种，由于把路由模式mode设置影响
解决方法：路由里边router/index.js路由配置里边默认模式是hash，如果你改成了history模式的话，打开也会是一片空白。所以改为hash或者直接把模式配置删除，让它默认的就行 。如果非要使用history模式的话，需要你在服务端加一个覆盖所有的情况的候选资源：如果URL匹配不到任何静态资源，则应该返回一个index.html，这个页面就是你app依赖页面。

所以只要删除mode或者把mode改成hash就OK了。

+ 第三种，项目中使用了es6的语法，一些浏览器不支持es6，造成编译错误不能解析而造成白屏
解决方法：

安装 npm install --save-dev babel-preset-es2015

安装 npm install --save-dev babel-preset-stage-3

在项目根目录创建一个.babelrc文件 里面内容 最基本配置是：

```js
{
    // 此项指明，转码的规则
    "presets": [
        // env项是借助插件babel-preset-env，下面这个配置说的是babel对es6,es7,es8进行转码，并且设置amd,commonjs这样的模块化文件，不进行转码
        ["env", {
            "modules": false
        }],
        // 下面这个是不同阶段出现的es语法，包含不同的转码插件
        "stage-2"
    ],
    // 下面这个选项是引用插件来处理代码的转换，transform-runtime用来处理全局函数和优化babel编译
    "plugins": ["transform-runtime"],
    // 下面指的是在生成的文件中，不产生注释
    "comments": false,
    // 下面这段是在特定的环境中所执行的转码规则，当环境变量是下面的test就会覆盖上面的设置
    "env": {
        // test 是提前设置的环境变量，如果没有设置BABEL_ENV则使用NODE_ENV，如果都没有设置默认就是development
        "test": {
            "presets": ["env", "stage-2"],
            // instanbul是一个用来测试转码后代码的工具
            "plugins": ["istanbul"]
        }
    }
}
```

## Vue 中如何实现 proxy 代理？

webpack 自带的 devServer 中集成了 http-proxy-middleware。配置 devServer 的 proxy 选项即可

```js
proxyTable: {
   '/api': {
    target: 'http://192.168.149.90:8080/', // 设置你调用的接口域名和端口号
    changeOrigin: true,   // 跨域
    pathRewrite: {
     '^/api': '/'
    }
   }
  }
```

## vue 如何实现按需加载配合 webpack 设置

```js
webpack 中提供了 require.ensure()来实现按需加载。以前引入路由是通过 import 这样的方式引入，改为 const 定义的方式进行引入。
不进行页面按需加载引入方式：import home from '../../common/home.vue'
进行页面按需加载的引入方式：const home = r => require.ensure( [], () => r (require('../../common/home.vue')))
```

在音乐 app 中使用的路由懒加载方式为：

```js
const Recommend = (resolve) => {
  import("components/recommend/recommend").then((module) => {
    resolve(module);
  });
};

const Singer = (resolve) => {
  import("components/singer/singer").then((module) => {
    resolve(module);
  });
};
```

## 如何让 CSS 只在当前组件中起作用

将当前组件的`<style>`修改为`<style scoped>`

## vue-loader 是什么？使用它的用途有哪些？

vue-loader 是解析 .vue 文件的一个加载器，将 template/js/style 转换成 js 模块。

用途：js 可以写 es6、style 样式可以 scss 或 less；template 可以加 jade 等。

## 递归组件的使用

组件是可以在自己的模板中调用自身的，不过他们只能通过 name 选项来做这件事
