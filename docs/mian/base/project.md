## 对 webpack 的看法

我当时使用 webpack 的一个最主要原因是为了简化页面依赖的管理，并且通过将其打包为一个文件来降低页面加载时请求的资源数。

我认为 webpack 的主要原理是，它将所有的资源都看成是一个模块，并且把页面逻辑当作一个整体，通过一个给定的入口文件，webpack 从这个文件开始，找到所有的依赖文件，将各个依赖文件模块通过 loader 和 plugins 处理后，然后打包在一起，最后输出一个浏览器可识别的 JS 文件。

Webpack 具有四个核心的概念，分别是 **Entry（入口）、Output（输出）、loader 和 Plugins（插件）**。

Entry 是 webpack 的入口起点，它指示 webpack 应该从哪个模块开始着手，来作为其构建内部依赖图的开始。

Output 属性告诉 webpack 在哪里输出它所创建的打包文件，也可指定打包文件的名称，默认位置为 ./dist。

loader 可以理解为 webpack 的编译器，它使得 webpack 可以处理一些非 JavaScript 文件。在对 loader 进行配置的时候，test 属性，标志有哪些后缀的文件应该被处理，是一个正则表达式。use 属性，指定 test 类型的文件应该使用哪个 loader 进行预处理。常用的 loader 有 css-loader、style-loader 等。

插件可以用于执行范围更广的任务，包括打包、优化、压缩、搭建服务器等等，要使用一个插件，一般是先使用 npm 包管理器进行安装，然后在配置文件中引入，最后将其实例化后传递给 plugins 数组属性。

使用 webpack 的确能够提供我们对于**项目的管理**，但是它的缺点就是调试和配置起来太麻烦了。但现在 webpack4.0 的免配置一定程度上解决了这个问题。但是我感觉就是对我来说，就是一个黑盒，很多时候出现了问题，没有办法很好的定位。

## 谈谈你对 webpack 的看法（webpack 的特点）

答案：WebPack 是一个模块打包工具，你可以使用 WebPack 管理你的模块依赖，并编绎输出模块们所需的静态文件。它能够很好地管理、打包 Web 开发中所用到的 HTML、JavaScript、CSS 以及各种静态文件（图片、字体等），让开发过程更加高效。对于不同类型的资源，webpack 有对应的模块加载器。webpack 模块打包器会分析模块间的依赖关系，最后 生成了优化且合并后的静态资源。

webpack 的两大特色：

1. code splitting（可以自动完成）
2. loader 可以处理各种类型的静态文件，并且支持串联操作

webpack 是以 commonJS 的形式来书写脚本滴，但对 AMD/CMD 的支持也很全面，方便旧项目进行代码迁移。

webpack 具有 requireJs 和 browserify 的功能，但仍有很多自己的新特性：

1. 对 CommonJS 、 AMD 、ES6 的语法做了兼容
2. 对 js、css、图片等资源文件都支持打包
3. 串联式模块加载器以及插件机制，让其具有更好的灵活性和扩展性，例如提供对 CoffeeScript、ES6 的支持
4. 有独立的配置文件 webpack.config.js
5. 可以将代码切割成不同的 chunk，实现按需加载，降低了初始化时间
6. 支持 SourceUrls 和 SourceMaps，易于调试
7. 具有强大的 Plugin 接口，大多是内部插件，使用起来比较灵活
8. webpack 使用异步 IO 并具有多级缓存。这使得 webpack 很快且在增量编译上更加快

#### 一、webpack 的常见配置

```js
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    // 入口文件
    entry: {
        app: path.join(__dirname, "../src/js/index.js")
    },
    // 输出文件
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/"
    },
    // loader配置
    module: {
        rules: [
            {
                test: /\.scss/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            }
            ......
        ]
    },
    // plugins配置
    plugins: [
        // 重新创建html文件
        new HtmlWebpackPlugin({
            title: "首页",
            filename: "index.html",
            template: path.resolve(__dirname, "../src/index.html")
        })
        ......
    ]
}
```

#### webpack 的打包原理

1. 识别入口文件
2. 通过逐层识别模块依赖(Commonjs、amd 或者 es6 的 import，webpack 都会对其进行分析，来获取代码的依赖)
3. webpack 做的就是分析代码，转换代码，编译代码，输出代码
4. 最终形成打包后的代码

#### 什么是 loader

loader 是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中

