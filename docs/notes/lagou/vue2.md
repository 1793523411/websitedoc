# 学习 vue2 源码

## 项目整体介绍

```
src
├── compiler # 编译相关
├── core # 核⼼代码
├── platforms # 不同平台的⽀持
├── server # 服务端渲染
├── sfc # .vue ⽂件解析
├── shared # 共享代码
```

compiler ⽬录包含 Vue.js 所有编译相关的代码。它包括把模板解析成 ast 语法树，ast 语法树优化，代码⽣成等功能。编译的⼯作可以在构建时（借助 webpack、vue-loader 等辅助插件）；也可以在运⾏时做，使⽤包含构建功能的 Vue.js。显然，编译是⼀项耗性能的⼯作，所以更推荐前者——离线编译。

core ⽬录包含了 Vue.js 的核⼼代码，包括内置组件、全局 API 封装，Vue 实例化、观察者、虚拟 DOM、⼯具函数等等,这⾥的代码可谓是 Vue.js 的灵魂

Vue.js 是⼀个跨平台的 MVVM 框架，它可以跑在 web 上，也可以配合 weex 跑在 natvie 客户端上。platform 是 Vue.js 的⼊⼝，2 个⽬录代表 2 个主要⼊⼝，分别打包成运⾏在 web 上和 weex 上的 Vue.js。

Vue.js 2.0 ⽀持了服务端渲染，所有服务端渲染相关的逻辑都在这个⽬录下。注意：这部分代码是跑在服务端的 Node.js，不要和跑在浏览器端的 Vue.js 混为⼀谈,服务端渲染主要的⼯作是把组件渲染为服务器端的 HTML 字符串，将它们直接发送到浏览器，最后将静态标记"混合"为客户端上完全交互的应⽤程序

通常我们开发 Vue.js 都会借助 webpack 构建， 然后通过 .vue 单⽂件的编写组件。sfc ⽬录下的代码逻辑会把 .vue ⽂件内容解析成⼀个 JavaScript 的对象

Vue.js 会定义⼀些⼯具⽅法，这⾥定义的⼯具⽅法都是会被浏览器端的 Vue.js 和服务端的 Vue.js 所共享的

从 Vue.js 的⽬录设计可以看到，作者把功能模块拆分的⾮常清楚，相关的逻辑放在⼀个独⽴的⽬录下维护，并且把复⽤的代码也抽成⼀个独⽴⽬录,这样的⽬录设计让代码的阅读性和可维护性都变强，是⾮常值得学习和推敲的

### 源码构建

Vue.js 源码是基于 Rollup 构建的，它的构建相关配置都在 scripts ⽬录下

构建命令：

```
{
    "script": {
        "build": "node scripts/build.js",
        "build:ssr": "npm run build -- web-runtime-cjs,web-server-renderer",
        "build:weex": "npm run build --weex"
    }
}
```

我们对于构建过程分析是基于源码的，先打开构建的⼊⼝ JS ⽂件，在 scripts/build.js 中，先从配置⽂件读取配置，再通过命令⾏参数对构建配置做过滤，这样就可以构建出不同⽤途的 Vue.js 了，在配置文件 scripts/config.js 中，列举了⼀些 Vue.js 构建的配置，对于单个配置，它是遵循 Rollup 的构建规则的。其中 entry 属性表⽰构建的⼊⼝ JS ⽂件地址， dest 属性表⽰构建后的 JS ⽂件地址。 format 属性表⽰构建的格式， cjs 表⽰构建出来的⽂件遵循 CommonJS 规范， es 表⽰构建出来的⽂件遵循 ES Module 规范。 umd 表⽰构建出来的⽂件遵循 UMD 规范

以 web-runtime-cjs 配置为例，它的 entry 是 resolve('web/entry-runtime.js') ，源码⽬录： scripts/config.js，先把 resolve 函数传⼊的参数 p 通过 / 做了分割成数组，然后取数组第⼀个元素设置为 base 。在我们这个例⼦中，参数 p 是 web/entry-runtime.js ，那么 base 则为 web 。 base 并不是实际的路径，它的真实路径借助了别名的配置，我们来看⼀下别名配置的代码，在 scripts/alias 中，这⾥ web 对应的真实的路径是 path.resolve(\_\_dirname, '../src/platforms/web') ，这个路径就找到了 Vue.js 源码的 web ⽬录，然后 resolve 函数通过 path.resolve(aliases[base], p.slice(base.length + 1)) 找到了最终路径，它就是 Vue.js 源码 web ⽬录下的 entry-runtime.js 。因此， web-runtime-cjs 配置对应的⼊⼝⽂件就找到了。它经过 Rollup 的构建打包后，最终会在 dist ⽬录下⽣成 vue.runtime.common.js

### Runtime Only VS Runtime+Compiler

通常我们利⽤ vue-cli 去初始化我们的 Vue.js 项⽬的时候会询问我们⽤ Runtime Only 版本的还是 Runtime+Compiler 版本。下⾯我们来对⽐这两个版本

我们在使⽤ Runtime Only 版本的 Vue.js 的时候，通常需要借助如 webpack 的 vue-loader ⼯具把 .vue ⽂件编译成 JavaScript，因为是在编译阶段做的，所以它只包含运⾏时的 Vue.js 代码，因此代码体积也会更轻量

我们如果没有对代码做预编译，但⼜使⽤了 Vue 的 template 属性并传⼊⼀个字符串，则需要在客户端编译模板，因为在 Vue.js 2.0 中，最终渲染都是通过 render 函数，如果写 template 属性，则需要编译成 render 函数，那么这个编译过程会发⽣运⾏时，所以需要带有编译器的版本

### 找到 vue 的定义

在 web 应⽤下，我们来分析 Runtime + Compiler 构建出来的 Vue.js

src/platforms/web/entry-runtime-with-compiler.js ==》 src/platforms/web/runtime/index.js ==》 src/core/index.js（**initGlobalAPI(Vue**) ，初始化全局 Vue API） ==》 src/core/instance/index.js ，**在这⾥**，我们终于看到了 Vue 的庐⼭真⾯⽬，它实际上就是⼀个⽤ Function 实现的类，我们只能通过 new Vue 去实例化它

为何 Vue 不⽤ ES6 的 Class 去实现呢？

这⾥有很多 xxxMixin 的函数调⽤，并把 Vue 当参数传⼊，它们的功能都是给 Vue 的 prototype 上扩展⼀些⽅法，Vue 按功能把这些扩展分散到多个模块中去实现，⽽不是在⼀个模块⾥实现所有，这种⽅式是⽤ Class 难以实现的。这么做的好处是⾮常⽅便代码的维护和管理，这种编程技巧也⾮常值得我们去学习。

### initGlobalAPI

Vue.js 在整个初始化过程中，除了给它的原型 prototype 上扩展⽅法，还会给 Vue 这个对象本⾝扩展全局的静态⽅法它的定义在 src/core/global-api/index.js ，这⾥就是在 Vue 上扩展的⼀些全局⽅法的定义，Vue 官⽹中关于全局 API 都可以在这⾥找到，有⼀点要注意的是， Vue.util 暴露的⽅法最好不要依赖，因为它可能经常会发⽣变化，是不稳定的

```
  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }
```

## 数据驱动

Vue.js ⼀个核⼼思想是数据驱动。所谓数据驱动，是指视图是由数据驱动⽣成的，我们对视图的修改，不会直接操作 DOM，⽽是通过修改数据。它相⽐我们传统的前端开发，如使⽤ jQuery 等前端库直接修改 DOM，⼤⼤简化了代码量。特别是当交互复杂的时候，只关⼼数据的修改会让代码的逻辑变的⾮常清晰，因为 DOM 变成了数据的映射，我们所有的逻辑都是对数据的修改，⽽不⽤碰触 DOM，这样的代码⾮常利于维护

模板和数据如何渲染成最终的 DOM？

### new Vue 发⽣了什么

从⼊⼝代码开始分析，我们先来分析 new Vue 背后发⽣了哪些事情。我们都知道， new 关键字在 Javascript 语⾔中代表实例化是⼀个对象，⽽ Vue 实际上是⼀个类，类在 Javascript 中是⽤ Function 来实现的，在 src/core/instance/index.js 中可以看到 Vue 只能通过 new 关键字初始化，然后会调⽤ this.\_init ⽅法， 该⽅法在 src/core/instance/init.js 中定义，Vue 初始化主要就⼲了⼏件事情，合并配置，初始化⽣命周期，初始化事件中⼼，初始化渲染，初始化 data、props、computed、watcher 等等

Vue 的初始化逻辑写的⾮常清楚，把不同的功能逻辑拆成⼀些单独的函数执⾏，让主线逻辑⼀⽬了然，这样的编程思想是⾮常值得借鉴和学习的。初始化的最后，检测到如果有 el 属性，则调⽤ vm.\$mount ⽅法挂载 vm ，挂载的⽬标就是把模板渲染成最终的 DOM，那么接下来我们来分析 Vue 的挂载过程

### Vue 实例挂载的实现

Vue 中我们是通过 $mount 实例⽅法去挂载 vm 的， $mount ⽅法在多个⽂件中都有定义，如 src/platform/web/entry-runtime-with-compiler.js 、 src/platform/web/runtime/index.js 、 src/platform/weex/runtime/index.js。因为 $mount 这个⽅法的实现是和平台、构建⽅式都相关的。接下来我们重点分析带 compiler版本的 $monut 实现，因为抛开 webpack 的 vue-loader，我们在纯前端浏览器环境分析 Vue 的⼯作原理，有助于我们对原理理解的深⼊。

compiler 版本的 $monut 实现⾮常有意思，在src/platform/web/entry-runtime-with-compiler.js ⽂件中⾸先缓存了原型上的 $mount ⽅法，再重新定义该⽅法，⾸先，它对 el 做了限制，Vue 不能挂载在 body 、 html 这样的根节点上。接下来的是很关键的逻辑 ——如果没有定义 render ⽅法，则会把 el 或者 template 字符串转换成 render ⽅法。这⾥我们要牢记，在 Vue 2.0 版本中，所有 Vue 的组件的渲染最终都需要 render ⽅法，⽆论我们是⽤单⽂件.vue ⽅式开发组件，还是写了 el 或者 template 属性，最终都会转换成 render ⽅法，那么这个过程是 Vue 的⼀个“在线编译”的过程，它是调⽤ compileToFunctions ⽅法实现的，编译过程我们之后会介绍。最后，调⽤原先原型上的 \$mount ⽅法挂载。

原先原型上的 \$mount ⽅法在 src/platform/web/runtime/index.js 中定义，之所以这么设计完全是为了复⽤，因为它是可以被 runtime only 版本的 Vue 直接使⽤的

\$mount ⽅法⽀持传⼊ 2 个参数，第⼀个是 el ，它表⽰挂载的元素，可以是字符串，也可以是 DOM 对象，如果是字符串在浏览器环境下会调⽤ query ⽅法转换成 DOM 对象的。第⼆个参数是和服务端渲染相关，在浏览器环境下我们不需要传第⼆个参数

\$mount ⽅法实际上会去调⽤ mountComponent ⽅法，这个⽅法定义在 src/core/instance/lifecycle.js ⽂件中

**mountComponent 核⼼就是先调⽤ vm.\_render ⽅法先⽣成虚拟 Node，再实例化⼀个渲染 Watcher** ，在它的回调函数中会调⽤ updateComponent ⽅法，**最终调⽤ vm.\_update 更新 DOM**

Watcher 在这⾥起到两个作⽤，⼀个是初始化的时候会执⾏回调函数，另⼀个是当 vm 实例中的监测的数据发⽣变化的时候执⾏回调函数，这块⼉我们会在之后介绍

函数最后判断为根节点的时候设置 vm.\_isMounted 为 true ， 表⽰这个实例已经挂载了，同时执⾏ mounted 钩⼦函数。 这⾥注意 vm.\$vnode 表⽰ Vue 实例的⽗虚拟 Node，所以它为 Null 则表⽰当前是根 Vue 的实例

mountComponent ⽅法的逻辑也是⾮常清晰的，它会完成整个渲染⼯作，接下来我们要重点分析其中的细节，也就是最核⼼的 2 个⽅法： **vm.\_render 和 vm.\_update**

### render

Vue 的 \_render ⽅法是实例的⼀个私有⽅法，它⽤来把实例渲染成⼀个虚拟 Node。它的定义在 src/core/instance/render.js ⽂件中，代码最关键的是 render ⽅法的调⽤，我们在平时的开发⼯作中⼿写 render ⽅法的场景⽐较少，⽽写的⽐较多的是 template 模板，在之前的 mounted ⽅法的实现中，会把 template 编译成 render ⽅法，但这个编译过程是⾮常复杂的，我们不打算在这⾥展开讲，之后会专门来分析 Vue 的编译过程。

在 Vue 的官⽅⽂档中介绍了 render 函数的第⼀个参数是 createElement

再回到 \_render 函数中的 render ⽅法的调⽤：`vnode = render.call(vm._renderProxy, vm.$createElement)`,可以看到， render 函数中的 createElement ⽅法就是 vm.\$createElement ⽅法

实际上， vm.$createElement ⽅法定义是在执⾏ initRender ⽅法的时候，可以看到除了vm.$createElement ⽅法，还有⼀个 vm.\_c ⽅法，它是被模板编译成的 render 函数使⽤，⽽ vm.\$createElement 是⽤户⼿写 render ⽅法使⽤的， 这俩个⽅法⽀持的参数相同，并且内部都调⽤了 createElement ⽅法

vm.\_render 最终是通过执⾏ createElement ⽅法并返回的是 vnode ，它是⼀个虚拟 Node。Vue2.0 相⽐ Vue 1.0 最⼤的升级就是利⽤了 Virtual DOM。因此在分析 createElement 的实现前，我们先了解⼀下 Virtual DOM 的概念

### Virtual DOM

Virtual DOM 这个概念相信⼤部分⼈都不会陌⽣，它产⽣的前提是浏览器中的 DOM 是很“昂贵"的,⽽ Virtual DOM 就是⽤⼀个原⽣的 JS 对象去描述⼀个 DOM 节点，所以它⽐创建⼀个 DOM 的代价要⼩很多。在 Vue.js 中，Virtual DOM 是⽤ VNode 这么⼀个 Class 去描述，它是定义在 src/core/vdom/vnode.js 中的

Vue.js 中的 Virtual DOM 的定义还是略微复杂⼀些的，因为它这⾥包含了很多 Vue.js 的特性。这⾥千万不要被这些茫茫多的属性吓到，实际上 Vue.js 中 Virtual DOM 是借鉴了⼀个开源库 snabbdom 的实现，然后加⼊了⼀些 Vue.js 特⾊的东⻄

其实 VNode 是对真实 DOM 的⼀种抽象描述，它的核⼼定义⽆⾮就⼏个关键属性，标签名、数据、⼦节点、键值等，其它属性都是都是⽤来扩展 VNode 的灵活性以及实现⼀些特殊 feature 的。由于 VNode 只是⽤来映射到真实 DOM 的渲染，不需要包含操作 DOM 的⽅法，因此它是⾮常轻量和简单的

Virtual DOM 除了它的数据结构的定义，映射到真实的 DOM 实际上要经历 VNode 的 create、diff、patch 等过程。那么在 Vue.js 中，VNode 的 create 是通过之前提到的 createElement ⽅法创建的，我们接下来分析这部分的实现

### createElement

Vue.js 利⽤ createElement ⽅法创建 VNode，它定义在 src/core/vdom/create-elemenet.js 中,createElement ⽅法实际上是对 \_createElement ⽅法的封装，它允许传⼊的参数更加灵活，在处理这些参数后，调⽤真正创建 VNode 的函数 \_createElement

\_createElement ⽅法有 5 个参数， context 表⽰ VNode 的上下⽂环境，它是 Component 类型； tag 表⽰标签，它可以是⼀个字符串，也可以是⼀个 Component ； data 表⽰ VNode 的数据，它是⼀个 VNodeData 类型，可以在 flow/vnode.js 中找到它的定义，这⾥先不展开说； children 表⽰当前 VNode 的⼦节点，它是任意类型的，它接下来需要被规范为标准的 VNode 数组； normalizationType 表⽰⼦节点规范的类型，类型不同规范的⽅法也就不⼀样，它主要是参考 render 函数是编译⽣成的还是⽤户⼿写的

createElement 函数的流程略微有点多，我们接下来主要分析 2 个重点的流程 —— children 的规范化以及 VNode 的创建

### children 的规范化

由于 Virtual DOM 实际上是⼀个树状结构，每⼀个 VNode 可能会有若⼲个⼦节点，这些⼦节点应该也是 VNode 的类型。 \_createElement 接收的第 4 个参数 children 是任意类型的，因此我们需要把它们规范成 VNode 类型,这⾥根据 normalizationType 的不同，调⽤了 normalizeChildren(children) 和 simpleNormalizeChildren(children) ⽅法，它们的定义都在 src/core/vdom/helpers/normalzie-children.js 中

simpleNormalizeChildren ⽅法调⽤场景是 render 函数当函数是编译⽣成的。理论上编译⽣成的 children 都已经是 VNode 类型的，但这⾥有⼀个例外，就是 functional component 函数式组件返回的是⼀个数组⽽不是⼀个根节点，所以会通过 Array.prototype.concat ⽅法把整个 children 数组打平，让它的深度只有⼀层

normalizeChildren ⽅法的调⽤场景有 2 种，⼀个场景是 render 函数是⽤户⼿写的，当 children 只有⼀个节点的时候，Vue.js 从接⼝层⾯允许⽤户把 children 写成基础类型⽤来创建单个简单的⽂本节点，这种情况会调⽤ createTextVNode 创建⼀个⽂本节点的 VNode；另⼀个场景是当编译 slot 、 v-for 的时候会产⽣嵌套数组的情况，会调⽤ normalizeArrayChildren ⽅法

normalizeArrayChildren 接收 2 个参数， children 表⽰要规范的⼦节点， nestedIndex 表⽰嵌套的索引，因为单个 child 可能是⼀个数组类型。 normalizeArrayChildren 主要的逻辑就是遍历 children ，获得单个节点 c ，然后对 c 的类型判断，如果是⼀个数组类型，则递归调⽤ normalizeArrayChildren ; 如果是基础类型，则通过 createTextVNode ⽅法转换成 VNode 类型；否则就已经是 VNode 类型了，如果 children 是⼀个列表并且列表还存在嵌套的情况，则根据 nestedIndex 去更新它的 key。这⾥需要注意⼀点，在遍历的过程中，对这 3 种情况都做了如下处理：如果存在两个连续的 text 节点，会把它们合并成⼀个 text 节点

经过对 children 的规范化， children 变成了⼀个类型为 VNode 的 Array

### VNode 的创建

回到 createElement 函数，规范化 children 后，接下来会去创建⼀个 VNode 的实例,先对 tag 做判断，如果是 string 类型，则接着判断如果是内置的⼀些节点，则直接创建⼀个普通 VNode，如果是为已注册的组件名，则通过 createComponent 创建⼀个组件类型的 VNode，否则创建⼀个未知的标签的 VNode。 如果是 tag ⼀个 Component 类型，则直接调⽤ createComponent 创建⼀个组件类型的 VNode 节点。对于 createComponent 创建组件类型的 VNode 的过程，我们之后会去介绍，本质上它还是返回了⼀个 VNode

那么⾄此，我们⼤致了解了 createElement 创建 VNode 的过程，每个 VNode 有 children ， children 每个元素也是⼀个 VNode，这样就形成了⼀个 VNode Tree，它很好的描述了我们的 DOM Tree,回到 mountComponent 函数的过程，我们已经知道 vm.\_render 是如何创建了⼀个 VNode，接下来就是要把这个 VNode 渲染成⼀个真实的 DOM 并渲染出来，这个过程是通过 vm.\_update 完成的，接下来分析⼀下这个过程

### update

Vue 的 \_update 是实例的⼀个私有⽅法，它被调⽤的时机有 2 个，⼀个是⾸次渲染，⼀个是数据更新的时候；由于我们只分析⾸次渲染部分，数据更新部分会在之后分析响应式原理的时候涉及。 \_update ⽅法的作⽤是把 VNode 渲染成真实的 DOM，它的定义在 src/core/instance/lifecycle.js 中,\_update 的核⼼就是调⽤ vm.**patch** ⽅法，这个⽅法实际上在不同的平台，⽐如 web 和 weex 上的定义是不⼀样的，因此在 web 平台中它的定义在 src/platforms/web/runtime/index.js 中,可以看到，甚⾄在 web 平台上，是否是服务端渲染也会对这个⽅法产⽣影响。因为在服务端渲染中，没有真实的浏览器 DOM 环境，所以不需要把 VNode 最终转换成 DOM，因此是⼀个空函数，⽽在浏览器端渲染中，它指向了 patch ⽅法，它的定义在 src/platforms/web/runtime/patch.js 中,该⽅法的定义是调⽤ createPatchFunction ⽅法的返回值，这⾥传⼊了⼀个对象，包含 nodeOps 参数和 modules 参数。其中， nodeOps 封装了⼀系列 DOM 操作的⽅法， modules 定义了⼀些模块的钩⼦函数的实现，我们这⾥先不详细介绍，来看⼀下 createPatchFunction 的实现，它定义在 src/core/vdom/patch.js 中

createPatchFunction 内部定义了⼀系列的辅助⽅法，最终返回了⼀个 patch ⽅法，这个⽅法就赋值给了 vm.\_update 函数⾥调⽤的 vm.**patch**

在介绍 patch 的⽅法实现之前，我们可以思考⼀下为何 Vue.js 源码绕了这么⼀⼤圈，把相关代码分散到各个⽬录。因为前⾯介绍过， patch 是平台相关的，在 Web 和 Weex 环境，它们把虚拟 DOM 映射到 “平台 DOM” 的⽅法是不同的，并且对 “DOM” 包括的属性模块创建和更新也不尽相同。因此每个平台都有各⾃的 nodeOps 和 modules ，它们的代码需要托管在 src/platforms 这个⼤⽬录下,⽽不同平台的 patch 的主要逻辑部分是相同的，所以这部分公共的部分托管在 core 这个⼤⽬录下。差异化部分只需要通过参数来区别，这⾥⽤到了⼀个函数柯⾥化的技巧，通过 createPatchFunction 把差异化参数提前固化，这样不⽤每次调⽤ patch 的时候都传递 nodeOps 和 modules 了，这种编程技巧也⾮常值得学习。

在这⾥， nodeOps 表⽰对 “平台 DOM” 的⼀些操作⽅法， modules 表⽰平台的⼀些模块，它们会在整个 patch 过程的不同阶段执⾏相应的钩⼦函数。这些代码的具体实现会在之后会介绍

回到 patch ⽅法本⾝，它接收 4 个参数， oldVnode 表⽰旧的 VNode 节点，它也可以不存在或者是⼀个 DOM 对象； vnode 表⽰执⾏ \_render 后返回的 VNode 的节点； hydrating 表⽰是否是服务端渲染； removeOnly 是给 transition-group ⽤的，之后会介绍，patch 的逻辑看上去相对复杂，因为它有着⾮常多的分⽀逻辑，为了⽅便理解，我们并不会在这⾥介绍所有的逻辑，仅会针对我们之前的例⼦分析它的执⾏逻辑。之后我们对其它场景做源码分析的时候会再次回顾 patch ⽅法

我们的场景是⾸次渲染，所以在执⾏ patch 函数的时候，传⼊的` vm.$el 对应的是例⼦中 id 为 app 的 DOM 对象，这个也就是我们在 index.html 模板中写的 <div id="app">` ，vm.$el 的赋值是在之前 mountComponent 函数做的， vnode 对应的是调⽤ render 函数的返回值， hydrating 在⾮服务端渲染情况下为 false， removeOnly 为 false。

确定了这些⼊参后，我们回到 patch 函数的执⾏过程，看⼏个关键步骤,由于我们传⼊的 oldVnode 实际上是⼀个 DOM container，所以 isRealElement 为 true，接下来⼜通过 emptyNodeAt ⽅法把 oldVnode 转换成 VNode 对象，然后再调⽤ createElm ⽅法，这个⽅法在这⾥⾮常重要，来看⼀下它的实现

createElm 的作⽤是通过虚拟节点创建真实的 DOM 并插⼊到它的⽗节点中。 我们来看⼀下它的⼀些关键逻辑， createComponent ⽅法⽬的是尝试创建⼦组件，这个逻辑在之后组件那会详细介绍，在当前这个 case 下它的返回值为 false；接下来判断 vnode 是否包含 tag，如果包含，先简单对 tag 的合法性在⾮⽣产环境下做校验，看是否是⼀个合法标签；然后再去调⽤平台 DOM 的操作去创建⼀个占位符元素，接下来调⽤ createChildren ⽅法去创建⼦元素

createChildren 的逻辑很简单，实际上是遍历⼦虚拟节点，递归调⽤ createElm ，这是⼀种常⽤的深度优先的遍历算法，这⾥要注意的⼀点是在遍历过程中会把 vnode.elm 作为⽗容器的 DOM 节点占位符传⼊

接着再调⽤ invokeCreateHooks ⽅法执⾏所有的 create 的钩⼦并把 vnode push 到 insertedVnodeQueue 中

最后调⽤ insert ⽅法把 DOM 插⼊到⽗节点中，因为是递归调⽤，⼦元素会优先调⽤ insert ，所以整个 vnode 树节点的插⼊顺序是先⼦后⽗。来看⼀下 insert ⽅法，它的定义在 src/core/vdom/patch.js 上

insert 逻辑很简单，调⽤⼀些 nodeOps 把⼦节点插⼊到⽗节点中，这些辅助⽅法定义在 src/platforms/web/runtime/node-ops.js 中

其实就是调⽤原⽣ DOM 的 API 进⾏ DOM 操作，看到这⾥，很多人恍然⼤悟，原来 Vue 是这样动态创建的 DOM

在 createElm 过程中，如果 vnode 节点如果不包含 tag ，则它有可能是⼀个注释或者纯⽂本节点，可以直接插⼊到⽗元素中

再回到 patch ⽅法，⾸次渲染我们调⽤了 createElm ⽅法，这⾥传⼊的 parentElm 是 oldVnode.elm 的⽗元素， 在我们的例⼦是 id 为 #app div 的⽗元素，也就是 Body；实际上整个过程就是递归创建了⼀个完整的 DOM 树并插⼊到 Body 上，最后，我们根据之前递归 createElm ⽣成的 vnode 插⼊顺序队列，执⾏相关的 insert 钩⼦函数，这部分内容我们之后会详细介绍

**那么⾄此我们从主线上把模板和数据如何渲染成最终的 DOM 的过程分析完毕了，我们可以通过下图更直观地看到从初始化 Vue 到最终渲染的整个过程**
![](../../.vuepress/public/img/01.png)

我们这⾥只是分析了最简单和最基础的场景，在实际项⽬中，我们是把⻚⾯拆成很多组件的，Vue 另⼀个核⼼思想就是组件化。那么下⼀章我们就来分析 Vue 的组件化过程


## 组件化

Vue.js 另⼀个核⼼思想是组件化。所谓组件化，就是把⻚⾯拆分成多个组件 (component)，每个组件依赖的 CSS、JavaScript、模板、图⽚等资源放在⼀起开发和维护。组件是资源独⽴的，组件在系统内部可复⽤，组件和组件之间可以嵌套

```js
import Vue from "vue";
import App from "./App.vue";
var app = new Vue({
  el: "#app",
  // 这⾥的 h 是 createElement ⽅法
  render: (h) => h(App),
});
```

这次通过 createElement 传的参数是⼀个组件⽽不是⼀个原⽣的标签，那么接下来我们就开始分析这⼀过程

### createComponent

上⼀章我们在分析 createElement 的实现的时候，它最终会调⽤ \_createElement ⽅法，其中有⼀段逻辑是对参数 tag 的判断，如果是⼀个普通的 html 标签，像上⼀章的例⼦那样是⼀个普通的 div，则会实例化⼀个普通 VNode 节点，否则通过 createComponent ⽅法创建⼀个组件 VNode

接下来我们来看⼀下 createComponent ⽅法的实现，它定义在 src/core/vdom/create-component.js ⽂件中，createComponent 的逻辑也会有⼀些复杂，但是分析源码⽐较推荐的是只分析核⼼流程，分⽀流程可以之后针对性的看，所以这⾥针对组件渲染这个 case 主要就 3 个关键步骤：构造⼦类构造函数，安装组件钩⼦函数和实例化 vnode 。

### 构造⼦类构造函数

```js
const baseCtor = context.$options._base;

// plain options object: turn it into a constructor
if (isObject(Ctor)) {
  Ctor = baseCtor.extend(Ctor);
}
```

我们在编写⼀个组件的时候，通常都是创建⼀个普通对象，还是以我们的 App.vue 为例，

```js
import HelloWorld from "./components/HelloWorld";
export default {
  name: "app",
  components: {
    HelloWorld,
  },
};
```

这⾥ export 的是⼀个对象，所以 createComponent ⾥的代码逻辑会执⾏到 baseCtor.extend(Ctor) ，在这⾥ baseCtor 实际上就是 Vue，这个的定义是在最开始初始化 Vue 的阶段，在 src/core/global-api/index.js 中的 initGlobalAPI 函数有这么⼀段逻辑:`Vue.options._base = Vue`，在这里有`const baseCtor = context.$options._base`,这⾥定义的是 Vue.option ，⽽我们的 createComponent 取的是 context.\$options ，实际上在 src/core/instance/init.js ⾥ Vue 原型上的 \_init 函数中有这么⼀段逻辑

```js
vm.$options = mergeOptions(
  resolveConstructorOptions(vm.constructor),
  options || {},
  vm
);
```

这样就把 Vue 上的⼀些 option 扩展到了 vm.$option 上，所以我们也就能通过 vm.$options.\_base 拿到 Vue 这个构造函数了。 mergeOptions 的实现我们会在后续章节中具体分析，现在只需要理解它的功能是**把 Vue 构造函数的 options 和⽤户传⼊的 options 做⼀层合并到 vm.\$options 上**.

在了解了 baseCtor 指向了 Vue 之后，我们来看⼀下 Vue.extend 函数的定义，在 src/core/global-api/extend.js 中

Vue.extend 的作⽤就是构造⼀个 Vue 的⼦类，它使⽤⼀种⾮常经典的原型继承的⽅式把⼀个纯对象转换⼀个继承于 Vue 的构造器 Sub 并返回，然后对 Sub 这个对象本⾝扩展了⼀些属性，如扩展 options 、添加全局 API 等；并且对配置中的 props 和 computed 做了初始化⼯作；最后对于这个 Sub 构造函数做了缓存，避免多次执⾏ Vue.extend 的时候对同⼀个⼦组件重复构造,**这样当我们去实例化 Sub 的时候，就会执⾏ this.\_init 逻辑再次⾛到了 Vue 实例的初始化逻辑**，实例化⼦组件的逻辑在之后的章节会介绍

```js
const Sub = function VueComponent(options) {
  this._init(options);
};
```

### 安装组件钩⼦函数

`installComponentHooks(data)`我们之前提到 Vue.js 使⽤的 Virtual DOM 参考的是开源库 snabbdom，它的⼀个特点是在 VNode 的 patch 流程中对外暴露了各种时机的钩⼦函数，⽅便我们做⼀些额外的事情，Vue.js 也是充分利⽤这⼀点，在初始化⼀个 Component 类型的 VNode 的过程中实现了⼏个钩⼦函数

整个 installComponentHooks 的过程就是把 componentVNodeHooks 的钩⼦函数合并到 data.hook 中，在 VNode 执⾏ patch 的过程中执⾏相关的钩⼦函数，具体的执⾏我们稍后在介绍 patch 过程中会详细介绍。这⾥要注意的是合并策略，在合并过程中，如果某个时机的钩⼦已经存在 data.hook 中，那么通过执⾏ mergeHook 函数做合并，这个逻辑很简单，就是在最终执⾏的时候，依次执⾏这两个钩⼦函数即可

### 实例化 VNode

最后⼀步⾮常简单，通过 new VNode 实例化⼀个 vnode 并返回。需要注意的是和普通元素节点的 vnode 不同，组件的 vnode 是没有 children 的，这点很关键，在之后的 patch 过程中我们会再提。

这⼀节我们分析了 createComponent 的实现，了解到它在渲染⼀个组件的时候的 3 个关键逻辑：构造⼦类构造函数，安装组件钩⼦函数和实例化 vnode 。 createComponent 后返回的是组件 vnode ，它也⼀样⾛到 vm.\_update ⽅法，进⽽执⾏了 patch 函数，我们在上⼀章对 patch 函数做了简单的分析，那么下⼀节我们会对它做进⼀步的分析

### patch

当我们通过 createComponent 创建了组件 VNode，接下来会⾛到 vm.\_update ，执⾏ vm.**patch** 去把 VNode 转换成真正的 DOM 节点。这个过程我们在前⼀章已经分析过了，但是针对⼀个普通的 VNode 节点，接下来我们来看看组件的 VNode 会有哪些不⼀样的地⽅

patch 的过程会调⽤ createElm 创建元素节点，回顾⼀下 createElm 的实现，它的定义在 src/core/vdom/patch.js 中

