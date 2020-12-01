(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{777:function(e,t,a){"use strict";a.r(t);var p=a(103),r=Object(p.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h2",{attrs:{id:"对-webpack-的看法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#对-webpack-的看法"}},[e._v("#")]),e._v(" 对 webpack 的看法")]),e._v(" "),a("p",[e._v("我当时使用 webpack 的一个最主要原因是为了简化页面依赖的管理，并且通过将其打包为一个文件来降低页面加载时请求的资源数。")]),e._v(" "),a("p",[e._v("我认为 webpack 的主要原理是，它将所有的资源都看成是一个模块，并且把页面逻辑当作一个整体，通过一个给定的入口文件，webpack 从这个文件开始，找到所有的依赖文件，将各个依赖文件模块通过 loader 和 plugins 处理后，然后打包在一起，最后输出一个浏览器可识别的 JS 文件。")]),e._v(" "),a("p",[e._v("Webpack 具有四个核心的概念，分别是 "),a("strong",[e._v("Entry（入口）、Output（输出）、loader 和 Plugins（插件）")]),e._v("。")]),e._v(" "),a("p",[e._v("Entry 是 webpack 的入口起点，它指示 webpack 应该从哪个模块开始着手，来作为其构建内部依赖图的开始。")]),e._v(" "),a("p",[e._v("Output 属性告诉 webpack 在哪里输出它所创建的打包文件，也可指定打包文件的名称，默认位置为 ./dist。")]),e._v(" "),a("p",[e._v("loader 可以理解为 webpack 的编译器，它使得 webpack 可以处理一些非 JavaScript 文件。在对 loader 进行配置的时候，test 属性，标志有哪些后缀的文件应该被处理，是一个正则表达式。use 属性，指定 test 类型的文件应该使用哪个 loader 进行预处理。常用的 loader 有css-loader、style-loader 等。")]),e._v(" "),a("p",[e._v("插件可以用于执行范围更广的任务，包括打包、优化、压缩、搭建服务器等等，要使用一个插件，一般是先使用 npm 包管理器进行安装，然后在配置文件中引入，最后将其实例化后传递给plugins 数组属性。")]),e._v(" "),a("p",[e._v("使用 webpack 的确能够提供我们对于"),a("strong",[e._v("项目的管理")]),e._v("，但是它的缺点就是调试和配置起来太麻烦了。但现在 webpack4.0 的免配置一定程度上解决了这个问题。但是我感觉就是对我来说，就是一个黑盒，很多时候出现了问题，没有办法很好的定位。")])])}),[],!1,null,null,null);t.default=r.exports}}]);