1. 处理一个文件可以使用多个 loader，loader 的执行顺序和配置中的顺序是相反的，即最后一个 loader 最先执行，第一个 loader 最后执行
2. 第一个执行的 loader 接收源文件内容作为参数，其它 loader 接收前一个执行的 loader 的返回值作为参数，最后执行的 loader 会返回此模块的 JavaScript 源码

#### 什么是 plugin

在 webpack 运行的生命周期中会广播出许多事件，plugin 可以监听这些事件，在合适的时机通过 webpack 提供的 API 改变输出结果。

#### loader 和 plugin 的区别

对于 loader，它是一个转换器，将 A 文件进行编译形成 B 文件，这里操作的是文件，比如将 A.scss 转换为 A.css，单纯的文件转换过程

plugin 是一个扩展器，它丰富了 webpack 本身，针对是 loader 结束后，webpack 打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听 webpack 打包过程中的某些节点，执行广泛的任务

```js
class MyPlugin{
    constructor(options){
        console.log("MyPlugin constructor:", options);
    }
    apply(compiler){
        compiler.plugin("compilation", compilation => {
            console.log("MyPlugin");
        });
    }
}
module.exports = MyPlugin;


webpack.config.js配置：
module.exports = {
    ...
    plugins: [
        new MyPlugin({param: "my plugin"})
    ]
}
```

使用该 plugin 后，执行的顺序：

1. webpack 启动后，在读取配置的过程中会执行 new MyPlugin(options)初始化一个 MyPlugin 获取其实例
2. 在初始化 compiler 对象后，就会通过 compiler.plugin(事件名称，回调函数)监听到 webpack 广播出来的事件
3. 并且可以通过 compiler 对象去操作 webpack

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

## 有手动编写过 loader 和 plugin，说一下思路

loader 能把源文件经过转化后输出新的结果，一个 loader 遵循单一职责原则，只完成一种转换，然后链式的顺序去依次经过多个 loader 转换，直到得到最终结果并返回，所以在写 loader 时要保持其职责的单一性，同时 webpack 还提供了一些 API 供 loader 调用

开发 plugin 中最常用的两个对象是 Compiler 和 Compilation，他们是 plugin 和 webpack 之间的桥梁

- Compiler  对象包含了 webpack 环境的所有配置信息，包含 options，loaders，plugins 这些信息，这个对象在 Webpack 启动时候被实例化，它是全局唯一的
- Compilation  对象包含了当前的模块资源，编译生成资源，变换的文件等。当 webpack 以开发模式运行时，每当检测到一个文件变化，一个新的 Compilation 将会被创建

## webpack 如何配置单页和多页应用

单页应用即为 webpack 的标准模式，直接在 entry 中指定单页面应用的入口即可：

多页面应用可以考虑使用 webpack 的 AutoWebPlugin  来完成简单的自动化构建，前提是项目目录结构要符合预先设定的规范

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

## webpack 如何做到热更新

webpack 热更新（Hot Module Replacement），缩写为 HMR，实现了不用刷新浏览器而将新变更的模块替换掉旧的模块，原理如下:

![](../../.vuepress/public/HMR.png)

server 端和 client 端都做了处理：

- webpack 监听到文件变化，重新编译打包，webpack-dev-server 和 webpack 之间接口交互（主要是 webpack-dev-middleware 调用 webpack 暴露的 API 对代码进行监控，并告诉 webpack 将打包后代码保存到内存中）

- 通过 sockjs（webpack-dev-server 的依赖）在浏览器和服务器之间建立 一个 websocket 长连接，将 webpack 编译打包各阶段的信息告知浏览器端

- webpack 根据 webpack-dev-server/client 传给它的信息以及 dev-server 的配置决定是刷新浏览器还是进⾏模块热更新，如果是模块热更新继续执行，否者刷新浏览器

- HotModuleReplacement.runtime 是客户端 HMR 的中枢，它接收到上⼀步传递给他的新模块的 hash 值，它通过 JsonpMainTemplate.runtime 向 server 端发送 Ajax 请求，服务端返回⼀个 json，该 json 包含了所有要更新的模块的 hash 值，获取到更新列表后，该模块再次通过 jsonp 请求，获取到最新的模块代码

- HotModulePlugin 将会对新旧模块进⾏对⽐，决定是否更新模块

- 当 HMR 失败后，回退到 live reload 操作，也就是进⾏浏览器刷新来获取最新打包代码

## webpack 的构建流程(原理)是怎样的

webpack 的构建流程是一个串行的过程，从启动到结束依次执行如下：

