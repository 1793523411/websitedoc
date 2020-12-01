(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{781:function(v,_,e){"use strict";e.r(_);var t=e(103),r=Object(t.a)({},(function(){var v=this,_=v.$createElement,e=v._self._c||_;return e("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[e("h2",{attrs:{id:"vue-双向数据绑定原理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vue-双向数据绑定原理"}},[v._v("#")]),v._v(" vue 双向数据绑定原理")]),v._v(" "),e("p",[v._v("vue 通过使用双向数据绑定，来实现了 View 和 Model 的同步更新。vue 的双向数据绑定主要是通过使用"),e("strong",[v._v("数据劫持")]),v._v("和"),e("strong",[v._v("发布订阅者模式")]),v._v("来实现的。")]),v._v(" "),e("p",[v._v("首先我"),e("strong",[v._v("们通过 Object.defineProperty() 方法来对 Model 数据各个属性添加访问器属性，以此来实现数据的劫持")]),v._v("，因此当 Model 中的数据发生变化的时候，我们可以通过配置的setter 和 getter 方法来实现对 View 层数据更新的通知。")]),v._v(" "),e("p",[v._v("数据在 html 模板中一共有"),e("strong",[v._v("两种绑定情况")]),v._v("，一种是使用 v-model 来对 value 值进行绑定，一种是作为文本绑定，在对模板引擎进行解析的过程中。")]),v._v(" "),e("p",[v._v("如果遇到"),e("strong",[v._v("元素节点")]),v._v("，并且属性值包含 v-model 的话，我们就从 Model 中去获取 v-model 所对应的属性的值，并赋值给元素的 value 值。然后给这个元素设置一个监听事件，当 View 中元素的数据发生变化的时候触发该事件，通知 Model 中的对应的属性的值进行更新。")]),v._v(" "),e("p",[v._v("如果遇到了绑定的"),e("strong",[v._v("文本节点")]),v._v("，我们使用 Model 中对应的属性的值来替换这个文本。")]),v._v(" "),e("p",[e("strong",[v._v("对于文本节点的更新，我们使用了发布订阅者模式")]),v._v("，属性作为一个主题，我们为这个节点设置一个订阅者对象，将这个订阅者对象加入这个属性主题的订阅者列表中。当 Model 层数据发生改变的时候，Model 作为发布者向主题发出通知，主题收到通知再向它的所有订阅者推送，订阅者收到通知后更改自己的数据。")]),v._v(" "),e("h2",{attrs:{id:"object-defineproperty-函数"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#object-defineproperty-函数"}},[v._v("#")]),v._v(" Object.defineProperty 函数")]),v._v(" "),e("p",[v._v("Object.defineProperty 函数一共有三个参数，第一个参数是"),e("strong",[v._v("需要定义属性的对象")]),v._v("，第二个参数是"),e("strong",[v._v("需要定义的属性")]),v._v("，第三个是"),e("strong",[v._v("该属性描述符")]),v._v("。一个属性的描述符有四个属性，分别是 value 属性的值，writable 属性是否可写，enumerable 属性是否可枚举，configurable 属性是否可配置修改。")]),v._v(" "),e("h2",{attrs:{id:"使用-object-defineproperty-来进行数据劫持有什么缺点"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#使用-object-defineproperty-来进行数据劫持有什么缺点"}},[v._v("#")]),v._v(" 使用 Object.defineProperty() 来进行数据劫持有什么缺点？")]),v._v(" "),e("p",[e("strong",[v._v("有一些对属性的操作，使用这种方法无法拦截")]),v._v("，比如说"),e("strong",[v._v("通过下标方式修改数组数据")]),v._v("或者"),e("strong",[v._v("给对象新增属性")]),v._v("，"),e("strong",[v._v("vue 内部通过重写函数解决了这个问")]),v._v("题。在 Vue3.0 中已经不使用这种方式了，而是通过使用 Proxy 对对象进行代理，从而实现数据劫持。使用 "),e("strong",[v._v("Proxy 的好处是它可以完美的监听到任何方式的数据改变")]),v._v("，唯一的缺点是"),e("strong",[v._v("兼容性的问题")]),v._v("，因为这是 ES6 的语法。")]),v._v(" "),e("h2",{attrs:{id:"什么是-virtual-dom么-为什么-virtual-dom-生-比原生-dom-快"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#什么是-virtual-dom么-为什么-virtual-dom-生-比原生-dom-快"}},[v._v("#")]),v._v(" 什么是 Virtual DOM么 ？为什么 Virtual DOM 生 比原生 DOM 快")]),v._v(" "),e("p",[v._v("我对 Virtual DOM 的理解是:首先对我们将要插入到文档中的 DOM 树结构进行分析，使用 js 对象将其表示出来，比如一个元素对象，包含 TagName、props 和 Children 这些属性。然后我们将这个 "),e("strong",[v._v("js 对象树")]),v._v("给保存下来，最后再将 DOM 片段插入到文档中。")]),v._v(" "),e("p",[v._v("当页面的状态发生改变，我们需要对页面的 DOM 的结构进行调整的时候，我们首先根据变更的状态，重新构建起一棵对象树，然后将这棵新的对象树和旧的对象树进行比较，记录下两棵树的的差异。")]),v._v(" "),e("p",[v._v("最后将记录的有差异的地方应用到真正的 DOM 树中去，这样视图就更新了。我认为 Virtual DOM 这种方法对于我们需要有大量的 DOM 操作的时候，能够很好的提高我们的操作效率，"),e("strong",[v._v("通过在操作前确定需要做的最小修改")]),v._v("，"),e("strong",[v._v("尽可能的减少 DOM 操作带来的重流和重绘的影响")]),v._v("。其实 "),e("strong",[v._v("Virtual DOM 并不一定比我们真实的操作 DOM 要快，这种方法的目的是为了提高我们开发时的可维护性，在任意的情况下，都能保证一个尽量小的性能消耗去进行操作")]),v._v("。")]),v._v(" "),e("h2",{attrs:{id:"如何比较两个-dom-树的差异"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#如何比较两个-dom-树的差异"}},[v._v("#")]),v._v(" 如何比较两个 DOM 树的差异？")]),v._v(" "),e("p",[v._v("两个树的完全 diff 算法的时间复杂度为 O(n^3) ，但是"),e("strong",[v._v("在前端中，我们很少会跨层级的移动元素，所以我们只需要比较同一层级的元素进行比较，这样就可以将算法的时间复杂度降低为O(n)")]),v._v("。")]),v._v(" "),e("p",[v._v("算法首先会对新旧两棵树进行一个深度优先的遍历，这样每个节点都会有一个序号。在深度遍历的时候，每遍历到一个节点，我们就将这个节点和新的树中的节点进行比较，如果有差异，则将这个差异记录到一个对象中。")]),v._v(" "),e("p",[v._v("在对列表元素进行对比的时候，由于 TagName 是重复的，所以我们不能使用这个来对比。我们需要给每一个子节点加上一个 key，"),e("strong",[v._v("列表对比的时候使用 key 来进行比较，这样我们才能够复用老的 DOM 树上的节点")]),v._v("。")]),v._v(" "),e("h2",{attrs:{id:"vue-的生命周期是什么"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vue-的生命周期是什么"}},[v._v("#")]),v._v(" Vue 的生命周期是什么")]),v._v(" "),e("p",[v._v("Vue 的生命周期指的是"),e("strong",[v._v("组件从创建到销毁的一系列的过程")]),v._v("，被称为 Vue 的生命周期。通过提供的 Vue 在生命周期各个阶段的钩子函数，我们可以很好的在 Vue 的各个生命阶段实现一些操作")]),v._v(" "),e("h2",{attrs:{id:"vue-的各个生命阶段是什么"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vue-的各个生命阶段是什么"}},[v._v("#")]),v._v(" Vue 的各个生命阶段是什么？")]),v._v(" "),e("p",[v._v("Vue 一共有 "),e("strong",[v._v("8")]),v._v(" 个生命阶段，分别是"),e("strong",[v._v("创建前、创建后、加载前、加载后、更新前、更新后、销毁前和销毁后")]),v._v("，每个阶段对应了一个生命周期的钩子函数。")]),v._v(" "),e("p",[v._v("（1）beforeCreate 钩子函数，在"),e("strong",[v._v("实例初始化之后")]),v._v("，在"),e("strong",[v._v("数据监听和事件配置之前触发")]),v._v("。因此在这个事件中我们是"),e("strong",[v._v("获取不到 data 数据")]),v._v("的。")]),v._v(" "),e("p",[v._v("（2）created 钩子函数，在"),e("strong",[v._v("实例创建完成后触发")]),v._v("，此时可以访问 data、methods 等属性。但这个时候"),e("strong",[v._v("组件还没有被挂载到页面中去")]),v._v("，所以这个时候访问"),e("strong",[v._v("不到 $el 属性")]),v._v("。一般我们可以在这个函数中"),e("strong",[v._v("进行一些页面初始化的工作，比如通过 ajax 请求数据来对页面进行初始化")]),v._v("。")]),v._v(" "),e("p",[v._v("（3）beforeMount 钩子函数，在"),e("strong",[v._v("组件被挂载到页面之前触发")]),v._v("。"),e("strong",[v._v("在 beforeMount 之前，会找到对应的 template，并编译成 render 函数")]),v._v("。")]),v._v(" "),e("p",[v._v("（4）mounted 钩子函数，在"),e("strong",[v._v("组件挂载到页面之后触发")]),v._v("。此时"),e("strong",[v._v("可以通过 DOM API 获取到页面中的 DOM 元素")]),v._v("。")]),v._v(" "),e("p",[v._v("（5）beforeUpdate 钩子函数，在"),e("strong",[v._v("响应式数据更新时触发****，发生在虚拟 DOM 重新渲染和打补丁之前")]),v._v("，这个时候我们可以"),e("strong",[v._v("对可能会被移除的元素做一些操作")]),v._v("，比如移除事件监听器。")]),v._v(" "),e("p",[v._v("（6）updated 钩子函数，"),e("strong",[v._v("虚拟 DOM 重新渲染和打补丁之后调用")]),v._v("。")]),v._v(" "),e("p",[v._v("（7）beforeDestroy 钩子函数，在"),e("strong",[v._v("实例销毁之前调用")]),v._v("。一般在这一步我们"),e("strong",[v._v("可以销毁定时器、解绑全局事件")]),v._v("等。")]),v._v(" "),e("p",[v._v("（8）destroyed 钩子函数，在"),e("strong",[v._v("实例销毁之后调用")]),v._v("，调用后，Vue 实例中的所有东西都会解除绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。")]),v._v(" "),e("p",[v._v("当我们使用 keep-alive 的时候，还有两个钩子函数，分别是 activated 和 deactivated 。"),e("strong",[v._v("用 keep-alive 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行 deactivated钩子函数，命中缓存渲染后会执行 actived 钩子函数")]),v._v("。")]),v._v(" "),e("h2",{attrs:{id:"vue-组件间的参数传递方式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vue-组件间的参数传递方式"}},[v._v("#")]),v._v(" Vue 组件间的参数传递方式")]),v._v(" "),e("p",[v._v("（1）父子组件间通信")]),v._v(" "),e("p",[v._v("第一种方法是子组件通过 "),e("strong",[v._v("props 属性")]),v._v("来接受父组件的数据，然后"),e("strong",[v._v("父组件在子组件上注册监听事件，子组件通过 emit 触发事件来向父组件发送数据")]),v._v("。")]),v._v(" "),e("p",[v._v("第二种是通过 "),e("strong",[v._v("ref 属性")]),v._v("给子组件设置一个名字。"),e("strong",[v._v("父组件通过 "),e("code",[v._v("$refs")]),v._v(" 组件名来获得子组件，子组件通过 "),e("code",[v._v("$parent")]),v._v(" 获得父组件")]),v._v("，这样也可以实现通信。")]),v._v(" "),e("p",[v._v("第三种是使用 "),e("strong",[v._v("provider/injec")]),v._v("t，在"),e("strong",[v._v("父组件中通过 provider 提供变量，在子组件中通过inject 来将变量注入到组件中")]),v._v("。"),e("strong",[v._v("不论子组件有多深，只要调用了 inject 那么就可以注入 provider 中的数据。")])]),v._v(" "),e("p",[v._v("（2）兄弟组件间通信")]),v._v(" "),e("p",[v._v("第一种是使用 "),e("strong",[v._v("eventBus")]),v._v(" 的方法，它的本"),e("strong",[v._v("质是通过创建一个空的 Vue 实例来作为消息传递的对象")]),v._v("，通信的组件引入这个实例，通信的组件通过在这个实例上监听和触发事件，来实现消息的传递。")]),v._v(" "),e("p",[v._v("第二种是通过 "),e("strong",[e("code",[v._v("$parent.$refs")])]),v._v(" 来获取到兄弟组件，也可以进行通信。")]),v._v(" "),e("p",[v._v("（3）任意组件之间")]),v._v(" "),e("p",[v._v("使用 "),e("strong",[v._v("eventBus")]),v._v(" ，其实就是创建一个"),e("strong",[v._v("事件中心，相当于中转站")]),v._v("，可以用它来传递事件和接收事件。如果业务逻辑复杂，很多组件之间需要同时处理一些公共的数据，这个时候采用上面这一些方法可能不利于项目的维护。这个时候可以使用 "),e("strong",[v._v("vuex")]),v._v(" ，"),e("strong",[v._v("vuex 的思想就是将这一些公共的数据抽离出来，将它作为一个全局的变量来管理，然后其他组件就可以对这个公共数据进行读写操作，这样达到了解耦的目的")]),v._v("。")]),v._v(" "),e("h2",{attrs:{id:"computed-和-和-watch-的差异"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#computed-和-和-watch-的差异"}},[v._v("#")]),v._v(" computed 和 和 watch 的差异")]),v._v(" "),e("p",[v._v("（1）computed 是"),e("strong",[v._v("计算一个新的属性，并将该属性挂载到 Vue 实例上")]),v._v("，而 watch 是"),e("strong",[v._v("监听已经存在且已挂载到 Vue 实例上的数")]),v._v("据，所以"),e("strong",[v._v("用 watch 同样可以监听 computed 计算属性的变化")]),v._v("。")]),v._v(" "),e("p",[v._v("（2）computed 本质是一个"),e("strong",[v._v("惰性求值的观察者")]),v._v("，具有"),e("strong",[v._v("缓存性")]),v._v("，只有当依赖变化后，第一次访问computed 属性，才会计算新的值。而 watch 则是当数据发生变化便会调用执行函数。")]),v._v(" "),e("p",[v._v("（3）从使用场景上说，"),e("strong",[v._v("computed 适用一个数据被多个数据影响，而 watch 适用一个数据影响多个数据")])]),v._v(" "),e("p",[v._v("computed 是计算属性，"),e("strong",[v._v("依赖其他属性计算值，并且 computed 的值有缓存")]),v._v("，只有当计算值变化才会返回内容。")]),v._v(" "),e("p",[v._v("watch "),e("strong",[v._v("监听到值的变化就会执行回调，在回调中可以进行一些逻辑操作")]),v._v("。")]),v._v(" "),e("h2",{attrs:{id:"vue-router-中的导航钩子函数"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vue-router-中的导航钩子函数"}},[v._v("#")]),v._v(" vue-router 中的导航钩子函数")]),v._v(" "),e("p",[v._v("（1）全局的钩子函数 beforeEach 和 afterEachbeforeEach 有三个参数，"),e("strong",[v._v("to 代表要进入的路由对象，from 代表离开的路由对象")]),v._v("。"),e("strong",[v._v("next 是一个必须要执行的函数")]),v._v("，如果不传参数，那就执行下一个钩子函数，如果传入 false，则终止跳转，如果传入一个路径，则导航到对应的路由，如果传入 error ，则导航终止，error 传入错误的监听函数。")]),v._v(" "),e("p",[v._v("（2）"),e("strong",[v._v("单个路由独享的钩子函数 beforeEnter")]),v._v("，它是在路由配置上直接进行定义的。")]),v._v(" "),e("p",[v._v("（3）"),e("strong",[v._v("组件内的导航钩子")]),v._v("主要有这三种：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave。它们是直接在路由组件内部直接进行定义的。")]),v._v(" "),e("h2",{attrs:{id:"route-和-和-router-的区别"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#route-和-和-router-的区别"}},[v._v("#")]),v._v(" "),e("code",[v._v("$route")]),v._v(" 和 和 "),e("code",[v._v("$router")]),v._v(" 的区别")]),v._v(" "),e("p",[e("strong",[e("code",[v._v("$route")]),v._v(" 是“路由信息对象”")]),v._v("，包括 path，params，hash，query，fullPath，matched，name等路由信息参数。而 "),e("strong",[e("code",[v._v("$router")]),v._v(" 是“路由实例”对象")]),v._v("包括了路由的跳转方法，钩子函数等。")]),v._v(" "),e("h2",{attrs:{id:"vue-常用的修饰符"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vue-常用的修饰符"}},[v._v("#")]),v._v(" vue 常用的修饰符")]),v._v(" "),e("p",[e("code",[v._v(".prevent")]),v._v(": 提交事件"),e("strong",[v._v("不再重载页面")]),v._v("；"),e("code",[v._v(".stop")]),v._v(": "),e("strong",[v._v("阻止单击事件冒泡")]),v._v("；"),e("code",[v._v(".self")]),v._v(": 当事件发生在该元素本身而不是子元素的时候会触发；")]),v._v(" "),e("h2",{attrs:{id:"vue-中-key-值的作用"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vue-中-key-值的作用"}},[v._v("#")]),v._v(" vue 中 key 值的作用")]),v._v(" "),e("p",[v._v("vue 中 key 值的作用可以分为两种情况来考虑。")]),v._v(" "),e("p",[v._v("第一种情况是 "),e("strong",[v._v("v-if 中使用 key")]),v._v("。由于 Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。因此当我们使用 v-if 来实现元素切换的时候，"),e("strong",[v._v("如果切换前后含有相同类型的元素，那么这个元素就会被复用")]),v._v("。如果是相同的 input 元素，那么切换前后用户的输入不会被清除掉，这样是不符合需求的。因此我们可以通过使用 key 来唯一的标识一个元素，这个情况下，使用 key 的元素不会被复用。这个时候 "),e("strong",[v._v("key 的作用是用来标识一个独立的元素")]),v._v("。")]),v._v(" "),e("p",[v._v("第二种情况是 "),e("strong",[v._v("v-for 中使用 key")]),v._v("。"),e("strong",[v._v("用 v-for 更新已渲染过的元素列表时，它默认使用“就地复用”的策略")]),v._v("。如果数据项的顺序发生了改变，Vue 不会移动 DOM 元素来匹配数据项的顺序，而是简单复用此处的每个元素。因此通过为每个列表项提供一个 key 值，来"),e("strong",[v._v("以便 Vue 跟踪元素的身份")]),v._v("，从而高效的实现复用。"),e("strong",[v._v("这个时候 key 的作用是为了高效的更新渲染虚拟 DOM")]),v._v("。")]),v._v(" "),e("h2",{attrs:{id:"keep-alive-组件有什么作用"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#keep-alive-组件有什么作用"}},[v._v("#")]),v._v(" keep-alive 组件有什么作用")]),v._v(" "),e("p",[v._v("如果你需要在组件切换的时候，"),e("strong",[v._v("保存一些组件的状态防止多次渲染")]),v._v("，就可以使用 keep-alive 组件包裹需要保存的组件")]),v._v(" "),e("h2",{attrs:{id:"vue-中-mixin-和-mixins-区别"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vue-中-mixin-和-mixins-区别"}},[v._v("#")]),v._v(" vue 中 mixin 和 mixins 区别？")]),v._v(" "),e("p",[v._v("mixin 用于"),e("strong",[v._v("全局混入")]),v._v("，会影响到每个组件实例。")]),v._v(" "),e("p",[v._v("mixins 应该是我们"),e("strong",[v._v("最常使用的扩展组件的方式")]),v._v("了。"),e("strong",[v._v("如果多个组件中有相同的业务逻辑，就可以将这些逻辑剥离出来，通过 mixins 混入代码")]),v._v("，比如上拉下拉加载数据这种逻辑等等。另外需要注意的是 "),e("strong",[v._v("mixins 混入的钩子函数会先于组件内的钩子函数执行")]),v._v("，并且在"),e("strong",[v._v("遇到同名选项的时候也会有选择性的进行合并")])])])}),[],!1,null,null,null);_.default=r.exports}}]);