我们删掉多余的代码，只保留关键的逻辑，这⾥会判断 createComponent(vnode,insertedVnodeQueue, parentElm, refElm) 的返回值，如果为 true 则直接结束，那么接下来看⼀下 createComponent ⽅法的实现

createComponent 函数中，⾸先对 vnode.data 做了⼀些判断,如果 vnode 是⼀个组件 VNode，那么条件会满⾜，并且得到 i 就是 init 钩⼦函数，回顾上节我们在创建组件 VNode 的时候合并钩⼦函数中就包含 init 钩⼦函数，定义在 src/core/vdom/create-component.js 中,init 钩⼦函数执⾏也很简单，我们先不考虑 keepAlive 的情况，它是**通过 createComponentInstanceForVnode 创建⼀个 Vue 的实例**，然后调⽤ \$mount ⽅法挂载⼦组件，先来看⼀下 createComponentInstanceForVnode 的实现

createComponentInstanceForVnode 函数构造的⼀个内部组件的参数，然后执⾏ newvnode.componentOptions.Ctor(options) 。这⾥的 vnode.componentOptions.Ctor 对应的就是⼦组件的构造函数，我们上⼀节分析了它实际上是继承于 Vue 的⼀个构造器 Sub ，相当于 newSub(options) 这⾥有⼏个关键参数要注意⼏个点， \_isComponent 为 true 表⽰它是⼀个组件， parent 表⽰当前激活的组件实例（注意，这⾥⽐较有意思的是如何拿到组件实例，后⾯会介绍

所以⼦组件的实例化实际上就是在这个时机执⾏的，并且它会执⾏实例的 \_init ⽅法，这个过程有⼀些和之前不同的地⽅需要挑出来说，代码在 src/core/instance/init.js 中,⾸先是合并 options 的过程有变化， \_isComponent 为 true，所以⾛到了 initInternalComponent 过程,这个过程我们重点记住以下⼏个点即可： opts.parent = options.parent 、 opts.\_parentVnode =parentVnode ，它们是把之前我们通过 createComponentInstanceForVnode 函数传⼊的⼏个参数合并到内部的选项 \$options ⾥了

再来看⼀下 \_init 函数最后执⾏的代码

```js
if (vm.$options.el) {
  vm.$mount(vm.$options.el);
}
```

由于组件初始化的时候是不传 el 的，因此组件是⾃⼰接管了 $mount 的过程，这个过程的主要流程在上⼀章介绍过了，回到组件 init 的过程， componentVNodeHooks 的 init 钩⼦函数，在完成实例化的 _init 后，接着会执⾏ child.$mount(hydrating ? vnode.elm : undefined,hydrating) 。这⾥ hydrating 为 true ⼀般是服务端渲染的情况，我们只考虑客户端渲染，所以这⾥ $mount 相当于执⾏ child.$mount(undefined, false) ，它最终会调⽤ mountComponent ⽅法，进⽽执⾏ vm.\_render() ⽅法,我们只保留关键部分的代码，这⾥的 \_parentVnode 就是当前组件的⽗ VNode，⽽ render 函数⽣成的 vnode 当前组件的渲染 vnode ， vnode 的 parent 指向了 \_parentVnode ，也就是 vm.\$vnode ，它们是⼀种⽗⼦的关系

我们知道在执⾏完 vm.\_render ⽣成 VNode 后，接下来就要执⾏ vm.\_update 去渲染 VNode 了。来看⼀下组件渲染的过程中有哪些需要注意的， vm.\_update 的定义在 src/core/instance/lifecycle.js 中,\_update 过程中有⼏个关键的代码，⾸先 vm.\_vnode = vnode 的逻辑，这个 vnode 是通过 vm.\_render() 返回的组件渲染 VNode， vm.\_vnode 和 vm.$vnode 的关系就是⼀种⽗⼦关系，⽤代码表达就是 vm._vnode.parent === vm.$vnode 。还有⼀段⽐较有意思的代码

```js
export let activeInstance: any = null;
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
  // ...
  const prevActiveInstance = activeInstance;
  activeInstance = vm;
  if (!prevVnode) {
    // initial render
    vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
  } else {
    // updates
    vm.$el = vm.__patch__(prevVnode, vnode);
  }
  activeInstance = prevActiveInstance;
};
```

这个 activeInstance 作⽤就是保持当前上下⽂的 Vue 实例，它是在 lifecycle 模块的全局变量，定义是 export let activeInstance: any = null ，并且在之前我们调⽤ createComponentInstanceForVnode ⽅法的时候从 lifecycle 模块获取，并且作为参数传⼊的。因为实际上 JavaScript 是⼀个单线程，Vue 整个初始化是⼀个深度遍历的过程，在实例化⼦组件的过程中，它需要知道当前上下⽂的 Vue 实例是什么，并把它作为⼦组件的⽗ Vue 实例。之前我们提到过对⼦组件的实例化过程先会调⽤ initInternalComponent(vm, options) 合并 options ，把 parent 存储在 vm.$options 中，在 $mount 之前会调⽤ initLifecycle(vm) ⽅法

```js
export function initLifecycle(vm: Component) {
  const options = vm.$options;
  // locate first non-abstract parent
  let parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }
  vm.$parent = parent;
  // ...
}
```

可以看到 vm.$parent 就是⽤来保留当前 vm 的⽗实例，并且通过 parent.$children.push(vm)来把当前的 vm 存储到⽗实例的 \$children 中

在 vm.\_update 的过程中，把当前的 vm 赋值给 activeInstance ，同时通过 constprevActiveInstance = activeInstance ⽤ prevActiveInstance 保留上⼀次的 activeInstance 。实际上， prevActiveInstance 和当前的 vm 是⼀个⽗⼦关系，当⼀个 vm 实例完成它的所有⼦树的 patch 或者 update 过程后， activeInstance 会回到它的⽗实例，这样就完美地保证了 createComponentInstanceForVnode 整个深度遍历过程中，我们在实例化⼦组件的时候能传⼊当前⼦组件的⽗ Vue 实例，并在 \_init 的过程中，通过 vm.\$parent 把这个⽗⼦关系保留

那么回到 \_update ，最后就是调⽤ **patch** 渲染 VNode 了。

这⾥⼜回到了本节开始的过程，之前分析过负责渲染成 DOM 的函数是 createElm ，注意这⾥我们只传了 2 个参数，所以对应的 parentElm 是 undefined,注意，这⾥我们传⼊的 vnode 是组件渲染的 vnode ，也就是我们之前说的 vm.\_vnode ，如果组件的根节点是个普通元素，那么 vm.\_vnode 也是普通的 vnode ，这⾥ createComponent(vnode,insertedVnodeQueue, parentElm, refElm) 的返回值是 false。接下来的过程就和我们上⼀章⼀样了，先创建⼀个⽗节点占位符，然后再遍历所有⼦ VNode 递归调⽤ createElm ，在遍历的过程中，如果遇到⼦ VNode 是⼀个组件的 VNode，则重复本节开始的过程，这样通过⼀个递归的⽅式就可以完整地构建了整个组件树

由于我们这个时候传⼊的 parentElm 是空，所以对组件的插⼊，在 createComponent 有这么⼀段逻辑,在完成组件的整个 patch 过程后，最后执⾏ insert(parentElm, vnode.elm, refElm) 完成组件的 DOM 插⼊，如果组件 patch 过程中⼜创建了⼦组件，那么 DOM 的插⼊顺序是先⼦后⽗。

那么到此，⼀个组件的 VNode 是如何**创建、初始化、渲染**的过程也就介绍完毕了。在对组件化的实现有⼀个⼤概了解后，接下来我们来介绍⼀下这其中的⼀些细节。我们知道编写⼀个组件实际上是编写⼀个 JavaScript 对象，对象的描述就是各种配置，之前我们提到在 \_init 的最初阶段执⾏的就是 merge options 的逻辑，那么下⼀节我们从源码⾓度来分析合并配置的过程

### 合并配置

通过之前章节的源码分析我们知道， new Vue 的过程通常有 2 种场景，⼀种是外部我们的代码主动调⽤ new Vue(options) 的⽅式实例化⼀个 Vue 对象；另⼀种是我们上⼀节分析的组件过程中内部通过 new Vue(options) 实例化⼦组件。⽆论哪种场景，都会执⾏实例的 \_init(options) ⽅法，它⾸先会执⾏⼀个 merge options 的逻辑，相关的代码在 src/core/instance/init.js 中,不同场景对于 options 的合并逻辑是不⼀样的，并且传⼊的 options 值也有⾮常⼤的不同，接下来会分开介绍 2 种场景的 options 合并过程

### 外部调⽤场景

当执⾏ new Vue 的时候，在执⾏ this.\_init(options) 的时候，就会执⾏如下逻辑去合并 options

```js
vm.$options = mergeOptions(
  resolveConstructorOptions(vm.constructor),
  options || {},
  vm
);
```

这⾥通过调⽤ mergeOptions ⽅法来合并，它实际上就是把 resolveConstructorOptions(vm.constructor) 的返回值和 options 做合并， resolveConstructorOptions 的实现先不考虑，在我们这个场景下，它还是简单返回 vm.constructor.options ，相当于 Vue.options ，那么这个值⼜是什么呢，其实在 initGlobalAPI(Vue) 的时候定义了这个值，代码在 src/core/global-api/index.js 中,⾸先通过 Vue.options = Object.create(null) 创建⼀个空对象，然后遍历 ASSET_TYPES ， ASSET_TYPES 的定义在 src/shared/constants.js 中,接着执⾏了 Vue.options.\_base = Vue ，它的作⽤在我们上节实例化⼦组件的时候介绍了

最后通过 extend(Vue.options.components, builtInComponents) 把⼀些内置组件扩展到 Vue.options.components 上，Vue 的内置组件⽬前有 `<keep-alive>` , `<transition>` 和`<transition-group>` 组件，这也就是为什么我们在其它组件中使⽤` <keep-alive>` 组件不需要注册的原因，这块⼉后续我们介绍 `<keep-alive>` 组件的时候会详细讲

那么回到 mergeOptions 这个函数，它的定义在 src/core/util/options.js 中,mergeOptions 主要功能就是把 parent 和 child 这两个对象根据⼀些合并策略，合并成⼀个新对象并返回。⽐较核⼼的⼏步，先递归把 extends 和 mixixns 合并到 parent 上，然后遍历 parent ，调⽤ mergeField ，然后再遍历 child ，如果 key 不在 perent 的⾃⾝属性上，则调⽤ mergeField ,这⾥有意思的是 mergeField 函数，它对不同的 key 有着不同的合并策略。举例来说，对于⽣命周
期函数，它的合并策略是这样的

```js
function mergeHook(
  parentVal: ?Array<Function>,
  childVal: ?Function | ?Array<Function>
): ?Array<Function> {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
      ? childVal
      : [childVal]
    : parentVal;
}
LIFECYCLE_HOOKS.forEach((hook) => {
  strats[hook] = mergeHook;
});
```

这其中的 LIFECYCLE_HOOKS 的定义在 src/shared/constants.js 中,这⾥定义了 Vue.js 所有的钩⼦函数名称，所以对于钩⼦函数，他们的合并策略都是 mergeHook 函数。这个函数的实现也⾮常有意思，⽤了⼀个多层 3 元运算符，逻辑就是如果不存在 childVal ，就返回 parentVal ；否则再判断是否存在 parentVal ，如果存在就把 childVal 添加到 parentVal 后返回新数组；否则返回 childVal 的数组。所以回到 mergeOptions 函数，⼀旦 parent 和 child 都定义了相同的钩⼦函数，那么它们会把 2 个钩⼦函数合并成⼀个数组。关于其它属性的合并策略的定义都可以在 src/core/util/options.js ⽂件中看到，这⾥不⼀⼀介绍了

因此，在我们当前这个 case 下，执⾏完如下合并后

```js
vm.$options = mergeOptions(
  resolveConstructorOptions(vm.constructor),
  options || {},
  vm
);
```

vm.\$options 的值差不多是如下这样:

```js
vm.$options = {
  components: {},
  created: [
    function created() {
      console.log("parent created");
    },
  ],
  directives: {},
  filters: {},
  _base: function Vue(options) {
    // ...
  },
  el: "#app",
  render: function (h) {
    //...
  },
};
```

### 组件场景

由于组件的构造函数是通过 Vue.extend 继承⾃ Vue 的，先回顾⼀下这个过程，代码定义在 src/core/global-api/extend.js 中,我们只保留关键逻辑，这⾥的 extendOptions 对应的就是前⾯定义的组件对象，它会和 Vue.options 合并到 Sub.opitons 中

接下来我们再回忆⼀下⼦组件的初始化过程，代码定义在 src/core/vdom/create-component.js 中,这⾥的 vnode.componentOptions.Ctor 就是指向 Vue.extend 的返回值 Sub ， 所以 执⾏ newvnode.componentOptions.Ctor(options) 接着执⾏ this.\_init(options) ，因为 options.\_isComponent 为 true，那么合并 options 的过程⾛到了 initInternalComponent(vm,options) 逻辑。先来看⼀下它的代码实现，在 src/core/instance/init.js 中,initInternalComponent ⽅法⾸先执⾏ const opts = vm.$options =Object.create(vm.constructor.options) ，这⾥的 vm.construction 就是⼦组件的构造函数Sub ，相当于 vm.$options = Sub.options,接着⼜把实例化⼦组件传⼊的⼦组件⽗ VNode 实例 parentVnode 、⼦组件的⽗ Vue 实例 parent 保存到 vm.\$options 中，另外还保留了 parentVnode 配置中的如 propsData 等其它的属性。

这么看来， initInternalComponent 只是做了简单⼀层对象赋值，并不涉及到递归、合并策略等复杂逻辑

因此，在我们当前这个 case 下，执⾏完如下合并后

`initInternalComponent(vm, options)`

vm.\$options 的值差不多是如下这样:

```js
vm.$options = {
  parent: Vue /*⽗Vue实例*/,
  propsData: undefined,
  _componentTag: undefined,
  _parentVnode: VNode /*⽗VNode实例*/,
  _renderChildren: undefined,
  __proto__: {
    components: {},
    directives: {},
    filters: {},
    _base: function Vue(options) {
      //...
    },
    _Ctor: {},
    created: [
      function created() {
        console.log("parent created");
      },
      function created() {
        console.log("child created");
      },
    ],
    mounted: [
      function mounted() {
        console.log("child mounted");
      },
    ],
    data() {
      return {
        msg: "Hello Vue",
      };
    },
    template: "<div>{{msg}}</div>",
  },
};
```

那么⾄此，Vue 初始化阶段对于 options 的合并过程就介绍完了，我们需要知道对于 options 的合并有 2 种⽅式，⼦组件初始化过程通过 initInternalComponent ⽅式要⽐外部初始化 Vue 通过 mergeOptions 的过程要快，合并完的结果保留在 vm.\$options 中

纵观⼀些库、框架的设计⼏乎都是类似的，**⾃⾝定义了⼀些默认配置，同时⼜可以在初始化阶段传⼊⼀些定义配置，然后去 merge 默认配置，来达到定制化不同需求的⽬的**。只不过在 Vue 的场景下，会对 merge 的过程做⼀些精细化控制，虽然我们在开发⾃⼰的 JSSDK 的时候并没有 Vue 这么复杂，但这个设计思想是值得我们借鉴的

### ⽣命周期

每个 Vue 实例在被创建之前都要经过⼀系列的初始化过程。例如需要设置数据监听、编译模板、挂载实例到 DOM、在数据变化时更新 DOM 等。同时在这个过程中也会运⾏⼀些叫做⽣命周期钩⼦的函数，给予⽤户机会在⼀些特定的场景下添加他们⾃⼰的代码,在我们实际项⽬开发过程中，会⾮常频繁地和 Vue 组件的⽣命周期打交道，接下来我们就从源码的⾓度来看⼀下这些⽣命周期的钩⼦函数是如何被执⾏的,源码中最终执⾏⽣命周期的函数都是调⽤ callHook ⽅法，它的定义在 src/core/instance/lifecycle 中,callHook 函数的逻辑很简单，根据传⼊的字符串 hook ，去拿到 vm.$options[hook] 对应的回调函数数组，然后遍历执⾏，执⾏的时候把 vm 作为函数执⾏的上下⽂,在上⼀节中，我们详细地介绍了 Vue.js 合并 options 的过程，各个阶段的⽣命周期的函数也被合并到 vm.$options ⾥，并且是⼀个数组。因此 callhook 函数的功能就是调⽤某个⽣命周期钩⼦注册的所有回调函数,

了解了⽣命周期的执⾏⽅式后，接下来我们会具体介绍每⼀个⽣命周期函数它的调⽤时机

### beforeCreate & created

beforeCreate 和 created 函数都是在实例化 Vue 的阶段，在 \_init ⽅法中执⾏的，它的定义在 src/core/instance/init.js 中,可以看到 beforeCreate 和 created 的钩⼦调⽤是在 initState 的前后， initState 的作⽤是初始化 props 、 data 、 methods 、 watch 、 computed 等属性，之后我们会详细分析。那么显然 beforeCreate 的钩⼦函数中就不能获取到 props 、 data 中定义的值，也不能调⽤ methods 中定义的函数。

在这俩个钩⼦函数执⾏的时候，并没有渲染 DOM，所以我们也不能够访问 DOM，⼀般来说，如果组件在加载的时候需要和后端有交互，放在这俩个钩⼦函数执⾏都可以，如果是需要访问 props 、 data 等数据的话，就需要使⽤ created 钩⼦函数。之后我们会介绍 vue-router 和 vuex 的时候会发现它们都混合了 beforeCreatd 钩⼦函数

### beforeMount & mounted

顾名思义， beforeMount 钩⼦函数发⽣在 mount ，也就是 DOM 挂载之前，它的调⽤时机是在 mountComponent 函数中，定义在 src/core/instance/lifecycle.js 中,在执⾏ vm.\_render() 函数渲染 VNode 之前，执⾏了 beforeMount 钩⼦函数，在执⾏完 vm.\_update() 把 VNode patch 到真实 DOM 后，执⾏ mouted 钩⼦。注意，这⾥对 mouted 钩⼦函数执⾏有⼀个判断逻辑， vm.\$vnode 如果为 null ，则表明这不是⼀次组件的初始化过程，⽽是我们通过外部 new Vue 初始化过程。那么对于组件，它的 mounted 时机在哪⼉呢？

之前我们提到过，组件的 VNode patch 到 DOM 后，会执⾏ invokeInsertHook 函数，把 insertedVnodeQueue ⾥保存的钩⼦函数依次执⾏⼀遍，它的定义在 src/core/vdom/patch.js 中,该函数会执⾏ insert 这个钩⼦函数，对于组件⽽⾔， insert 钩⼦函数的定义在 src/core/vdom/create-component.js 中的 componentVNodeHooks 中,我们可以看到，每个⼦组件都是在这个钩⼦函数中执⾏ mouted 钩⼦函数，并且我们之前分析过， insertedVnodeQueue 的添加顺序是先⼦后⽗，所以对于同步渲染的⼦组件⽽⾔， mounted 钩⼦函数的执⾏顺序也是先⼦后⽗

### beforeUpdate & updated

顾名思义， beforeUpdate 和 updated 的钩⼦函数执⾏时机都应该是在数据更新的时候，到⽬前为⽌，我们还没有分析 Vue 的数据双向绑定、更新相关，下⼀章我会详细介绍这个过程,beforeUpdate 的执⾏时机是在渲染 Watcher 的 before 函数中，我们刚才提到过,注意这⾥有个判断，也就是在组件已经 mounted 之后，才会去调⽤这个钩⼦函数,update 的执⾏时机是在 flushSchedulerQueue 函数调⽤的时候, 它的定义在 src/core/observer/scheduler.js 中,flushSchedulerQueue 函数我们之后会详细介绍，可以先⼤概了解⼀下， updatedQueue 是 更新了的 wathcer 数组，那么在 callUpdatedHooks 函数中，它对这些数组做遍历，只有满⾜当前 watcher 为 vm.\_watcher 以及组件已经 mounted 这两个条件，才会执⾏ updated 钩⼦函数

我们之前提过，在组件 mount 的过程中，会实例化⼀个渲染的 Watcher 去监听 vm 上的数据变化重渲染，这断逻辑发⽣在 mountComponent 函数执⾏的时候,那么在实例化 Watcher 的过程中，在它的构造函数⾥会判断 isRenderWatcher ，接着把当前 watcher 的实例赋值给 vm.\_watcher ，定义在 src/core/observer/watcher.js 中,同时，还把当前 wathcer 实例 push 到 vm.\_watchers 中， vm.\_watcher 是专门⽤来监听 vm 上数据变化然后重新渲染的，所以它是⼀个渲染相关的 watcher ，因此在 callUpdatedHooks 函数中，只有 vm.\_watcher 的回调执⾏完毕后，才会执⾏ updated 钩⼦函数

### beforeDestroy & destroyed

顾名思义， beforeDestroy 和 destroyed 钩⼦函数的执⾏时机在组件销毁的阶段，组件的销毁过程之后会详细介绍，最终会调⽤ $destroy ⽅法，它的定义在 src/core/instance/lifecycle.js中,beforeDestroy 钩⼦函数的执⾏时机是在 $destroy 函数执⾏最开始的地⽅，接着执⾏了⼀系列的销毁动作，包括从 parent 的 \$children 中删掉⾃⾝，删除 watcher ，当前渲染的 VNode 执⾏销毁钩⼦函数等，执⾏完毕后再调⽤ destroy 钩⼦函数

在 \$destroy 的执⾏过程中，它⼜会执⾏ vm.**patch**(vm.\_vnode, null) 触发它⼦组件的销毁钩⼦函数，这样⼀层层的递归调⽤，所以 destroy 钩⼦函数执⾏顺序是先⼦后⽗，和 mounted 过程⼀样

### activated & deactivated

activated 和 deactivated 钩⼦函数是专门为 keep-alive 组件定制的钩⼦，我们会在介绍 keep-alive 组件的时候详细介绍，这⾥先留个悬念

这⼀节主要介绍了 Vue ⽣命周期中各个钩⼦函数的执⾏时机以及顺序，通过分析，我们知道了如在 created 钩⼦函数中可以访问到数据，在 mounted 钩⼦函数中可以访问到 DOM，在 destroy 钩⼦函数中可以做⼀些定时器销毁⼯作，了解它们有利于我们在合适的⽣命周期去做不同的事情

### 组件注册

在 Vue.js 中，除了它内置的组件如 keep-alive 、 component 、 transition 、 transition-group 等，其它⽤户⾃定义组件在使⽤前必须注册。很多同学在开发过程中可能会遇到如下报错信息：`'Unknown custom element: <xxx> - did you register the component correctly?For recursive components, make sure to provide the "name" option.'`⼀般报这个错的原因都是我们使⽤了未注册的组件。Vue.js 提供了 2 种组件的注册⽅式，全局注册和局
部注册。接下来我们从源码分析的⾓度来分析这两种注册⽅式。

### 全局注册

要注册⼀个全局组件，可以使⽤ Vue.component(tagName, options),那么， Vue.component 函数是在什么时候定义的呢，它的定义过程发⽣在最开始初始化 Vue 的全局函数的时候，代码在 src/core/global-api/assets.js 中,函数⾸先遍历 ASSET_TYPES ，得到 type 后挂载到 Vue 上 。 ASSET_TYPES 的定义在 src/shared/constants.js 中,所以实际上 Vue 是初始化了 3 个全局函数，并且如果 type 是 component 且 definition 是⼀个对象的话，通过 this.opitons.\_base.extend ， 相当于 Vue.extend 把这个对象转换成⼀个继承于 Vue 的构造函数，最后通过 this.options[type + 's'][id] = definition 把它挂载到 Vue.options.components 上

由于我们每个组件的创建都是通过 Vue.extend 继承⽽来，我们之前分析过在继承的过程中有这么⼀段逻辑：

```js
Sub.options = mergeOptions(Super.options, extendOptions);
```

也就是说它会把 Vue.options 合并到 Sub.options ，也就是组件的 optinons 上， 然后在组件的实例化阶段，会执⾏ merge options 逻辑，把 Sub.options.components 合并到 vm.$options.components 上,然后在创建 vnode 的过程中，会执⾏ _createElement ⽅法，我们再来回顾⼀下这部分的逻辑，它的定义在 src/core/vdom/create-element.js 中,这⾥有⼀个判断逻辑 isDef(Ctor = resolveAsset(context.$options, 'components', tag)) ，先来看⼀下 resolveAsset 的定义，在 src/core/utils/options.js 中,这段逻辑很简单，先通过 const assets = options[type] 拿到 assets ，然后再尝试拿 assets[id] ，这⾥有个顺序，先直接使⽤ id 拿，如果不存在，则把 id 变成驼峰的形式再拿，如果仍然不存在则在驼峰的基础上把⾸字⺟再变成⼤写的形式再拿，如果仍然拿不到则报错。这样说明了我们在使⽤ Vue.component(id, definition) 全局注册组件的时候，id 可以是连字符、驼峰或⾸字⺟⼤写的形式

那么回到我们的调⽤ resolveAsset(context.$options, 'components', tag) ，即拿vm.$options.components[tag] ，这样我们就可以在 resolveAsset 的时候拿到这个组件的构造函数，并作为 createComponent 的钩⼦的参数

### 局部注册

Vue.js 也同样⽀持局部注册，我们可以在⼀个组件内部使⽤ components 选项做组件的局部注册,其实理解了全局注册的过程，局部注册是⾮常简单的。在组件的 Vue 的实例化阶段有⼀个合并 option 的逻辑，之前我们也分析过，所以就把 components 合并到 vm.\$options.components 上，这样我们就可以在 resolveAsset 的时候拿到这个组件的构造函数，并作为 createComponent 的钩⼦的参数。

注意，**局部注册和全局注册不同的是，只有该类型的组件才可以访问局部注册的⼦组件，⽽全局注册是扩展到 Vue.options 下**，所以在所有组件创建的过程中，都会从全局的 Vue.options.components 扩展到当前组件的 vm.\$options.components 下，这就是全局注册的组件能被任意使⽤的原因

通过这⼀⼩节的分析，我们对组件的注册过程有了认识，并理解了全局注册和局部注册的差异。其实在平时的⼯作中，当我们使⽤到组件库的时候，往往更通⽤基础组件都是全局注册的，⽽编写的特例场景的业务组件都是局部注册的。了解了它们的原理，对我们在⼯作中到底使⽤全局注册组件还是局部注册组件是有这⾮常好的指导意义的

### 异步组件

在我们平时的开发⼯作中，为了减少⾸屏代码体积，往往会把⼀些⾮⾸屏的组件设计成异步组件，按需加载。Vue 也原⽣⽀持了异步组件的能⼒

Vue 注册的组件不再是⼀个对象，⽽是⼀个⼯⼚函数，函数有两个参数 resolve 和 reject ，函数内部⽤ setTimout 模拟了异步，实际使⽤可能是通过动态请求异步组件的 JS 地址，最终通过执⾏ resolve ⽅法，它的参数就是我们的异步组件对象，在了解了异步组件如何注册后，我们从源码的⾓度来分析⼀下它的实现。

上⼀节我们分析了组件的注册逻辑，由于组件的定义并不是⼀个普通对象，所以不会执⾏ Vue.extend 的逻辑把它变成⼀个组件的构造函数，但是它仍然可以执⾏到 createComponent 函数，我们再来对这个函数做回顾，它的定义在 src/core/vdom/create-component/js 中，由于我们这个时候传⼊的 Ctor 是⼀个函数，那么它也并不会执⾏ Vue.extend 逻辑，因此它的 cid 是 undefiend ，进⼊了异步组件创建的逻辑。这⾥⾸先执⾏了 Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context) ⽅法，它的定义在 src/core/vdom/helpers/resolve-async-component.js 中，resolveAsyncComponent 函数的逻辑略复杂，因为它实际上处理了 3 种异步组件的创建⽅式，除了刚才⽰例的组件注册⽅式，还⽀持 2 种，⼀种是⽀持 Promise 创建组件的⽅式，还有一种是高级异步组件，那么解下来，我们就根据这 3 种异步组件的情况，来分别去分析 resolveAsyncComponent 的逻辑。

### 普通函数异步组件

针对普通函数的情况，前⾯⼏个 if 判断可以忽略，它们是为⾼级组件所⽤，对于 factory.contexts 的判断，是考虑到多个地⽅同时初始化⼀个异步组件，那么它的实际加载应该只有⼀次。接着进⼊实际加载逻辑，定义了 forceRender 、 resolve 和 reject 函数，注意 resolve 和 reject 函数⽤ once 函数做了⼀层包装，它的定义在 src/shared/util.js 中，once 逻辑⾮常简单，传⼊⼀个函数，并返回⼀个新函数，它⾮常巧妙地利⽤闭包和⼀个标志位保证
了它包装的函数只会执⾏⼀次，也就是确保 resolve 和 reject 函数只执⾏⼀次

接下来执⾏ const res = factory(resolve, reject) 逻辑，这块⼉就是执⾏我们组件的⼯⼚函数，同时把 resolve 和 reject 函数作为参数传⼊，组件的⼯⼚函数通常会先发送请求去加载我们的异步组件的 JS ⽂件，拿到组件定义的对象 res 后，执⾏ resolve(res) 逻辑，它会先执⾏ factory.resolved = ensureCtor(res, baseCtor)，这个函数⽬的是为了保证能找到异步组件 JS 定义的组件对象，并且如果它是⼀个普通对象，则调⽤ Vue.extend 把它转换成⼀个组件的构造函数。resolve 逻辑最后判断了 sync ，显然我们这个场景下 sync 为 false，那么就会执⾏ forceRender 函数，它会遍历 factory.contexts ，拿到每⼀个调⽤异步组件的实例 vm , 执⾏ vm.\$forceUpdate() ⽅法，它的定义在 src/core/instance/lifecycle.js 中

$forceUpdate 的逻辑⾮常简单，就是调⽤渲染 watcher 的 update ⽅法，让渲染 watcher 对应的回调函数执⾏，也就是触发了组件的重新渲染。之所以这么做是因为 Vue 通常是数据驱动视图重新渲染，但是在整个异步组件加载过程中是没有数据发⽣变化的，所以通过执⾏ $forceUpdate 可以强制组件重新渲染⼀次

### Promise 异步组件

webpack 2+ ⽀持了异步加载的语法糖： () => import('./my-async-component') ，当执⾏完 res= factory(resolve, reject) ，返回的值就是 import('./my-async-component') 的返回值，它是⼀个 Promise 对象。接着进⼊ if 条件，⼜判断了 typeof res.then === 'function') ，条件满⾜，执⾏

```js
if (isUndef(factory.resolved)) {
  res.then(resolve, reject);
}
```

当组件异步加载成功后，执⾏ resolve ，加载失败则执⾏ reject ，这样就⾮常巧妙地实现了配合 webpack 2+ 的异步加载组件的⽅式（ Promise ）加载异步组件

### 高级异步组件

由于异步加载组件需要动态加载 JS，有⼀定⽹络延时，⽽且有加载失败的情况，所以通常我们在开发异步组件相关逻辑的时候需要设计 loading 组件和 error 组件，并在适当的时机渲染它们。Vue.js 2.3+ ⽀持了⼀种⾼级异步组件的⽅式，它通过⼀个简单的对象配置，帮你搞定 loading 组件和 error 组件的渲染时机，你完全不⽤关⼼细节，⾮常⽅便。接下来我们就从源码的⾓度来分析⾼级异步组件是怎么实现的

```js
const AsyncComp = () => ({
  // 需要加载的组件。应当是⼀个 Promise
  component: import("./MyComp.vue"),
  // 加载中应当渲染的组件
  loading: LoadingComp,
  // 出错时渲染的组件
  error: ErrorComp,
  // 渲染加载中组件前的等待时间。默认：200ms。
  delay: 200,
  // 最⻓等待时间。超出此时间则渲染错误组件。默认：Infinity
  timeout: 3000,
});
Vue.component("async-example", AsyncComp);
```

⾼级异步组件的初始化逻辑和普通异步组件⼀样，也是执⾏ resolveAsyncComponent ，当执⾏完 res = factory(resolve, reject) ，返回值就是定义的组件对象，显然满⾜ else if(isDef(res.component) && typeof res.component.then === 'function') 的逻辑，接着执⾏ res.component.then(resolve, reject) ，当异步组件加载成功后，执⾏ resolve ，失败执⾏ reject

因为异步组件加载是⼀个异步过程,先判断 res.error 是否定义了 error 组件，如果有的话则赋值给 factory.errorComp 。 接着判断 res.loading 是否定义了 loading 组件，如果有的话则赋值给 factory.loadingComp ，如果设置了 res.delay 且为 0，则设置 factory.loading = true ，否则延时 delay 的时间执⾏,最后判断 res.timeout ，如果配置了该项，则在 res.timout 时间后，如果组件没有成功加载，执⾏ reject

在 resolveAsyncComponent 的最后有⼀段逻辑

```js
sync = false;
return factory.loading ? factory.loadingComp : factory.resolved;
```