- 初始化参数：从配置文件和 shell 语句中读取与合并参数，得出最终的参数
- 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，通过执行对象的 run 方法开始执行编译
- 确定入口：根据配置中的 entry 找出所有的入口文件
- 编译模块：从入口文件出发，调用所有配置的 loader 对模块进行"加载"，再找出该模块依赖的模块，递归此步骤知道所有入口依赖的文件都经过处理结束
- 完成编译模块：处理结束，得到了每个模块被"加载"之后的最终内容以及他们之间的依赖关系
- 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 chunk，再将每个 chunk 转换成一个单独的文件加入输出列表中
- 输出完成：确定输出内容之后，根据配置确定输出的路径和⽂件名，写⼊到⽂件系统

## 如何用 webpack 优化前端性能

- 压缩代码：比如利用 UglifyJsPlugin 来对 js 文件压缩
- CDN 加速：将引用的静态资源修改为 CDN 上的路径。比如可以抽离出静态 js，在 index 利用 CDN 引入；利⽤ webpack 对于 output 参数和各 loader 的 publicPath 参数来修改资源路径
- 删除 Tree Shaking：将代码中永远不会走到的片段删除。可以通过在启动 webpack 时追加参数 --optimize-minimize  来实现
- 按照路由拆分代码，实现按需加载，提取公共代码
- 优化图片，对于小图可以使用 base64 的方式写入文件中

## Webpack 性能优化

webpack 的优化瓶颈，主要是两个方面：

- webpack 的构建过程太花时间。
- webpack 打包的结果体积太大。

### 构建时间

对于构建的时间，我们通常使用 `speed-measure-webpack-plugin` 插件来进行分析

#### 多线程打包

**happypack** 可以实现多线程打包的功能，通过设置 js 打包或者 css 打包过程，使用 happypack 的
loader 进行打包

```js
rules:[
 {
    test: /\.js$/,
    exclude:/node_modules/,
    include: path.resolve('src'),
    use: 'Happypack/loader?id=js'  // 使用 happypack 的 loader 进行打包
 },
 {
    test: /\.css$/,
    // ......
 }
]
plugins:[
  //css
  new  Happypack({
   id:'css',
 }),
  // js
new Happypack({
  id:'js',
  use:[{ // 插件配置
      loader: 'babel-loader',    
      options: {
        presets:[
          '@babel/preset-env'
       ]
     }
   }]
 })
})
```

注意：适用条件，如果项目比较小，使用多线程往往打包速度更慢，如果项目足够的大，可以开启多线程进行打包

使用 **thread-loader** 对其进行打包。

```js
// 导入速度分析插件
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// 实例化插件
const smp = new SpeedMeasurePlugin();
module.exports = {
  configureWebpack: smp.wrap({
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ["thread-loader"],
        },
      ],
    },
  }),
};
```

#### 并行压缩

并行压缩主要有三种解决方案：

- parallel-uglify-plugin
- uglifyjs-webpack-plugin 开启 parallel 参数
- terser-webpack-plugin 开启 parallel 参数 （推荐使用这个，支持 ES6 语法压缩）

#### 预编译

我们构建前端项目的时候，往往希望第三方库（ vendors ）和自己写的代码可以分开打包，因为第三方库往往不需要经常打包更新。所以我们使用 dell.js 提前打包好，而不是每次打包都会要输出

DllPlugin 结合 DllRefrencePlugin 插件的运用，对将要产出的 bundle 文件进行拆解打包，可以很彻底地加快 webpack 的打包速度

#### 缩小目标

我们可以限定范围，缩小查询目标，从而达到减少打包时间的目的

用 **include 或 exclude** 来帮我们避免不必要的转译。

```js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    },
  ];
}
```

**resolve.alias 设置别名**

如果不配置此选项，第三方依赖包会在本地包中查找，如果查找不到，则会在全局的依赖包中查找。

```js
modules: [path.resolve('node_modules')],// 首先在包里查找
extensions:['.js', '.css', '.json'], // 自动添加扩展名
alias: { // 别名
  bootstrap:'bootstrap/dist/css/bootstrap.css'  // 可以直接引用别名
}
```

#### 缓存

为了进一步提高打包的速度，我们使用缓存技术提高打包速度

**webpack babel-loader cache 原理**

在 babel-loader 在打包的时候可以使用缓存技术，经过一次编译之后，将索引的文件与文件编译结果缓存在内存中，后续编译发现索引文件已经缓存过了，就直接编译缓存的结果

```js
module: {
  rules: [
    {
      test: /\.js$/,
      loader: ["babel-loader?cacheDirectory=true"], // 开启 babel-loader 缓存
    },
  ];
}
```

