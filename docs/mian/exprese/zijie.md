# 字节面经

## 字节前端实习面经（1-3面）

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