如果 delay 配置为 0，则这次直接渲染 loading 组件，否则则延时 delay 执⾏ forceRender ，那么⼜会再⼀次执⾏到 resolveAsyncComponent 。那么这时候我们有⼏种情况，按逻辑的执⾏顺序，对不同的情况做判断

异步组件加载失败:当异步组件加载失败，会执⾏ reject 函数,这个时候会把 factory.error 设置为 true ，同时执⾏ forceRender() 再次执⾏到 resolveAsyncComponent,那么这个时候就返回 factory.errorComp ，直接渲染 error 组件

异步组件加载成功:当异步组件加载成功，会执⾏ resolve 函数,⾸先把加载结果缓存到 factory.resolved 中，这个时候因为 sync 已经为 false，则执⾏ forceRender() 再次执⾏到 resolveAsyncComponent ,那么这个时候直接返回 factory.resolved ，渲染成功加载的组件

异步组件加载中:如果异步组件加载中并未返回，这时候会会返回 factory.loadingComp ，渲染 loading 组件

异步组件加载超时:如果超时，则⾛到了 reject 逻辑，之后逻辑和加载失败⼀样，渲染 error 组件

异步组件 patch:回到 createComponent 的逻辑,如果是第⼀次执⾏ resolveAsyncComponent ，除⾮使⽤⾼级异步组件 0 delay 去创建了⼀个 loading 组件，否则返回是 undefiend ，接着通过 createAsyncPlaceholder 创建⼀个注释节点作为占位符。它的定义在 src/core/vdom/helpers/resolve-async-components.js 中,实际上就是就是创建了⼀个占位的注释 VNode，同时把 asyncFactory 和 asyncMeta 赋值给当前 vnode ,当执⾏ forceRender 的时候，会触发组件的重新渲染，那么会再⼀次执⾏ resolveAsyncComponent ，这时候就会根据不同的情况，可能返回 loading、error 或成功加载的异步组件，返回值不为 undefined ，因此就⾛正常的组件 render 、 patch 过程，与组件第⼀次渲染流程不⼀样，这个时候是存在新旧 vnode 的，下⼀章会分析组件更新的 patch 过程

通过以上代码分析，我们对 Vue 的异步组件的实现有了深⼊的了解，知道了 3 种异步组件的实现⽅式，并且看到⾼级异步组件的实现是⾮常巧妙的，它实现了 loading、resolve、reject、timeout 4 种状态。异步组件实现的本质是 2 次渲染，除了 0 delay 的⾼级异步组件第⼀次直接渲染成 loading 组件外，其它都是第⼀次渲染⽣成⼀个注释节点，当异步获取组件成功后，再通过 forceRender 强制重新渲染，这样就能正确渲染出我们异步加载的组件了。

## 深入响应式原理

前⾯ 2 章介绍的都是 Vue 怎么实现数据渲染和组件化的，主要讲的是初始化的过程，把原始的数据最终映射到 DOM 中，但并没有涉及到数据变化到 DOM 变化的部分。⽽ Vue 的数据驱动除了数据渲染 DOM 之外，还有⼀个很重要的体现就是数据的变更会触发 DOM 的变化。其实前端开发最重要的 2 个⼯作，⼀个是把数据渲染到⻚⾯，另⼀个是处理⽤户交互。Vue **把数据渲染到⻚⾯的能⼒**我们已经通过源码分析出其中的原理了，但是由于⼀些⽤户交互或者是其它⽅⾯**导致数据发⽣变化重新对⻚⾯渲染**的原理我们还未分析

我们先直观的想⼀下，如果不⽤ Vue 的话，我们会通过最简单的⽅法实现数据变化：监听点击事件，修改数据，⼿动操作 DOM 重新渲染。这个过程和使⽤ Vue 的最⼤区别就是多了⼀步“⼿动操作 DOM 重新渲染”。这⼀步看上去并不多，但它背后⼜潜在的⼏个要处理的问题：

- 我需要修改哪块的 DOM？
- 我的修改效率和性能是不是最优的？
- 我需要对数据每⼀次的修改都去操作 DOM 吗？
- 我需要 case by case 去写修改 DOM 的逻辑吗？

如果我们使⽤了 Vue，那么上⾯⼏个问题 Vue 内部就帮你做了，那么 Vue 是如何在我们对数据修改后⾃动做这些事情呢，接下来我们将进⼊⼀些 Vue 响应式系统的底层的细节

### 响应式对象

Vue.js 实现响应式的核⼼是利⽤了 ES5 的 Object.defineProperty ，这也是为什么 Vue.js 不能兼容 IE8 及以下浏览器的原因

### Object.defineProperty

Object.defineProperty ⽅法会直接在⼀个对象上定义⼀个新属性，或者修改⼀个对象的现有属性， 并返回这个对象，先来看⼀下它的语法`Object.defineProperty(obj, prop, descriptor)`obj 是要在其上定义属性的对象； prop 是要定义或修改的属性的名称； descriptor 是将被定义或修改的属性描述符,⽐较核⼼的是 descriptor ，它有很多可选键值，具体的可以去参阅它的⽂档。这⾥我们最关⼼的是 get 和 set ， get 是⼀个给属性提供的 getter ⽅法，当我们访问了该属性的时候会触发 getter ⽅法； set 是⼀个给属性提供的 setter ⽅法，当我们对该属性做修改的时候会触发 setter ⽅法,⼀旦对象拥有了 getter 和 setter，我们可以简单地把这个对象称为响应式对象。那么 Vue.js 把哪些对象变成了响应式对象了呢，接下来我们从源码层⾯分析

```js
const object1 = {};

Object.defineProperty(object1, "property1", {
  value: 42,
  writable: false,
});

object1.property1 = 77;
// throws an error in strict mode

console.log(object1.property1);
// expected output: 42
```

### initState

在 Vue 的初始化阶段， \_init ⽅法执⾏的时候，会执⾏ initState(vm) ⽅法，它的定义在 src/core/instance/state.js 中,initState ⽅法主要是对 props 、 methods 、 data 、 computed 和 wathcer 等属性做了初始化操作。这⾥我们重点分析 props 和 data ，对于其它属性的初始化我们之后再详细分析。

props 的初始化主要过程，就是遍历定义的 props 配置。遍历的过程主要做两件事情：⼀个是调⽤ defineReactive ⽅法把每个 prop 对应的值变成响应式，可以通过 vm.\_props.xxx 访问到定义 props 中对应的属性。对于 defineReactive ⽅法，我们稍后会介绍；另⼀个是通过 proxy 把 vm.\_props.xxx 的访问代理到 vm.xxx 上，我们稍后也会介绍。

data 的初始化主要过程也是做两件事，⼀个是对定义 data 函数返回对象的遍历，通过 proxy 把每⼀个值 vm.\_data.xxx 都代理到 vm.xxx 上；另⼀个是调⽤ observe ⽅法观测整个 data 的变化，把 data 也变成响应式，可以通过 vm.\_data.xxx 访问到定义 data 返回函数中对应的属性， observe 我们稍后会介绍。可以看到，⽆论是 props 或是 data 的初始化都是把它们变成响应式对象，这个过程我们接触到⼏个函数，接下来我们来详细分析它们。

### proxy

⾸先介绍⼀下代理，代理的作⽤是把 props 和 data 上的属性代理到 vm 实例上,proxy ⽅法的实现很简单，通过 Object.defineProperty 把 target[sourceKey][key] 的读写变成了对 target[key] 的读写。所以对于 props ⽽⾔，对 vm.\_props.xxx 的读写变成了 vm.xxx 的读写，⽽对于 vm.\_props.xxx 我们可以访问到定义在 props 中的属性，所以我们就可以通过 vm.xxx 访问到定义在 props 中的 xxx 属性了。同理，对于 data ⽽⾔，对 vm.\_data.xxxx 的读写变成了对 vm.xxxx 的读写，⽽对于 vm.\_data.xxxx 我们可以访问到定义在 data 函数返回对象中的属性，所以我们就可以通过 vm.xxxx 访问到定义在 data 函数返回对象中的 xxxx 属性了。

### observe

observe 的功能就是⽤来监测数据的变化，它的定义在 src/core/observer/index.js 中：observe ⽅法的作⽤就是给⾮ VNode 的对象类型数据添加⼀个 Observer ，如果已经添加过则直接返回，否则在满⾜⼀定条件下去实例化⼀个 Observer 对象实例。接下来我们来看⼀下 Observer 的作⽤。

Observer 是⼀个类，它的作⽤是给对象的属性添加 getter 和 setter，⽤于依赖收集和派发更新：Observer 的构造函数逻辑很简单，⾸先实例化 Dep 对象，这块稍后会介绍，接着通过执⾏ def 函数把⾃⾝实例添加到数据对象 value 的 **ob** 属性上， def 的定义在 src/core/util/lang.js 中：

def 函数是⼀个⾮常简单的 Object.defineProperty 的封装，这就是为什么我在开发中输出 data 上对象类型的数据，会发现该对象多了⼀个 **ob** 的属性。回到 Observer 的构造函数，接下来会对 value 做判断，对于数组会调⽤ observeArray ⽅法，否则对纯对象调⽤ walk ⽅法。可以看到 observeArray 是遍历数组再次调⽤ observe ⽅法，⽽ walk ⽅法是遍历对象的 key 调⽤ defineReactive ⽅法，那么我们来看⼀下这个⽅法是做什么的。

### defineReactive

defineReactive 的功能就是定义⼀个响应式对象，给对象动态添加 getter 和 setter，它的定义在 src/core/observer/index.js 中：递归调⽤ observe ⽅法，这样就保证了⽆论 obj 的结构多复杂，它的所有⼦属性也能变成响应式的对象，这样我们访问或修改 obj 中⼀个嵌套较深的属性，也能触发 getter 和 setter。最后利⽤ Object.defineProperty 去给 obj 的属性 key 添加 getter 和 setter。⽽关于 getter 和 setter 的具体实现，我们会在之后介绍。

这⼀节我们介绍了响应式对象，核⼼就是利⽤ Object.defineProperty 给数据添加了 getter 和 setter，⽬的就是为了在我们访问数据以及写数据的时候能⾃动执⾏⼀些逻辑：getter 做的事情是依赖收集，setter 做的事情是派发更新，那么在接下来的章节我们会重点对这两个过程分析。

### 依赖收集

通过上⼀节的分析我们了解 Vue 会把普通对象变成响应式对象，响应式对象 getter 相关的逻辑就是做依赖收集，这⼀节我们来详细分析这个过程。

getter 部分的逻辑，我们只需要关注 2 个地⽅，⼀个是 const dep = new Dep() 实例化⼀个 Dep 的实例，另⼀个是在 get 函数中通过 dep.depend 做依赖收集，这⾥还有个对 childObj 判断的逻辑，我们之后会介绍它的作⽤

### Dep

Dep 是整个 getter 依赖收集的核⼼，它的定义在 src/core/observer/dep.js 中：Dep 是⼀个 Class，它定义了⼀些属性和⽅法，这⾥需要特别注意的是它有⼀个静态属性 target ，这是⼀个全局唯⼀ Watcher ，这是⼀个⾮常巧妙的设计，因为在同⼀时间只能有⼀个全局的 Watcher 被计算，另外它的⾃⾝属性 subs 也是 Watcher 的数组。Dep 实际上就是对 Watcher 的⼀种管理， Dep 脱离 Watcher 单独存在是没有意义的，为了完整地讲清楚依赖收集过程，我们有必要看⼀下 Watcher 的⼀些相关实现，它的定义在 src/core/observer/watcher.js 中

### Watcher

Watcher 是⼀个 Class，在它的构造函数中，定义了⼀些和 Dep 相关的属性：

```js
this.deps = [];
this.newDeps = [];
this.depIds = new Set();
this.newDepIds = new Set();
```

其中， this.deps 和 this.newDeps 表⽰ Watcher 实例持有的 Dep 实例的数组；⽽ this.depIds 和 this.newDepIds 分别代表 this.deps 和 this.newDeps 的 id Set（这个 Set 是 ES6 的数据结构，它的实现在 src/core/util/env.js 中）。那么这⾥为何需要有 2 个 Dep 实例数组呢，稍后我们会解释,Watcher 还定义了⼀些原型的⽅法，和依赖收集相关的有 get 、 addDep 和 cleanupDeps ⽅法，单个介绍它们的实现不⽅便理解，我会结合整个依赖收集的过程把这⼏个⽅法讲清楚。Watcher 还定义了⼀些原型的⽅法，和依赖收集相关的有 get 、 addDep 和 cleanupDeps ⽅法，单个介绍它们的实现不⽅便理解，我会结合整个依赖收集的过程把这⼏个⽅法讲清楚。

### 过程分析

之前我们介绍当对数据对象的访问会触发他们的 getter ⽅法，那么这些对象什么时候被访问呢？还记得之前我们介绍过 Vue 的 mount 过程是通过 mountComponent 函数，其中有⼀段⽐较重要的逻辑，⼤致如下：

```js
updateComponent = () => {
  vm._update(vm._render(), hydrating);
};
new Watcher(
  vm,
  updateComponent,
  noop,
  {
    before() {
      if (vm._isMounted) {
        callHook(vm, "beforeUpdate");
      }
    },
  },
  true /* isRenderWatcher */
);
```

当我们去实例化⼀个渲染 watcher 的时候，⾸先进⼊ watcher 的构造函数逻辑，然后会执⾏它的 this.get() ⽅法，进⼊ get 函数，⾸先会执⾏：`pushTarget(this)`,pushTarget 的定义在 src/core/observer/dep.js 中

```js
export function pushTarget(_target: Watcher) {
  if (Dep.target) targetStack.push(Dep.target);
  Dep.target = _target;
}
```

实际上就是把 Dep.target 赋值为当前的渲染 watcher 并压栈（为了恢复⽤）。接着⼜执⾏了：`value = this.getter.call(vm, vm)`,this.getter 对应就是 updateComponent 函数，这实际上就是在执⾏：`vm._update(vm._render(), hydrating)`,它会先执⾏ vm.\_render() ⽅法，因为之前分析过这个⽅法会⽣成 渲染 VNode，并且在这个过程中会对 vm 上的数据访问，这个时候就触发了数据对象的 getter。那么每个对象值的 getter 都持有⼀个 dep ，在触发 getter 的时候会调⽤ dep.depend() ⽅法，也就会执⾏ Dep.target.addDep(this) 。刚才我们提到这个时候 Dep.target 已经被赋值为渲染 watcher ，那么就执⾏到 addDep ⽅法：

```js
addDep (dep: Dep) {
const id = dep.id
if (!this.newDepIds.has(id)) {
this.newDepIds.add(id)
this.newDeps.push(dep)
if (!this.depIds.has(id)) {
dep.addSub(this)
}
}
}
```

这时候会做⼀些逻辑判断（保证同⼀数据不会被添加多次）后执⾏ dep.addSub(this) ，那么就会执⾏ this.subs.push(sub) ，也就是说把当前的 watcher 订阅到这个数据持有的 dep 的 subs 中，这个⽬的是为后续数据变化时候能通知到哪些 subs 做准备。

所以在 vm.\_render() 过程中，会触发所有数据的 getter，这样实际上已经完成了⼀个依赖收集的过程。那么到这⾥就结束了么，其实并没有，再完成依赖收集后，还有⼏个逻辑要执⾏，⾸先是：

```js
if (this.deep) {
  traverse(value);
}
```

这个是要递归去访问 value ，触发它所有⼦项的 getter ，这个之后会详细讲。接下来执⾏：`popTarget()`,popTarget 的定义在 src/core/observer/dep.js 中：`Dep.target = targetStack.pop()`,实际上就是把 Dep.target 恢复成上⼀个状态，因为当前 vm 的数据依赖收集已经完成，那么对应的渲染 Dep.target 也需要改变。最后执⾏：`this.cleanupDeps()`

其实很多⼈都分析过并了解到 Vue 有依赖收集的过程，但⼏乎没有⼈分析依赖清空的过程，其实这是⼤部分同学会忽视的⼀点，也是 Vue 考虑特别细的⼀点。

```js
cleanupDeps () {
let i = this.deps.length
while (i--) {
const dep = this.deps[i]
if (!this.newDepIds.has(dep.id)) {
  dep.removeSub(this)
  }
}
let tmp = this.depIds
this.depIds = this.newDepIds
this.newDepIds = tmp
this.newDepIds.clear()
tmp = this.deps
this.deps = this.newDeps
this.newDeps = tmp
this.newDeps.length = 0
}
```

考虑到 Vue 是数据驱动的，所以每次数据变化都会重新 render，那么 vm.\_render() ⽅法⼜会再次执⾏，并再次触发数据的 getters，所以 Wathcer 在构造函数中会初始化 2 个 Dep 实例数组， newDeps 表⽰新添加的 Dep 实例数组，⽽ deps 表⽰上⼀次添加的 Dep 实例数组。

在执⾏ cleanupDeps 函数的时候，会⾸先遍历 deps ，移除对 dep 的订阅，然后把 newDepIds 和 depIds 交换， newDeps 和 deps 交换，并把 newDepIds 和 newDeps 清空。那么为什么需要做 deps 订阅的移除呢，在添加 deps 的订阅过程，已经能通过 id 去重避免重复订阅了。

那么为什么需要做 deps 订阅的移除呢，在添加 deps 的订阅过程，已经能通过 id 去重避免重复订阅了

考虑到⼀种场景，我们的模板会根据 v-if 去渲染不同⼦模板 a 和 b，当我们满⾜某种条件的时候渲染 a 的时候，会访问到 a 中的数据，这时候我们对 a 使⽤的数据添加了 getter，做了依赖收集，那么当我们去修改 a 的数据的时候，理应通知到这些订阅者。那么如果我们⼀旦改变了条件渲染了 b 模板，⼜会对 b 使⽤的数据添加了 getter，如果我们没有依赖移除的过程，那么这时候我去修改 a 模板的数据，会通知 a 数据的订阅的回调，这显然是有浪费的。

因此 Vue 设计了在每次添加完新的订阅，会移除掉旧的订阅，这样就保证了在我们刚才的场景中，如果渲染 b 模板的时候去修改 a 模板的数据，a 数据订阅回调已经被移除了，所以不会有任何浪费，真的是⾮常赞叹 Vue 对⼀些细节上的处理。

通过这⼀节的分析，我们对 Vue 数据的依赖收集过程已经有了认识，并且对这其中的⼀些细节做了分析。收集依赖的⽬的是为了当这些响应式数据发送变化，触发它们的 setter 的时候，能知道应该通知哪些订阅者去做相应的逻辑处理，我们把这个过程叫派发更新，其实 Watcher 和 Dep 就是⼀个⾮常经典的观察者设计模式的实现，下⼀节我们来详细分析⼀下派发更新的过程。

### 派发更新

通过上⼀节分析我们了解了响应式数据依赖收集过程，收集的⽬的就是为了当我们修改数据的时候，可以对相关的依赖派发更新，那么这⼀节我们来详细分析这个过程

setter 的逻辑有 2 个关键的点，⼀个是 childOb = !shallow && observe(newVal) ，如果 shallow 为 false 的情况，会对新设置的值变成⼀个响应式对象；另⼀个是 dep.notify() ，通知所有的订阅者，这是本节的关键，接下来我会带⼤家完整的分析整个派发更新的过程。

### 过程分析

当我们在组件中对响应的数据做了修改，就会触发 setter 的逻辑，最后调⽤ dep.notify() ⽅法， 它是 Dep 的⼀个实例⽅法，定义在 src/core/observer/dep.js 中，这⾥的逻辑⾮常简单，遍历所有的 subs ，也就是 Watcher 的实例数组，然后调⽤每⼀个 watcher 的 update ⽅法，它的定义在 src/core/observer/watcher.js 中：这⾥的逻辑⾮常简单，遍历所有的 subs ，也就是 Watcher 的实例数组，然后调⽤每⼀个 watcher 的 update ⽅法，它的定义在 src/core/observer/watcher.js 中：这⾥对于 Watcher 的不同状态，会执⾏不同的逻辑， computed 和 sync 等状态的分析我会之后抽⼀⼩节详细介绍，在⼀般组件数据更新的场景，会⾛到最后⼀个 queueWatcher(this) 的逻辑， queueWatcher 的定义在 src/core/observer/scheduler.js 中

这⾥引⼊了⼀个队列的概念，这也是 Vue 在做派发更新的时候的⼀个优化的点，它并不会每次数据改变都触发 watcher 的回调，⽽是把这些 watcher 先添加到⼀个队列⾥，然后在 nextTick 后执⾏ flushSchedulerQueue 。

这⾥有⼏个细节要注意⼀下，⾸先⽤ has 对象保证同⼀个 Watcher 只添加⼀次；接着对 flushing 的判断，else 部分的逻辑稍后会讲；最后通过 wating 保证对 nextTick(flushSchedulerQueue) 的调⽤逻辑只有⼀次，另外 nextTick 的实现我之后会抽⼀⼩节专门去讲，⽬前就可以理解它是在下⼀个 tick，也就是异步的去执⾏ flushSchedulerQueue 。

接下来我们来看 flushSchedulerQueue 的实现，它的定义在 src/core/observer/scheduler.js 中，这⾥有⼏个重要的逻辑要梳理⼀下，对于⼀些分⽀逻辑如 keep-alive 组件相关和之前提到过的 updated 钩⼦函数的执⾏会略过。

#### 队列排序

`queue.sort((a, b) => a.id - b.id)` 对队列做了从⼩到⼤的排序，这么做主要有以下要确保以下⼏点：

1.组件的更新由⽗到⼦；因为⽗组件的创建过程是先于⼦的，所以 watcher 的创建也是先⽗后⼦，执⾏顺序也应该保持先⽗后⼦。 2.⽤户的⾃定义 watcher 要优先于渲染 watcher 执⾏；因为⽤户⾃定义 watcher 是在渲染 watcher 之前创建的。 3.如果⼀个组件在⽗组件的 watcher 执⾏期间被销毁，那么它对应的 watcher 执⾏都可以被跳过，所以⽗组件的 watcher 应该先执⾏。

#### 队列遍历

在对 queue 排序后，接着就是要对它做遍历，拿到对应的 watcher ，执⾏ watcher.run() 。这⾥需要注意⼀个细节，在遍历的时候每次都会对 queue.length 求值，因为在 watcher.run() 的时候，很可能⽤户会再次添加新的 watcher ，这样会再次执⾏到 queueWatcher ，可以看到，这时候 flushing 为 true，就会执⾏到 else 的逻辑，然后就会从后往前找，找到第⼀个待插⼊ watcher 的 id ⽐当前队列中 watcher 的 id ⼤的位置。把 watcher 按照 id 的插⼊到队列中，因此 queue 的⻓度发送了变化。

#### 状态恢复

这个过程就是执⾏ resetSchedulerState 函数，它的定义在 src/core/observer/scheduler.js 中。逻辑⾮常简单，就是把这些控制流程状态的⼀些变量恢复到初始值，把 watcher 队列清空。

接下来我们继续分析 watcher.run() 的逻辑，它的定义在 src/core/observer/watcher.js 中。

run 函数实际上就是执⾏ this.getAndInvoke ⽅法，并传⼊ watcher 的回调函数。 getAndInvoke 函数逻辑也很简单，先通过 this.get() 得到它当前的值，然后做判断，如果满⾜新旧值不等、新值是对象类型、 deep 模式任何⼀个条件，则执⾏ watcher 的回调，注意回调函数执⾏的时候会把第⼀个和第⼆个参数传⼊新值 value 和旧值 oldValue ，这就是当我们添加⾃定义 watcher 的时候能在回调函数的参数中拿到新旧值的原因。

那么对于渲染 watcher ⽽⾔，它在执⾏ this.get() ⽅法求值的时候，会执⾏ getter ⽅法：

```js
updateComponent = () => {
  vm._update(vm._render(), hydrating);
};
```

所以这就是当我们去修改组件相关的响应式数据的时候，会触发组件重新渲染的原因，接着就会重新执⾏ patch 的过程，但它和⾸次渲染有所不同，之后我们会花⼀⼩节去详细介绍。

通过这⼀节的分析，我们对 Vue 数据修改派发更新的过程也有了认识，实际上就是当数据发⽣变化的时候，触发 setter 逻辑，把在依赖过程中订阅的的所有观察者，也就是 watcher ，都触发它们的 update 过程，这个过程⼜利⽤了队列做了进⼀步优化，在 nextTick 后执⾏所有 watcher 的 run ，最后执⾏它们的回调函数。 nextTick 是 Vue ⼀个⽐较核⼼的实现了，下⼀节我们来重点分析它的实现。

通过这⼀节的分析，我们对 Vue 数据修改派发更新的过程也有了认识，实际上就是当数据发⽣变化的时候，触发 setter 逻辑，把在依赖过程中订阅的的所有观察者，也就是 watcher ，都触发它们的 update 过程，这个过程⼜利⽤了队列做了进⼀步优化，在 nextTick 后执⾏所有 watcher 的 run ，最后执⾏它们的回调函数。 nextTick 是 Vue ⼀个⽐较核⼼的实现了，下⼀节我们来重点分析它的实现。

### nextTick

nextTick 是 Vue 的⼀个核⼼实现，在介绍 Vue 的 nextTick 之前，为了⽅便⼤家理解，先简单介绍⼀下 JS 的运⾏机制。

### JS 运⾏机制

JS 执⾏是单线程的，它是基于事件循环的。事件循环⼤致分为以下⼏个步骤：

- （1）所有同步任务都在主线程上执⾏，形成⼀个执⾏栈（execution context stack）。
- （2）主线程之外，还存在⼀个"任务队列"（task queue）。只要异步任务有了运⾏结果，就在"任务队列"之中放置⼀个事件。
- （3）⼀旦"执⾏栈"中的所有同步任务执⾏完毕，系统就会读取"任务队列"，看看⾥⾯有哪些事件。那些对应的异步任务，于是结束等待状态，进⼊执⾏栈，开始执⾏。
- （4）主线程不断重复上⾯的第三步。

主线程的执⾏过程就是⼀个 tick，⽽所有的异步结果都是通过 “任务队列” 来调度被调度。 消息队列中存放的是⼀个个的任务（task）。 规范中规定 task 分为两⼤类，分别是 macro task 和 micro task，并且每个 macro task 结束后，都要清空所有的 micro task。在浏览器环境中，常⻅的 macro task 有 setTimeout、MessageChannel、postMessage、setImmediate；常⻅的 micro task 有 MutationObsever 和 Promise.then。

### Vue 的实现

在 Vue 源码 2.5+ 后， nextTick 的实现单独有⼀个 JS ⽂件来维护它，它的源码并不多，总共也就 100 多⾏。接下来我们来看⼀下它的实现，在 src/core/util/next-tick.js 中：

next-tick.js 申明了 microTimerFunc 和 macroTimerFunc 2 个变量，它们分别对应的是 microtask 的函数和 macro task 的函数。对于 macro task 的实现，优先检测是否⽀持原⽣ setImmediate ，这是⼀个⾼版本 IE 和 Edge 才⽀持的特性，不⽀持的话再去检测是否⽀持原⽣的 MessageChannel ，如果也不⽀持的话就会降级为 setTimeout 0 ；⽽对于 micro task 的实现，则检测浏览器是否原⽣⽀持 Promise，不⽀持的话直接指向 macro task 的实现。

next-tick.js 对外暴露了 2 个函数，先来看 nextTick ，这就是我们在上⼀节执⾏ nextTick(flushSchedulerQueue) 所⽤到的函数。它的逻辑也很简单，把传⼊的回调函数 cb 压⼊ callbacks 数组，最后⼀次性地根据 useMacroTask 条件执⾏ macroTimerFunc 或者是 microTimerFunc ，⽽它们都会在下⼀个 tick 执⾏ flushCallbacks ， flushCallbacks 的逻辑⾮常简单，对 callbacks 遍历，然后执⾏相应的回调函数。

这⾥使⽤ callbacks ⽽不是直接在 nextTick 中执⾏回调函数的原因是保证在同⼀个 tick 内多次执⾏ nextTick ，不会开启多个异步任务，⽽把这些异步任务都压成⼀个同步任务，在下⼀个 tick 执⾏完毕。

nextTick 函数最后还有⼀段逻辑：

```js
if (!cb && typeof Promise !== "undefined") {
  return new Promise((resolve) => {
    _resolve = resolve;
  });
}
```

这是当 nextTick 不传 cb 参数的时候，提供⼀个 Promise 化的调⽤，⽐如：nextTick().then(() => {})当 \_resolve 函数执⾏，就会跳到 then 的逻辑中。next-tick.js 还对外暴露了 withMacroTask 函数，它是对函数做⼀层包装，确保函数执⾏过程中对数据任意的修改，触发变化执⾏ nextTick 的时候强制⾛ macroTimerFunc 。⽐如对于⼀些 DOM 交互事件，如 v-on 绑定的事件回调函数的处理，会强制⾛ macro task。

通过这⼀节对 nextTick 的分析，并结合上⼀节的 setter 分析，我们了解到数据的变化到 DOM 的重新渲染是⼀个异步过程，发⽣在下⼀个 tick。这就是我们平时在开发的过程中，⽐如从服务端接⼝去获取数据的时候，数据做了修改，如果我们的某些⽅法去依赖了数据修改后的 DOM 变化，我们就必须在 nextTick 后执⾏。⽐如下⾯的伪代码：

```js
getData(res).then(() => {
  this.xxx = res.data;
  this.$nextTick(() => {
    // 这⾥我们可以获取变化后的 DOM
  });
});
```

Vue.js 提供了 2 种调⽤ nextTick 的⽅式，⼀种是全局 API Vue.nextTick ，⼀种是实例上的⽅法 vm.\$nextTick ，⽆论我们使⽤哪⼀种，最后都是调⽤ next-tick.js 中实现的 nextTick ⽅法。

### 检测变化的注意事项

通过前⾯⼏节的分析，我们对响应式数据对象以及它的 getter 和 setter 部分做了了解，但是对于⼀些特殊情况是需要注意的，接下来我们就从源码的⾓度来看 Vue 是如何处理这些特殊情况的。

### 对象添加属性

对于使⽤ Object.defineProperty 实现响应式的对象，当我们去给这个对象添加⼀个新的属性的时候，是不能够触发它的 setter 的,但是添加新属性的场景我们在平时开发中会经常遇到，那么 Vue 为了解决这个问题，定义了⼀个全局 API Vue.set ⽅法，它在 src/core/global-api/index.js 中初始化`Vue.set = set`,这个 set ⽅法的定义在 src/core/observer/index.js 中：

set ⽅法接收 3 个参数， target 可能是数组或者是普通对象， key 代表的是数组的下标或者是对象的键值， val 代表添加的值。⾸先判断如果 target 是数组且 key 是⼀个合法的下标，则之前通过 splice 去添加进数组然后返回，这⾥的 splice 其实已经不仅仅是原⽣数组的 splice 了，稍后我会详细介绍数组的逻辑。接着⼜判断 key 已经存在于 target 中，则直接赋值返回，因为这样的变化是可以观测到了。接着再获取到 target.**ob** 并赋值给 ob ，之前分析过它是在 Observer 的构造函数执⾏的时候初始化的，表⽰ Observer 的⼀个实例，如果它不存在，则说明 target 不是⼀个响应式的对象，则直接赋值并返回。最后通过 defineReactive(ob.value, key,val) 把新添加的属性变成响应式对象，然后再通过 ob.dep.notify() ⼿动的触发依赖通知

在 getter 过程中判断了 childOb ，并调⽤了 childOb.dep.depend() 收集了依赖，这就是为什么执⾏ Vue.set 的时候通过 ob.dep.notify() 能够通知到 watcher ，从⽽让添加新的属性到对象也可以检测到变化。这⾥如果 value 是个数组，那么就通过 dependArray 把数组每个元素也去做依赖收集。

### 数组

接着说⼀下数组的情况，Vue 也是不能检测到以下变动的数组：

- 1.当你利⽤索引直接设置⼀个项时，例如： vm.items[indexOfItem] = newValue
- 2.当你修改数组的⻓度时，例如： vm.items.length = newLength

对于第⼀种情况，可以使⽤： Vue.set(example1.items, indexOfItem, newValue) ；⽽对于第⼆种情况，可以使⽤ vm.items.splice(newLength) 。我们刚才也分析到，对于 Vue.set 的实现，当 target 是数组的时候，也是通过 target.splice(key, 1, val) 来添加的，那么这⾥的 splice 到底有什么⿊魔法，能让添加的对象变成响应式的呢。

其实之前我们也分析过，在通过 observe ⽅法去观察对象的时候会实例化 Observer ，在它的构造函数中是专门对数组做了处理，它的定义在 src/core/observer/index.js ,这⾥我们只需要关注 value 是 Array 的情况，⾸先获取 augment ，这⾥的 hasProto 实际上就是判断对象中是否存在 **proto** ，如果存在则 augment 指向 protoAugment ， 否则指向 copyAugment