**hard-source-webpack-plugin 模块缓存(效果明显)**

该缓存会持久化缓存在硬盘上，此一次编译采用 hashCode 标记结果。当第二次编译时，首先加载编译结果，然后计算文件的 hashCode 值，如果缓存库中已经存在，那么直接跳过编译环节，输出结果

```js
npm install hard-source-webpack-plugin --save
plugins: [
    new HardSourceWebpackPlugin(),
]
```

### 打包体积

通常分析项目最后打包的体积大小，通常使用 `webpack-bundle-analyzer` 可视化插件来查看打包体积大小

#### Tree-Shaking 删除冗余代码

从 webpack 2 开始， webpack 原生支持了 ES6 的模块系统，推出了 Tree-Shaking 。

基于 import/export 语法， Tree-Shaking 可以在编译的过程中获悉哪些模块并没有真正被使用，这些没用的代码，在最后打包的时候会被去除

#### 压缩 HTML/JS/CSS

- HTML 压缩： html-webpack-plugin —— 删除双引号和折叠为一行。
- CSS
  - 压缩： mini-css-extract-plugin
  - 去除无用的 css: purgecss-webpack-plugin

## Webpack 打包后的代码

webpack 打包后的核心代码:

```js
(function(modules) {
 var installedModules = {};
 function __webpack_require__(moduleId) {
  if (installedModules[moduleId]) {
   return installedModules[moduleId].exports;
 }
  var module = (installedModules[moduleId] = {
   i: moduleId,
   l: false,
   exports: {}
 });
  modules[moduleId].call(
   module.exports,
   module,
   module.exports,
   __webpack_require__
 );
  module.l = true;
  return module.exports;
}
 return __webpack_require__((__webpack_require__.s = "./src/index.js"));
})({
 "./src/a.js": function(module, exports, __webpack_require__) {
  eval(
   "let b = __webpack_require__(/*! ./base/b.js */
\"./src/base/b.js\");\r\n\r\nmodule.exports = 'a' + b;\r\n\r\n\r\n\r\n\n\n//#
sourceURL=webpack:///./src/a.js?"
 );
},
 "./src/base/b.js": function(module, exports) {
  eval("module.exports = 'b'\n\n//# sourceURL=webpack:///./src/base/b.js?");
},
 "./src/index.js": function(module, exports, __webpack_require__) {
  eval(
   'let str = __webpack_require__(/*! ./a.js */
"./src/a.js")\r\n\r\nconsole.log(str)\n\n//#
sourceURL=webpack:///./src/index.js?'
 );
}
});
```

整体来看，就是一个自执行函数，如下

```js
(function(modules) {
  ...
})({
  ...
})
```

自执行函数的传参是一个对象，**对象的键值对分别对应的是打包的模块名的一个相对路径和一个代码块**

```js
{
 "./src/a.js": function(module, exports, __webpack_require__) {
  eval(
   "let b = __webpack_require__(/*! ./base/b.js */
\"./src/base/b.js\");\r\n\r\nmodule.exports = 'a' + b;\r\n\r\n\r\n\r\n\n\n//#
sourceURL=webpack:///./src/a.js?"
 );
},
 "./src/base/b.js": function(module, exports) {
  eval("module.exports = 'b'\n\n//# sourceURL=webpack:///./src/base/b.js?");
},
 "./src/index.js": function(module, exports, __webpack_require__) {
  eval(
   'let str = __webpack_require__(/*! ./a.js */
"./src/a.js")\r\n\r\nconsole.log(str)\n\n//#
sourceURL=webpack:///./src/index.js?'
 );
}
}
```

在自执行函数的内部，有一个重要的函数就是 webpack_require，在 return 的时候进行了调用，默认的传参是我们项目打包的主路径。

## 平时如何管理你的项目？

答案：

a. 先期团队必须确定好全局样式（globe.css），编码模式(utf-8) 等；

b. 编写习惯必须一致（例如都是采用继承式的写法，单样式都写成一行）；

c. 标注样式编写人，各模块都及时标注（标注关键样式调用的地方）；

d. 页面进行标注（例如 页面 模块 开始和结束）；

e. CSS 跟 HTML 分文件夹并行存放，命名都得统一（例如 style.css）；

f. JS 分文件夹存放 命名以该 JS 功能为准的英文翻译。

g. 图片采用整合的 images.png png8 格式文件使用 尽量整合在一起使用方便将来的管理

## 怎么提高首屏加载速度

