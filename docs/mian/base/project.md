## 对 webpack 的看法

我当时使用 webpack 的一个最主要原因是为了简化页面依赖的管理，并且通过将其打包为一个文件来降低页面加载时请求的资源数。

我认为 webpack 的主要原理是，它将所有的资源都看成是一个模块，并且把页面逻辑当作一个整体，通过一个给定的入口文件，webpack 从这个文件开始，找到所有的依赖文件，将各个依赖文件模块通过 loader 和 plugins 处理后，然后打包在一起，最后输出一个浏览器可识别的 JS 文件。

Webpack 具有四个核心的概念，分别是 **Entry（入口）、Output（输出）、loader 和 Plugins（插件）**。

Entry 是 webpack 的入口起点，它指示 webpack 应该从哪个模块开始着手，来作为其构建内部依赖图的开始。

Output 属性告诉 webpack 在哪里输出它所创建的打包文件，也可指定打包文件的名称，默认位置为 ./dist。

loader 可以理解为 webpack 的编译器，它使得 webpack 可以处理一些非 JavaScript 文件。在对 loader 进行配置的时候，test 属性，标志有哪些后缀的文件应该被处理，是一个正则表达式。use 属性，指定 test 类型的文件应该使用哪个 loader 进行预处理。常用的 loader 有 css-loader、style-loader 等。

插件可以用于执行范围更广的任务，包括打包、优化、压缩、搭建服务器等等，要使用一个插件，一般是先使用 npm 包管理器进行安装，然后在配置文件中引入，最后将其实例化后传递给 plugins 数组属性。

使用 webpack 的确能够提供我们对于**项目的管理**，但是它的缺点就是调试和配置起来太麻烦了。但现在 webpack4.0 的免配置一定程度上解决了这个问题。但是我感觉就是对我来说，就是一个黑盒，很多时候出现了问题，没有办法很好的定位。

## 用的 webpack3 还是版本 4，知道有哪些改进嘛

webpack4 是 18 年 8 月 25 号发布的，相比 webpack3 主要以下大改动：

- node 环境升级，不再支持 node4.0 及之前版本，最低 node 版本 6.11.5
- 配置增加了 mode:production/development/none  ，必须指定其中一个，在不同的 mode 下开启了一些默认的优化手段；
- 不再需要某些 plugin，改为在对应生产或者开发模式下默认打开

**2020 出了 webpack5,支持模块联邦，持久化缓存等特性**

## loader 和 plugin 的不同

loader 能让 webpack 处理不同的文件，然后对文件进行一些处理，编译，压缩等，最终一起打包到指定文件中（比如 loader 可以将 sass，less 文件写法转换成 css，而不需要在使用其他转换工具），loader 本身是一个函数，接收源文件作为参数，返回转换的结果

```js
// build/webpack.base.conf.js
module: {
    rules: [
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: vueLoaderConfig
        },
    ]
},
```

plugins 则用于执行广泛的任务，从打包，优化，压缩，一直到重新定义环境中的变量，接口很强大，主要用来扩展 webpack 的功能，可以实现 loader 不能实现的更复杂的功能

```js
// build/webpack.prod.conf.js
plugins: [
  new webpack.DefinePlugin({
    "process.env": env,
  }),
  new UglifyJsPlugin({
    uglifyOptions: {
      compress: {
        warnings: false,
      },
    },
    sourceMap: config.build.productionSourceMap,
    parallel: true,
  }),
];
```

## 有手动编写过loader和plugin，说一下思路

loader能把源文件经过转化后输出新的结果，一个loader遵循单一职责原则，只完成一种转换，然后链式的顺序去依次经过多个loader转换，直到得到最终结果并返回，所以在写loader时要保持其职责的单一性，同时webpack还提供了一些API供loader调用

开发plugin中最常用的两个对象是Compiler和Compilation，他们是plugin和webpack之间的桥梁