protoAugment ⽅法是直接把 target.**proto** 原型直接修改为 src ，⽽ copyAugment ⽅法是遍历 keys，通过 def ，也就是 Object.defineProperty 去定义它⾃⾝的属性值。对于⼤部分现代浏览器都会⾛到 protoAugment ，那么它实际上就把 value 的原型指向了,arrayMethods ， arrayMethods 的定义在 src/core/observer/array.js 中：可以看到， arrayMethods ⾸先继承了 Array ，然后对数组中所有能改变数组⾃⾝的⽅法，如 push、pop 等这些⽅法进⾏重写。重写后的⽅法会先执⾏它们本⾝原有的逻辑，并对能增加数组⻓度的 3 个⽅法 push、unshift、splice ⽅法做了判断，获取到插⼊的值，然后把新添加的值变成⼀个响应式对象，并且再调⽤ ob.dep.notify() ⼿动触发依赖通知，这就很好地解释了之前的⽰例中调⽤ vm.items.splice(newLength) ⽅法可以检测到变化

通过这⼀节的分析，我们对响应式对象⼜有了更全⾯的认识，如果在实际⼯作中遇到了这些特殊情况，我们就可以知道如何把它们也变成响应式的对象。其实对于对象属性的删除也会⽤同样的问题，Vue 同样提供了 Vue.del 的全局 API，它的实现和 Vue.set ⼤相径庭，甚⾄还要更简单⼀些，这⾥我就不去分析了，感兴趣的同学可以⾃⾏去了解。

### 计算属性 VS 侦听属性

Vue 的组件对象⽀持了计算属性 computed 和侦听属性 watch 2 个选项，很多同学不了解什么时候该⽤ computed 什么时候该⽤ watch 。先不回答这个问题，我们接下来从源码实现的⾓度来分析它们两者有什么区别。

### computed

计算属性的初始化是发⽣在 Vue 实例初始化阶段的 initState 函数中，执⾏了 if(opts.computed) initComputed(vm, opts.computed) ， initComputed 的定义在 src/core/instance/state.js 中：

函数⾸先创建 vm.\_computedWatchers 为⼀个空对象，接着对 computed 对象做遍历，拿到计算属性的每⼀个 userDef ，然后尝试获取这个 userDef 对应的 getter 函数，拿不到则在开发环境下报警告。接下来为每⼀个 getter 创建⼀个 watcher ，这个 watcher 和渲染 watcher 有⼀点很⼤的不同，它是⼀个 computed watcher ，因为 const computedWatcherOptions = { computed:true } 。 computed watcher 和普通 watcher 的差别我稍后会介绍。最后对判断如果 key 不是 vm 的属性，则调⽤ defineComputed(vm, key, userDef) ，否则判断计算属性对于的 key 是否已经被 data 或者 prop 所占⽤，如果是的话则在开发环境报相应的警告，那么接下来需要重点关注 defineComputed 的实现：

这段逻辑很简单，其实就是利⽤ Object.defineProperty 给计算属性对应的 key 值添加 getter 和 setter，setter 通常是计算属性是⼀个对象，并且拥有 set ⽅法的时候才有，否则是⼀个空函数。在平时的开发场景中，计算属性有 setter 的情况⽐较少，我们重点关注⼀下 getter 部分，缓存的配置也先忽略，最终 getter 对应的是 createComputedGetter(key) 的返回值，来看⼀下它的定义：

```js
function createComputedGetter(key) {
  return function computedGetter() {
    const watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      watcher.depend();
      return watcher.evaluate();
    }
  };
}
```

createComputedGetter 返回⼀个函数 computedGetter ，它就是计算属性对应的 getter。整个计算属性的初始化过程到此结束，我们知道计算属性是⼀个 computed watcher ，它和普通的 watcher 有什么区别呢，为了更加直观，接下来来我们来通过⼀个例⼦来分析 computed watcher 的实现。

当初始化 computed watcher 实例的时候，构造函数部分逻辑稍有不同：

```js
constructor (
vm: Component,
expOrFn: string | Function,
cb: Function,
options?: ?Object,
isRenderWatcher?: boolean
) {
// ...
if (this.computed) {
this.value = undefined
this.dep = new Dep()
} else {
this.value = this.get()
 }
}
```

可以发现 computed watcher 会并不会⽴刻求值，同时持有⼀个 dep 实例。然后当我们的 render 函数执⾏访问到 this.fullName 的时候，就触发了计算属性的 getter ，它会拿到计算属性对应的 watcher ，然后执⾏ watcher.depend() ，来看⼀下它的定义

```js
/**
* Depend on this watcher. Only for computed property watchers.
*/
depend () {
if (this.dep && Dep.target) {
this.dep.depend()
}
}
```

注意，这时候的 Dep.target 是渲染 watcher ，所以 this.dep.depend() 相当于渲染 watcher 订阅了这个 computed watcher 的变化。然后再执⾏ watcher.evaluate() 去求值，来看⼀下它的定义：

```js
/**
* Evaluate and return the value of the watcher.
* This only gets called for computed property watchers.
*/
evaluate () {
if (this.dirty) {
this.value = this.get()
this.dirty = false
}
return this.value
}
```

evaluate 的逻辑⾮常简单，判断 this.dirty ，如果为 true 则通过 this.get() 求值，然后把 this.dirty 设置为 false。在求值过程中，会执⾏ value = this.getter.call(vm, vm) ，这实际上就是执⾏了计算属性定义的 getter 函数，在我们这个例⼦就是执⾏了 returnthis.firstName + ' ' + this.lastName 。

这⾥需要特别注意的是，由于 this.firstName 和 this.lastName 都是响应式对象，这⾥会触发它们的 getter，根据我们之前的分析，它们会把⾃⾝持有的 dep 添加到当前正在计算的 watcher 中，这个时候 Dep.target 就是这个 computed watcher 。最后通过 return this.value 拿到计算属性对应的值。我们知道了计算属性的求值过程，那么接下来看⼀下它依赖的数据变化后的逻辑。

⼀旦我们对计算属性依赖的数据做修改，则会触发 setter 过程，通知所有订阅它变化的 watcher 更新，执⾏ watcher.update() ⽅法：那么对于计算属性这样的 computed watcher ，它实际上是有 2 种模式，lazy 和 active。如果 this.dep.subs.length === 0 成⽴，则说明没有⼈去订阅这个 computed watcher 的变化，仅仅把 this.dirty = true ，只有当下次再访问这个计算属性的时候才会重新求值。在我们的场景下，渲染 watcher 订阅了这个 computed watcher 的变化，那么它会执⾏：getAndInvoke(),getAndInvoke 函数会重新计算，然后对⽐新旧值，如果变化了则执⾏回调函数，那么这⾥这个回调函数是 this.dep.notify() ，在我们这个场景下就是触发了渲染 watcher 重新渲染。

通过以上的分析，我们知道计算属性本质上就是⼀个 computed watcher ，也了解了它的创建过程和被访问触发 getter 以及依赖更新的过程，其实这是最新的计算属性的实现，之所以这么设计是因为 Vue 想确保不仅仅是计算属性依赖的值发⽣变化，⽽是当计算属性最终计算的值发⽣变花才会触发渲染 watcher 重新渲染，本质上是⼀种优化。接下来我们来分析⼀下侦听属性 watch 是怎么实现的。

### watch

侦听属性的初始化也是发⽣在 Vue 的实例初始化阶段的 initState 函数中，在 computed 初始化之后，执⾏了：

```js
if (opts.watch && opts.watch !== nativeWatch) {
  initWatch(vm, opts.watch);
}
```

来看⼀下 initWatch 的实现，它的定义在 src/core/instance/state.js 中：这⾥就是对 watch 对象做遍历，拿到每⼀个 handler ，因为 Vue 是⽀持 watch 的同⼀个 key 对应多个 handler ，所以如果 handler 是⼀个数组，则遍历这个数组，调⽤ createWatcher ⽅法，否则直接调⽤ createWatcher,createWatcher 的逻辑也很简单，⾸先对 hanlder 的类型做判断，拿到它最终的回调函数，最后调⽤ vm.$watch(keyOrFn, handler, options) 函数， $watch 是 Vue 原型上的⽅法，它是在执⾏ stateMixin 的时候定义的

也就是说，侦听属性 watch 最终会调⽤ $watch ⽅法，这个⽅法⾸先判断 cb 如果是⼀个对象，则调⽤ createWatcher ⽅法，这是因为 $watch ⽅法是⽤户可以直接调⽤的，它可以传递⼀个对象，也可以传递函数。接着执⾏ const watcher = new Watcher(vm, expOrFn, cb, options) 实例化了⼀个 watcher ，这⾥需要注意⼀点这是⼀个 user watcher ，因为 options.user = true 。

通过实例化 watcher 的⽅式，⼀旦我们 watch 的数据发送变化，它最终会执⾏ watcher 的 run ⽅法，执⾏回调函数 cb ，并且如果我们设置了 immediate 为 true，则直接会执⾏回调函数 cb 。最后返回了⼀个 unwatchFn ⽅法，它会调⽤ teardown ⽅法去移除这个 watcher 。所以本质上侦听属性也是基于 Watcher 实现的，它是⼀个 user watcher 。其实 Watcher ⽀持了不同的类型，下⾯我们梳理⼀下它有哪些类型以及它们的作⽤。

### Watcher options

Watcher 的构造函数对 options 做的了处理，代码如下：

```js
if (options) {
  this.deep = !!options.deep;
  this.user = !!options.user;
  this.computed = !!options.computed;
  this.sync = !!options.sync;
  // ...
} else {
  this.deep = this.user = this.computed = this.sync = false;
}
```

所以 watcher 总共有 4 种类型，我们来⼀⼀分析它们，看看不同的类型执⾏的逻辑有哪些差别。

#### deep watcher

创建了 deep watcher 时，在 watcher 执⾏ get 求值的过程中有⼀段逻辑：

```js
get() {
let value = this.getter.call(vm, vm)
// ...
if (this.deep) {
traverse(value)
}
}
```

在对 watch 的表达式或者函数求值后，会调⽤ traverse 函数，它的定义在 src/core/observer/traverse.js 中：traverse 的逻辑也很简单，它实际上就是对⼀个对象做深层递归遍历，因为遍历过程中就是对⼀个⼦对象的访问，会触发它们的 getter 过程，这样就可以收集到依赖，也就是订阅它们变化的 watcher ，这个函数实现还有⼀个⼩的优化，遍历过程中会把⼦响应式对象通过它们的 dep id 记录到 seenObjects ，避免以后重复访问,那么在执⾏了 traverse 后，我们再对 watch 的对象内部任何⼀个值做修改，也会调⽤ watcher 的回调函数了。

对 deep watcher 的理解⾮常重要，今后⼯作中如果⼤家观测了⼀个复杂对象，并且会改变对象内部深层某个值的时候也希望触发回调，⼀定要设置 deep 为 true，但是因为设置了 deep 后会执⾏ traverse 函数，会有⼀定的性能开销，所以⼀定要根据应⽤场景权衡是否要开启这个配置。

#### user watcher

前⾯我们分析过，通过 vm.\$watch 创建的 watcher 是⼀个 user watcher ，其实它的功能很简单，在对 watcher 求值以及在执⾏回调函数的时候，会处理⼀下错误,handleError 在 Vue 中是⼀个错误捕获并且暴露给⽤户的⼀个利器。

#### computed watcher

computed watcher ⼏乎就是为计算属性量⾝定制的，我们刚才已经对它做了详细的分析，这⾥不再赘述了。

#### sync watcher

在我们之前对 setter 的分析过程知道，当响应式数据发送变化后，触发了 watcher.update() ，只是把这个 watcher 推送到⼀个队列中，在 nextTick 后才会真正执⾏ watcher 的回调函数。⽽⼀旦我们设置了 sync ，就可以在当前 Tick 中同步执⾏ watcher 的回调函数。只有当我们需要 **watch 的值的变化到执⾏ watcher 的回调函数是⼀个同步过程**的时候才会去设置该属性为 true。

通过这⼀⼩节的分析我们对计算属性和侦听属性的实现有了深⼊的了解，计算属性本质上是 computed watcher ，⽽侦听属性本质上是 user watcher 。就应⽤场景⽽⾔，计算属性适合⽤在模板渲染中，某个值是依赖了其它的响应式对象甚⾄是计算属性计算⽽来；⽽侦听属性适⽤于观测某个值的变化去完成⼀段复杂的业务逻辑。同时我们⼜了解了 watcher 的 4 个 options ，通常我们会在创建 user watcher 的时候配置 deep 和 sync ，可以根据不同的场景做相应的配置。

### 组件更新

在组件化章节，我们介绍了 Vue 的组件化实现过程，不过我们只讲了 Vue 组件的创建过程，并没有涉及到组件数据发⽣变化，更新组件的过程。⽽通过我们这⼀章对数据响应式原理的分析，了解到当数据发⽣变化的时候，会触发渲染 watcher 的回调函数，进⽽执⾏组件的更新过程，接下来我们来详细分析这⼀过程。

组件更新的过程，会执⾏ vm.\$el = vm.**patch**(prevVnode, vnode) ，它仍然会调⽤ patch 函数，在 src/core/vdom/patch.js 中定义,这⾥执⾏ patch 的逻辑和⾸次渲染是不⼀样的，因为 oldVnode 不为空，并且它和 vnode 都是 VNode 类型，接下来会通过 sameVNode(oldVnode, vnode) 判断它们是否是相同的 VNode 来决定⾛不同的更新逻辑,sameVnode 的逻辑⾮常简单，如果两个 vnode 的 key 不相等，则是不同的；否则继续判断对于同步组件，则判断 isComment 、 data 、 input 类型等是否相同，对于异步组件，则判断 asyncFactory 是否相同。所以根据新旧 vnode 是否为 sameVnode ，会⾛到不同的更新逻辑，我们先来说⼀下不同的情况

### 新旧节点不同

如果新旧 vnode 不同，那么更新的逻辑⾮常简单，它本质上是要替换已存在的节点，⼤致分为 3 步:

- 创建新节点
  - 以当前旧节点为参考节点，创建新的节点，并插⼊到 DOM 中， createElm 的逻辑我们之前分析过
- 更新⽗的占位符节点
  - 我们只关注主要逻辑即可，找到当前 vnode 的⽗的占位符节点，先执⾏各个 module 的 destroy 的钩⼦函数，如果当前占位符是⼀个可挂载的节点，则执⾏ module 的 create 钩⼦函数。对于这些钩⼦函数的作⽤，在之后的章节会详细介绍
- 删除旧节点
  - 把 oldVnode 从当前 DOM 树中删除，如果⽗节点存在，则执⾏ removeVnodes ⽅法,删除节点逻辑很简单，就是遍历待删除的 vnodes 做删除，其中 removeAndInvokeRemoveHook 的作⽤是从 DOM 中移除节点并执⾏ module 的 remove 钩⼦函数，并对它的⼦节点递归调⽤ removeAndInvokeRemoveHook 函数； invokeDestroyHook 是执⾏ module 的 destory 钩⼦函数以及 vnode 的 destory 钩⼦函数，并对它的⼦ vnode 递归调⽤ invokeDestroyHook 函数； removeNode 就是调⽤平台的 DOM API 去把真正的 DOM 节点移除

在之前介绍组件⽣命周期的时候提到 beforeDestroy & destroyed 这两个⽣命周期钩⼦函数，它们就是在执⾏ invokeDestroyHook 过程中，执⾏了 vnode 的 destory 钩⼦函数，它的定义在 src/core/vdom/create-component.js 中,当组件并不是 keepAlive 的时候，会执⾏ componentInstance.\$destroy() ⽅法，然后就会执⾏ beforeDestroy & destroyed 两个钩⼦函数。

### 新旧节点相同

对于新旧节点不同的情况，这种创建新节点 -> 更新占位符节点 -> 删除旧节点的逻辑是很容易理解的。还有⼀种组件 vnode 的更新情况是新旧节点相同，它会调⽤ patchVNode ⽅法，它的定义在 src/core/vdom/patch.js 中,patchVnode 的作⽤就是把新的 vnode patch 到旧的 vnode 上，这⾥我们只关注关键的核⼼逻辑，我把它拆成四步骤：

- 执⾏ prepatch 钩⼦函数
  - 当更新的 vnode 是⼀个组件 vnode 的时候，会执⾏ prepatch 的⽅法，它的定义在 src/core/vdom/create-component.js 中,prepatch ⽅法就是拿到新的 vnode 的组件配置以及组件实例，去执⾏ updateChildComponent ⽅法，它的定义在 src/core/instance/lifecycle.js 中,updateChildComponent 的逻辑也⾮常简单，由于更新了 vnode ，那么 vnode 对应的实例 vm 的⼀系列属性也会发⽣变化，包括占位符 vm.\$vnode 的更新、 slot 的更新， listeners 的更新， props 的更新等等
- 执⾏ update 钩⼦函数
  - 回到 patchVNode 函数，在执⾏完新的 vnode 的 prepatch 钩⼦函数，会执⾏所有 module 的 update 钩⼦函数以及⽤户⾃定义 update 钩⼦函数，对于 module 的钩⼦函数，之后之后针对⼀些具体的 case 分析
- 完成 patch 过程
  - 如果 vnode 是个⽂本节点且新旧⽂本不相同，则直接替换⽂本内容。如果不是⽂本节点，则判断它们的⼦节点，并分了⼏种情况处理：
    - oldCh 与 ch 都存在且不相时，使⽤ updateChildren 函数来更新⼦节点，这个后⾯重点讲。
    - 如果只有 ch 存在，表⽰旧节点不需要了。如果旧的节点是⽂本节点则先将节点的⽂本清除，然后通过 addVnodes 将 ch 批量插⼊到新节点 elm 下
    - 如果只有 oldCh 存在，表⽰更新的是空节点，则需要将旧的节点通过 removeVnodes 全部清除
    - 当只有旧节点是⽂本节点的时候，则清除其节点⽂本内容
- 执⾏ postpatch 钩⼦函数
  - 再执⾏完 patch 过程后，会执⾏ postpatch 钩⼦函数，它是组件⾃定义的钩⼦函数，有则执⾏。那么在整个 pathVnode 过程中，最复杂的就是 updateChildren ⽅法了

组件更新的过程核⼼就是新旧 vnode diff，对新旧节点相同以及不同的情况分别做不同的处理。新旧节点不同的更新流程是创建新节点->更新⽗占位符节点->删除旧节点；⽽新旧节点相同的更新流程是去获取它们的 children，根据不同情况做不同的更新逻辑。最复杂的情况是新旧节点相同且它们都存在⼦节，点，那么会执⾏ updateChildren 逻辑，这块⼉可以借助画图的⽅式配合理解。

![](../../.vuepress/public/img/img.png)

## 编译

之前我们分析过模板到真实 DOM 渲染的过程，中间有⼀个环节是把模板编译成 render 函数，这个过程我们把它称作编译。虽然我们可以直接为组件编写 render 函数，但是编写 template 模板更加直观，也更符合我们的开发习惯。

Vue.js 提供了 2 个版本，⼀个是 Runtime + Compiler 的，⼀个是 Runtime only 的，前者是包含编译代码的，可以把编译过程放在运⾏时做，后者是不包含编译代码的，需要借助 webpack 的 vue-loader 事先把模板编译成 render 函数。这⼀章我们就来分析编译的过程，对编译过程的了解会让我们对 Vue 的指令、内置组件等有更好的理解。不过由于编译的过程是⼀个相对复杂的过程，我们只要求理解整体的流程、输⼊和输出即可，对于细节我们不必抠太细。有些细节⽐如对于 slot 的处理我们可以在之后去分析插槽实现的时候再详细分析。

### 编译⼊⼝

当我们使⽤ Runtime + Compiler 的 Vue.js，它的⼊⼝是 src/platforms/web/entry-runtime-with-compiler.js ，看⼀下它对 \$mount 函数的定义，这段函数逻辑之前分析过，关于编译的⼊⼝就是在这⾥：

```js
const { render, staticRenderFns } = compileToFunctions(
  template,
  {
    shouldDecodeNewlines,
    shouldDecodeNewlinesForHref,
    delimiters: options.delimiters,
    comments: options.comments,
  },
  this
);
options.render = render;
options.staticRenderFns = staticRenderFns;
```

compileToFunctions ⽅法就是把模板 template 编译⽣成 render 以及 staticRenderFns ，它的定义在 src/platforms/web/compiler/index.js 中：可以看到 compileToFunctions ⽅法实际上是 createCompiler ⽅法的返回值，该⽅法接收⼀个编译配置参数，接下来我们来看⼀下 createCompiler ⽅法的定义，在 src/compiler/index.js 中：createCompiler ⽅法实际上是通过调⽤ createCompilerCreator ⽅法返回的，该⽅法传⼊的参数是⼀个函数，**真正的编译过程都在这个 baseCompile 函数⾥执⾏**，那么 createCompilerCreator ⼜是什么呢，它的定义在 src/compiler/create-compiler.js 中：可以看到该⽅法返回了⼀个 createCompiler 的函数，它接收⼀个 baseOptions 的参数，返回的是⼀个对象，包括 compile ⽅法属性和 compileToFunctions 属性，这个 compileToFunctions 对应的就是 \$mount 函数调⽤的 compileToFunctions ⽅法，它是调⽤ createCompileToFunctionFn ⽅法的返回值，我们接下来看⼀下 createCompileToFunctionFn ⽅法，它的定义在 src/compiler/to-function/js 中：⾄此我们总算找到了 compileToFunctions 的最终定义，它接收 3 个参数、编译模板 template ，编译配置 options 和 Vue 实例 vm 。核⼼的编译过程就⼀⾏代码：`const compiled = compile(template, options)`,compile 函数执⾏的逻辑是先处理配置参数，真正执⾏编译过程就⼀⾏代码：`const compiled = baseCompile(template, finalOptions)`,**baseCompile 在执⾏ createCompilerCreator ⽅法时作为参数传⼊**,所以编译的⼊⼝我们终于找到了，它主要就是执⾏了如下⼏个逻辑：解析模板字符串⽣成 AST:`const ast = parse(template.trim(), options)`,优化语法树:`optimize(ast, options)`,⽣成代码:`const code = generate(ast, options)`,那么接下来的章节我会带⼤家去逐步分析这⼏个过程。

编译⼊⼝逻辑之所以这么绕，是因为 Vue.js 在不同的平台下都会有编译的过程，因此编译过程中的依赖的配置 baseOptions 会有所不同。⽽编译过程会多次执⾏，但这同⼀个平台下每⼀次的编译过程配置⼜是相同的，为了不让这些配置在每次编译过程都通过参数传⼊，Vue.js 利⽤了函数柯⾥化的技巧很好的实现了 baseOptions 的参数保留。同样，Vue.js 也是利⽤函数柯⾥化技巧把基础的编译过程函数抽出来，通过 createCompilerCreator(baseCompile) 的⽅式把真正编译的过程和其它逻辑如对编译配置处理、缓存处理等剥离开，这样的设计还是⾮常巧妙的。

### parse

编译过程⾸先就是对模板做解析，⽣成 AST，它是⼀种抽象语法树，是对源代码的抽象语法结构的树状表现形式。在很多编译技术中，如 babel 编译 ES6 的代码都会先⽣成 AST。这个过程是⽐较复杂的，它会⽤到⼤量正则表达式对字符串解析，如果对正则不是很了解，建议先去补习正则表达式的知识,⽣成的 AST 是⼀个树状结构，每⼀个节点都是⼀个 ast element ，除了它⾃⾝的⼀些属性，还维护了它的⽗⼦关系，如 parent 指向它的⽗节点， children 指向它的所有⼦节点。先对 AST 有⼀些直观的印象，那么接下来我们来分析⼀下这个 AST 是如何得到的。

### 整体流程

⾸先来看⼀下 parse 的定义，在 src/compiler/parser/index.js 中:

```js
export function parse(
  template: string,
  options: CompilerOptions
): ASTElement | void {
  getFnsAndConfigFromOptions(options);
  parseHTML(template, {
    // options ...
    start(tag, attrs, unary) {
      let element = createASTElement(tag, attrs);
      processElement(element);
      treeManagement();
    },
    end() {
      treeManagement();
      closeElement();
    },
    chars(text: string) {
      parse;
      182;
      handleText();
      createChildrenASTOfText();
    },
    comment(text: string) {
      createChildrenASTOfComment();
    },
  });
  return astRootElement;
}
```

parse 函数的代码很⻓，贴⼀遍对理解没有好处，我先把它拆成伪代码的形式，⽅便对整体流程先有⼀个⼤致的了解。接下来我们就来分解分析每段伪代码的作⽤

### 从 options 中获取⽅法和配置

`getFnsAndConfigFromOptions(options)`

parse 函数的输⼊是 template 和 options ，输出是 AST 的根节点。 template 就是我们的模板字符串，⽽ options 实际上是和平台相关的⼀些配置，它的定义在 src/platforms/web/compiler/options 中,这些属性和⽅法之所以放到 platforms ⽬录下是因为它们在不同的平台（web 和 weex）的实现是不同的

### 解析 HTML 模板

`parseHTML(template, options)`

对于 template 模板的解析主要是通过 parseHTML 函数，它的定义在 src/compiler/parser/html-parser 中,由于 parseHTML 的逻辑也⾮常复杂,整体来说它的逻辑就是循环解析 template ，⽤正则做各种匹配，对于不同情况分别进⾏不同的处理，直到整个 template 被解析完毕。 在匹配的过程中会利⽤ advance 函数不断前进整个模板字符串，直到字符串末尾。匹配的过程中主要利⽤了正则表达式,通过这些正则表达式，我们可以匹配注释节点、⽂档类型节点、开始闭合标签等。

#### 注释节点、⽂档类型节点

对于注释节点和⽂档类型节点的匹配，如果匹配到我们仅仅做的是做前进即可,对于注释和条件注释节点，前进⾄它们的末尾位置；对于⽂档类型节点，则前进它⾃⾝⻓度的距离。

#### 开始标签

对于开始标签，除了标签名之外，还有⼀些标签相关的属性。函数先通过正则表达式 startTagOpen 匹配到开始标签，然后定义了 match 对象，接着循环去匹配开始标签中的属性并添加到 match.attrs 中，直到匹配的开始标签的闭合符结束。如果匹配到闭合符，则获取⼀元斜线符，前进到闭合符尾，并把当前索引赋值给 match.end 。parseStartTag 对开始标签解析拿到 match 后，紧接着会执⾏ handleStartTag 对 match 做处理,handleStartTag 的核⼼逻辑很简单，先判断开始标签是否是⼀元标签，类似 `<img>、<br/>` 这样，接着对 match.attrs 遍历并做了⼀些处理，最后判断如果⾮⼀元标签，则往 stack ⾥ push ⼀个对象，并且把 tagName 赋值给 lastTag 。⾄于 stack 的作⽤，稍后我会介绍。最后调⽤了 options.start 回调函数，并传⼊⼀些参数，这个回调函数的作⽤稍后我会详细介绍

#### 闭合标签

先通过正则 endTag 匹配到闭合标签，然后前进到闭合标签末尾，然后执⾏ parseEndTag ⽅法对闭合标签做解析。parseEndTag 的核⼼逻辑很简单，在介绍之前我们回顾⼀下在执⾏ handleStartTag 的时候，对于⾮⼀元标签（有 endTag）我们都把它构造成⼀个对象压⼊到 stack 中,那么对于闭合标签的解析，就是倒序 stack ，找到第⼀个和当前 endTag 匹配的元素。如果是正常的标签匹配，那么 stack 的最后⼀个元素应该和当前的 endTag 匹配，但是考虑到如下错误情况`<div><span></div>`,这个时候当 endTag 为`</div>`的时候，从 stack 尾部找到的标签是 `<span>` ，就不能匹配，因此这种情况会报警告。匹配后把栈到 pos 位置的都弹出，并从 stack 尾部拿到 lastTag 。最后调⽤了 options.end 回调函数，并传⼊⼀些参数，这个回调函数的作⽤稍后我会详细介绍。

#### ⽂本

接下来判断 textEnd 是否⼤于等于 0 的，满⾜则说明到从当前位置到 textEnd 位置都是⽂本，并且如果 < 是纯⽂本中的字符，就继续找到真正的⽂本结束的位置，然后前进到结束的位置。再继续判断 textEnd ⼩于 0 的情况，则说明整个 template 解析完毕了，把剩余的 html 都赋值给了 text 。最后调⽤了 options.chars 回调函数，并传 text 参数，这个回调函数的作⽤稍后我会详细介绍。因此，在循环解析整个 template 的过程中，会根据不同的情况，去执⾏不同的回调函数，下⾯我们来看看这些回调函数的作⽤。

### 处理开始标签

```js
start (tag, attrs, unary) {
let element = createASTElement(tag, attrs)
processElement(element)
treeManagement()
}
```

当解析到开始标签的时候，最后会执⾏ start 回调函数，函数主要就做 3 件事情，创建 AST 元素，处理 AST 元素，AST 树管理。下⾯我们来分别来看这⼏个过程。

#### 创建 AST 元素

通过 createASTElement ⽅法去创建⼀个 AST 元素，并添加了 namespace。可以看到，每⼀个 AST 元素就是⼀个普通的 JavaScript 对象，其中， type 表⽰ AST 元素类型， tag 表⽰标签名， attrsList 表⽰属性列表， attrsMap 表⽰属性映射表， parent 表⽰⽗的 AST 元素， children 表⽰⼦ AST 元素集合。

#### 处理 AST 元素

⾸先是对模块 preTransforms 的调⽤，其实所有模块的 preTransforms 、 transforms 和 postTransforms 的定义都在 src/platforms/web/compiler/modules ⽬录中，这部分我们暂时不会介绍，之后会结合具体的例⼦说。接着判断 element 是否包含各种指令通过 processXXX 做相应的处理，处理的结果就是扩展 AST 元素的属性。这⾥我并不会⼀⼀介绍所有的指令处理，⽽是结合我们当前的例⼦，我们来看⼀下 processFor 和 processIf

processFor 就是从元素中拿到 v-for 指令的内容，然后分别解析出 for 、 alias 、 iterator1 、 iterator2 等属性的值添加到 AST 的元素上。就我们的⽰例 v-for="(item,index) in data" ⽽⾔，解析出的的 for 是 data ， alias 是 item ， iterator1 是 index ，没有 iterator2 。

processIf 就是从元素中拿 v-if 指令的内容，如果拿到则给 AST 元素添加 if 属性和 ifConditions 属性；否则尝试拿 v-else 指令及 v-else-if 指令的内容，如果拿到则给 AST 元素分别添加 else 和 elseif 属性。

#### AST 树管理

我们在处理开始标签的时候为每⼀个标签创建了⼀个 AST 元素，在不断解析模板创建 AST 元素的时候，我们也要为它们建⽴⽗⼦关系，就像 DOM 元素的⽗⼦关系那样。

AST 树管理的⽬标是构建⼀颗 AST 树，本质上它要维护 root 根节点和当前⽗节点 currentParent 。为了保证元素可以正确闭合，这⾥也利⽤了 stack 栈的数据结构，和我们之前解析模板时⽤到的 stack 类似。

当我们在处理开始标签的时候，判断如果有 currentParent ，会把当前 AST 元素 push 到 currentParent.chilldren 中，同时把 AST 元素的 parent 指向 currentParent 。接着就是更新 currentParent 和 stack ，判断当前如果不是⼀个⼀元标签，我们要把它⽣成的 AST 元素 push 到 stack 中，并且把当前的 AST 元素赋值给 currentParent 。stack 和 currentParent 除了在处理开始标签的时候会变化，在处理闭合标签的时候也会变化，因此整个 AST 树管理要结合闭合标签的处理逻辑看。

### 处理闭合标签

```js
end () {
  treeManagement()
  closeElement()
}
```

当解析到闭合标签的时候，最后会执⾏ end 回调函数：⾸先处理了尾部空格的情况，然后把 stack 的元素弹⼀个出栈，并把 stack 最后⼀个元素赋值给 currentParent ，这样就保证了当遇到闭合标签的时候，可以正确地更新 stack 的⻓度以及 currentParent 的值，这样就维护了整个 AST 树。

最后执⾏了 closeElement(elment) closeElement 逻辑很简单，就是更新⼀下 inVPre 和 inPre 的状态，以及执⾏ postTransforms 函数，这些我们暂时都不必了解。

### 处理⽂本内容

```js
chars (text: string) {
  handleText()
  createChildrenASTOfText()
}
```

除了处理开始标签和闭合标签，我们还会在解析模板的过程中去处理⼀些⽂本内容：⽂本构造的 AST 元素有 2 种类型，⼀种是有表达式的， type 为 2，⼀种是纯⽂本， type 为 3。在我们的例⼦中，⽂本就是 {{item}}:{{index}} ，是个表达式，通过执⾏ parseText(text,delimiters) 对⽂本解析，它的定义在 src/compiler/parser/text-parsre.js 中

parseText ⾸先根据分隔符（默认是 {{}} ）构造了⽂本匹配的正则表达式，然后再循环匹配⽂本，遇到普通⽂本就 push 到 rawTokens 和 tokens 中，如果是表达式就转换成 \_s(\${exp}) push 到 tokens 中，以及转换成 {@binding:exp} push 到 rawTokens 中。

对于我们的例⼦ `{{item}}:{{index}}` ， tokens 就是`[_s(item),'":"',_s(index)] `； rawTokens 就是 `[{'@binding':'item'},':',{'@binding':'index'}]` 。那么返回的对象如下:

```js
return {
  expression: '_s(item)+":"+_s(index)',
  tokens: [{ "@binding": "item" }, ":", { "@binding": "index" }],
};
```

![](../../.vuepress/public/img/compile.png)

那么⾄此， parse 的过程就分析完了，看似复杂，但我们可以抛开细节理清它的整体流程。 parse 的⽬标是把 template 模板字符串转换成 AST 树，它是⼀种⽤ JavaScript 对象的形式来描述整个模板。那么整个 parse 的过程是利⽤正则表达式顺序解析模板，当解析到开始标签、闭合标签、⽂本的时候都会分别执⾏对应的回调函数，来达到构造 AST 树的⽬的。AST 元素节点总共有 3 种类型， type 为 1 表⽰是普通元素，为 2 表⽰是表达式，为 3 表⽰是纯⽂本。其实这⾥我觉得源码写的不够友好，这种是典型的魔术数字，如果转换成⽤常量表达会更利于源码阅读。当 AST 树构造完毕，下⼀步就是 optimize 优化这颗树。

### optimize

当我们的模板 template 经过 parse 过程后，会输出⽣成 AST 树，那么接下来我们需要对这颗树做优化， optimize 的逻辑是远简单于 parse 的逻辑，所以理解起来会轻松很多。为什么要有优化过程，因为我们知道 Vue 是数据驱动，是响应式的，但是我们的模板并不是所有数据都是响应式的，也有很多数据是⾸次渲染后就永远不会变化的，那么这部分数据⽣成的 DOM 也不会变化，我们可以在 patch 的过程跳过对他们的⽐对。来看⼀下 optimize ⽅法的定义，在 src/compiler/optimizer.js 中,我们在编译阶段可以把⼀些 AST 节点优化成静态节点，所以整个 optimize 的过程实际上就⼲ 2 件事情， markStatic(root) 标记静态节点 ， markStaticRoots(root, false) 标记静态根。

### 标记静态节点

⾸先执⾏ node.static = isStatic(node), isStatic 是对⼀个 AST 元素节点是否是静态的判断，如果是表达式，就是⾮静态；如果是纯⽂本，就是静态；对于⼀个普通元素，如果有 pre 属性，那么它使⽤了 v-pre 指令，是静态，否则要同时满⾜以下条件：没有使⽤ v-if 、 v-for ，没有使⽤其它指令（不包括 v-once ），⾮内置组件，是平台保留的标签，⾮带有 v-for 的 template 标签的直接⼦节点，节点的所有属性的 key 都满⾜静态 key；这些都满⾜则这个 AST 节点是⼀个静态节点。

如果这个节点是⼀个普通元素，则遍历它的所有 children ，递归执⾏ markStatic 。因为所有的 elseif 和 else 节点都不在 children 中， 如果节点的 ifConditions 不为空，则遍历 ifConditions 拿到所有条件中的 block ，也就是它们对应的 AST 节点，递归执⾏ markStatic 。在这些递归过程中，⼀旦⼦节点有不是 static 的情况，则它的⽗节点的 static 均变成 false。

### 标记静态根

markStaticRoots 第⼆个参数是 isInFor ，对于已经是 static 的节点或者是 v-once 指令的节点， node.staticInFor = isInFor 。 接着就是对于 staticRoot 的判断逻辑，从注释中我们可以看到，对于有资格成为 staticRoot 的节点，除了本⾝是⼀个静态节点外，必须满⾜拥有 children ，并且 children 不能只是⼀个⽂本节点，不然的话把它标记成静态根节点的收益就很⼩了。接下来和标记静态节点的逻辑⼀样，遍历 children 以及 ifConditions ，递归执⾏ markStaticRoots 。

回归我们之前的例⼦，经过 optimize 后,每⼀个 AST 元素节点都多了 staic 属性，并且 type 为 1 的普通元素 AST 节点多了 staticRoot 属性。

那么⾄此我们分析完了 optimize 的过程，就是深度遍历这个 AST 树，去检测它的每⼀颗⼦树是不是静态节点，如果是静态节点则它们⽣成 DOM 永远不需要改变，这对运⾏时对模板的更新起到极⼤的优化作⽤。

我们通过 optimize 我们把整个 AST 树中的每⼀个 AST 元素节点标记了 static 和 staticRoot ，它会影响我们接下来执⾏代码⽣成的过程。

### codegen

编译的最后⼀步就是把优化后的 AST 树转换成可执⾏的代码，这部分内容也⽐较多，我并不打算把所有的细节都讲了，了解整体流程即可。部分细节我们会在之后的章节配合⼀个具体 case 去详细讲。

```html
<ul :class="bindCls" class="list" v-if="isShow">
  <li v-for="(item,index) in data" @click="clickItem(index)">
    {{item}}:{{index}}
  </li>
</ul>
```

它经过编译，执⾏ const code = generate(ast, options) ，⽣成的 render 代码串如下：

```js
with (this) {
  return isShow
    ? _c(
        "ul",
        {
          staticClass: "list",
          class: bindCls,
        },
        _l(data, function (item, index) {
          return _c(
            "li",
            {
              on: {
                click: function ($event) {
                  clickItem(index);
                },
              },
            },
            [_v(_s(item) + ":" + _s(index))]
          );
        })
      )
    : _e();
}
```

这⾥的 \_c 函数定义在 src/core/instance/render.js 中。`vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)`⽽ \_l 、 \_v 定义在 src/core/instance/render-helpers/index.js 中,顾名思义， \_c 就是执⾏ createElement 去创建 VNode，⽽ \_l 对应 renderList 渲染列表； \_v 对应 createTextVNode 创建⽂本 VNode； \_e 对于 createEmptyVNode 创建空的 VNode。

在 compileToFunctions 中，会把这个 render 代码串转换成函数，它的定义在 src/compler/to-function.js 中,实际上就是把 render 代码串通过 new Function 的⽅式转换成可执⾏的函数，赋值给 vm.options.render ，这样当组件通过 vm.\_render 的时候，就会执⾏这个 render 函数。那么接下来我们就重点关注⼀下这个 render 代码串的⽣成过程。

### generate

`const code = generate(ast, options)`

generate 函数的定义在 src/compiler/codegen/index.js 中,generate 函数⾸先通过 genElement(ast, state) ⽣成 code ，再把 code ⽤ with(this){return \${code}}} 包裹起来。这⾥的 state 是 CodegenState 的⼀个实例，稍后我们在⽤到它的时候会介绍它。先来看⼀下 genElement,基本就是判断当前 AST 元素节点的属性执⾏不同的代码⽣成函数，在我们的例⼦中，我们先了解⼀下 genFor 和 genIf

### genIf

genIf 主要是通过执⾏ genIfConditions ，它是依次从 conditions 获取第⼀个 condition ，然后通过对 condition.exp 去⽣成⼀段三元运算符的代码， : 后是递归调⽤ genIfConditions ，这样如果有多个 conditions ，就⽣成多层三元运算逻辑。这⾥我们暂时不考虑 v-once 的情况，所以 genTernaryExp 最终是调⽤了 genElement ,在我们的例⼦中，只有⼀个 condition ， exp 为 isShow ，因此⽣成如下伪代码：

`return (isShow) ? genElement(el, state) : _e()`

### genFor

genFor 的逻辑很简单，⾸先 AST 元素节点中获取了和 for 相关的⼀些属性，然后返回了⼀个代码字符串。在我们的例⼦中， exp 是 data ， alias 是 item ， iterator1 ，因此⽣成如下伪代码：

```js
_l(data, function (item, index) {
  return genElememt(el, state);
});
```

### genData & genChildren

再次回顾我们的例⼦，它的最外层是 ul ，⾸先执⾏ genIf ，它最终调⽤了 genElement(el,state) 去⽣成⼦节点，注意，这⾥的 el 仍然指向的是 ul 对应的 AST 节点，但是此时的 el.ifProcessed 为 true，所以命中最后⼀个 else 逻辑,这⾥我们只关注 2 个逻辑， genData 和 genChildren

genData 函数就是根据 AST 元素节点的属性构造出⼀个 data 对象字符串，这个在后⾯创建 VNode 的时候的时候会作为参数传⼊,之前我们提到了 CodegenState 的实例 state ，这⾥有⼀段关于 state 的逻辑:

```js
for (let i = 0; i < state.dataGenFns.length; i++) {
  data += state.dataGenFns[i](el);
}
```

state.dataGenFns 的初始化在它的构造器中,实际上就是获取所有 modules 中的 genData 函数，其中， class module 和 style module 定义了 genData 函数。⽐如定义在 src/platforms/web/compiler/modules/class.js 中的 genData ⽅法,在我们的例⼦中， ul AST 元素节点定义了 el.staticClass 和 el.classBinding ，因此最终⽣成的 data 字符串如下：

```js
{
staticClass: "list",
class: bindCls
}
```

接下来我们再来看⼀下 genChildren ，它的定义在 src/compiler/codegen/index.js 中,在我们的例⼦中， li AST 元素节点是 ul AST 元素节点的 children 之⼀，满⾜`(children.length === 1 && el.for && el.tag !== 'template' && el.tag !== 'slot')` 条件，因此通过 genElement(el, state) ⽣成 li AST 元素节点的代码，也就回到了我们之前调⽤ genFor ⽣成的代码，把它们拼在⼀起⽣成的伪代码如下:

```js
return (isShow) ?
_c('ul', {
staticClass: "list",
class: bindCls
codegen
214
 },
_l((data), function(item, index) {
return genElememt(el, state)
})
) : _e()
```

在我们的例⼦中，在执⾏ genElememt(el, state) 的时候， el 还是 li AST 元素节点， el.forProcessed 已为 true，所以会继续执⾏ genData 和 genChildren 的逻辑。由于 el.events 不为空，在执⾏ genData 的时候，会执⾏ 如下逻辑：

```js
if (el.events) {
  data += `${genHandlers(el.events, false, state.warn)},`;
}
```

genHandlers 的定义在 src/compiler/codegen/events.js 中,genHandler 的逻辑就不介绍了，很⼤部分都是对修饰符 modifier 的处理，对于我们的例⼦，它最终 genData ⽣成的 data 字符串如下

```js
{
on: {
"click": function($event) {
clickItem(index)
}
}
}
```

genChildren 的就是遍历 children ，然后执⾏ genNode ⽅法，根据不同的 type 执⾏具体的⽅法。在我们的例⼦中， li AST 元素节点的 children 是 type 为 2 的表达式 AST 元素节点，那么会执⾏到 genText(node) 逻辑,因此在我们的例⼦中， genChildren ⽣成的代码串如下

```js
[_v(_s(item) + ":" + _s(index))];
```

和之前拼在⼀起，最终⽣成的 code 如下：

```js
return isShow
  ? _c(
      "ul",
      {
        staticClass: "list",
        class: bindCls,
      },
      _l(data, function (item, index) {
        return _c(
          "li",
          {
            on: {
              click: function ($event) {
                clickItem(index);
                codegen;
                216;
              },
            },
          },
          [_v(_s(item) + ":" + _s(index))]
        );
      })
    )
  : _e();
```

这⼀节通过例⼦配合解析，我们对从 ast -> code 这⼀步有了⼀些了解，编译后⽣成的代码就是在运⾏时执⾏的代码。由于 genCode 的内容有很多，所以我对⼤家的建议是没必要把所有的细节都⼀次性看完，我们应该根据具体⼀个 case，⾛完⼀条主线即可,针对具体问题做具体分析，有利于我们排除⼲扰，对编译过程的学习有更深⼊的理解

## 扩展

前⾯我们分析了 Vue 的核⼼以及编译过程，除此之外，Vue 还提供了很多好⽤的 feature 如 event 、 v-model 、 slot 、 keep-alive 、 transition 等等。对他们的理解有助于我们在平时开发中更好地应⽤这些 feature，即使出现 bug 我们也可以很从容地应对

### event

我们平时开发⼯作中，处理组件间的通讯，原⽣的交互，都离不开事件。对于⼀个组件元素，我们不仅仅可以绑定原⽣的 DOM 事件，还可以绑定⾃定义事件，⾮常灵活和⽅便。那么接下来我们从源码⾓度来看看它的实现原理

```js
let Child = {
  template: '<button @click="clickHandler($event)">' + "click me" + "</button>",
  methods: {
    clickHandler(e) {
      console.log("Button clicked!", e);
      this.$emit("select");
    },
  },
};
let vm = new Vue({
  el: "#app",
  template:
    "<div>" +
    '<child @select="selectHandler" @click.native.prevent="clickHandler"></child>' +
    "</div>",
  methods: {
    clickHandler() {
      console.log("Child clicked!");
    },
    selectHandler() {
      console.log("Child select!");
    },
  },
  components: {
    Child,
  },
});
```

### 编译

先从编译阶段开始看起，在 parse 阶段，会执⾏ processAttrs ⽅法，它的定义在 src/compiler/parser/index.js 中,在对标签属性的处理过程中，判断如果是指令，⾸先通过 parseModifiers 解析出修饰符，然后判断如果事件的指令，则执⾏ addHaddHandler(el, name, value, modifiers, false, warn) ⽅法，它的定义在 src/compiler/helpers.js 中

addHandler 函数看起来⻓，实际上就做了 3 件事情，⾸先根据 modifier 修饰符对事件名 name 做处理，接着根据 modifier.native 判断是⼀个纯原⽣事件还是普通事件，分别对应 el.nativeEvents 和 el.events ，最后按照 name 对事件做归类，并把回调函数的字符串保留到对应的事件中。,在我们的例⼦中，⽗组件的 child 节点⽣成的 el.events 和 el.nativeEvents 如下:

```js
el.events = {
  select: {
    value: "selectHandler",
  },
};
el.nativeEvents = {
  click: {
    value: "clickHandler",
    modifiers: {
      prevent: true,
    },
  },
};
```

⼦组件的 button 节点⽣成的 el.events 如下:

```js
el.events = {
  click: {
    value: "clickHandler($event)",
  },
};
```

然后在 codegen 的阶段，会在 genData 函数中根据 AST 元素节点上的 events 和 nativeEvents ⽣成 data 数据，它的定义在 src/compiler/codegen/index.js 中,对于这两个属性，会调⽤ genHandlers 函数，定义在 src/compiler/codegen/events.js 中

genHandlers ⽅法遍历事件对象 events ，对同⼀个事件名称的事件调⽤ genHandler(name,events[name]) ⽅法，它的内容看起来多，但实际上逻辑很单，⾸先先判断如果 handler 是⼀个数组，就遍历它然后递归调⽤ genHandler ⽅法并拼接结果，然后判断 hanlder.value 是⼀个函数的调⽤路径还是⼀个函数表达式， 接着对 modifiers 做判断，对于没有 modifiers 的情况，就根据 handler.value 不同情况处理，要么直接返回，要么返回⼀个函数包裹的表达式；对于有 modifiers 的情况，则对各种不同的 modifer 情况做不同处理，添加相应的代码串,那么对于我们的例⼦⽽⾔，⽗组件⽣成的 data 串为

```js
{
  on: {"select": selectHandler},
    nativeOn: {"click": function($event) {
      $event.preventDefault();
      return clickHandler($event)
    }
  }
}
```

⼦组件⽣成的 data 串为：

```js
{
    on: {"click": function($event) {
       clickHandler($event)
    }
  }
}
```

那么到这⾥，编译部分完了，接下来我们来看⼀下运⾏时部分是如何实现的。其实 Vue 的事件有 2 种，⼀种是原⽣ DOM 事件，⼀种是⽤户⾃定义事件，我们分别来看

### DOM 事件

还记得我们之前在 patch 的时候执⾏各种 module 的钩⼦函数吗，当时这部分是略过的，我们之前只分析了 DOM 是如何渲染的，⽽ DOM 元素相关的属性、样式、事件等都是通过这些 module 的钩⼦函数完成设置的。所有和 web 相关的 module 都定义在 src/platforms/web/runtime/modules ⽬录下，我们这次只关注⽬录下的 events.js 即可,在 patch 过程中的创建阶段和更新阶段都会执⾏ updateDOMListeners ,⾸先获取 vnode.data.on ，这就是我们之前的⽣成的 data 中对应的事件对象， target 是当前 vnode 对于的 DOM 对象， normalizeEvents 主要是对 v-model 相关的处理，我们之后分析 v-model 的时候会介绍，接着调⽤ updateListeners(on, oldOn, add, remove, vnode.context) ⽅法，它的定义在 src/core/vdom/helpers/update-listeners.js 中

updateListeners 的逻辑很简单，遍历 on 去添加事件监听，遍历 oldOn 去移除事件监听，关于监听和移除事件的⽅法都是外部传⼊的，因为它既处理原⽣ DOM 事件的添加删除，也处理⾃定义事件的添加删除,对于 on 的遍历，⾸先获得每⼀个事件名，然后做 normalizeEvent 的处理,根据我们的的事件名的⼀些特殊标识（之前在 addHandler 的时候添加上的）区分出这个事件是否有 once 、 capture 、 passive 等修饰符,处理完事件名后，⼜对事件回调函数做处理，对于第⼀次，满⾜ isUndef(old) 并且 isUndef(cur.fns) ，会执⾏` cur = on[name] = createFnInvoker(cur)` ⽅法去创建⼀个回调函数，然后在执⾏ add(event.name, cur, event.once, event.capture, event.passive,event.params) 完成⼀次事件绑定。我们先看⼀下 createFnInvoker 的实现

这⾥定义了 invoker ⽅法并返回，由于⼀个事件可能会对应多个回调函数，所以这⾥做了数组的判断，多个回调函数就依次调⽤。注意最后的赋值逻辑， invoker.fns = fns ，每⼀次执⾏ invoker 函数都是从 invoker.fns ⾥取执⾏的回调函数，回到 updateListeners ，当我们第⼆次执⾏该函数的时候，判断如果 cur !== old ，那么只需要更改 old.fns = cur 把之前绑定的 involer.fns 赋值为新的回调函数即可，并且 通过 `on[name] = old `保留引⽤关系，这样就保证了事件回调只添加⼀次，之后仅仅去修改它的回调函数的引⽤,updateListeners 函数的最后遍历 oldOn 拿到事件名称，判断如果满⾜ `isUndef(on[name]) `，则执⾏ `remove(event.name, oldOn[name], event.capture) `去移除事件回调。

了解了 updateListeners 的实现后，我们来看⼀下在原⽣ DOM 事件中真正添加回调和移除回调函数的实现，它们的定义都在 src/platforms/web/runtime/modules/event.js 中,add 和 remove 的逻辑很简单，就是实际上调⽤原⽣ addEventListener 和 removeEventListener ，并根据参数传递⼀些配置，注意这⾥的 hanlder 会⽤ withMacroTask(hanlder) 包裹⼀下，它的定义在 src/core/util/next-tick.js 中,实际上就是强制在 DOM 事件的回调函数执⾏期间如果修改了数据，那么这些数据更改推⼊的队列会被当做 macroTask 在 nextTick 后执⾏。

### ⾃定义事件

除了原⽣ DOM 事件，Vue 还⽀持了⾃定义事件，并且⾃定义事件只能作⽤在组件上，如果在组件上使⽤原⽣事件，需要加 .native 修饰符，普通元素上使⽤ .native 修饰符⽆效，接下来我们就来分析它的实现

在 render 阶段，如果是⼀个组件节点，则通过 createComponent 创建⼀个组件 vnode ，我们再来回顾这个⽅法，定义在 src/core/vdom/create-component.js 中

我们只关注事件相关的逻辑，可以看到，它把 data.on 赋值给了 listeners ，把 data.nativeOn 赋值给了 data.on ，这样所有的原⽣ DOM 事件处理跟我们刚才介绍的⼀样，它是在当前组件环境中处理的。⽽对于⾃定义事件，我们把 listeners 作为 vnode 的 componentOptions 传⼊，它是在⼦组件初始化阶段中处理的，所以它的处理环境是⼦组件,然后在⼦组件的初始化的时候，会执⾏ initInternalComponent ⽅法，它的定义在 src/core/instance/init.js 中

这⾥拿到了⽗组件传⼊的 listeners ，然后在执⾏ initEvents 的过程中，会处理这个 listeners ，定义在 src/core/instance/events.js 中,拿到 listeners 后，执⾏ updateComponentListeners(vm, listeners) ⽅法,updateListeners 我们之前介绍过，所以对于⾃定义事件和原⽣ DOM 事件处理的差异就在事件添加和删除的实现上，来看⼀下⾃定义事件 add 和 remove 的实现,实际上是利⽤ Vue 定义的事件中⼼，简单分析⼀下它的实现,⾮常经典的事件中⼼的实现，把所有的事件⽤ vm.\_events 存储起来，当执⾏ `vm.$on(event,fn)`的时候，按事件的名称 event 把回调函数 fn 存储起来 `vm._events[event].push(fn) `。当执⾏ vm.\$emit(event) 的时候，根据事件名 event 找到所有的回调函数 `let cbs =vm._events[event] `，然后遍历执⾏所有的回调函数。当执⾏`vm.$off(event,fn)的时候会移除指定事件名 event 和指定的 fn 当执⾏ vm.$once(event,fn) `的时候，内部就是执⾏ `vm.$on` ，并且当回调函数执⾏⼀次后再通过 vm.\$off 移除事件的回调，这样就确保了回调函数只执⾏⼀次

所以对于⽤户⾃定义的事件添加和删除就是利⽤了这⼏个事件中⼼的 API。需要注意的事⼀点， vm.$emit 是给当前的 vm 上派发的实例，之所以我们常⽤它做⽗⼦组件通讯，是因为它的回调函数的定义是在⽗组件中，对于我们这个例⼦⽽⾔，当⼦组件的 button 被点击了，它通过this.$emit('select') 派发事件，那么⼦组件的实例就监听到了这个 select 事件，并执⾏它的回调函数——定义在⽗组件中的 selectHandler ⽅法，这样就相当于完成了⼀次⽗⼦组件的通讯

那么⾄此我们对 Vue 的事件实现有了进⼀步的了解，Vue ⽀持 2 种事件类型，原⽣ DOM 事件和⾃定义事件，它们主要的区别在于添加和删除事件的⽅式不⼀样，并且⾃定义事件的派发是往当前实例上派发，但是可以利⽤在⽗组件环境定义回调函数来实现⽗⼦组件的通讯。另外要注意⼀点，只有组件节点才可以添加⾃定义事件，并且添加原⽣ DOM 事件需要使⽤ native 修饰符；⽽普通元素使⽤.native 修饰符是没有作⽤的，也只能添加原⽣ DOM 事件

### v-model

很多同学在理解 Vue 的时候都把 Vue 的数据响应原理理解为双向绑定，但实际上这是不准确的，我们之前提到的数据响应，都是通过数据的改变去驱动 DOM 视图的变化，⽽双向绑定除了数据驱动 DOM 外， DOM 的变化反过来影响数据，是⼀个双向关系，在 Vue 中，我们可以通过 v-model 来实现双向绑定。v-model 即可以作⽤在普通表单元素上，⼜可以作⽤在组件上，它其实是⼀个语法糖，接下来我们就来分析 v-model 的实现原理。

### 表单元素

```js
let vm = new Vue({
  el: "#app",
  template:
    "<div>" +
    '<input v-model="message" placeholder="edit me">' +
    "<p>Message is: {{ message }}</p>" +
    "</div>",
  data() {
    return {
      message: "",
    };
  },
});
```

这是⼀个⾮常简单 demo，我们在 input 元素上设置了 v-model 属性，绑定了 message ，当我们在 input 上输⼊了内容， message 也会同步变化。接下来我们就来分析 Vue 是如何实现这⼀效果的，其实⾮常简单

也是先从编译阶段分析，⾸先是 parse 阶段， v-model 被当做普通的指令解析到 el.directives 中，然后在 codegen 阶段，执⾏ genData 的时候，会执⾏ const dirs =genDirectives(el, state) ，它的定义在 src/compiler/codegen/index.js 中,genDrirectives ⽅法就是遍历 el.directives ，然后获取每⼀个指令对应的⽅法 `const gen:DirectiveFunction = state.directives[dir.name]` ，这个指令⽅法实际上是在实例化 CodegenState 的时候通过 option 传⼊的，这个 option 就是编译相关的配置，它在不同的平台下配置不同，在 web 环境下的定义在 src/platforms/web/compiler/options.js 下,directives 定义在 src/platforms/web/compiler/directives/index.js 中,那么对于 v-model ⽽⾔，对应的 directive 函数是在 src/platforms/web/compiler/directives/model.js 中定义的 model 函数,也就是说我们执⾏ needRuntime = !!gen(el, dir, state.warn) 就是在执⾏ model 函数，它会根据 AST 元素节点的不同情况去执⾏不同的逻辑，对于我们这个 case ⽽⾔，它会命中 genDefaultModel(el, value, modifiers) 的逻辑，稍后我们也会介绍组件的处理，其它分⽀同学们可以⾃⾏去看。我们来看⼀下 genDefaultModel 的实现：

genDefaultModel 函数先处理了 modifiers ，它的不同主要影响的是 event 和 valueExpression 的值，对于我们的例⼦， event 为 input ， valueExpression 为\$event.target.value 。然后去执⾏ genAssignmentCode 去⽣成代码，它的定义在 src/compiler/directives/model.js 中,该⽅法⾸先对 v-model 对应的 value 做了解析，它处理了⾮常多的情况，对我们的例⼦， value 就是 messgae ，所以返回的 res.key 为 null ，然后我们就得到` ${value}=${assignment} ，也就是 message=$event.target.value` 。然后我们⼜命中了 needCompositionGuard 为 true 的逻辑，所以最终的 code 为 `if($event.target.composing)return;message=$event.target.value`

code ⽣成完后，⼜执⾏了 2 句⾮常关键的代码

```js
addProp(el, "value", `(${value})`);
addHandler(el, event, code, null, true);
```

这实际上就是 input 实现 v-model 的精髓，通过修改 AST 元素，给 el 添加⼀个 prop ，相当于我们在 input 上动态绑定了 value ，⼜给 el 添加了事件处理，相当于在 input 上绑定了 input 事件，其实转换成模板如下

```html
<input v-bind:value="message" v-on:input="message=$event.target.value" />
```

其实就是动态绑定了 input 的 value 指向了 messgae 变量，并且在触发 input 事件的时候去动态把 message 设置为⽬标值，这样实际上就完成了数据双向绑定了，所以说 v-model 实际上就是语法糖。

再回到 genDirectives ，它接下来的逻辑就是根据指令⽣成⼀些 data 的代码,对我们的例⼦⽽⾔，最终⽣成的 render 代码如下

```js
with (this) {
  return _c("div", [
    _c("input", {
      directives: [
        {
          name: "model",
          rawName: "v-model",
          value: message,
          expression: "message",
        },
      ],
      attrs: { placeholder: "edit me" },
      domProps: { value: message },
      on: {
        input: function ($event) {
          if ($event.target.composing) return;
          message = $event.target.value;
        },
      },
    }),
    _c("p", [_v("Message is: " + _s(message))]),
  ]);
}
```

关于事件的处理我们之前的章节已经分析过了，所以对于 input 的 v-model ⽽⾔，完全就是语法糖，并且对于其它表单元素套路都是⼀样，区别在于⽣成的事件代码会略有不同。v-model 除了作⽤在表单元素上，新版的 Vue 还把这⼀语法糖⽤在了组件上，接下来我们来分析它的实现。

### 组件

```js
let Child = {
  template:
    "<div>" +
    '<input :value="value" @input="updateValue" placeholder="edit me">' +
    "</div>",
  props: ["value"],
  methods: {
    updateValue(e) {
      this.$emit("input", e.target.value);
    },
  },
};
let vm = new Vue({
  el: "#app",
  template:
    "<div>" +
    '<child v-model="message"></child>' +
    "<p>Message is: {{ message }}</p>" +
    "</div>",
  data() {
    return {
      message: "",
    };
  },
  components: {
    Child,
  },
});
```

可以看到，⽗组件引⽤ child ⼦组件的地⽅使⽤了 v-model 关联了数据 message ；⽽⼦组件定义了⼀个 value 的 prop ，并且在 input 事件的回调函数中，通过 this.\$emit('input',e.target.value) 派发了⼀个事件，为了让 v-model ⽣效，这两点是必须的,接着我们从源码⾓度分析实现原理，还是从编译阶段说起，对于⽗组件⽽⾔，在编译阶段会解析 v-modle 指令，依然会执⾏ genData 函数中的 genDirectives 函数，接着执⾏ src/platforms/web/compiler/directives/model.js 中定义的 model 函数,并命中如下逻辑

```js
else if (!config.isReservedTag(tag)) {
genComponentModel(el, value, modifiers);
return false
}
```

genComponentModel 函数定义在 src/compiler/directives/model.js 中,genComponentModel 的逻辑很简单，对我们的例⼦⽽⾔，⽣成的 el.model 的值为

```js
el.model = {
  callback: "function ($$v) {message=$$v}",
  expression: '"message"',
  value: "(message)",
};
```

那么在 genDirectives 之后， genData 函数中有⼀段逻辑如下：

```js
if (el.model) {
  data += `model:{value:${el.model.value},callback:${el.model.callback},expression:${el.model.expression}},`;
}
```

那么⽗组件最终⽣成的 render 代码如下

```js
with (this) {
  return _c(
    "div",
    [
      _c("child", {
        model: {
          value: message,
          callback: function ($$v) {
            message = $$v;
          },
          expression: "message",
        },
      }),
      _c("p", [_v("Message is: " + _s(message))]),
    ],
    1
  );
}
```

然后在创建⼦组件 vnode 阶段，会执⾏ createComponent 函数，它的定义在 src/core/vdom/create-component.js 中,其中会对 data.model 的情况做处理，执⾏ transformModel(Ctor.options, data) ⽅法,transformModel 逻辑很简单，给 data.props 添加 data.model.value ，并且给 data.on 添加 data.model.callback ，对我们的例⼦⽽⾔，扩展结果如下

```js
data.props = {
  value: message,
};
data.on = {
  input: function ($$v) {
    message = $$v;
  },
};
```

其实就相当于我们在这样编写⽗组件

```js
let vm = new Vue({
  el: "#app",
  template:
    "<div>" +
    '<child :value="message" @input="message=arguments[0]"></child>' +
    "<p>Message is: {{ message }}</p>" +
    "</div>",
  data() {
    return {
      message: "",
    };
  },
  components: {
    Child,
  },
});
```

⼦组件传递的 value 绑定到当前⽗组件的 message ，同时监听⾃定义 input 事件，当⼦组件派发 input 事件的时候，⽗组件会在事件回调函数中修改 message 的值，同时 value 也会发⽣变化，⼦组件的 input 值被更新,这就是典型的 Vue 的⽗⼦组件通讯模式，⽗组件通过 prop 把数据传递到⼦组件，⼦组件修改了数据后把改变通过 \$emit 事件的⽅式通知⽗组件，所以说组件上的 v-model 也是⼀种语法糖,另外我们注意到组件 v-model 的实现，⼦组件的 value prop 以及派发的 input 事件名是可配的，可以看到 transformModel 中对这部分的处理,也就是说可以在定义⼦组件的时候通过 model 选项配置⼦组件接收的 prop 名以及派发的事件名，举个例⼦

```js
let Child = {
  template:
    "<div>" +
    '<input :value="msg" @input="updateValue" placeholder="edit me">' +
    "</div>",
  props: ["msg"],
  model: {
    prop: "msg",
    event: "change",
  },
  methods: {
    updateValue(e) {
      this.$emit("change", e.target.value);
    },
  },
};
let vm = new Vue({
  el: "#app",
  template:
    "<div>" +
    '<child v-model="message"></child>' +
    "<p>Message is: {{ message }}</p>" +
    "</div>",
  data() {
    return {
      message: "",
    };
  },
  components: {
    Child,
  },
});
```

⼦组件修改了接收的 prop 名以及派发的事件名，然⽽这⼀切⽗组件作为调⽤⽅是不⽤关⼼的，这样做的好处是我们可以把 value 这个 prop 作为其它的⽤途

那么⾄此， v-model 的实现就分析完了，我们了解到它是 Vue 双向绑定的真正实现，但本质上就是⼀种语法糖，它即可以⽀持原⽣表单元素，也可以⽀持⾃定义组件。在组件的实现中，我们是可以配置⼦组件接收的 prop 名称，以及派发的事件名称

### slot

Vue 的组件提供了⼀个⾮常有⽤的特性 —— slot 插槽，它让组件的实现变的更加灵活。我们平时在开发组件库的时候，为了让组件更加灵活可定制，经常⽤插槽的⽅式让⽤户可以⾃定义内容。插槽分为普通插槽和作⽤域插槽，它们可以解决不同的场景，但它是怎么实现的呢，下⾯我们就从源码的⾓度来分析插槽的实现原理

### 普通插槽