答案：服务端渲染等

## 模块化开发怎么做？

答案：

- AMD 是 RequireJS 在推广过程中对模块定义的规范化产出。
- CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。

- AMD 是提前执行，CMD 是延迟执行。
- AMD 推荐的风格通过返回一个对象做为模块对象，CommonJS 的风格通过对 module.exports 或 exports 的属性赋值来达到暴露模块对象的目的。

CMD 模块方式

```js
define(function(require, exports, module) {
  // 模块代码
});
```

## 调试工具的使用

答案：

调试模式中的按钮作用
F8 跳出断点调试模式
F10、F11 代码的逐行调试

进入断点调试模式的 方法

1. 在浏览器当中打断点
2. 直接在代码中加 debugger

## 首屏、白屏时间如何计算？

答案：

Performance 接口可以获取到当前页面中与性能相关的信息。<br>
该类型的对象可以通过调用只读属性 Window.performance 来获得。<br>
白屏时间：

```
performance.timing.responseStart - performance.timing.navigationStart
```

首屏时间

```
window.onload = () => {
    new Date() - performance.timing.responseStart
}
```

## 项目开发经历了哪几个阶段

答案：

- 需求分析及变更管理
- 项目模型及业务流程分析
- 系统分析及建模设计
- 界面设计及代码开发
- 系统测试，部署和文档编写
- 维护

## WEB 应用从服务器主动推送 Data 到客户端有那些方式？

答案：

- html5 websoket
- WebSocket 通过 Flash
- XHR 长时间连接
- XHR Multipart Streaming
- 不可见的 Iframe
- `<script>`标签的长时间连接(可跨域)

## 模块化怎么做？

答案：

立即执行函数,不暴露私有成员

```js
var module1 = (function() {
  var _count = 0;
  var m1 = function() {
    //...
  };
  var m2 = function() {
    //...
  };
  return {
    m1: m1,
    m2: m2,
  };
})();
```

## 什么是响应式设计？

答案：它是关于网页制作的过程中让不同的设备有不同的尺寸和不同的功能。响应式设计是让所有的人能在这些设备上让网站运行正常

## Ascii、GBK、UTF、Unicode

答案：

- Ascii（1 个字节 1 个字符）
- GBK 是国内的编码标准（汉字 2 个字节）
- Unicode 是国际编码标准（统一 2 个字节表示一个字符）
- UTF 是 Unicode 实现的另一个标准
  > unicode 同样也不完美，这里就有两个的问题，一个是，如何才能区别 unicode 和 ascii？<br>
  > 由于”半角”英文符号只需要用到低 8 位，所以其高 8 位永远是 0，因此这种大气的方案在保存英文文本时会多浪费一倍的空间<br>
  > unicode 在很长一段时间内无法推广，直到互联网的出现，为解决 unicode 如何在网络上传输的问题，于是面向传输的众多 UTF（UCS Transfer Format）标准出现了，顾名思义，UTF-8 就是每次 8 个位传输数据，而 UTF-16 就是每次 16 个位。UTF-8 就是在互联网上使用最广的一种 unicode 的实现方式，这是为传输而设计的编码，并使编码无国界，这样就可以显示全世界上所有文化的字符了。UTF-8 最大的一个特点，就是它是一种变长的编码方式。它可以使用 1~4 个字节表示一个符号，根据不同的符号而变化字节长度，当字符在 ASCII 码的范围时，就用一个字节表示，保留了 ASCII 字符一个字节的编码做为它的一部分，注意的是 unicode 一个中文字符占 2 个字节，而 UTF-8 一个中文字符占 3 个字节）。从 unicode 到 utf-8 并不是直接的对应，而是要过一些算法和规则来转换。

## 什么是“前端路由"?什么时候适合使用“前端路由"? “前端路由"有哪些优点和缺点?

答案：

1. 什么是前端路由？

   路由是根据不同的 url 地址展示不同的内容或页面

   前端路由就是把不同路由对应不同的内容或页面的任务交给前端来做，之前是通过服务端根据 url 的不同返回不同的页面实现的。

2. 什么时候使用前端路由？

   在单页面应用，大部分页面结构不变，只改变部分内容的使用

3. 前端路由有什么优点和缺点？

   优点

   用户体验好，不需要每次都从服务器全部获取，快速展现给用户

   缺点

   使用浏览器的前进，后退键的时候会重新发送请求，没有合理地利用缓存

   单页面无法记住之前滚动的位置，无法在前进，后退的时候记住滚动的位置