+ Compiler  对象包含了webpack环境的所有配置信息，包含options，loaders，plugins这些信息，这个对象在Webpack启动时候被实例化，它是全局唯一的
+ Compilation  对象包含了当前的模块资源，编译生成资源，变换的文件等。当webpack以开发模式运行时，每当检测到一个文件变化，一个新的Compilation将会被创建

## webpack如何配置单页和多页应用

单页应用即为webpack的标准模式，直接在entry中指定单页面应用的入口即可：

多页面应用可以考虑使用webpack的 AutoWebPlugin  来完成简单的自动化构建，前提是项目目录结构要符合预先设定的规范

```
├── pages 
│ ├── index 
│ │ ├── index.css // 该页面单独需要的 CSS 样式 
│ │ └── index.js // 该页面的入口文件 
│ └── login 
│ ├── index.css 
│ └── index.js 
├── common.css // 所有页面都需要的公共 CSS 样式 
├── google_analytics.js 
├── template.html 
└── webpack.config.js 
```

## webpack如何做到热更新

webpack热更新（Hot Module Replacement），缩写为HMR，实现了不用刷新浏览器而将新变更的模块替换掉旧的模块，原理如下:

![](../../.vuepress/public/HMR.png)

server端和client端都做了处理：

+ webpack监听到文件变化，重新编译打包，webpack-dev-server和webpack之间接口交互（主要是webpack-dev-middleware调用webpack暴露的API对代码进行监控，并告诉webpack将打包后代码保存到内存中）

+ 通过sockjs（webpack-dev-server的依赖）在浏览器和服务器之间建立 一个 websocket长连接，将webpack编译打包各阶段的信息告知浏览器端

+ webpack根据 webpack-dev-server/client 传给它的信息以及 dev-server的配置决定是刷新浏览器还是进⾏模块热更新，如果是模块热更新继续执行，否者刷新浏览器

+ HotModuleReplacement.runtime 是客户端 HMR 的中枢，它接收到上⼀步传递给他的新模块的 hash 值，它通过JsonpMainTemplate.runtime 向 server 端发送 Ajax 请求，服务端返回⼀个 json，该 json 包含了所有要更新的模块的 hash 值，获取到更新列表后，该模块再次通过 jsonp 请求，获取到最新的模块代码

+ HotModulePlugin 将会对新旧模块进⾏对⽐，决定是否更新模块

+ 当 HMR 失败后，回退到 live reload 操作，也就是进⾏浏览器刷新来获取最新打包代码

## webpack的构建流程(原理)是怎样的

webpack的构建流程是一个串行的过程，从启动到结束依次执行如下：

+ 初始化参数：从配置文件和shell语句中读取与合并参数，得出最终的参数
+ 开始编译：用上一步得到的参数初始化 Compiler对象，加载所有配置的插件，通过执行对象的run方法开始执行编译
+ 确定入口：根据配置中的entry找出所有的入口文件
+ 编译模块：从入口文件出发，调用所有配置的loader对模块进行"加载"，再找出该模块依赖的模块，递归此步骤知道所有入口依赖的文件都经过处理结束
+ 完成编译模块：处理结束，得到了每个模块被"加载"之后的最终内容以及他们之间的依赖关系
+ 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的chunk，再将每个chunk转换成一个单独的文件加入输出列表中
+ 输出完成：确定输出内容之后，根据配置确定输出的路径和⽂件名，写⼊到⽂件系统

## 如何用webpack优化前端性能

+ 压缩代码：比如利用UglifyJsPlugin来对js文件压缩
+ CDN加速：将引用的静态资源修改为CDN上的路径。比如可以抽离出静态js，在index利用CDN引入；利⽤webpack对于 output 参数和各loader的publicPath参数来修改资源路径
+ 删除Tree Shaking：将代码中永远不会走到的片段删除。可以通过在启动webpack时追加参数 --optimize-minimize  来实现
+ 按照路由拆分代码，实现按需加载，提取公共代码
+ 优化图片，对于小图可以使用 base64 的方式写入文件中