```js
let AppLayout = {
  template:
    '<div class="container">' +
    '<header><slot name="header"></slot></header>' +
    "<main><slot>默认内容</slot></main>" +
    '<footer><slot name="footer"></slot></footer>' +
    "</div>",
};
let vm = new Vue({
  el: "#app",
  template:
    "<div>" +
    "<app-layout>" +
    '<h1 slot="header">{{title}}</h1>' +
    "<p>{{msg}}</p>" +
    '<p slot="footer">{{desc}}</p>' +
    "</app-layout>" +
    "</div>",
  data() {
    return {
      title: "我是标题",
      msg: "我是内容",
      desc: "其它信息",
    };
  },
  components: {
    AppLayout,
  },
});
```

这⾥我们定义了 AppLayout ⼦组件，它内部定义了 3 个插槽，2 个为具名插槽，⼀个 name 为 header ，⼀个 name 为 footer ，还有⼀个没有定义 name 的是默认插槽。 `<slot>` 和`</slot>` 之前填写的内容为默认内容。我们的⽗组件注册和引⽤了 AppLayout 的组件，并在组件内部定义了⼀些元素，⽤来替换插槽，那么它最终⽣成的 DOM 如下

```html
<div>
  <div class="container">
    <header><h1>我是标题</h1></header>
    <main><p>我是内容</p></main>
    <footer><p>其它信息</p></footer>
  </div>
</div>
```

### 编译

还是先从编译说起，我们知道编译是发⽣在调⽤ vm.\$mount 的时候，所以编译的顺序是先编译⽗组件，再编译⼦组件。⾸先编译⽗组件，在 parse 阶段，会执⾏ processSlot 处理 slot ，它的定义在 src/compiler/parser/index.js 中,当解析到标签上有 slot 属性的时候，会给对应的 AST 元素节点添加 slotTarget 属性，然后在 codegen 阶段，在 genData 中会处理 slotTarget ，相关代码在 src/compiler/codegen/index.js 中,会给 data 添加⼀个 slot 属性，并指向 slotTarget ，之后会⽤到。在我们的例⼦中，⽗组件最终⽣成的代码如下

```js
with (this) {
  return _c(
    "div",
    [
      _c("app-layout", [
        _c("h1", { attrs: { slot: "header" }, slot: "header" }, [
          _v(_s(title)),
        ]),
        _c("p", [_v(_s(msg))]),
        _c("p", { attrs: { slot: "footer" }, slot: "footer" }, [_v(_s(desc))]),
      ]),
    ],
    1
  );
}
```

接下来编译⼦组件，同样在 parser 阶段会执⾏ processSlot 处理函数，它的定义在 src/compiler/parser/index.js 中,当遇到 slot 标签的时候会给对应的 AST 元素节点添加 slotName 属性，然后在 codegen 阶段，会判断如果当前 AST 元素节点是 slot 标签，则执⾏ genSlot 函数，它的定义在 src/compiler/codegen/index.js 中,我们先不考虑 slot 标签上有 attrs 以及 v-bind 的情况，那么它⽣成的代码实际上就只有

```js
const slotName = el.slotName || '"default"';
const children = genChildren(el, state);
let res = `_t(${slotName}${children ? `,${children}` : ""}`;
```

这⾥的 slotName 从 AST 元素节点对应的属性上取，默认是 default ，⽽ children 对应的就是 slot 开始和闭合标签包裹的内容。来看⼀下我们例⼦的⼦组件最终⽣成的代码，如下

```js
with (this) {
  return _c(
    "div",
    {
      staticClass: "container",
    },
    [
      _c("header", [_t("header")], 2),
      _c("main", [_t("default", [_v("默认内容")])], 2),
      _c("footer", [_t("footer")], 2),
    ]
  );
}
```

在编译章节我们了解到， \_t 函数对应的就是 renderSlot ⽅法，它的定义在 src/core/instance/render-heplpers/render-slot.js 中,render-slot 的参数 name 代表插槽名称 slotName ， fallback 代表插槽的默认内容⽣成的 vnode 数组。先忽略 scoped-slot ，只看默认插槽逻辑。如果 this.$slot[name] 有值，就返回它对应的 vnode 数组，否则返回 fallback 。那么这个 this.$slot 是哪⾥来的呢？我们知道⼦组件的 init 时机是在⽗组件执⾏ patch 过程的时候，那这个时候⽗组件已经编译完成了。并且⼦组件在 init 过程中会执⾏ initRender 函数， initRender 的时候获取到 vm.\$slot ，相关代码在 src/core/instance/render.js 中

vm.\$slots 是通过执⾏ resolveSlots(options.\_renderChildren, renderContext) 返回的，它的定义在 src/core/instance/render-helpers/resolve-slots.js 中

resolveSlots ⽅法接收 2 个参数，第⼀个参数 chilren 对应的是⽗ vnode 的 children ，在我们的例⼦中就是 `<app-layout> `和 `</app-layout> `包裹的内容。第⼆个参数 context 是⽗ vnode 的上下⽂，也就是⽗组件的 vm 实例。resolveSlots 函数的逻辑就是遍历 chilren ，拿到每⼀个 child 的 data ，然后通过 data.slot 获取到插槽名称，这个 slot 就是我们之前编译⽗组件在 codegen 阶段设置的 data.slot 。接着以插槽名称为 key 把 child 添加到 slots 中，如果 data.slot 不存在，则是默认插槽的内容，则把对应的 child 添加到 slots.defaults 中。这样就获取到整个 slots ，它是⼀个对象， key 是插槽名称， value 是⼀个 vnode 类型的数组，因为它可以有多个同名插槽。`这样我们就拿到了 vm.$slots 了，回到 renderSlot 函数，const slotNodes =this.$slots[name]`，我们也就能根据插槽名称获取到对应的 vnode 数组了，这个数组⾥的 vnode 都是在⽗组件创建的，这样就实现了在⽗组替换⼦组件插槽的内容了。对应的 slot 渲染成 vnodes ，作为当前组件渲染 vnode 的 children ，之后的渲染过程之前分析过，不再赘述。

我们知道在普通插槽中，⽗组件应⽤到⼦组件插槽⾥的数据都是绑定到⽗组件的，因为它渲染成 vnode 的时机的上下⽂是⽗组件的实例。但是在⼀些实际开发中，我们想通过⼦组件的⼀些数据来决定⽗组件实现插槽的逻辑，Vue 提供了另⼀种插槽——作⽤域插槽，接下来我们就来分析⼀下它的实现原理。

### 作用域插槽

```js
let Child = {
  template:
    '<div class="child">' + '<slot text="Hello " :msg="msg"></slot>' + "</div>",
  data() {
    return {
      msg: "Vue",
    };
  },
};
let vm = new Vue({
  el: "#app",
  template:
    "<div>" +
    "<child>" +
    '<template slot-scope="props">' +
    "<p>Hello from parent</p>" +
    "<p>{{ props.text + props.msg}}</p>" +
    "</template>" +
    "</child>" +
    "</div>",
  components: {
    Child,
  },
});
```

最终⽣成的 DOM 结构如下：

```js
<div>
  <div class="child">
    <p>Hello from parent</p>
    <p>Hello Vue</p>
  </div>
</div>
```

我们可以看到⼦组件的 slot 标签多了 text 属性，以及 :msg 属性。⽗组件实现插槽的部分多了⼀个 template 标签，以及 scope-slot 属性，其实在 Vue 2.5+ 版本， scoped-slot 可以作⽤在普通元素上。这些就是作⽤域插槽和普通插槽在写法上的差别

在编译阶段，仍然是先编译⽗组件，同样是通过 processSlot 函数去处理 scoped-slot ，它的定义在在 src/compiler/parser/index.js 中,这块逻辑很简单，读取 scoped-slot 属性并赋值给当前 AST 元素节点的 slotScope 属性，接下来在构造 AST 树的时候，会执⾏以下逻辑,可以看到对于拥有 scopedSlot 属性的 AST 元素节点⽽⾔，是不会作为 children 添加到当前 AST 树中，⽽是存到⽗ AST 元素节点的 scopedSlots 属性上，它是⼀个对象，以插槽名称 name 为 key ,然后在 genData 的过程，会对 scopedSlots 做处理,genScopedSlots 就是对 scopedSlots 对象遍历，执⾏ genScopedSlot ，并把结果⽤逗号拼接，⽽ genScopedSlot 是先⽣成⼀段函数代码，并且函数的参数就是我们的 slotScope ，也就是写在标签属性上的 scoped-slot 对应的值，然后再返回⼀个对象， key 为插槽名称， fn 为⽣成的函数代码,对于我们这个例⼦⽽⾔，⽗组件最终⽣成的代码如下

```js
with (this) {
  return _c(
    "div",
    [
      _c("child", {
        scopedSlots: _u([
          {
            key: "default",
            fn: function (props) {
              return [
                _c("p", [_v("Hello from parent")]),
                _c("p", [_v(_s(props.text + props.msg))]),
              ];
            },
          },
        ]),
      }),
    ],
    1
  );
}
```

可以看到它和普通插槽⽗组件编译结果的⼀个很明显的区别就是没有 children 了， data 部分多了⼀个对象，并且执⾏了 \_u ⽅法，在编译章节我们了解到， \_u 函数对的就是 resolveScopedSlots ⽅法，它的定义在 src/core/instance/render-heplpers/resolve-slots.js 中

其中， fns 是⼀个数组，每⼀个数组元素都有⼀个 key 和⼀个 fn ， key 对应的是插槽的名称， fn 对应⼀个函数。整个逻辑就是遍历这个 fns 数组，⽣成⼀个对象，对象的 key 就是插槽名称， value 就是函数。这个函数的执⾏时机稍后我们会介绍。接着我们再来看⼀下⼦组件的编译，和普通插槽的过程基本相同，唯⼀⼀点区别是在 genSlot 的时候,它会对 attrs 和 v-bind 做处理，对应到我们的例⼦，最终⽣成的代码如下

```js
with (this) {
  return _c(
    "div",
    { staticClass: "child" },
    [_t("default", null, { text: "Hello ", msg: msg })],

    2
  );
}
```

\_t ⽅法我们之前介绍过，对应的是 renderSlot ⽅法,我们只关注作⽤域插槽的逻辑，那么这个 this.\$scopedSlots ⼜是在什么地⽅定义的呢，原来在⼦组件的渲染函数执⾏前，在 vm_render ⽅法内，有这么⼀段逻辑，定义在 src/core/instance/render.js 中

```js
if (_parentVnode) {
  vm.$scopedSlots = _parentVnode.data.scopedSlots || emptyObject;
}
```

这个 \_parentVNode.data.scopedSlots 对应的就是我们在⽗组件通过执⾏ resolveScopedSlots 返回的对象。所以回到 genSlot 函数，我们就可以通过插槽的名称拿到对应的 scopedSlotFn ，然后把相关的数据扩展到 props 上，作为函数的参数传⼊，原来之前我们提到的函数这个时候执⾏，然后返回⽣成的 vnodes ，为后续渲染节点⽤,后续流程之前已介绍过，不再赘述，那么⾄此，作⽤域插槽的实现也就分析完毕

通过这⼀章的分析，我们了解了普通插槽和作⽤域插槽的实现。它们有⼀个很⼤的差别是数据作⽤域，普通插槽是在⽗组件编译和渲染阶段⽣成 vnodes ，所以数据的作⽤域是⽗组件实例，⼦组件渲染的时候直接拿到这些渲染好的 vnodes 。⽽对于作⽤域插槽，⽗组件在编译和渲染阶段并不会直接⽣成 vnodes ，⽽是在⽗节点 vnode 的 data 中保留⼀个 scopedSlots 对象，存储着不同名称的插槽以及它们对应的渲染函数，只有在编译和渲染⼦组件阶段才会执⾏这个渲染函数⽣成 vnodes ，由于是在⼦组件环境执⾏的，所以对应的数据作⽤域是⼦组件实例。简单地说，两种插槽的⽬的都是让⼦组件 slot 占位符⽣成的内容由⽗组件来决定，但数据的作⽤域会根据它们 vnodes 渲染时机不同⽽不同

### keep-alive

在我们的平时开发⼯作中，经常为了组件的缓存优化⽽使⽤`<keep-alive>`组件，乐此不疲，但很少有⼈关注它的实现原理，下⾯就让我们来⼀探究竟

### 内置组件

`<keep-alive>` 是 Vue 源码中实现的⼀个组件，也就是说 Vue 源码不仅实现了⼀套组件化的机制，也实现了⼀些内置组件，它的定义在 src/core/components/keep-alive.js 中

可以看到`<keep-alive>` 组件的实现也是⼀个对象，注意它有⼀个属性 abstract 为 true，是⼀个抽象组件，Vue 的⽂档没有提这个概念，实际上它在组件实例建⽴⽗⼦关系的时候会被忽略，发⽣在 initLifecycle 的过程中

`<keep-alive>` 在 created 钩⼦⾥定义了 this.cache 和 this.keys ，本质上它就是去缓存已经创建过的 vnode 。它的 props 定义了 include ， exclude ，它们可以字符串或者表达式， include 表⽰只有匹配的组件会被缓存，⽽ exclude 表⽰任何匹配的组件都不会被缓存， props 还定义了 max ，它表⽰缓存的⼤⼩，因为我们是缓存的 vnode 对象，它也会持有 DOM，当我们缓存很多的时候，会⽐较占⽤内存，所以该配置允许我们指定缓存⼤⼩。`<keep-alive> `直接实现了 render 函数，⽽不是我们常规模板的⽅式，执⾏ `<keep-alive>` 组件渲染的时候，就会执⾏到这个 render 函数，接下来我们分析⼀下它的实现

⾸先获取第⼀个⼦元素的 vnode 由于我们也是在 `<keep-alive> `标签内部写 DOM，所以可以先获取到它的默认插槽，然后再获取到它的第⼀个⼦节点。 `<keep-alive>`**只处理第⼀个⼦元素，所以⼀般和它搭配使⽤的有 component 动态组件或者是 router-view** ，这点要牢记,然后⼜判断了当前组件的名称和 include 、 exclude 的关系,matches 的逻辑很简单，就是做匹配，分别处理了数组、字符串、正则表达式的情况，也就是说我们平时传的 include 和 exclude 可以是这三种类型的任意⼀种。并且我们的组件名如果满⾜了配置 include 且不匹配或者是配置了 exclude 且匹配，那么就直接返回这个组件的 vnode ，否则的话⾛下⼀步缓存,这部分逻辑很简单，如果命中缓存，则直接从缓存中拿 vnode 的组件实例，并且重新调整了 key 的顺序放在了最后⼀个；否则把 vnode 设置进缓存，最后还有⼀个逻辑，如果配置了 max 并且缓存的⻓度超过了 this.max ，还要从缓存中删除第⼀个,除了从缓存中删除外，还要判断如果要删除的缓存并的组件 tag 不是当前渲染组件 tag ，也执⾏删除缓存的组件实例的 \$destroy ⽅法,最后设置 vnode.data.keepAlive = true ，这个作⽤稍后我们介绍

注意， `<keep-alive>` 组件也是为观测 include 和 exclude 的变化，对缓存做处理,逻辑很简单，观测他们的变化执⾏ pruneCache 函数，其实就是对 cache 做遍历，发现缓存的节点名称和新的规则没有匹配上的时候，就把这个缓存节点从缓存中摘除

### 组件渲染

到此为⽌，我们只了解了` <keep-alive>` 的组件实现，但并不知道它包裹的⼦组件渲染和普通组件有什么不⼀样的地⽅。我们关注 2 个⽅⾯，⾸次渲染和缓存渲染

```js
let A = {
  template: '<div class="a">' + "<p>A Comp</p>" + "</div>",
  name: "A",
};
let B = {
  template: '<div class="b">' + "<p>B Comp</p>" + "</div>",
  name: "B",
};
let vm = new Vue({
  el: "#app",
  template:
    "<div>" +
    "<keep-alive>" +
    '<component :is="currentComp">' +
    "</component>" +
    "</keep-alive>" +
    '<button @click="change">switch</button>' +
    "</div>",
  data: {
    currentComp: "A",
  },
  methods: {
    change() {
      this.currentComp = this.currentComp === "A" ? "B" : "A";
    },
  },
  components: {
    A,
    B,
  },
});
```

### ⾸次渲染

我们知道 Vue 的渲染最后都会到 patch 过程，⽽组件的 patch 过程会执⾏ createComponent ⽅法，它的定义在 src/core/vdom/patch.js 中,createComponent 定义了 isReactivated 的变量，它是根据 vnode.componentInstance 以及 vnode.data.keepAlive 的判断，第⼀次渲染的时候， vnode.componentInstance 为 undefined ， vnode.data.keepAlive 为 true，因为它的⽗组件 `<keep-alive>` 的 render 函数会先执⾏，那么该 vnode 缓存到内存中，并且设置 vnode.data.keepAlive 为 true，因此 isReactivated 为 false ，那么⾛正常的 init 的钩⼦函数执⾏组件的 mount 。当 vnode 已经执⾏完 patch 后，执⾏ initComponent 函数

这⾥会有 vnode.elm 缓存了 vnode 创建⽣成的 DOM 节点。所以对于⾸次渲染⽽⾔，除了在`<keep-alive>` 中建⽴缓存，和普通组件渲染没什么区别。所以对我们的例⼦，初始化渲染 A 组件以及第⼀次点击 switch 渲染 B 组件，都是⾸次渲染。

### 缓存渲染

当我们从 B 组件再次点击 switch 切换到 A 组件，就会命中缓存渲染。我们之前分析过，当数据发送变化，在 patch 的过程中会执⾏ patchVnode 的逻辑，它会对⽐新旧 vnode 节点，甚⾄对⽐它们的⼦节点去做更新逻辑，但是对于组件 vnode ⽽⾔，是没有 children 的，那么对于 `<keep-alive>` 组件⽽⾔，如何更新它包裹的内容呢？

原来 patchVnode 在做各种 diff 之前，会先执⾏ prepatch 的钩⼦函数，它的定义在 src/core/vdom/create-component 中,prepatch 核⼼逻辑就是执⾏ updateChildComponent ⽅法，它的定义在 src/core/instance/lifecycle.js 中,updateChildComponent ⽅法主要是去更新组件实例的⼀些属性，这⾥我们重点关注⼀下 slot 部分，由于` <keep-alive>` 组件本质上⽀持了 slot ，所以它执⾏ prepatch 的时候，需要对⾃⼰的 children ，也就是这些 slots 做重新解析，并触发 `<keep-alive>` 组件实例 \$forceUpdate 逻辑，也就是重新执⾏ `<keep-alive>` 的 render ⽅法，这个时候如果它包裹的第⼀个组件 vnode 命中缓存，则直接返回缓存中的 vnode.componentInstance ，在我们的例⼦中就是缓存的 A 组件，接着⼜会执⾏ patch 过程，再次执⾏到 createComponent ⽅法

这个时候 isReactivated 为 true，并且在执⾏ init 钩⼦函数的时候不会再执⾏组件的 mount 过程了，相关逻辑在 src/core/vdom/create-component.js 中,这也就是被 `<keep-alive>` 包裹的组件在有缓存的时候就不会在执⾏组件的 created 、 mounted 等钩⼦函数的原因了。回到 createComponent ⽅法，在 isReactivated 为 true 的情况下会执⾏ reactivateComponent ⽅法,前⾯部分的逻辑是解决对 reactived 组件 transition 动画不触发的问题，可以先不关注，最后通过执⾏ insert(parentElm, vnode.elm, refElm) 就把缓存的 DOM 对象直接插⼊到⽬标元素中，这样就完成了在数据更新的情况下的渲染过程。

### ⽣命周期

之前我们提到，组件⼀旦被 `<keep-alive>` 缓存，那么再次渲染的时候就不会执⾏ created 、 mounted 等钩⼦函数，但是我们很多业务场景都是希望在我们被缓存的组件再次被渲染的时候做⼀些事情，好在 Vue 提供了 activated 钩⼦函数，它的执⾏时机是` <keep-alive>` 包裹的组件渲染的时候，接下来我们从源码⾓度来分析⼀下它的实现原理,在渲染的最后⼀步，会执⾏ invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)函数执⾏ vnode 的 insert 钩⼦函数，它的定义在 src/core/vdom/create-component.js 中

这⾥判断如果是被 `<keep-alive>` 包裹的组件已经 mounted ，那么则执⾏ queueActivatedComponent(componentInstance) ，否则执⾏ activateChildComponent(componentInstance, true) 。

我们先分析⾮ mounted 的情况， activateChildComponent 的定义在 src/core/instance/lifecycle.js 中,可以看到这⾥就是执⾏组件的 acitvated 钩⼦函数，并且递归去执⾏它的所有⼦组件的 activated 钩⼦函数

那么再看 queueActivatedComponent 的逻辑，它定义在 src/core/observer/scheduler.js 中,这个逻辑很简单，把当前 vm 实例添加到 activatedChildren 数组中，等所有的渲染完毕，在 nextTick 后会执⾏ flushSchedulerQueue ，这个时候就会执⾏,也就是遍历所有的 activatedChildren ，执⾏ activateChildComponent ⽅法，通过队列调的⽅式就是把整个 activated 时机延后了

有 activated 钩⼦函数，也就有对应的 deactivated 钩⼦函数，它是发⽣在 vnode 的 destory 钩⼦函数，定义在 src/core/vdom/create-component.js 中,对于` <keep-alive>` 包裹的组件⽽⾔，它会执⾏ deactivateChildComponent(componentInstance,true) ⽅法，定义在 src/core/instance/lifecycle.js 中,和 activateChildComponent ⽅法类似，就是执⾏组件的 deacitvated 钩⼦函数，并且递归去执⾏它的所有⼦组件的 deactivated 钩⼦函数

那么⾄此， `<keep-alive>` 的实现原理就介绍完了，通过分析我们知道了 `<keep-alive>` 组件是⼀个抽象组件，它的实现通过⾃定义 render 函数并且利⽤了插槽，并且知道了 `<keep-alive>` 缓存 vnode ，了解组件包裹的⼦元素——也就是插槽是如何做更新的。且在 patch 过程中对于已缓存的组件不会执⾏ mounted ，所以不会有⼀般的组件的⽣命周期函数但是⼜提供了 activated 和 deactivated 钩⼦函数。另外我们还知道了` <keep-alive>` 的 props 除了 include 和 exclude 还有⽂档中没有提到的 max ，它能控制我们缓存的个数。

### transition

在我们平时的前端项⽬开发中，经常会遇到如下需求，⼀个 DOM 节点的插⼊和删除或者是显⽰和隐藏，我们不想让它特别⽣硬，通常会考虑加⼀些过渡效果。

Vue.js 除了实现了强⼤的数据驱动，组件化的能⼒，也给我们提供了⼀整套过渡的解决⽅案。它内置了`<transition>` 组件，我们可以利⽤它配合⼀些 CSS3 样式很⽅便地实现过渡动画，也可以利⽤它配合 JavaScript 的钩⼦函数实现过渡动画，在下列情形中，可以给任何元素和组件添加 entering/leaving 过渡:条件渲染 (使⽤ v-if ),条件展⽰ (使⽤ v-show ),动态组件,组件根节点

```js
let vm = new Vue({
  el: "#app",
  template:
    '<div id="demo">' +
    '<button v-on:click="show = !show">' +
    "Toggle" +
    "</button>" +
    '<transition :appear="true" name="fade">' +
    '<p v-if="show">hello</p>' +
    "</transition>" +
    "</div>",
  data() {
    return {
      show: true,
    };
  },
});
```

```css
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
```

当我们点击按钮切换显⽰状态的时候，被 `<transition>` 包裹的内容会有过渡动画。那么接下来我们从源码的⾓度来分析它的实现原理

### 内置组件

`<transition>` 组件和` <keep-alive>` 组件有⼏点实现类似，同样是抽象组件，同样直接实现 render 函数，同样利⽤了默认插槽。 `<transition>` 组件⾮常灵活，⽀持的 props ⾮常多,这些配置我们稍后会分析它们的作⽤，`<transition>`组件另⼀个重要的就是 render 函数的实现， render 函数主要作⽤就是渲染⽣成 vnode ，下⾯来看⼀下这部分的逻辑

#### 处理 children

先从默认插槽中获取 `<transition>` 包裹的⼦节点，并且判断了⼦节点的⻓度，如果⻓度为 0，则直接返回，否则判断⻓度如果⼤于 1，也会在开发环境报警告，因为 `<transition>` 组件是只能包裹⼀个⼦节点的

#### 处理 model

过渡组件的对 mode 的⽀持只有 2 种， in-out 或者是 out-in

#### 获取 rawChild & child

rawChild 就是第⼀个⼦节点 vnode ，接着判断当前 `<transition> `如果是组件根节点并且外⾯包裹该组件的容器也是 `<transition> `的时候要跳过。来看⼀下 hasParentTransition 的实现,因为传⼊的是 this.\$vnode ，也就是 `<transition>` 组件的 占位 vnode ，只有当它同时作为根 vnode ，也就是 vm.\_vnode 的时候，它的 parent 才不会为空，并且判断 parent 也是`<transition>` 组件，才返回 true， vnode.data.transition 我们稍后会介绍

getRealChild 的⽬的是获取组件的⾮抽象⼦节点，因为 `<transition>` 很可能会包裹⼀个 keep-alive ,会递归找到第⼀个⾮抽象组件的 vnode 并返回，在我们这个 case 下， rawChild === child

#### 处理 id & data

先根据 key 等⼀系列条件获取 id ，接着从当前通过 extractTransitionData 组件实例上提取出过渡所需要的数据,⾸先是遍历 props 赋值到 data 中，接着是遍历所有⽗组件的事件也把事件回调赋值到 data 中,这样 child.data.transition 中就包含了过渡所需的⼀些数据，这些稍后都会⽤到，对于 child 如果使⽤了 v-show 指令，也会把 child.data.show 设置为 true，在我们的例⼦中，得到的 child.data 如下：

```js
{
transition: {
appear: true,
name: 'fade'
}
}
```

⾄于 oldRawChild 和 oldChild 是与后⾯的判断逻辑相关，这些我们这⾥先不介绍

### transition module

刚刚我们介绍完 `<transition>` 组件的实现，它的 render 阶段只获取了⼀些数据，并且返回了渲染的 vnode ，并没有任何和动画相关，⽽动画相关的逻辑全部在 src/platforms/web/modules/transition.js 中

在之前介绍事件实现的章节中我们提到过在 vnode patch 的过程中，会执⾏很多钩⼦函数，那么对于过渡的实现，它只接收了 create 和 activate 2 个钩⼦函数，我们知道 create 钩⼦函数只有当节点的创建过程才会执⾏，⽽ remove 会在节点销毁的时候执⾏，这也就印证了 `<transition`>必须要满⾜ v-if 、动态组件、组件根节点条件之⼀了，对于 v-show 在它的指令的钩⼦函数中也会执⾏相关逻辑，这块⼉先不介绍。过渡动画提供了 2 个时机，⼀个是 create 和 activate 的时候提供了 entering 进⼊动画，⼀个是 remove 的时候提供了 leaving 离开动画，那么接下来我们就来分别去分析这两个过程。

整个 entering 过程的实现是 enter 函数,enter 的代码很⻓，我们先分析其中的核⼼逻辑

#### 解析过渡数据

从 vnode.data.transition 中解析出过渡相关的⼀些数据， resolveTransition 的定义在 src/platforms/web/transition-util.js 中,resolveTransition 会通过 autoCssTransition 处理 name 属性，⽣成⼀个⽤来描述各个阶段的 Class 名称的对象，扩展到 def 中并返回给 data ，这样我们就可以从 data 中获取到过渡相关的所有数据

#### 处理边界情况

这是为了处理当 `<transition> `作为⼦组件的根节点，那么我们需要检查它的⽗组件作为 appear 的检查。 isAppear 表⽰当前上下⽂实例还没有 mounted ，第⼀次出现的时机。如果是第⼀次并且`<transition>` 组件没有配置 appear 的话，直接返回

#### 定义过渡类名、钩⼦函数和其它配置

对于过渡类名⽅⾯， startClass 定义进⼊过渡的开始状态，在元素被插⼊时⽣效，在下⼀个帧移除； activeClass 定义过渡的状态，在元素整个过渡过程中作⽤，在元素被插⼊时⽣效，在 transition/animation 完成之后移除； toClass 定义进⼊过渡的结束状态，在元素被插⼊⼀帧后⽣效 (与此同时 startClass 被删除)，在 `<transition>/animation` 完成之后移除

对于过渡钩⼦函数⽅⾯， beforeEnterHook 是过渡开始前执⾏的钩⼦函数， enterHook 是在元素插⼊后或者是 v-show 显⽰切换后执⾏的钩⼦函数。 afterEnterHook 是在过渡动画执⾏完后的钩⼦函数

explicitEnterDuration 表⽰ enter 动画执⾏的时间,expectsCSS 表⽰过渡动画是受 CSS 的影响,cb 定义的是过渡完成执⾏的回调函数

#### 合并 insert 钩⼦函数

mergeVNodeHook 的定义在 src/core/vdom/helpers/merge-hook.js 中,mergeVNodeHook 的逻辑很简单，就是把 hook 函数合并到 `def.data.hook[hookey]` 中，⽣成新的 invoker ， createFnInvoker ⽅法我们在分析事件章节的时候已经介绍过了,我们之前知道组件的 vnode 原本定义了 init 、 prepatch 、 insert 、 destroy 四个钩⼦函数，⽽ mergeVNodeHook 函数就是把⼀些新的钩⼦函数合并进来，例如在`<transition>`过程中合并的 insert 钩⼦函数，就会合并到组件 vnode 的 insert 钩⼦函数中，这样当组件插⼊后，就会执⾏我们定义的 enterHook 了

#### 开始执⾏过渡动画

⾸先执⾏ beforeEnterHook 钩⼦函数，把当前元素的 DOM 节点 el 传⼊，然后判断 expectsCSS ，如果为 true 则表明希望⽤ CSS 来控制动画，那么会执⾏ addTransitionClass(el,startClass) 和 addTransitionClass(el, activeClass) ，它的定义在 src/platforms/runtime/transition-util.js 中,其实⾮常简单，就是给当前 DOM 元素 el 添加样式 cls ，所以这⾥添加了 startClass 和 activeClass ，在我们的例⼦中就是给 p 标签添加了 fade-enter 和 fade-enter-active 2 个样式

接下来执⾏了 nextFrame,它就是⼀个简单的 requestAnimationFrame 的实现，它的参数 fn 会在下⼀帧执⾏，因此下⼀帧执⾏了 removeTransitionClass(el, startClass)

把 startClass 移除，在我们的等例⼦中就是移除 fade-enter 样式。然后判断此时过渡没有被取消，则执⾏ addTransitionClass(el, toClass) 添加 toClass ，在我们的例⼦中就是添加了 fade-enter-to 。然后判断 !userWantsControl ，也就是⽤户不通过 enterHook 钩⼦函数控制动画，这时候如果⽤户指定了 explicitEnterDuration ，则延时这个时间执⾏ cb ，否则通过 whenTransitionEnds(el, type, cb) 决定执⾏ cb 的时机,whenTransitionEnds 的逻辑具体不深讲了，本质上就利⽤了过渡动画的结束事件来决定 cb 函数的执⾏

最后再回到 cb 函数,其实很简单，执⾏了 removeTransitionClass(el, toClass) 和 removeTransitionClass(el,activeClass) 把 toClass 和 activeClass 移除，然后判断如果有没有取消，如果取消则移除 startClass 并执⾏ enterCancelledHook ，否则执⾏ afterEnterHook(el) 。那么到这⾥， entering 的过程就介绍完了

### leaving

与 entering 相对的就是 leaving 阶段了， entering 主要发⽣在组件插⼊后，⽽ leaving 主要发⽣在组件销毁前,纵观 leave 的实现，和 enter 的实现⼏乎是⼀个镜像过程，不同的是从 data 中解析出来的是 leave 相关的样式类名和钩⼦函数。还有⼀点不同是可以配置 delayLeave ，它是⼀个函数，可以延时执⾏ leave 的相关过渡动画，在 leave 动画执⾏完后，它会执⾏ rm 函数把节点从 DOM 中真正做移除

那么到此为⽌基本的 `<transition>` 过渡的实现分析完毕了，总结起来，Vue 的过渡实现分为以下⼏
个步骤：

1. ⾃动嗅探⽬标元素是否应⽤了 CSS 过渡或动画，如果是，在恰当的时机添加/删除 CSS 类名。
2. 如果过渡组件提供了 JavaScript 钩⼦函数，这些钩⼦函数将在恰当的时机被调⽤。
3. 如果没有找到 JavaScript 钩⼦并且也没有检测到 CSS 过渡/动画，DOM 操作 (插⼊/删除) 在下⼀帧
   中⽴即执⾏。
   所以真正执⾏动画的是我们写的 CSS 或者是 JavaScript 钩⼦函数，⽽ Vue 的 `<transition>` 只是帮我们很好地管理了这些 CSS 的添加/删除，以及钩⼦函数的执⾏时机

### transition-group

前⼀节我们介绍了 `<transiiton>` 组件的实现原理，它只能针对单⼀元素实现过渡效果。我们做前端开发经常会遇到列表的需求，我们对列表元素进⾏添加和删除，有时候也希望有过渡效果，Vue.js 提供了 `<transition-group>` 组件，很好地帮助我们实现了列表的过渡效果。那么接下来我们就来分析⼀下它的实现原理

