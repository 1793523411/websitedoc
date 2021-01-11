# 字节面经

## 字节前端实习面经（1-3 面）

**总的来说，这三场，面试官会首先根据简历内容来一波，或者操作系统、计网开局，之后会问一些前端的基础，最后写个题**

**一面**

上来先自我介绍

1. vue 双向绑定

[双向数据绑定的原理和实现](/mian/base/vue.html#vue-双向数据绑定原理)

[object-defineproperty](/mian/base/vue.html#object-defineproperty-函数)

[proxy](/mian/base/vue.html#什么是-proxy)

2. 浏览器缓存机制
   前两个都是我简历上写的

[说说浏览器缓存机制](/mian/base/browser.html#说说浏览器缓存机制)

[说说浏览器缓存机制详解](/mian/base/browser.html#请求时浏览器缓存-from-memory-cache-和-from-disk-cache-的依据是什么-哪些数据什么时候存放在-memory-cache-和-disk-cache-中)

3. css 画三角形
   说完我问面试官要写一下吗，他说不用了。

[创建一个三角形的原理](/mian/base/css.html#用纯-css-创建一个三角形的原理)

[实现一个三角形](/mian/base/css.html#实现一个三角形)

4. 数组中第 k 大的数字
   面试官话音刚落，我就 "哦快排吧“ ，结果当时好几天没写代码，手太生了，写了好久没写出来。又换插入排序写，还没写出来。最后写了个选择排序，人傻了。
   面试官说你准备不够充分啊，手太生了。

```js
思路：先去重，在倒序排序，取下标为 k-1的数

function solution(arr){
    return [...new Set(arr)].sort((a,b) => b-a)[k-1]
}

```

**这个面试者直接想的是快排，所以各种排序算法最好还是掌握**

[各种排序](/mian/base/datastruct.html#排序)

5. 树的深度
   当时已经四十多分钟了，面试官说要结束了，我说好。
   本来已经准备洗洗睡，网易云了。
   结果小哥哥抬我一手，说”要不再写一题？”。我说好，然后秒写。
   （面试官下线后，我 一看还写错了，少写一个+1）。

[二叉树的深度](https://github.com/1793523411/leetcode/blob/master/four/%E9%9D%A2%E8%AF%95%E4%B8%AD%E8%A2%AB%E9%97%AE%E8%BF%87%E7%9A%84/%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E6%B7%B1%E5%BA%A6/index.js)

[N 叉树的最大深度](https://github.com/1793523411/leetcode/blob/master/four/%E9%9D%A2%E8%AF%95%E4%B8%AD%E8%A2%AB%E9%97%AE%E8%BF%87%E7%9A%84/N%20%E5%8F%89%E6%A0%91%E7%9A%84%E6%9C%80%E5%A4%A7%E6%B7%B1%E5%BA%A6/index.js)

反问环节：
会写后端吗（指岗位）?
团队前后端的规模？

**二面**

这面没有自我介绍。
感觉挺好的。
因为我很纠结自我介绍到底该怎么说。

1. 浏览器缓存

这个一面不是问过了？？？不过一面那没达协商缓存，强缓存啥的

[http-的缓存](/mian/base/network.html#说说-http-的缓存)

2. css 三角形（两次都问了），这次让我写了。我写了个 border-left: hide，面试官一脸懵逼

[创建一个三角形的原理](/mian/base/css.html#用纯-css-创建一个三角形的原理)

[实现一个三角形](/mian/base/css.html#实现一个三角形)

3. 算法题
   [1,2,3,7,13,14,16] 输出['1->3','7','13-14','16']
   这个题我写出来代码很冗余，多处理了几分钟
   面试官准备跳过的时候，我调好了

我没看懂这个题啥意思

4. redux 数据流向，说说你记得的 api

[redux 数据流向,和核心 api](/mian/base/react.html#redux-数据流向-和核心-api)

5. 说一下 webpack

[对 webpack 的看法](/mian/base/project.html#对-webpack-的看法)

还有些问题忘了。。

作者：bad 小杨
链接：https://www.nowcoder.com/discuss/580292
来源：牛客网

**三面**

1. 自我介绍

2. 介绍下项目的难点

我说一是 element-react icon 显示不出来，换了个 ui 库。他问我有没有想过什么原因。我口胡了一会发现不对，说可能是 element-react 本身的问题。他问我这个项目有多少 star，我说用的人很少。。面完去看了下才 2k 的 star。。估计这波印象分直降。。二是用同步写 node，后来发现应该用异步。？？

这两点我都说得挺笨的，大伙，项目难点这个问题一定好好准备啊

3. cookie 的字段

我懵了，说 cookie 不就 cookie 吗，和他不在一个频道。后来一想他想问的应该是 domain，path 这些这会他应该就准备挂我了。。

[对 cookie 了解多少](/mian/base/network.html#对-cookie-了解多少)

4. 进程线程区别

我开口就说进程比线程重量，他：“重要？”，估计已经不想面了。。。 然后 balala 一堆

[线程与进程的区别](/mian/base/network.html#线程与进程的区别)

5. 进程间通信

我答共享内存复盘才发现前十分钟发挥简直爆炸。。无了无了

[进程间通信的方式](/mian/base/js.html#进程间通信的方式)

6. 算法题 和大于等于 s 的子数组最短长度，问我有没有做过，做过的话说思路

```js
//滑动窗口
function minimuSize(nums, s) {
  let left = 0,
    currSum = 0,
    res = Infinity;
  for (let right = 0; right < nums.length; right++) {
    currSum += nums[right];
    while (currSum >= s) {
      res = Math.min(res, right - left + 1);
      currSum -= nums[left];
      left++;
    }
  }
  return res === Infinity ? -1 : res;
}

输入: [2,3,1,2,4,3], s = 7
输出: 2
解释: 子数组 [4,3] 是该条件下的最小长度子数组。

输入: [1, 2, 3, 4, 5], s = 100
输出: -1
```

7. 开放问题，扫码登陆，三个端的数据

[扫描二维码登录网页是什么原理-前后两个事件是如何联系的](/mian/base/html2.html#扫描二维码登录网页是什么原理-前后两个事件是如何联系的)

8. 并发数目限制为 2 的异步调度器

这个当时没写出来。。对 Promise 不熟悉

之前还面了字节商业化，挂在二面，可能是跟字节无缘了吧

[手撕-promise-promise-all-或者-promise-race](/mian/base/es6.html#手撕-promise-promise-all-或者-promise-race)

## 字节前端实习面经(1-3-面)

**一面（1h）**

1. 自我介绍

2. 进程和线程区别？

[进程和线程区别](/mian/base/network.html#线程与进程的区别)

[更多操作系统的知识](http://qimo.ygjie.icu/)

3. 数据库事务是什么？

[数据库事务](/mian/base/db.html#数据库事务是什么)

4. 为什么用 Vue 框架？好处？

[为什么使用 Vue？](/mian/base/vue.html#为什么使用-vue)

框架的好处：

[渐进式](/mian/base/vue.html#对于-vue-是一套渐进式框架的理解)

[vue 的优点](/mian/base/vue.html#vue-的优点是什么)

[MVVM](/mian/base/vue.html#对-mvvm-的理解)

5. Vue 的生命周期是什么？

[vue-的生命周期是什么](/mian/base/vue.html#vue-的生命周期是什么)

[vue-的各个生命阶段是什么](/mian/base/vue.html#vue-的各个生命阶段是什么)

6. 用的最多的 Vue 钩子是什么？

[vue-router-中的导航钩子函数](/mian/base/vue.html#vue-router-中的导航钩子函数)

`created` ,`mounted` ,`beforeDestroy`等

7. V-show 和 V-if 区别？

[请问-v-if-和-v-show-有什么区别](/mian/base/vue.html#请问-v-if-和-v-show-有什么区别)

8. CSS 的选择器有哪些？优先级？

[css-选择符有哪些-哪些属性可以继承-优先级算法如何计算-css3-新增伪类有那些](/mian/base/css.html#css-选择符有哪些-哪些属性可以继承-优先级算法如何计算-css3-新增伪类有那些)

9.  伪类选择器举个例子

[css3-新增伪类有那些](/mian/base/css.html#css3-新增伪类有那些)

10. CSS 哪些元素可以继承？

[css-中哪些属性可以继承](/mian/base/css.html#css-中哪些属性可以继承)

11. 网络分层

[计算机网络相关](http://qimo.ygjie.icu/)

12. UDP/TCP 的区别

[tcp-和-udp-区别有哪些](/mian/base/network.html#tcp-和-udp-区别有哪些)

13. 浏览器缓存解释一下

[请求时浏览器缓存-from-memory-cache-和-from-disk-cache-的依据是什么-哪些数据什么时候存放在-memory-cache-和-disk-cache-中](/mian/base/browser.html#请求时浏览器缓存-from-memory-cache-和-from-disk-cache-的依据是什么-哪些数据什么时候存放在-memory-cache-和-disk-cache-中)

14. http 状态码说一下

[http-状态码](/mian/base/Ajax.html#http-状态码)

[http-的状态码-301-和-302-的区别](/mian/base/network.html#http-的状态码-301-和-302-的区别)

15. JS 事件循环说一下

[什么是事件循环-event-loop](/mian/base/nodejs.html#什么是事件循环-event-loop)

[js-的事件循环是什么](/mian/base/js.html#js-的事件循环是什么)

16. JS 事件循环输出题

[异步笔试题请写出下面代码的运行结果](/mian/base/jstimu.html#异步笔试题请写出下面代码的运行结果)

[async-及-await](/mian/base/es6.html#async-及-await)

17. 手写二叉树前序（递归和非递归）

[手写二叉树前序（递归和非递归）](https://github.com/1793523411/leetcode/blob/master/four/%E9%9D%A2%E8%AF%95%E4%B8%AD%E8%A2%AB%E9%97%AE%E8%BF%87%E7%9A%84/%E6%89%8B%E5%86%99%E4%BA%8C%E5%8F%89%E6%A0%91%E5%89%8D%E5%BA%8F%EF%BC%88%E9%80%92%E5%BD%92%E5%92%8C%E9%9D%9E%E9%80%92%E5%BD%92%EF%BC%89/index.js)

18. 你有什么想问我的？

**二面**

1. 自我介绍
2. 为什么研究生选分布式？

···

3. 分布式两台服务器怎么通讯？

···

4. Webpack 如何优化速度？

[如何用-webpack-优化前端性能](/mian/base/project.html#webpack-性能优化)

5. 函数式编程了解吗？

[函数式编程](/mian/base/js.html#函数式编程)

[说下函数式编程的理解](/mian/base/js.html#说下函数式编程的理解)

6. JS 数组如何比较？

[判断数组相等-对象相等-比较数组](/mian/base/jstimu.html#判断数组相等-对象相等-比较数组)

7. 如何实现一个深拷贝？

[手写一个-js-深拷贝](/mian/base/jstimu.html#手写一个-js-深拷贝)

[模拟实现一个深拷贝-并考虑对象相互引用以及-symbol-拷贝的情况](/mian/base/jstimu.html#模拟实现一个深拷贝-并考虑对象相互引用以及-symbol-拷贝的情况)

[深拷贝的实现](/mian/base/js.html#深拷贝的实现)

8. Promise 和 Async/Await 区别

[promise-和-async-await-的区别](/mian/base/es6.html#promise-和-async-await-的区别)

9.  Async 如何捕获异常？

[async-捕获异常](/mian/base/es6.html#async-捕获异常)

10. Generator 了解吗？

[generator-如何使用的-以及各个阶段的状态是如何变化的](/mian/base/es6.html#generator-如何使用的-以及各个阶段的状态是如何变化的)

[generator-函数的语法](/mian/other/es6.html#generator-函数的语法)

[generator-函数的异步应用](/mian/other/es6.html#generator-函数的异步应用)

11. Proxy 和 Reflect 了解吗？

[什么是-proxy](/mian/base/es6.html#什么是-proxy)

[什么是-proxy](/mian/base/vue.html#什么是-proxy)

[proxy](/mian/other/es6.html#proxy)

[reflect-对象创建目的](/mian/base/es6.html#reflect-对象创建目的)

[reflect](/mian/other/es6.html#reflect)

12. 一道 JS 数组连续元素相关的手写题

[连续子数组的最大和](https://github.com/1793523411/leetcode/blob/master/four/%E9%9D%A2%E8%AF%95%E4%B8%AD%E8%A2%AB%E9%97%AE%E8%BF%87%E7%9A%84/%E8%BF%9E%E7%BB%AD%E5%AD%90%E6%95%B0%E7%BB%84%E7%9A%84%E6%9C%80%E5%A4%A7%E5%92%8C/index.js)

13. 手写二叉树叶节点之和

```js
var leafSum = (root) => {
  if (root === null) return 0;
  let sum = 0;
  let leafSum = (node) => {
    if (node) {
      if (root.left === null && root.right === null) sum += root.val;
      leafSum(node.left);
      leafSum(node.right);
    }
  };
  leafSum(root);
  return sum;
};
```

```js
var leafSum = (root) => {
  const sum = 0;
  const stack = [];
  if (root) stack.push(root);
  while (stack.length > 0) {
    const curNode = stack.pop();
    if (curNode.left === null && curNode.right === null) sum += curNode.val;
    if (curNode.right != null) {
      stack.push(curNode.right);
    }
    if (curNode.left != null) {
      stack.push(curNode.left);
    }
  }
  return list;
};
```

14. 最近在学什么新的技术

···

15. 你有什么想问我的？

···

**三面（20min）**

1. 实习一周能来几天？多久？
2. 你认为做的最好的项目是什么？
3. 说一下项目里的难点
4. 动画了解吗？用 CSS 实现一个转圈的 Loading

[CSS3 实现 18 种 Loading 效果](https://www.jianshu.com/p/6ac3e3e12d61)

5. 跨域有几种？

[如何解决跨域问题](/mian/base/js.html#如何解决跨域问题)

6. 你觉得前端你最擅长什么技术？

PS: 一面和二面是在同一天，一面结束面试官就让我等半个小时进行二面，三面约在了另一天。三面特别短，主要是围绕项目，我做的项目面试官说都不算难，凉了...继续加油吧

## 字节跳动-教育方向 实习生 杭州 面经（一面二面）

**一面**

1. css 的 display 用法

[display-有哪些值-说明他们的作用](/mian/base/css.html#display-有哪些值-说明他们的作用)

2. display flex 实现一个三栏布局，要求左边宽度固定，中间与右边宽度相等

[经典的三栏布局的实现方式](/mian/base/css.html#经典的三栏布局的实现方式)

3. 看代码说输出，说原因

```js
var length = 10 
function fn(){  return this.length+1 } 
var obj = {  length:5,  test1:function(){  return fn()  } } 
obj.test2 = fn  
console.log(obj.test1())//11 
console.log(fn()===obj.test2()) //false
```

4. 看代码说输出，说原因

```js
var func1 = x => x; 
var func2 = x =>{x}; 
var func3 = x => ({x})  
console.log(func1(1)) //1 
console.log(func2(1)) //undefined 
console.log(func3(1)) //{x:1}
```

5. 用 ES6 语法实现继承

[实现一个继承](/mian/base/jstimu.html#实现一个继承)

6. Eventloop

```js
console.log('begin') 
setTimeout(()=>{  console.log('setTimeout 1')  
Promise.resolve().then(()=>{  console.log('promise 1')  
setTimeout(()=>{  console.log('setTimeout 2 between promise1&2')  })  })
.then(()=>{console.log('promise 2')}) },0)  
console.log('end')  //begin //end //setTimeout 1 //promise 1 //promise 2 //setTimeout 2 between promise 1 & 2
```

7. 浏览器事件模型 那些元素不能冒泡

[3-种事件模型是什么](/mian/base/js.html#_3-种事件模型是什么)

[JavaScript 中那些不会冒泡的事件](https://zhuanlan.zhihu.com/p/164844013)

8. 常见的 HTTP Method 有哪些？GET/POST 区别 ？什么是幂等？

**HTTP 方法的幂等性是指一次和多次请求某一个资源应该具有同样的副作用。**

[post-和-get-的区别](/mian/base/network.html#post-和-get-的区别)

9. header 中常见的 key/value 对有那些，header 中能存放二进制数据么？url 是明文传输么？你认为 Header 中最重要的是那个 key/value 对？



10. 如何理解虚拟 DOM

[为什么虚拟-dom-会提高性能](/mian/base/react.html#为什么虚拟-dom-会提高性能)

11. 三道算法题

- JS 编码实现一个二叉树的构造函数，包括节点类 Node，树类 BST，插入节点函数 insert，并且满足 1.左子节点的值 <父节点的值 < 2.可以实现先序，中序，后序遍历。 span>

- 比较版本号 version1 > version 2 return 1 , version1 < version 2 return -1, 其他返回 0.

- 如何快速判断一个 ip 地址是否属于国内？已知 db 中有几十万个国内 ip 地址段。


**二面**

+ 聊了聊项目，说一说自己项目的难点


+ 我之前说的项目的数据存再localStorge里的。就开始问 localStorge的上限是多少？如何知道localStorge目前的剩余内存量？



+ 问了localStroge和sessionStroge的区别。不同页面的localStroge和sessionSorge是否可以共享？什么情况下可以共享sessionStroge？是根据什么判断是可以共享的？



+ 项目中用了Vite，问了下关于它的理解。



+ 上一题中提到了ES6 module。所以问了commonJS和ES6 的模块引入的区别。



+ 上一题提到了const，所以问了const let var的一些区别



+ 什么是暂时性死区。。（没答上，之前明明看过）



+ 进程和线程的区别。浏览器都开了那些线程和进程。浏览器中的进程间通信。requestAnimationframe的作用。



+ css动画，js动画，transform为什么不会造成重排和重绘。



+ 一个卡顿的页面如何去判断问题出在哪。



+ webpack作用，五个核心概念，loader和plugin的区别，deserver可以自动刷新页面的原理是什么。



+ 我用canvas做了一个画板，没有撤回功能，问我如何实现撤回。



+ easy算法题生成固定区间的随机整数。

