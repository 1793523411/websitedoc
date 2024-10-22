## Node.js 的适用场景？

答案：比如：RESTFUL API、实时聊天、客户端逻辑强大的单页 APP，具体的例子比如说：本地化的在线音乐应用，本地化的在线搜索应用，本地化的在线 APP 等。

- 实时应用：如在线聊天，实时通知推送等等（如 socket.io）
- 分布式应用：通过高效的并行 I/O 使用已有的数据
- 工具类应用：海量的工具，小到前端压缩部署（如 grunt），大到桌面图形界面应用程序
- 游戏类应用：游戏领域对实时和并发有很高的要求（如网易的 pomelo 框架）
- 利用稳定接口提升 Web 渲染能力
- 前后端编程语言环境统一：前端开发人员可以非常快速地切入到服务器端的开发（如著名的纯 Javascript 全栈式 MEAN 架构）

## 为什么用 Nodejs,它有哪些缺点？

- 事件驱动，通过闭包很容易实现客户端的生命活期。
- 不用担心多线程，锁，并行计算的问题
- V8 引擎速度非常快
- 对于游戏来说，写一遍游戏逻辑代码，前端后端通用

当然 Nodejs 也有一些缺点：

- nodejs 更新很快，可能会出现版本兼容
- nodejs 还不算成熟，还没有大制作
- nodejs 不像其他的服务器，对于不同的链接，不支持进程和线程操作

## NodeJS 的工作原理

事件循环

## 什么是 error-first callback

error-first callback 用来传递错误和数据。第一个参数永远是一个错误对象（error-object），回调函数必须检查它。余下的参数用不过来传递数据。

解析：

```js
fs.readFile(filePath, function(err, data) {
  if (err) {
    //处理出现错误的情况
  }
  //处理数据
});
```

考察面试者对于 Node 异步操作基本知识的见解

## 如何避免回调函数嵌套？

用 Promises 将回调写成单独的函数

## Node 程序如何监听 80 端口？

脑筋急转弯！你不应该直接使用 Node 监听 80 端口（在\*nix 系统中），这样做需要 root 权限，对于运行程序来说这不是一个好主意。

不过，你可以使 Node 监听 1024 以上的端口，然后在 Node 前面部署 nginx 反向代理。

## 什么是事件循环（event loop）？

至少从开发者的角度来看，Node.js 是单线程运行的。底层使用 libuv 使用多线程。 每一个 I/O 操作都需要一个回调，一旦操作完成会被事件循环执行

[事件循环 -- nodejs官网](http://nodejs.cn/learn/the-nodejs-event-loop)

## setImmdiate 和 process.nextTick

[setimmediate--nodejs 官网](http://nodejs.cn/learn/understanding-setimmediate)

[process-nexttick --nodejs 官网](http://nodejs.cn/learn/understanding-process-nexttick)

## 使用什么工具检查代码风格？

- JSLint by Douglas Crockford
- JSHint
- ESLint
- JSCS 开发团队项目时，强制指定代码风格和使用静态分析，捕捉常见的错误，这些工具都非常有用。

## 操作错误和程序错误的区别是什么？

操作错误不是 bug，是系统的问题，例如超时或者硬件故障。 另一方面，程序错误（programmer errors）是实际的错误。

## 为什么 npmshrinkwarp 非常有用？

这个命令在部署 Node.js 应用时是非常有用的——它可以保证所部属的版本就是依赖的版本。

## 什么是 stub？说出他的用途？举个使用场景？

Stubs 是模拟模块或组件行为的程序。 Stubs 提供已知的答案来调用函数，另外你还可以断言哪个 stubs 被调用

## 什么是测试金字塔？在做 HTTP API 的时候要怎么实现？

测试金字塔意思是在写测试时应该编写的底层但愿测试要多于高级的端到端测试。 对于 HTTP APIs，应该归结为：

- 对你的模型多很多单元测试
- 在你的模型与其他交互时更少的集成测试
- 更少的验收测试，在 HTTP 端

## 对 Node 的优点和缺点提出了自己的看法

- （优点）因为 Node 是**基于事件驱动和无阻塞的**，所以非常适合处理并发请求， 因此构建在 Node 上的代理服务器相比其他技术实现（如 Ruby）的服务器表现要好得多。 此外，与 Node 代理服务器交互的客户端代码是由 javascript 语言编写的， 因此客户端和服务器端都用同一种语言编写，这是非常美妙的事情。

- （缺点）Node 是一个相对新的开源项目，所以不太稳定，它总是一直在变， 而且缺少足够多的第三方库支持。看起来，就像是 Ruby/Rails 当年的样子。

## 使用过的 koa2 中间件

```
koa-router
koa-bodyparser
koa-views
koa-static
koa-jwt
koa-helmet
koa-convert
```

## 介绍下 npm 模块安装机制, 为什么输入 npm install就可以自动安装对应的模块？

+ 发出npm install命令查询node_modules目录之中是否已经存在指定模块
+ 若存在，不再重新安装
+ 若不存在
+ npm 向 registry 查询模块压缩包的网址
+ 下载压缩包，存放在根目录下的.npm 目录里
+ 解压压缩包到当前项目的 node_modules 目录