```js
let vm = new Vue({
  el: "#app",
  template:
    '<div id="list-complete-demo" class="demo">' +
    '<button v-on:click="add">Add</button>' +
    '<button v-on:click="remove">Remove</button>' +
    '<transition-group name="list-complete" tag="p">' +
    '<span v-for="item in items" v-bind:key="item" class="list-complete-item">' +
    "{{ item }}" +
    "</span>" +
    "</transition-group>" +
    "</div>",
  data: {
    items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    nextNum: 10,
  },
  methods: {
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length);
    },
    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++);
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1);
    },
  },
});
```

```css
.list-complete-item {
  display: inline-block;
  margin-right: 10px;
}
.list-complete-move {
  transition: all 1s;
}
.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-enter-active {
  transition: all 1s;
}
.list-complete-leave-active {
  transition: all 1s;
  position: absolute;
}
```

这个⽰例初始会展现 1-9 ⼗个数字，当我们点击 Add 按钮时，会⽣成 nextNum 并随机在当前数列表中插⼊；当我们点击 Remove 按钮时，会随机删除掉⼀个数。我们会发现在数添加删除的过程中在列表中会有过渡动画，这就是`<transition-group>`组件配合我们定义的 CSS 产⽣的效果,我们⾸先还是来分析 `<transtion-group>` 组件的实现，它的定义在 src/platforms/web/runtime/components/transitions.js 中

### render 函数

`<transition-group> `组件也是由 render 函数渲染⽣成 vnode ，接下来我们先分析 render 的实现

#### 定义⼀些变量

```js
const tag: string = this.tag || this.$vnode.data.tag || "span";
const map: Object = Object.create(null);
const prevChildren: Array<VNode> = (this.prevChildren = this.children);
const rawChildren: Array<VNode> = this.$slots.default || [];
const children: Array<VNode> = (this.children = []);
const transitionData: Object = extractTransitionData(this);
```

不同于 `<transition>` 组件， `<transition-group> `组件⾮抽象组件，它会渲染成⼀个真实元素，默认 tag 是 span 。 prevChildren ⽤来存储上⼀次的⼦节点； children ⽤来存储当前的⼦节点； rawChildren 表⽰ `<transtition-group>` 包裹的原始⼦节点； transtionData 是从`<transtition-group>` 组件上提取出来的⼀些渲染数据，这点和 `<transition>` 组件的实现是⼀样的

#### 遍历 rawChidren ，初始化 children

其实就是对 rawChildren 遍历，拿到每个 vnode ，然后会判断每个 vnode 是否设置了 key ，这个是 `<transition-group>` 对列表元素的要求。然后把 vnode 添加到 children 中，然后把刚刚提取的过渡数据 transitionData 添加的 vnode.data.transition 中，这点很关键，只有这样才能实现列表中单个元素的过渡动画。

#### 处理 prevChildren

当有 prevChildren 的时候，我们会对它做遍历，获取到每个 vnode ，然后把 transitionData 赋值到 vnode.data.transition ，这个是为了当它在 enter 和 leave 的钩⼦函数中有过渡动画，我们在上节介绍 transition 的实现中说过。接着⼜调⽤了原⽣ DOM 的 getBoundingClientRect ⽅法获取到原⽣ DOM 的位置信息，记录到 vnode.data.pos 中，然后判断⼀下 vnode.key 是否在 map 中，如果在则放⼊ kept 中，否则表⽰该节点已被删除，放⼊ removed 中，然后通过执⾏ h(tag, null, kept) 渲染后放⼊ this.kept 中，把 removed ⽤ this.removed 保存。最后整个 render 函数通过 h(tag, null, children) ⽣成渲染 vnode 。如果 transition-group 只实现了这个 render 函数，那么每次插⼊和删除的元素的缓动动画是可以实现的，在我们的例⼦中，当新增⼀个元素，它的插⼊的过渡动画是有的，但是剩余元素平移的过渡效果是出不来的，所以接下来我们来分析 `<transition-group>` 组件是如何实现剩余元素平移的过渡效果的。

### move 过渡实现

其实我们在实现元素的插⼊和删除，⽆⾮就是操作数据，控制它们的添加和删除。⽐如我们新增数据的时候，会添加⼀条数据，除了重新执⾏ render 函数渲染新的节点外，还要触发 updated 钩⼦函数，接着我们就来分析 updated 钩⼦函数的实现

#### 判断⼦元素是否定义 move 相关样式

核⼼就是 hasMove 的判断，⾸先克隆⼀个 DOM 节点，然后为了避免影响，移除它的所有其他的过渡 Class ；接着添加了 moveClass 样式，设置 display 为 none ，添加到组件根节点上；接下来通过 getTransitionInfo 获取它的⼀些缓动相关的信息，这个函数在上⼀节我们也介绍过，然后从组件根节点上删除这个克隆节点，并通过判断 info.hasTransform 来判断 hasMove ，在我们的例⼦中，该值为 true

#### ⼦节点预处理

```js
children.forEach(callPendingCbs);
children.forEach(recordPosition);
children.forEach(applyTranslation);
```

对 children 做了 3 轮循环

callPendingCbs ⽅法是在前⼀个过渡动画没执⾏完⼜再次执⾏到该⽅法的时候，会提前执⾏\_moveCb 和 \_enterCb 。recordPosition 的作⽤是记录节点的新位置。applyTranslation 的作⽤是先计算节点新位置和旧位置的差值，如果差值不为 0，则说明这些节点是需要移动的，所以记录 vnode.data.moved 为 true，并且通过设置 transform 把需要移动的节点的位置⼜偏移到之前的旧位置，⽬的是为了做 move 缓动做准备。

#### 遍历⼦元素实现 move 过渡

⾸先通过 document.body.offsetHeight 强制触发浏览器重绘，接着再次对 children 遍历，先给⼦节点添加 moveClass ，在我们的例⼦中， moveClass 定义了 transition: all 1s; 缓动；接着把⼦节点的 style.transform 设置为空，由于我们前⾯把这些节点偏移到之前的旧位置，所以它就会从旧位置按照 1s 的缓动时间过渡偏移到它的当前⽬标位置，这样就实现了 move 的过渡动画。并且接下来会监听 transitionEndEvent 过渡结束的事件，做⼀些清理的操作

另外，由于虚拟 DOM 的⼦元素更新算法是不稳定的，它不能保证被移除元素的相对位置，所以我们强制`<transition-group>`组件更新⼦节点通过 2 个步骤：**第⼀步我们移除需要移除的 vnode ，同时触发它们的 leaving 过渡**；第⼆步我们需要**把插⼊和移动的节点达到它们的最终态，同时还要保证移除的节点保留在应该的位置**，⽽这个是通过 beforeMount 钩⼦函数来实现的,通过把 **patch** ⽅法的第四个参数 removeOnly 设置为 true，这样在 updateChildren 阶段，是不会移动 vnode 节点的

那么到此， `<transtion-group>` 组件的实现原理就介绍完毕了，它和`<transition>`组件相⽐，实现了列表的过渡，以及它会渲染成真实的元素。当我们去修改列表的数据的时候，如果是添加或者删除数据，则会触发相应元素本⾝的过渡动画，这点和 `<transition> `组件实现效果⼀样，除此之外`<transtion-group> `还实现了 move 的过渡效果，让我们的列表过渡动画更加丰富

## Vue-Router

路由的概念相信⼤部分人并不陌⽣，它的作⽤就是根据不同的路径映射到不同的视图。我们在⽤ Vue 开发过实际项⽬的时候都会⽤到 Vue-Router 这个官⽅插件来帮我们解决路由的问题。Vue-Router 的能⼒⼗分强⼤，它⽀持 hash 、 history 、 abstract 3 种路由⽅式，提供了 `<router-link>`和 `<router-view>` 2 种组件，还提供了简单的路由配置和⼀系列好⽤的 API。

经掌握了路由的基本使⽤，但使⽤的过程中也难免会遇到⼀些坑，那么这⼀章我们就来深挖 Vue-Router 的实现细节，⼀旦我们掌握了它的实现原理，那么就能在开发中会路由的使⽤更加游刃有余

```html
<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 使⽤ router-link 组件来导航. -->
    <!-- 通过传⼊ `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成⼀个 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出⼝ -->
  <!-- 路由匹配到的组件将渲染在这⾥ -->
  <router-view></router-view>
