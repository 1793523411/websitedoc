
## 为什么使用 Vue？

从前端这么些年的发展史来看，从网页设计年代到了现在大前端时代的来临，各种各样的技术层出不穷。尤其是在前端性能优化方面，为了避免页面的回流和重绘，前辈们总结出了各种解决优化方案，基本都是尽量的减少 DOM 操作。

Vue 的诞生，是一个很大的优化方案，直接用虚拟 DOM 映射真实 DOM，来进行更新，避免了直接操作真实 DOM 带来的性能缺陷。

为了好理解呢，我们换个通俗一点的说法，当页面涉及到操作 DOM 的时候，我们不直接进行操作，因为这样降低了前端页面的性能。而是将 DOM 拿到内存中去，在内存中更改页面的 DOM ，这时候我们操作 DOM 不会导致每次操作 DOM 就会造成不必要的回流和重绘。更新完所有 DOM 之后，我们将更新完的 DOM 再插入到页面中，这样大大提高了页面的性能

虽然这样讲有些欠妥或者不标准，其实 Vue 的虚拟 DOM 的作用可以这样去理解

## 对 MVVM 的理解

MVC 的弊端：MVC 即"Model-View-Controller"，当视图上发生变化，通过 Controller（控件）将响应传入到 Model（数据源），由数据源改变 View 上面的数据，允许 view 和 model 直接通信，随着业务不断庞大，会出现向蜘蛛网一样难以处理的依赖关系，违背了开发应该遵循的"开放封闭原则"

MVVM，萌芽于 2005 年微软推出的基于 Windows 的⽤户界⾯框架 WPF ，前端最早的 MVVM 框架 knockout 在 2010 年发布

![](../../.vuepress/public/MVVM.png)

即"Model-View-ViewModel"，View 通过 View-Model 的 DOM Listeners 将事件绑定到 Model 上，而 Model 则通过 Data Bindings 来管理 View 中的数据，View-Model 从中起到一个连接桥的作用

[MVVM,MVP,MVC](/mian/base/design.html#%E4%BB%80%E4%B9%88%E6%98%AF-mvvm%E4%B9%8B-%E6%AF%94%E4%B9%8B-mvc-%E6%98%AF-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB-%E4%BB%80%E4%B9%88%E5%8F%88%E6%98%AF-mvp)

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

## 使用 Object.defineProperty() 来进行数据劫持有什么缺点？

**有一些对属性的操作，使用这种方法无法拦截**，比如说**通过下标方式修改数组数据**或者**给对象新增属性**，**vue 内部通过重写函数解决了这个问**题。在 Vue3.0 中已经不使用这种方式了，而是通过使用 Proxy 对对象进行代理，从而实现数据劫持。使用 **Proxy 的好处是它可以完美的监听到任何方式的数据改变**，唯一的缺点是**兼容性的问题**，因为这是 ES6 的语法。

## Object.defineProperty 和 proxy 的优劣区别

Object.defineProperty 兼容性较好，但不能直接监听数组的变化，只能监听对象的属性(有时需要深层遍历)

与之相比 proxy 的优点：

- 可以直接监听数组的变化
- 可以直接监听对象而非属性
- proxy 有多达 13 种的拦截方法，不限于 apply、ownKeys、deleteProperty、has 等等
- proxy 受到各大浏览器厂商的重视

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

响应式系统简述：

- 任何⼀个 Vue Component 都有⼀个与之对应的 Watcher 实例
- Vue 的 data 上的属性会被添加 getter 和 setter 属性
- 当 Vue Component render 函数被执⾏的时候，data 上会被触碰(touch)， 即被读，getter ⽅法会被调⽤， 此时 Vue 会去记录此 Vue component 所依赖的所有 data(这⼀过程被称为依赖收集)
- data 被改动时(主要是⽤户操作)， setter ⽅法会被调⽤， 此时 Vue 会去通知所有依赖于此 data 的组件去调⽤他们的 render 函数进⾏更新

## Vue 的生命周期是什么

Vue 的生命周期指的是**组件从创建到销毁的一系列的过程**，被称为 Vue 的生命周期。通过提供的 Vue 在生命周期各个阶段的钩子函数，我们可以很好的在 Vue 的各个生命阶段实现一些操作

![](../../.vuepress/public/vue-life-cycle.png)

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

## vue 中 mixin 和 mixins 区别？

mixin 用于**全局混入**，会影响到每个组件实例。

mixins 应该是我们**最常使用的扩展组件的方式**了。**如果多个组件中有相同的业务逻辑，就可以将这些逻辑剥离出来，通过 mixins 混入代码**，比如上拉下拉加载数据这种逻辑等等。另外需要注意的是 **mixins 混入的钩子函数会先于组件内的钩子函数执行**，并且在**遇到同名选项的时候也会有选择性的进行合并**

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

Vuex 的核心是 store 仓库， store 存储着大部分的状态 ( state )，具有两个特点：

- Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
- 不能直接改变 store 的状态，而是通过提交 ( commit ) mutation。这样的好处就是方便我们跟踪每一个变化，而且可以记录每次调试的时候的状态改变。

### 为什么使用 Vuex

- 多个组件依赖于同一状态时。
- 来自不同组件的行为需要变更同一状态

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