</div>
```

```js
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
// 1. 定义（路由）组件。
// 可以从其他⽂件 import 进来
const Foo = { template: "<div>foo</div>" };
const Bar = { template: "<div>bar</div>" };
// 2. 定义路由
// 每个路由应该映射⼀个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是⼀个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: "/foo", component: Foo },
  { path: "/bar", component: Bar },
];
// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes, // （缩写）相当于 routes: routes
});
// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注⼊路由，
// 从⽽让整个应⽤都有路由功能
const app = new Vue({
  router,
}).$mount("#app");
```

### 路由注册

Vue 从它的设计上就是⼀个渐进式 JavaScript 框架，它本⾝的核⼼是解决视图渲染的问题，其它的能⼒就通过插件的⽅式来解决。Vue-Router 就是官⽅维护的路由插件，在介绍它的注册实现之前，我们先来分析⼀下 Vue 通⽤的插件注册原理

### Vue.use

Vue 提供了 Vue.use 的全局 API 来注册这些插件，所以我们先来分析⼀下它的实现原理，定义在 vue/src/core/global-api/use.js 中

Vue.use 接受⼀个 plugin 参数，并且维护了⼀个 \_installedPlugins 数组，它存储所有注册过的 plugin ；接着⼜会判断 plugin 有没有定义 install ⽅法，如果有的话则调⽤该⽅法，并且该⽅法执⾏的第⼀个参数是 Vue ；最后把 plugin 存储到 installedPlugins 中。可以看到 Vue 提供的插件注册机制很简单，每个插件都需要实现⼀个静态的 install ⽅法，当我们执⾏ Vue.use 注册插件的时候，就会执⾏这个 install ⽅法，并且在这个 install ⽅法的第⼀个参数我们可以拿到 Vue 对象，这样的好处就是作为插件的编写⽅不需要再额外去 import Vue 了。

### 路由安装

Vue-Router 的⼊⼝⽂件是 src/index.js ，其中定义了 VueRouter 类，也实现了 install 的静态⽅法： VueRouter.install = install ，它的定义在 src/install.js 中

当⽤户执⾏ Vue.use(VueRouter) 的时候，实际上就是在执⾏ install 函数，为了确保 install 逻辑只执⾏⼀次，⽤了 install.installed 变量做已安装的标志位。另外⽤⼀个全局的 \_Vue 来接收参数 Vue ，因为作为 Vue 的插件对 Vue 对象是有依赖的，但⼜不能去单独去 import Vue ，因为那样会增加包体积，所以就通过这种⽅式拿到 Vue 对象。

Vue-Router 安装最重要的⼀步就是利⽤ Vue.mixin 去把 beforeCreate 和 destroyed 钩⼦函数注⼊到每⼀个组件中。 Vue.mixin 的定义，在 vue/src/core/global-api/mixin.js 中

它的实现实际上⾮常简单，就是把要混⼊的对象通过 mergeOption 合并到 Vue 的 options 中，由于每个组件的构造函数都会在 extend 阶段合并 Vue.options 到⾃⾝的 options 中，所以也就相当于每个组件都定义了 mixin 定义的选项

回到 Vue-Router 的 install ⽅法，先看混⼊的 beforeCreated 钩⼦函数，对于根 Vue 实例⽽⾔，执⾏该钩⼦函数时定义了 this.\_routerRoot 表⽰它⾃⾝； this.\_router 表⽰ VueRouter 的实例 router ，它是在 new Vue 的时候传⼊的；另外执⾏了 this.\_router.init() ⽅法初始化 router ，这个逻辑之后介绍，然后⽤ defineReactive ⽅法把 this.\_route 变成响应式对象，这个作⽤我们之后会介绍。⽽对于⼦组件⽽⾔，由于组件是树状结构，在遍历组件树的过程中，它们在执⾏该钩⼦函数的时候 this.\_routerRoot 始终指向的是根 Vue 实例

对于 beforeCreated 和 destroyed 钩⼦函数，它们都会执⾏ registerInstance ⽅法，这个⽅法的作⽤我们也是之后会介绍。接着给 Vue 原型上定义了 $router 和 $route 2 个属性的 get ⽅法，这就是为什么我们可以在组件实例上可以访问 this.$router 以及 this.$route ，它们的作⽤之后介绍。接着⼜通过 Vue.component ⽅法定义了全局的 `<router-link> `和 `<router-view>` 2 个组件，这也是为什么我们在写模板的时候可以使⽤这两个标签，它们的作⽤也是之后介绍。最后定义了路由中的钩⼦函数的合并策略，和普通的钩⼦函数⼀样

那么到此为⽌，我们分析了 Vue-Router 的安装过程，Vue 编写插件的时候⼀定要提供静态的 install ⽅法，我们通过 Vue.use(plugin) 时候，就是在执⾏ install ⽅法。 Vue-Router 的 install ⽅法会给每⼀个组件注⼊ beforeCreated 和 destoryed 钩⼦函数，在 beforeCreated 做⼀些私有属性定义和路由初始化⼯作，下⼀节我们就来分析⼀下 VueRouter 对象的实现和它的初始化⼯作

### VueRouter 对象

VueRouter 的实现是⼀个类，我们先对它做⼀个简单地分析，它的定义在 src/index.js 中，VueRouter 定义了⼀些属性和⽅法，我们先从它的构造函数看，当我们执⾏ new VueRouter 的时候做了哪些事情

构造函数定义了⼀些属性，其中 this.app 表⽰根 Vue 实例， this.apps 保存所有⼦组件的 Vue 实例， this.options 保存传⼊的路由配置， this.beforeHooks 、this.resolveHooks 、 this.afterHooks 表⽰⼀些钩⼦函数，我们之后会介绍， this.matcher 表⽰路由匹配器，我们之后会介绍， this.fallback 表⽰路由创建失败的回调函数， this.mode 表⽰路由创建的模式， this.history 表⽰路由历史的具体的实现实例，它是根据 this.mode 的不同实现不同，它有 History 基类，然后不同的 history 实现都是继承 History ，这块我们之后会重点讲。

实例化 VueRouter 后会返回它的实例 router ，我们在 new Vue 的时候会把 router 作为配置的属性传⼊，回顾⼀下上⼀节我们讲 beforeCreated 混⼊的时候有这么⼀段代码

```js
beforeCreated() {
if (isDef(this.$options.router)) {
// ...
this._router = this.$options.router
this._router.init(this)
// ...
}
}
```

所以每个组件在执⾏ beforeCreated 钩⼦函数的时候，都会执⾏ router.init ⽅法,init 的逻辑很简单，它传⼊的参数是 Vue 实例，然后存储到 this.apps 中；只有根 Vue 实例会保存到 this.app 中，并且会拿到当前的 this.history ，根据它的不同类型来执⾏不同逻辑，由于我们平时使⽤ hash 路由多⼀些，所以我们先看这部分逻辑，先定义了 setupHashListener 函数，接着执⾏了 history.transitionTo ⽅法，它是定义在 History 基类中，代码在 src/history/base.js,我们先不着急去看 transitionTo 的具体实现，先看第⼀⾏代码，它调⽤了 this.router.match 函数,实际上是调⽤了 this.matcher.match ⽅法去做匹配，所以接下来我们先来了解⼀下 matcher 的相关实现

通过这⼀节的分析，我们⼤致对 VueRouter 类有了⼤致了解，知道了它的⼀些属性和⽅法，同时了了解到在组件的初始化阶段，执⾏到 beforeCreated 钩⼦函数的时候会执⾏ router.init ⽅法，然后⼜会执⾏ history.transitionTo ⽅法做路由过渡，进⽽引出了 matcher 的概念，接下来我们先研究⼀下 matcher 的相关实现

### matcher

matcher 相关的实现都在 src/create-matcher.js 中，我们先来看⼀下 matcher 的数据结构,Matcher 返回了 2 个⽅法， match 和 addRoutes ，在上⼀节我们接触到了 match ⽅法，顾名思义它是做匹配，那么匹配的是什么，在介绍之前，我们先了解路由中重要的 2 个概念， Loaction 和 Route ，它们的数据结构定义在 flow/declarations.js 中

Vue-Router 中定义的 Location 数据结构和浏览器提供的 window.location 部分结构有点类似，它们都是对 url 的结构化描述。举个例⼦： /abc?foo=bar&baz=qux#hello ，它的 path 是/abc ， query 是 {foo:bar,baz:qux} 。 Location 的其他属性我们之后会介绍

Route 表⽰的是路由中的⼀条线路，它除了描述了类似 Loctaion 的 path 、 query 、 hash 这些概念，还有 matched 表⽰匹配到的所有的 RouteRecord 。 Route 的其他属性我们之后会介绍

### createMatcher

在了解了 Location 和 Route 后，我们来看⼀下 matcher 的创建过程,createMatcher 接收 2 个参数，⼀个是 router ，它是我们 new VueRouter 返回的实例，⼀个是 routes ，它是⽤户定义的路由配置，来看⼀下我们之前举的例⼦中的配置

```js
const Foo = { template: "<div>foo</div>" };
const Bar = { template: "<div>bar</div>" };
const routes = [
  { path: "/foo", component: Foo },
  { path: "/bar", component: Bar },
];
```

createMathcer ⾸先执⾏的逻辑是 const { pathList, pathMap, nameMap } =createRouteMap(routes) 创建⼀个路由映射表， createRouteMap 的定义在 src/create-route-map 中,createRouteMap 函数的⽬标是把⽤户的路由配置转换成⼀张路由映射表，它包含 3 个部分， pathList 存储所有的 path ， pathMap 表⽰⼀个 path 到 RouteRecord 的映射关系，⽽ nameMap 表⽰ name 到 RouteRecord 的映射关系。那么 RouteRecord 到底是什么，先来看⼀下它的数据结构,它的创建是通过遍历 routes 为每⼀个 route 执⾏ addRouteRecord ⽅法⽣成⼀条记录，来看⼀下它的定义,我们只看⼏个关键逻辑, path 是规范化后的路径，它会根据 parent 的 path 做计算； regex 是⼀个正则表达式的扩展，它利⽤了 path-to-regexp 这个⼯具库，把 path 解析成⼀个正则表达式的扩展,components 是⼀个对象，通常我们在配置中写的 component 实际上这⾥会被转换成{components: route.component} ； instances 表⽰组件的实例，也是⼀个对象类型； parent 表⽰⽗的 RouteRecord ，因为我们配置的时候有时候会配置⼦路由，所以整个 RouteRecord 也就是⼀个树型结构

如果配置了 children ，那么递归执⾏ addRouteRecord ⽅法，并把当前的 record 作为 parent 传⼊，通过这样的深度遍历，我们就可以拿到⼀个 route 下的完整记录,为 pathList 和 pathMap 各添加⼀条记录,如果我们在路由配置中配置了 name ，则给 nameMap 添加⼀条记录

由于 pathList 、 pathMap 、 nameMap 都是引⽤类型，所以在遍历整个 routes 过程中去执⾏ addRouteRecord ⽅法，会不断给他们添加数据。那么经过整个 createRouteMap ⽅法的执⾏，我们得到的就是 pathList 、 pathMap 和 nameMap 。其中 pathList 是为了记录路由配置中的所有 path ，⽽ pathMap 和 nameMap 都是为了通过 path 和 name 能快速查到对应的 RouteRecord

再回到 createMather 函数，接下来就定义了⼀系列⽅法，最后返回了⼀个对象,也就是说， matcher 是⼀个对象，它对外暴露了 match 和 addRoutes ⽅法

### addRoutes

addRoutes ⽅法的作⽤是动态添加路由配置，因为在实际开发中有些场景是不能提前把路由写死的，需要根据⼀些条件动态添加路由，所以 Vue-Router 也提供了这⼀接⼝,addRoutes 的⽅法⼗分简单，再次调⽤ createRouteMap 即可，传⼊新的 routes 配置，由于 pathList 、 pathMap 、 nameMap 都是引⽤类型，执⾏ addRoutes 后会修改它们的值

### match

match ⽅法接收 3 个参数，其中 raw 是 RawLocation 类型，它可以是⼀个 url 字符串，也可以是⼀个 Location 对象； currentRoute 是 Route 类型，它表⽰当前的路径； redirectedFrom 和重定向相关，这⾥先忽略。 match ⽅法返回的是⼀个路径，它的作⽤是根据传⼊的 raw 和当前的路径 currentRoute 计算出⼀个新的路径并返回,⾸先执⾏了 normalizeLocation ，它的定义在 src/util/location.js 中,normalizeLocation ⽅法的作⽤是根据 raw ， current 计算出新的 location ，它主要处理了 raw 的两种情况，⼀种是有 params 且没有 path ，⼀种是有 path 的，对于第⼀种情况，如果 current 有 name ，则计算出的 location 也有 name 。计算出新的 location 后，对 location 的 name 和 path 的两种情况做了处理

有 name 的情况下就根据 nameMap 匹配到 record ，它就是⼀个 RouterRecord 对象，如果 record 不存在，则匹配失败，返回⼀个空路径；然后拿到 record 对应的 paramNames ，再对⽐ currentRoute 中的 params ，把交集部分的 params 添加到 location 中，然后在通过 fillParams ⽅法根据 record.path 和 location.path 计算出 location.path ，最后调⽤\_createRoute(record, location, redirectedFrom) 去⽣成⼀条新路径，该⽅法我们之后会介绍。

通过 name 我们可以很快的找到 record ，但是通过 path 并不能，因为我们计算后的 location.path 是⼀个真实路径，⽽ record 中的 path 可能会有 param ，因此需要对所有的 pathList 做顺序遍历， 然后通过 matchRoute ⽅法根据 record.regex 、 location.path 、 location.params 匹配，如果匹配到则也通过\_createRoute(record, location, redirectedFrom) 去⽣成⼀条新路径。因为是顺序遍历，所以我们书写路由配置要注意路径的顺序，因为写在前⾯的会优先尝试匹配

最后我们来看⼀下 \_createRoute 的实现,我们先不考虑 record.redirect 和 record.matchAs 的情况，最终会调⽤ createRoute ⽅法，它的定义在 src/uitl/route.js 中,createRoute 可以根据 record 和 location 创建出来，最终返回的是⼀条 Route 路径，我们之前也介绍过它的数据结构。在 Vue-Router 中，所有的 Route 最终都会通过 createRoute 函数创建，并且它最后是不可以被外部修改的。 Route 对象中有⼀个⾮常重要属性是 matched ，它通过 formatMatch(record) 计算⽽来,可以看它是通过 record 循环向上找 parent ，只到找到最外层，并把所有的 record 都 push 到⼀个数组中，最终返回的就是 record 的数组，它记录了⼀条线路上的所有 record 。 matched 属性⾮常有⽤，它为之后渲染组件提供了依据

那么到此， matcher 相关的主流程的分析就结束了，我们了解了 Location 、 Route 、 RouteRecord 等概念。并通过 matcher 的 match ⽅法，我们会找到匹配的路径 Route ，这个对 Route 的切换，组件的渲染都有⾮常重要的指导意义。下⼀节我们会回到 transitionTo ⽅法，看⼀看路径的切换都做了哪些事情

### 路径切换

history.transitionTo 是 Vue-Router 中⾮常重要的⽅法，当我们切换路由线路的时候，就会执⾏到该⽅法，前⼀节我们分析了 matcher 的相关实现，知道它是如何找到匹配的新线路，那么匹配到新线路后⼜做了哪些事情，接下来我们来完整分析⼀下 transitionTo 的实现，它的定义在 src/history/base.js 中，transitionTo ⾸先根据⽬标 location 和当前路径 this.current 执⾏ this.router.match ⽅法去匹配到⽬标的路径。这⾥ this.current 是 history 维护的当前路径，它的初始值是在 history 的构造函数中初始化的`this.current = START`,START 的定义在 src/util/route.js 中,这样就创建了⼀个初始的 Route ，⽽ transitionTo 实际上也就是在切换 this.current ，稍后我们会看到。拿到新的路径后，那么接下来就会执⾏ confirmTransition ⽅法去做真正的切换，由于这个过程可能有⼀些异步的操作（如异步组件），所以整个 confirmTransition API 设计成带有成功回调函数和失败回调函数，先来看⼀下它的定义,⾸先定义了 abort 函数，然后判断如果满⾜计算后的 route 和 current 是相同路径的话，则直接调⽤ this.ensureUrl 和 abort ， ensureUrl 这个函数我们之后会介绍,接着⼜根据 current.matched 和 route.matched 执⾏了 resolveQueue ⽅法解析出 3 个队列,因为 route.matched 是⼀个 RouteRecord 的数组，由于路径是由 current 变向 route ，那么就遍历对⽐ 2 边的 RouteRecord ，找到⼀个不⼀样的位置 i ，那么 next 中从 0 到 i 的 RouteRecord 是两边都⼀样，则为 updated 的部分；从 i 到最后的 RouteRecord 是 next 独有的，为 activated 的部分；⽽ current 中从 i 到最后的 RouteRecord 则没有了，为 deactivated 的部分。

拿到 updated 、 activated 、 deactivated 3 个 ReouteRecord 数组后，接下来就是路径变换后的⼀个重要部分，执⾏⼀系列的钩⼦函数

### 导航守卫

官⽅的说法叫导航守卫，实际上就是发⽣在路由路径切换的时候，执⾏的⼀系列钩⼦函数,我们先从整体上看⼀下这些钩⼦函数执⾏的逻辑，⾸先构造⼀个队列 queue ，它实际上是⼀个数组；然后再定义⼀个迭代器函数 iterator ；最后再执⾏ runQueue ⽅法来执⾏这个队列。我们先来看⼀下 runQueue 的定义，在 src/util/async.js 中这是⼀个⾮常经典的异步函数队列化执⾏的模式， queue 是⼀个 NavigationGuard 类型的数组，我们定义了 step 函数，每次根据 index 从 queue 中取⼀个 guard ，然后执⾏ fn 函数，并且把 guard 作为参数传⼊，第⼆个参数是⼀个函数，当这个函数执⾏的时候再递归执⾏ step 函数，前进到下⼀个，注意这⾥的 fn 就是我们刚才的 iterator 函数，那么我们再回到 iterator 函数的定义

iterator 函数逻辑很简单，它就是去执⾏每⼀个 导航守卫 hook ，并传⼊ route 、 current 和匿名函数，这些参数对应⽂档中的 to 、 from 、 next ，当执⾏了匿名函数，会根据⼀些条件执⾏ abort 或 next ，只有执⾏ next 的时候，才会前进到下⼀个导航守卫钩⼦函数中，这也就是为什么官⽅⽂档会说只有执⾏ next ⽅法来 resolve 这个钩⼦函数。

那么最后我们来看 queue 是怎么构造的:

按照顺序如下：

1. 在失活的组件⾥调⽤离开守卫。
2. 调⽤全局的 beforeEach 守卫。
3. 在重⽤的组件⾥调⽤ beforeRouteUpdate 守卫
4. 在激活的路由配置⾥调⽤ beforeEnter 。
5. 解析异步路由组件。

接下来我们来分别介绍这 5 步的实现

第⼀步是通过执⾏ extractLeaveGuards(deactivated) ，先来看⼀下 extractLeaveGuards 的定义,它内部调⽤了 extractGuards 的通⽤⽅法，可以从 RouteRecord 数组中提取各个阶段的守卫,这⾥⽤到了 flatMapComponents ⽅法去从 records 中获取所有的导航，它的定义在 src/util/resolve-components.js 中：flatMapComponents 的作⽤就是返回⼀个数组，数组的元素是从 matched ⾥获取到所有组件的 key ，然后返回 fn 函数执⾏的结果， flatten 作⽤是把⼆维数组拍平成⼀维数组,那么对于 extractGuards 中 flatMapComponents 的调⽤，执⾏每个 fn 的时候，通过 extractGuard(def, name) 获取到组件中对应 name 的导航守卫,获取到 guard 后，还会调⽤ bind ⽅法把组件的实例 instance 作为函数执⾏的上下⽂绑定到 guard 上， bind ⽅法的对应的是 bindGuard ,那么对于 extractLeaveGuards(deactivated) ⽽⾔，获取到的就是所有失活组件中定义的 beforeRouteLeave 钩⼦函数

第⼆步是 this.router.beforeHooks ，在我们的 VueRouter 类中定义了 beforeEach ⽅法，在 src/index.js 中,当⽤户使⽤ router.beforeEach 注册了⼀个全局守卫，就会往 router.beforeHooks 添加⼀个钩⼦函数，这样 this.router.beforeHooks 获取的就是⽤户注册的全局 beforeEach 守卫

第三步执⾏了 extractUpdateHooks(updated) ，来看⼀下 extractUpdateHooks 的定义,和 extractLeaveGuards(deactivated) 类似， extractUpdateHooks(updated) 获取到的就是所有重⽤的组件中定义的 beforeRouteUpdate 钩⼦函数

第四步是执⾏ activated.map(m => m.beforeEnter) ，获取的是在激活的路由配置中定义的 beforeEnter 函数

第五步是执⾏ resolveAsyncComponents(activated) 解析异步组件，先来看⼀下 resolveAsyncComponents 的定义，在 src/util/resolve-components.js 中,resolveAsyncComponents 返回的是⼀个导航守卫函数，有标准的 to 、 from 、 next 参数。它的内部实现很简单，利⽤了 flatMapComponents ⽅法从 matched 中获取到每个组件的定义，判断如果是异步组件，则执⾏异步组件加载逻辑，这块和我们之前分析 Vue 加载异步组件很类似，加载成功后会执⾏ `match.components[key] = resolvedDef` 把解析好的异步组件放到对应的 components 上，并且执⾏ next 函数,这样在 resolveAsyncComponents(activated) 解析完所有激活的异步组件后，我们就可以拿到这⼀次所有激活的组件。这样我们在做完这 5 步后⼜做了⼀些事情

1. 在被激活的组件⾥调⽤ beforeRouteEnter 。
2. 调⽤全局的 beforeResolve 守卫。
3. 调⽤全局的 afterEach 钩⼦

对于第六步有这些相关的逻辑,extractEnterGuards 函数的实现也是利⽤了 extractGuards ⽅法提取组件中的 beforeRouteEnter 导航钩⼦函数，和之前不同的是 bind ⽅法的不同。⽂档中特意强调了 beforeRouteEnter 钩⼦函数中是拿不到组件实例的，因为当守卫执⾏前，组件实例还没被创建，但是我们可以通过传⼀个回调给 next 来访问组件实例。在导航被确认的时候执⾏回调，并且把组件实例作为回调⽅法的参数

```js
beforeRouteEnter (to, from, next) {
next(vm => {
// 通过 `vm` 访问组件实例
})
}
```

来看⼀下这是怎么实现的。在 bindEnterGuard 函数中，返回的是 routeEnterGuard 函数，所以在执⾏ iterator 中的 hook 函数的时候，就相当于执⾏ routeEnterGuard 函数，那么就会执⾏我们定义的导航守卫 guard 函数，并且当这个回调函数执⾏的时候，⾸先执⾏ next 函数 rersolve 当前导航钩⼦,然后把回调函数的参数，它也是⼀个回调函数⽤ cbs 收集起来，其实就是收集到外⾯定义的 postEnterCbs 中，然后在最后会执⾏

```js
if (this.router.app) {
  this.router.app.$nextTick(() => {
    postEnterCbs.forEach((cb) => {
      cb();
    });
  });
}
```

在根路由组件重新渲染后，遍历 postEnterCbs 执⾏回调，每⼀个回调执⾏的时候，其实是执⾏ poll(cb, match.instances, key, isValid) ⽅法，因为考虑到⼀些了路由组件被套 transition 組件在⼀些缓动模式下不⼀定能拿到实例，所以⽤⼀个轮询⽅法不断去判断，直到能获取到组件实例，再去调⽤ cb ，并把组件实例作为参数传⼊，这就是我们在回调函数中能拿到组件实例的原因

第七步是获取 this.router.resolveHooks ，这个和 this.router.beforeHooks 的获取类似，在我们的 VueRouter 类中定义了 beforeResolve ⽅法,当⽤户使⽤ router.beforeResolve 注册了⼀个全局守卫，就会往 router.resolveHooks 添加⼀个钩⼦函数，这样 this.router.resolveHooks 获取的就是⽤户注册的全局 beforeResolve 守卫

第⼋步是在最后执⾏了 onComplete(route) 后，会执⾏ this.updateRoute(route) ⽅法,同样在我们的 VueRouter 类中定义了 afterEach ⽅法,当⽤户使⽤ router.afterEach 注册了⼀个全局守卫，就会往 router.afterHooks 添加⼀个钩⼦函数，这样 this.router.afterHooks 获取的就是⽤户注册的全局 afterHooks 守卫

那么⾄此我们把所有导航守卫的执⾏分析完毕了，我们知道路由切换除了执⾏这些钩⼦函数，从表象上有 2 个地⽅会发⽣变化，⼀个是 url 发⽣变化，⼀个是组件发⽣变化。接下来我们分别介绍这两块的实现原理

### url

在 confirmTransition 的 onComplete 函数中，在 updateRoute 后，会执⾏ this.ensureURL() 函数，这个函数是⼦类实现的，不同模式下该函数的实现略有不同，我们来看⼀下平时使⽤最多的 hash 模式该函数的实现，在 src/history/hash.js 中，ensureURL 函数⾸先判断当前 hash 和当前的券路径是否相等，如果不相等，则根据 push 参数决定执⾏ pushHash 或者是 replaceHash， supportsPushState 的定义在 src/util/push-state.js 中，如果⽀持的话，则获取当前完整的 url ，执⾏ pushState ⽅法，pushState 会调⽤浏览器原⽣的 history 的 pushState 接⼝或者 replaceState 接⼝，更新浏览器的 url 地址，并把当前 url 压⼊历史栈中，然后在 history 的初始化中，会设置⼀个监听器，监听历史栈的变化，当点击浏览器返回按钮的时候，如果已经有 url 被压⼊历史栈，则会触发 popstate 事件，然后拿到当前要跳转的 hash ，执⾏ transtionTo ⽅法做⼀次路径转换

在使⽤ Vue-Router 开发项⽬的时候，打开调试⻚⾯ http://localhost:8080 后会⾃动把 url 修改为 http://localhost:8080/#/ ，这是怎么做到呢？原来在实例化 HashHistory 的时候，构造函数会执⾏ ensureSlash() ⽅法，这个时候 path 为空，所以执⾏ replaceHash('/' + path) ，然后内部会执⾏⼀次 getUrl ，计算出来的新的 url 为 http://localhost:8080/#/ ，这就是 url 会改变的原因

### 组件

路由最终的渲染离不开组件，Vue-Router 内置了`<router-view>`组件，它的定义在 src/components/view.js 中,`<router-view> `是⼀个 functional 组件，它的渲染也是依赖 render 函数，那么 `<router-view>` 具体应该渲染什么组件呢，⾸先获取当前的路径,我们之前分析过，在 src/install.js 中，我们给 Vue 的原型上定义了 \$route ,然后在 VueRouter 的实例执⾏ router.init ⽅法的时候，会执⾏如下逻辑，定义在 src/index.js 中

```js
history.listen((route) => {
  this.apps.forEach((app) => {
    app._route = route;
  });
});
```

⽽ history.listen ⽅法定义在 src/history/base.js 中,然后在 updateRoute 的时候执⾏ this.cb,也就是我们执⾏ transitionTo ⽅法最后执⾏ updateRoute 的时候会执⾏回调，然后会更新所有组件实例的 \_route 值，所以说 \$route 对应的就是当前的路由线路

`<router-view>` 是⽀持嵌套的，回到 render 函数，其中定义了 depth 的概念，它表⽰`<router-view>` 嵌套的深度。每个 `<router-view>` 在渲染的时候，执⾏如下逻辑,parent.\_routerRoot 表⽰的是根 Vue 实例，那么这个循环就是从当前的 `<router-view>` 的⽗节点向上找，⼀直找到根 Vue 实例，在这个过程，如果碰到了⽗节点也是 `<router-view>` 的时候，说明 `<router-view>` 有嵌套的情况， depth++ 。遍历完成后，根据当前线路匹配的路径和 depth 找到对应的 RouteRecord ，进⽽找到该渲染的组件

除了找到了应该渲染的组件，还定义了⼀个注册路由实例的⽅法,给 vnode 的 data 定义了 registerRouteInstance ⽅法，在 src/install.js 中，我们会调⽤该⽅法去注册路由的实例,在混⼊的 beforeCreate 钩⼦函数中，会执⾏ registerInstance ⽅法，进⽽执⾏ render 函数中定义的 registerRouteInstance ⽅法，从⽽给` matched.instances[name]` 赋值当前组件的 vm 实例,render 函数的最后根据 component 渲染出对应的组件 vonde ,那么当我们执⾏ transitionTo 来更改路由线路后，组件是如何重新渲染的呢？在我们混⼊的 beforeCreated 钩⼦函数中有这么⼀段逻辑

由于我们把根 Vue 实例的 \_route 属性定义成响应式的，我们在每个 `<router-view> `执⾏ render 函数的时候，都会访问 parent.\$route ，如我们之前分析会访问 this.\_routerRoot.\_route ，触发了它的 getter ，相当于 `<router-view> `对它有依赖，然后再执⾏完 transitionTo 后，修改 app.\_route 的时候，⼜触发了 setter ，因此会通知 `<router-view>` 的渲染 watcher 更新，重新渲染组件

Vue-Router 还内置了另⼀个组件` <router-link>` ， 它⽀持⽤户在具有路由功能的应⽤中（点击）导航。 通过 to 属性指定⽬标地址，默认渲染成带有正确链接的`<a>`标签，可以通过配置 tag 属性⽣成别的标签。另外，当⽬标路由成功激活时，链接元素⾃动设置⼀个表⽰激活的 CSS 类名,`<router-link>` ⽐起写死的 `<a href="...">` 会好⼀些，理由如下:

⽆论是 HTML5 history 模式还是 hash 模式，它的表现⾏为⼀致，所以，当你要切换路由模式，或者在 IE9 降级使⽤ hash 模式，⽆须作任何变动,在 HTML5 history 模式下， router-link 会守卫点击事件，让浏览器不再重新加载⻚⾯。当你在 HTML5 history 模式下使⽤ base 选项之后，所有的 to 属性都不需要写（基路径）了。那么接下来我们就来分析它的实现，它的定义在 src/components/link.js 中

`<router-link> `标签的渲染也是基于 render 函数，它⾸先做了路由解析,router.resolve 是 VueRouter 的实例⽅法，它的定义在 src/index.js 中,它先规范⽣成⽬标 location ，再根据 location 和 match 通过 this.match ⽅法计算⽣成⽬标路径 route ，然后再根据 base 、 fullPath 和 this.mode 通过 createHref ⽅法计算出最终跳转的 href ,解析完 router 获得⽬标 location 、 route 、 href 后，接下来对 exactActiveClass 和 activeClass 做处理，当配置 exact 为 true 的时候，只有当⽬标路径和当前路径完全匹配的时候，会添加 exactActiveClass ；⽽当⽬标路径包含当前路径的时候，会添加 activeClass 。接着创建了⼀个守卫函数,最终会监听点击事件或者其它可以通过 prop 传⼊的事件类型，执⾏ hanlder 函数，最终执⾏ router.push 或者 router.replace 函数，它们的定义在 src/index.js 中,实际上就是执⾏了 history 的 push 和 replace ⽅法做路由跳转,最后判断当前 tag 是否是 `<a>` 标签， `<router-link>` 默认会渲染成` <a>` 标签，当然我们也可以修改 tag 的 prop 渲染成其他节点，这种情况下会尝试找它⼦元素的 `<a>` 标签，如果有则把事件绑定到 `<a>` 标签上并添加 href 属性，否则绑定到外层元素本⾝

那么⾄此我们把路由的 transitionTo 的主体过程分析完毕了，其他⼀些分⽀⽐如重定向、别名、滚动⾏为等可以⾃⾏再去分析

路径变化是路由中最重要的功能，我们要记住以下内容：路由始终会维护当前的线路，路由切换的时候会把当前线路切换到⽬标线路，切换过程中会执⾏⼀系列的导航守卫钩⼦函数，会更改 url，同样也会渲染对应的组件，切换完毕后会把⽬标线路更新替换当前线路，这样就会作为下⼀次的路径切换的依据

## vuex

Vuex 应⽤的核⼼就是 store（仓库）。“store”基本上就是⼀个容器，它包含着你的应⽤中⼤部分的状态(state)。有些人可能会问，那我定义⼀个全局对象，再去上层封装了⼀些数据存取的接⼝不也可以么

Vuex 和单纯的全局对象有以下两点不同：

- Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发⽣变化，那么相应的组件也会相应地得到⾼效更新。
- 你不能直接改变 store 中的状态。改变 store 中的状态的唯⼀途径就是显式地提交 (commit)mutation。这样使得我们可以⽅便地跟踪每⼀个状态的变化，从⽽让我们能够实现⼀些⼯具帮助我们更好地了解我们的应⽤

### Vuex 初始化

另外，通过定义和隔离状态管理中的各种概念并强制遵守⼀定的规则，我们的代码将会变得更结构化且易维护，这⼀节我们主要来分析 Vuex 的初始化过程，它包括安装、Store 实例化过程 2 个⽅⾯

### 安装

当我们在代码中通过 import Vuex from 'vuex' 的时候，实际上引⽤的是⼀个对象，它的定义在 src/index.js 中，和 Vue-Router ⼀样，Vuex 也同样存在⼀个静态的 install ⽅法，它的定义在 src/store.js 中，install 的逻辑很简单，把传⼊的 \_Vue 赋值给 Vue 并执⾏了 applyMixin(Vue) ⽅法，它的定义在 src/mixin.js 中，applayMixin 就是这个 export default function ，它还兼容了 Vue 1.0 的版本，这⾥我们只关注 Vue 2.0 以上版本的逻辑，它其实就全局混⼊了⼀个 beforeCreated 钩⼦函数，它的实现⾮常简单，就是把 options.store 保存在所有组件的 this.$store 中，这个 options.store 就是我们在实例化 Store 对象的实例，稍后我们会介绍，这也是为什么我们在组件中可以通过 this.$store 访问到这个实例

### Store 实例化

我们在 import Vuex 之后，会实例化其中的 Store 对象，返回 store 实例并传⼊ new Vue 的 options 中，也就是我们刚才提到的 options.store，Store 对象的构造函数接收⼀个对象参数，它包含 actions 、 getters 、 state 、 mutations 、 modules 等 Vuex 的核⼼概念，它的定义在 src/store.js 中，我们把 Store 的实例化过程拆成 3 个部分，分别是初始化模块，安装模块和初始化 store.\_vm ，接下来我们来分析这 3 部分的实现

### 初始化模块

在分析模块初始化之前，我们先来了解⼀下模块对于 Vuex 的意义：由于使⽤单⼀状态树，应⽤的所有状态会集中到⼀个⽐较⼤的对象，当应⽤变得⾮常复杂时， store 对象就有可能变得相当臃肿。为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有⾃⼰的 state 、 mutation 、 action 、 getter ，甚⾄是嵌套⼦模块——从上⾄下进⾏同样⽅式的分割,所以从数据结构上来看，模块的设计就是⼀个树型结构， store 本⾝可以理解为⼀个 rootmodule ，它下⾯的 modules 就是⼦模块，Vuex 需要完成这颗树的构建，构建过程的⼊⼝就是`this._modules = new ModuleCollection(options)`,ModuleCollection 的定义在 src/module/module-collection.js 中

ModuleCollection 实例化的过程就是执⾏了 register ⽅法， register 接收 3 个参数，其中 path 表⽰路径，因为我们整体⽬标是要构建⼀颗模块树， path 是在构建树的过程中维护的路径； rawModule 表⽰定义模块的原始配置； runtime 表⽰是否是⼀个运⾏时创建的模块,register ⽅法⾸先通过 const newModule = new Module(rawModule, runtime) 创建了⼀个 Module 的实例， Module 是⽤来描述单个模块的类，它的定义在 src/module/module.js 中,来看⼀下 Module 的构造函数，对于每个模块⽽⾔， this.\_rawModule 表⽰模块的配置， this.\_children 表⽰它的所有⼦模块， this.state 表⽰这个模块定义的 state,回到 register ，那么在实例化⼀个 Module 后，判断当前的 path 的⻓度如果为 0，则说明它是⼀个根模块，所以把 newModule 赋值给了 this.root ，否则就需要建⽴⽗⼦关系了,我们先⼤体上了解它的逻辑：⾸先根据路径获取到⽗模块，然后再调⽤⽗模块的 addChild ⽅法建⽴⽗⼦关系,register 的最后⼀步，就是遍历当前模块定义中的所有 modules ，根据 key 作为 path ，递归调⽤ register ⽅法，这样我们再回过头看⼀下建⽴⽗⼦关系的逻辑，⾸先执⾏了 this.get(path.slice(0, -1) ⽅法,传⼊的 path 是它的⽗模块的 path ，然后从根模块开始，通过 reduce ⽅法⼀层层去找到对应的模块，查找的过程中，执⾏的是 module.getChild(key) ⽅法,其实就是返回当前模块的 \_children 中对应 key 的模块，那么每个模块的 \_children 是如何添加的呢，是通过执⾏ parent.addChild(path[path.length - 1], newModule) ⽅法,所以说对于 root module 的下⼀层 modules 来说，它们的 parent 就是 root module ，那么他们就会被添加的 root module 的 \_children 中。每个⼦模块通过路径找到它的⽗模块，然后通过⽗模块的 addChild ⽅法建⽴⽗⼦关系，递归执⾏这样的过程，**最终就建⽴⼀颗完整的模块树**

### 安装模块

初始化模块后，执⾏安装模块的相关逻辑，它的⽬标就是对模块中的 state 、 getters 、 mutations 、 actions 做初始化⼯作，它的⼊⼝代码是

```js
const state = this._modules.root.state;
installModule(this, state, [], this._modules.root);
```

来看⼀下 installModule 的定义,installModule ⽅法⽀持 5 个参数， store 表⽰ root store ； state 表⽰ rootstate ； path 表⽰模块的访问路径； module 表⽰当前的模块， hot 表⽰是否是热更新,接下来看函数逻辑，这⾥涉及到了命名空间的概念，默认情况下，模块内部的 action 、 mutation 和 getter 是注册在全局命名空间的——这样使得多个模块能够对同⼀ mutation 或 action 作出响应。如果我们希望模块具有更⾼的封装度和复⽤性，可以通过添加 namespaced: true 的⽅式使其成为带命名空间的模块。当模块被注册后，它的所有 getter 、 action 及 mutation 都会⾃动根据模块注册的路径调整命名。

回到 installModule ⽅法，我们⾸先根据 path 获取 namespace,getNamespace 的定义在 src/module/module-collection.js 中,从 root module 开始，通过 reduce ⽅法⼀层层找⼦模块，如果发现该模块配置了 namespaced 为 true，则把该模块的 key 拼到 namesapce 中，最终返回完整的 namespace 字符串。回到 installModule ⽅法，接下来把 namespace 对应的模块保存下来，为了⽅便以后能根据 namespace 查找模块,接下来判断⾮ root module 且⾮ hot 的情况执⾏⼀些逻辑，我们稍后再看。接着是很重要的逻辑，构造了⼀个本地上下⽂环境`const local = module.context = makeLocalContext(store, namespace, path)`,来看⼀下 makeLocalContext 实现,makeLocalContext ⽀持 3 个参数相关， store 表⽰ root store ； namespace 表⽰模块的命名空间， path 表⽰模块的 path,该⽅法定义了 local 对象，对于 dispatch 和 commit ⽅法，如果没有 namespace ，它们就直接指向了 root store 的 dispatch 和 commit ⽅法，否则会创建⽅法，把 type ⾃动拼接上 namespace ，然后执⾏ store 上对应的⽅法,对于 getters ⽽⾔，如果没有 namespace ，则直接返回 root store 的 getters ，否则返回 makeLocalGetters(store, namespace) 的返回值

makeLocalGetters ⾸先获取了 namespace 的⻓度，然后遍历 root store 下的所有 getters ，先判断它的类型是否匹配 namespace ，只有匹配的时候我们从 namespace 的位置截取后⾯的字符串得到 localType ，接着⽤ Object.defineProperty 定义了 gettersProxy ，获取 localType 实际上是访问了 `store.getters[type]`,回到 makeLocalContext ⽅法，再来看⼀下对 state 的实现，它的获取则是通过 getNestedState(store.state, path) ⽅法,getNestedState 逻辑很简单，从 root state 开始，通过 path.reduce ⽅法⼀层层查找⼦模块 state ，最终找到⽬标模块的 state,那么构造完 local 上下⽂后，我们再回到 installModule ⽅法，接下来它就会遍历模块中定义的 mutations 、 actions 、 getters ，分别执⾏它们的注册⼯作，它们的注册逻辑都⼤同⼩异。

**registerMutation**:⾸先遍历模块中的 mutations 的定义，拿到每⼀个 mutation 和 key ，并把 key 拼接上 namespace ，然后执⾏ registerMutation ⽅法。该⽅法实际上就是给 root store 上的`_mutations[types] `添加 wrappedMutationHandler ⽅法，该⽅法的具体实现我们之后会提到。注意，同⼀ type 的 \_mutations 可以对应多个⽅法

**registerAction**:⾸先遍历模块中的 actions 的定义，拿到每⼀个 action 和 key ，并判断 action.root ，如果否的情况把 key 拼接上 namespace ，然后执⾏ registerAction ⽅法。该⽅法实际上就是给 root store 上的 `_actions[types] `添加 wrappedActionHandler ⽅法，该⽅法的具体实现我们之后会提到。注意，同⼀ type 的 \_actions 可以对应多个⽅法

**registerGetter**:⾸先遍历模块中的 getters 的定义，拿到每⼀个 getter 和 key ，并把 key 拼接上 namespace ，然后执⾏ registerGetter ⽅法。该⽅法实际上就是给 root store 上的`_wrappedGetters[key] `指定 wrappedGetter ⽅法，该⽅法的具体实现我们之后会提到。注意，同⼀ type 的 \_wrappedGetters 只能定义⼀个

再回到 installModule ⽅法，最后⼀步就是遍历模块中的所有⼦ modules ，递归执⾏ installModule ⽅法,之前我们忽略了⾮ root module 下的 state 初始化逻辑，现在来看⼀下,之前我们提到过 getNestedState ⽅法，它是从 root state 开始，⼀层层根据模块名能访问到对应 path 的 state ，那么它每⼀层关系的建⽴实际上就是通过这段 state 的初始化逻辑。 store.\_withCommit ⽅法我们之后再介绍,所以 installModule 实际上就是完成了模块下的 state 、 getters 、 actions 、 mutations 的初始化⼯作，并且通过递归遍历的⽅式，就完成了所有⼦模块的安装⼯作

### 初始化 store.\_vm

Store 实例化的最后⼀步，就是执⾏初始化 store.\_vm 的逻辑，它的⼊⼝代码是:`resetStoreVM(this, state)`,来看⼀下 resetStoreVM 的定义,resetStoreVM 的作⽤实际上是想建⽴ getters 和 state 的联系，因为从设计上 getters 的获取就依赖了 state ，并且希望它的依赖能被缓存起来，且只有当它的依赖值发⽣了改变才会被重新计算。因此这⾥利⽤了 Vue 中⽤ computed 计算属性来实现,resetStoreVM ⾸先遍历了 \_wrappedGetters 获得每个 getter 的函数 fn 和 key ，然后定义了`computed[key] = () => fn(store)`。我们之前提到过 \_wrappedGetters 的初始化过程，这⾥ fn(store) 相当于执⾏如下⽅法

```js
store._wrappedGetters[type] = function wrappedGetter(store) {
  return rawGetter(
    local.state, // local state
    local.getters, // local getters
    store.state, // root state
    store.getters // root getters
  );
};
```

返回的就是 rawGetter 的执⾏函数， rawGetter 就是⽤户定义的 getter 函数，它的前 2 个参数是 local state 和 local getters ，后 2 个参数是 root state 和 root getters,接着实例化⼀个 Vue 实例 store.\_vm ，并把 computed 传⼊,我们发现 data 选项⾥定义了 $$state 属性，⽽我们访问 store.state 的时候，实际上会访问Store 类上定义的 state 的 get ⽅法,它实际上就访问了 store._vm_data.$$state 。那么 getters 和 state 是如何建⽴依赖逻辑的呢，我们再看这段代码逻辑：

```js
forEachValue(wrappedGetters, (fn, key) => {
  // use computed to leverage its lazy-caching mechanism
  computed[key] = () => fn(store);
  Object.defineProperty(store.getters, key, {
    get: () => store._vm[key],
    enumerable: true, // for local getters
  });
});
```

当我根据 key 访问 store.getters 的某⼀个 getter 的时候，实际上就是访问了`store._vm[key] `，也就是 `computed[key]` ，在执⾏ `computed[key]` 对应的函数的时候，会执⾏ rawGetter(local.state,...) ⽅法，那么就会访问到 store.state ，进⽽访问到 store.\_vm_data.\$\$state ，这样就建⽴了⼀个依赖关系。当 store.state 发⽣变化的时候，下⼀次再访问 store.getters 的时候会重新计算

当严格模式下， store.\_vm 会添加⼀个 wathcer 来观测 this.\_data.\$\$state 的变化，也就是当 store.state 被修改的时候, store.\_committing 必须为 true，否则在开发阶段会报警告。 store.\_committing 默认值是 false ，那么它什么时候会 true 呢， Store 定义了\_withCommit 实例⽅法,它就是对 fn 包装了⼀个环境，确保在 fn 中执⾏任何逻辑的时候 this.\_committing = true 。所以外部任何⾮通过 Vuex 提供的接⼝直接操作修改 state 的⾏为都会在开发阶段触发警告。

那么⾄此，Vuex 的初始化过程就分析完毕了，除了安装部分，我们重点分析了 Store 的实例化过程。我们要把 store 想象成⼀个数据仓库，为了更⽅便的管理仓库，我们把⼀个⼤的 store 拆成⼀些 modules ，整个 modules 是⼀个树型结构。每个 module ⼜分别定义了 state ， getters ， mutations 、 actions ，我们也通过递归遍历模块的⽅式都完成了它们的初始化。为了 module 具有更⾼的封装度和复⽤性，还定义了 namespace 的概念。最后我们还定义了⼀个内部的 Vue 实例，⽤来建⽴ state 到 getters 的联系，并且可以在严格模式下监测 state 的变化是不是来⾃外部，确保改变 state 的唯⼀途径就是显式地提交 mutation,这⼀节我们已经建⽴好 store ，接下来就是对外提供了⼀些 API ⽅便我们对这个 store 做数据存取的操作，下⼀节我们就来从源码⾓度来分析 Vuex 提供的⼀系列 API

### API

上⼀节我们对 Vuex 的初始化过程有了深⼊的分析，在我们构造好这个 store 后，需要提供⼀些 API 对这个 store 做存取的操作，那么这⼀节我们就从源码的⾓度对这些 API 做分析

### 数据获取

Vuex 最终存储的数据是在 state 上的，我们之前分析过在 store.state 存储的是 rootstate ，那么对于模块上的 state ，假设我们有 2 个嵌套的 modules ，它们的 key 分别为 a 和 b ，我们可以通过 store.state.a.b.xxx 的⽅式去获取。它的实现是在发⽣在 installModule 的时候,在递归执⾏ installModule 的过程中，就完成了整个 state 的建设，这样我们就可以通过 module 名的 path 去访问到⼀个深层 module 的 state ,有些时候，我们获取的数据不仅仅是⼀个 state ，⽽是由多个 state 计算⽽来，Vuex 提供了 getters ，允许我们定义⼀个 getter 函数，我们在 installModule 的过程中，递归执⾏了所有 getters 定义的注册，在之后的 resetStoreVM 过程中，执⾏了 store.getters 的初始化⼯作,在 installModule 的过程中，为建⽴了每个模块的上下⽂环境， 因此当我们访问 store.getters.xxx 的时候，实际上就是执⾏了 rawGetter(local.state,...) ， rawGetter 就是我们定义的 getter ⽅法，这也就是为什么我们的 getter 函数⽀持这四个参数，并且除了全局的 state 和 getter 外，我们还可以访问到当前 module 下的 state 和 getter

### 数据存储

Vuex 对数据存储的存储本质上就是对 state 做修改，并且只允许我们通过提交 mutaion 的形式去修改 state ， mutation 是⼀个函数，mutations 的初始化也是在 installModule 的时候,store 提供了 commit ⽅法让我们提交⼀个 mutation ,这⾥传⼊的 \_type 就是 mutation 的 type ，我们可以从 store.\_mutations 找到对应的函数数组，遍历它们执⾏获取到每个 handler 然后执⾏，实际上就是执⾏了 hwrappedMutationHandler(playload) ，接着会执⾏我们定义的 mutation 函数，并传⼊当前模块的 state ，所以我们的 mutation 函数也就是对当前模块的 state 做修改

需要注意的是， mutation 必须是同步函数，但是我们在开发实际项⽬中，经常会遇到要先去发送⼀个请求，然后根据请求的结果去修改 state ，那么单纯只通过 mutation 是⽆法完成需求，因此 Vuex ⼜给我们设计了⼀个 action 的概念,action 类似于 mutation ，不同在于 action 提交的是 mutation ，⽽不是直接操作 state ，并且它可以包含任意异步操作。actions 的初始化也是在 installModule 的时候,store 提供了 dispatch ⽅法让我们提交⼀个 action,这⾥传⼊的 \_type 就是 action 的 type ，我们可以从 store.\_\_actions 找到对应的函数数组，遍历它们执⾏获取到每个 handler 然后执⾏，实际上就是执⾏了 wrappedActionHandler(payload) ，接着会执⾏我们定义的 action 函数，并传⼊⼀个对象，包含了当前模块下的 dispatch 、 commit 、 getters 、 state ，以及全局的 rootState 和 rootGetters ，所以我们定义的 action 函数能拿到当前模块下的 commit ⽅法。因此 action ⽐我们⾃⼰写⼀个函数执⾏异步操作然后提交 muataion 的好处是在于它可以在参数获取到当前模块的⼀些⽅法和状态，Vuex 帮我们做好了这些。

### 语法糖

我们知道 store 是 Store 对象的⼀个实例，它是⼀个原⽣的 Javascript 对象，我们可以在任意地⽅使⽤它们。但⼤部分的使⽤场景还是在组件中使⽤，那么我们之前介绍过，在 Vuex 安装阶段，它会往每⼀个组件实例上混⼊ befeforeCreated 钩⼦函数，然后往组件实例上添加⼀个 \$store 的实例，它指向的就是我们实例化的 store ，因此我们可以在组件中访问到 store 的任何属性和⽅法。但是当⼀个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。同样这些问题也在存于 getter 、 mutation 和 action ,为了解决这个问题，Vuex 提供了⼀系列 mapXXX 辅助函数帮助我们实现在组件中可以很⽅便的注⼊ store 的属性和⽅法

#### mapState

⾸先 mapState 是通过执⾏ normalizeNamespace 返回的函数，它接收 2 个参数，其中 namespace 表⽰命名空间， map 表⽰具体的对象， namespace 可不传，稍后我们来介绍 namespace 的作⽤。当执⾏ mapState(map) 函数的时候，实际上就是执⾏ normalizeNamespace 包裹的函数，然后把 map 作为参数 states 传⼊。mapState 最终是要构造⼀个对象，每个对象的元素都是⼀个⽅法，因为这个对象是要扩展到组件的 computed 计算属性中的。函数⾸先执⾏ normalizeMap ⽅法，把这个 states 变成⼀个数组，数组的每个元素都是 {key, val} 的形式。接着再遍历这个数组，以 key 作为对象的 key ，值为⼀个 mappedState 的函数，在这个函数的内部，获取到 $store.getters 和 $store.state ，然后再判断数组的 val 如果是⼀个函数，执⾏该函数，传⼊ state 和 getters ，否则直接访问`state[val] `,⽐起⼀个个⼿动声明计算属性， mapState 确实要⽅便许多，下⾯我们来看⼀下 namespace 的作⽤,当我们想访问⼀个⼦模块的 state 的时候，我们可能需要这样访问

```js
computed: {
mapState({
a: state => state.some.nested.module.a,
b: state => state.some.nested.module.b
})
},
```

这样从写法上就很不友好， mapState ⽀持传⼊ namespace ， 因此我们可以这么写

```js
computed: {
mapState('some/nested/module', {
a: state => state.a,
b: state => state.b
})
},
```

这样看起来就清爽许多。在 mapState 的实现中，如果有 namespace ，则尝试去通过 getModuleByNamespace(this.\$store, 'mapState', namespace) 对应的 module ，然后把 state 和 getters 修改为 module 对应的 state 和 getters,我们在 Vuex 初始化执⾏ installModule 的过程中，初始化了这个映射表

#### mapGetters

和 mapState 类似， mapGetters 是将 store 中的 getter 映射到局部计算属性,mapGetters 也同样⽀持 namespace ，如果不写 namespace ，访问⼀个⼦ module 的属性需要写很⻓的 key ，⼀旦我们使⽤了 namespace ，就可以⽅便我们的书写，每个 mappedGetter 的实现实际上就是取 `this.$store.getters[val] `

#### mapMutations

```js
import { mapMutations } from 'vuex'
export default {
// ...
methods: {
...mapMutations([
'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
// `mapMutations` 也⽀持载荷：
'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('inc
rementBy', amount)`
]),
...mapMutations({
add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
})
}
}
```

我们可以在组件中使⽤ this.\$store.commit('xxx') 提交 mutation ，或者使⽤ mapMutations 辅助函数将组件中的 methods 映射为 store.commit 的调⽤,mapMutations ⽀持传⼊⼀个数组或者⼀个对象，⽬标都是组件中对应的 methods 映射为 store.commit 的调⽤。来看⼀下它的定义,可以看到 mappedMutation 同样⽀持了 namespace ，并且⽀持了传⼊额外的参数 args ，作为提交 mutation 的 payload ，最终就是执⾏了 store.commit ⽅法，并且这个 commit 会根据传⼊的 namespace 映射到对应 module 的 commit 上

#### mapActions

我们可以在组件中使⽤ this.\$store.dispatch('xxx') 提交 action ，或者使⽤ mapActions 辅助函数将组件中的 methods 映射为 store.dispatch 的调⽤。mapActions 在⽤法上和 mapMutations ⼏乎⼀样，实现也很类似,和 mapMutations 的实现⼏乎⼀样，不同的是把 commit ⽅法换成了 dispatch

#### 动态更新模块

在 Vuex 初始化阶段我们构造了模块树，初始化了模块上各个部分。在有⼀些场景下，我们需要动态去注⼊⼀些新的模块，Vuex 提供了模块动态注册功能，在 store 上提供了⼀个 registerModule 的 API,registerModule ⽀持传⼊⼀个 path 模块路径 和 rawModule 模块定义，⾸先执⾏ register ⽅法扩展我们的模块树，接着执⾏ installModule 去安装模块，最后执⾏ resetStoreVM 重新实例化 store.\_vm ，并销毁旧的 store_vm ,相对的，有动态注册模块的需求就有动态卸载模块的需求，Vuex 提供了模块动态卸载功能，在 store 上提供了⼀个 unregisterModule 的 API,unregisterModule ⽀持传⼊⼀个 path 模块路径，⾸先执⾏ unregister ⽅法去修剪我们的模块树,注意，这⾥只会移除我们运⾏时动态创建的模块,接着会删除 state 在该路径下的引⽤，最后执⾏ resetStore ⽅法,该⽅法就是把 store 下的对应存储的 \_actions 、 \_mutations 、 \_wrappedGetters 和\_modulesNamespaceMap 都清空，然后重新执⾏ installModule 安装所有模块以及 resetStoreVM 重置 store.\_vm

那么⾄此，Vuex 提供的⼀些常⽤ API 我们就分析完了，包括数据的存取、语法糖、模块的动态更新等。要理解 Vuex 提供这些 API 都是⽅便我们在对 store 做各种操作来完成各种能⼒，尤其是 mapXXX 的设计，让我们在使⽤ API 的时候更加⽅便，这也是我们今后在设计⼀些 JavaScript 库的时候，从 API 设计⾓度中应该学习的⽅向

### 插件

Vuex 除了提供的存取能⼒，还提供了⼀种插件能⼒，让我们可以监控 store 的变化过程来做⼀些事情,Vuex 的 store 接受 plugins 选项，我们在实例化 Store 的时候可以传⼊插件，它是⼀个数组，然后在执⾏ Store 构造函数的时候，会执⾏这些插件

### Logger 插件

Logger 插件的定义在 src/plugins/logger.js 中,插件函数接收的参数是 store 实例，它执⾏了 store.subscribe ⽅法，subscribe 的逻辑很简单，就是往 `this._subscribers `去添加⼀个函数，并返回⼀个 unsubscribe 的⽅法,⽽我们在执⾏ store.commit 的⽅法的时候，会遍历 `this._ `执⾏它们对应的回调函数

回到我们的 Logger 函数，它相当于订阅了 mutation 的提交，它的 prevState 表⽰之前的 state ， nextState 表⽰提交 mutation 后的 state ，这两个 state 都需要执⾏ deepCopy ⽅法拷⻉⼀份对象的副本，这样对他们的修改就不会影响原始 store.state 。接下来就构造⼀些格式化的消息，打印出⼀些时间消息 message ， 之前的状态 prevState ，对应的 mutation 操作 formattedMutation 以及下⼀个状态 nextState 。最后更新 prevState = nextState ，为下⼀次提交 mutation 输出⽇志做准备

那么⾄此 Vuex 的插件分析就结束了，Vuex 从设计上⽀持了插件，让我们很好地从外部追踪 store 内部的变化， Logger 插件在我们的开发阶段也提供了很好地指引作⽤。当然我们也可以⾃⼰去实现 Vuex 的插件，来帮助我们实现⼀些特定的需求
