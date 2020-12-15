## 阿里巴巴 2017 秋招前端笔试题

**下面的 JSX 代码中，哪一个无法达到预期的效果？**

```
<h2>Hello World</h2>
<input type=”checkbox”/>
<div class=”msg-box”>{msg}</div> √
<label htmlFor=”name”>Leo</label>
<div style={{height: 50}}></div>
<img src={imgSrc}/>
```

在 jsx 里面,要把 class 换成 className 才能正确编译

---

**正则表达式 /a+(bab)?(caac)\*/ ，下列选项中是该正则表达式的子集是？**

```
/(bab)(caca)/
/a(bab){2}(caac)*/
/a{2}/                  √
/a+(bab){0,1}(ca)+(ca)/
/a(^bab)+(caac){1,}/
/a+(babc){2,}(acc){1,}/
```

题目中的 a+ 代表 字符“a” 出现 1 次或者若干次，(bab)? 代表 字符 “bab” 出现一次或者 0 次，(caac)\* 表示重复了“0 或者若干次”的字符“caac”，即 字符“caac”出现 0 次或者若干次

A /(bab)(caca)/ ：匹配含有 “babcaca” 的字符串，不是题目中的 “babcaac”, 就好比是在找 “太星” 而不是"太白"，而且没有 a，所以该正则匹配的结果不可能出现在题目匹配的结果中，错误。

B /a(bab){2}(caac)\*/ ：其中(bab){2} 表示 字符串“bab”必须出现 2 次，与题干正则显然不同，错误。

C /a{2}/ ：其中(a){2} 表示 字符“a”必须出现 2 次，就好比 “李李” ，属于题目匹配结果的子集，正确。

D /a+(bab){0,1}(ca)+(ca)/ ：前半部分正确，后半部分(ca)+(ca)明显错误。

E /a(^bab)+(caac){1,}/：正则本身有误，(^bab)匹配以"bab"开头的字符串，但前面还有 a,也就是匹配以 a 开头的字符串，两者矛盾。

F /a+(babc){2,}(acc){1,}/：分组和区间值都不正确。

---

**下列说法错误的是：**

```
在Blink和WebKit的浏览器中，某个元素具有3D或透视变换（perspective transform）的CSS属性，会让浏览器创建单独的图层。
我们平常会使用left和top属性来修改元素的位置，但left和top会触发重布局，取而代之的更好方法是使用translate，这个不会触发重布局。
移动端要想动画性能流畅，应该使用3D硬件加速，因此最好给页面中的元素尽量添加translate3d或者translateZ(0)来触发3D硬件加速。 √
解决浏览器渲染的性能问题时，首要目标就是要避免层的重绘和重排。
```

滥用硬件加速会导致严重性能问题，因为它增加了内存使用，并且它会导致移动端电池寿命减少。

---

**将数组 `var a=[1,2,3]` 变成数组 `[4,3,2,1]` 下面的方式正确的是？**

```
a.reverse().unshift(4) √
a.push(4).reverse()
a.push(4); a.reverse() √
a.splice(3,1,4).reverse()
```

a.psuh()无返回值，不能使用链式

---

**目前 HTTP2 协议已经逐渐普及到日常服务器中，以下对于 HTTP2 协议描述正确的是：**

```
所有http请求都建立在一个TCP请求上，实现多路复用 √
可以给请求添加优先级                    √
服务器主动推送 server push      √
HTTP2的头部会减小，从而减少流量传输     √
```

- HTTP 2.0 所有通信都在一个 TCP 连接上完成。
- HTTP 2.0 浏览器可以在发现资源时立即分派请求，指定每个流的优先级，让服务器决定最优的响应次序。
- HTTP 2.0 支持服务器到客户端的主动推送机制。
- HTTP/2.0 通过支持首部字段压缩和在同一连接上发送多个并发消息，让应用更有效地利用网络资源，减少感知的延迟时间。

---

**请问下面哪种方式可以在不改变原来数组的情况下，拷贝出数组 b ，且满足 b!=a 。例如数组 a 为 `[1,2,3]` 。**

```
let b=a;
let b=a.slice();   √
let b=a.splice(0,0);
let b=a.concat();   √
```

slice 和 concat 方法均返回新数组，而 splice 方法的主要作用就是对原数组进行增删改操作，返回值为截取删除掉的子数组

---

**以下代码，分别给节点 #box 增加如下样式，问节点 #box 距离 body 的上边距是多少？**

```
<body style=”margin:0;padding:0”>

<div id=”box” style=”top:10px;margin:20px 10px;”>

</div>

</body>

如果设置 position: static ; 则上边距为 1 px    20

如果设置 position: relative ; 则上边距为2 px    30

如果设置 position: absolute ; 则上边距为3 px    30

如果设置 position: sticky ; 则滚动起来上边距为4 px   10
```

- position: static，元素处于正常的文档流中，会忽略 left、top、right、bottom 和 z-index 属性，只有 margin:20px 10px 好使，margin-top 为 20px,所以上边距为 20px
- position: relative ; 元素设置相对于原本位置的定位,margin-top 的 20px 加上 top 的 10ox 为 30px
- position: absolute 同上，只不过这个定位是脱离文档流的
- position: sticky 元素未滚动，在当前可视区域他的 top 值不生效，只有 margin 生效，滚动起来后 margin 失效，top 值生效

---

**我们需要实现动态加载一个 JavaScript 资源，但是有几处不知道如何处理，需要您的帮助完成这一项工作**

```js
var script = document.createElement(“script”);

var head = document.getElementsByTagName(“head”)[0];


script.type = “text/javascript”;

script.src = “//i.alicdn.com/resource.js”;


// 绑定资源加载成功事件

script.1 = function( ){

// 判断资源加载状态是否为加载成功或加载完成

if(2. test (script.3  )  ) {

script.onreadystatechange = null;

. . . .

}

};


// 绑定资源加载失败事件

script.4 = function( ) {

. . . .

};


head.insertBefore (script , head.firstChild)

```

```
参考答案
(1) onreadystatechange
(2) /^(loaded|complete)$/
(3) readyState
(4) onerror
```

---

请使用**两种不同的 CSS 方法**（要求 dom 结构不同）实现下图所示的条形图。从左到右的条形分别记为 A,B,C,D,E。A 的高度为 30%，颜色为`#f00`；B 的高度为 80%，颜色为`#ddd`；C 的高度为 70%，颜色为`#0fd`；D 的高度为 60%，颜色为`#ff0`；E 的高度为 90%，颜色为`#234`，每个条形之间的距离可以任意设置（可以考虑使用 CSS3 新属性来实现

![](https://uploadfiles.nowcoder.com/images/20170717/6637866_1500281056143_8BF79CE654B06156A9ECFB3085670334)

```html
<div
  style="height:100px;width:200px;position:relative;border-left: 1px solid #000;"
>
  <div
    style="height:30%;width:10px;background-color:#f00;position:absolute;top:70%;left:10px;"
  ></div>
  <div
    style="height:80%;width:10px;background-color:#ddd;position:absolute;top:20%;left:30px;"
  ></div>
  <div
    style="height:70%;width:10px;background-color:#0fd;position:absolute;top:30%;left:50px;"
  ></div>
  <div
    style="height:60%;width:10px;background-color:#ff0;position:absolute;top:40%;left:70px;"
  ></div>
  <div
    style="height:90%;width:10px;background-color:#234;position:absolute;top:10%;left:100px;"
  ></div>
</div>
```

```css
#container{
            display: flex;                  /*弹性盒模型容器*/
            display: -webkit-flex;
            justify-content: space-around;  /*剩余空白空间平均分配,环绕子元素*/
            align-items: flex-end;          /*子元素对齐底部*/
            width: 320px;
            height: 300px;
            border-left: 1px solid black;
            border-bottom: 1px solid gray;
        }
        .rect{
            float: left;
            width: 50px;
        }
        .rect1{
            height:30%;
            background-color: #f00;
        }
        .rect2{
            height:80%;
            background-color: #ddd;
        }
        .rect3{
            height:70%;
            background-color: #0fd;
        }
        .rect4{
            height:60%;
            background-color: #ff0;
        }
        .rect5{
            height:90%;
            background-color: #234;
        }
    </style>
```

---

**请实现方法 parse ，作用如下：**

```js
var object = {
 b: { c: 4 }, d: [{ e: 5 }, { e: 6 }]
};
console.log( parse(object, ‘b.c’) == 4 ) //true
console.log( parse(object, ‘d[0].e’) == 5 ) //true
console.log( parse(object, ‘d.0.e’) == 5 ) //true
console.log( parse(object, ‘d[1].e’) == 6 ) //true
console.log( parse(object, ‘d.1.e’) == 6 ) //true
console.log( parse(object, ‘f’) == ‘undefined’ ) //true
```

```js
function parse(obj, str) {
  str
    .replace("[", ".")
    .replace("]", "")
    .split(".")
    .map((ele) => (obj = obj[ele.trim()]));
  return obj || "undefined";
}
```

or

```js
function parse(obj, str) {
  var arr = str.replace(/\[(\w)\]/g, ".$1").split("."),
    i = 0,
    tmp = obj; //把[]都替换成.的形式

  while (i < arr.length && tmp) {
    tmp = tmp[arr[i++]];
  }

  //console.log(tmp)

  return tmp != undefined ? tmp : "undefined"; //注意undefined要返回字符串
}
```

---

**请问何为混合应用 (Hybrid APP) ，与原生 Native 应用相比它的优劣势。**

Hybrid APP 是 Native APP 上结合使用了 Web View （Native APP 的模块或称组件，用来加载 Web 资源），采用了 Web 技术的 APP，本质上属于原生应用（APP 外壳）。

优势：

- 兼容性良好，“一次开发，多处运行”，能够减少原生 APP 开发在多平台带来的问题

- 代码移植性高

- 开发者社区活跃，能够及时应用最新适合的 Web 技术来解决问题，提高用户体验

- APP 更加轻便，内容更新方便，部分更新不用从 APP Store 下载

劣势：

性能：

- 相对不如 Native APP 性能良好、体验流畅

- Web 技术在 APP 中操作权限有限，需要 APP 同步支持

## 阿里巴巴 2016 前端开发工程师笔试(二)

**下列哪个操作是 W3C 标准定义的阻止事件向父容器传递：**

```
e.preventDefault()
e.cancelBubble=true
e.stopPropagation() √
e.stopImmediatePropagation()
```

- DOM 中的事件对象：（符合 W3C 标准）
  - preventDefault() 取消事件默认行为
  - stopImmediatePropagation() 取消事件冒泡同时阻止当前节点上的事件处理程序被调用。
  - stopPropagation() 取消事件冒泡对当前节点无影响。
- IE 中的事件对象：
  - cancelBubble() 取消事件冒泡
  - returnValue() 取消事件默认行为

---

**以下关于盒子模型描述正确的是：**

```
标准盒子模型中：盒子的总宽度 ＝ 左右margin + 左右border + 左右padding + width √
IE盒子模型中：盒子总宽度 ＝ 左右margin + 左右border + width
标准盒子模型中：盒子的总宽度 ＝ 左右margin + 左右border + width
IE盒子模型中：盒子总宽度 ＝ width
```

---

**使用 CSS 的 flexbox 布局，不能实现以下哪一个效果：**

```
三列布局，随容器宽度等宽弹性伸缩
多列布局，每列的高度按内容最高的一列等高
三列布局，左列宽度像素数确定，中、右列随容器宽度等宽弹性伸缩
多个宽高不等的元素，实现无缝瀑布流布局 √
```

```html
<h1>不等宽不等高（定宽）</h1>
<div class="box box1">
  <div class="flex-box" style="width:100px;height:100px;">1</div>
  <div class="flex-box" style="width:250px;height:250px;">3</div>
  <div class="flex-box" style="width:200px;height:200px;">2</div>
  <div class="flex-box" style="width:350px;height:350px;">5</div>
  <div class="flex-box" style="width:400px;height:400px;">4</div>
  <div class="flex-box" style="width:500px;height:500px;">7</div>
  <div class="flex-box" style="width:450px;height:450px;">6</div>
</div>
<h1>不 等宽 等高（ 定宽+变宽）</h1>
<div class="box box2">
  <div class="left flex-box">left</div>
  <div class="center flex-box">center</div>
  <div class="right flex-box">right</div>
</div>
<h1>等宽 等高（变宽）</h1>
<div class="box box3">
  <div class="flex-box">1</div>
  <div class="flex-box">2</div>
  <div class="flex-box">3</div>
</div>
<h1>等宽不等高 （定宽）</h1>
<div class="box box4">
  <div class="flex-box" style="height:100px;">1</div>
  <div class="flex-box" style="height:250px;">2</div>
  <div class="flex-box" style="height:400px;">3</div>
  <div class="flex-box" style="height:350px;">4</div>
  <div class="flex-box" style="height:300px;">5</div>
  <div class="flex-box" style="height:500px;">6</div>
  <div class="flex-box" style="height:450px;">7</div>
</div>
```

```css
.box {
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: flex-start;
}
.flex-box {
  height: 200px;
  width: 500px;
  background-color: #ddd;
  border: 1px solid #fff;
}
.box1 .flex-box {
  background-color: #e0bcdb;
}
.box2 .flex-box {
  background-color: #e0b6b6;
  width: 800px;
}
.left {
  flex-shrink: 0; //空间不足时不允许左侧缩小
}
.box3 .flex-box {
  background-color: #abd9e0;
  width: 900px;
}
.box4 {
  flex-wrap: wrap; //空间不足换行
}
.box4 .flex-box {
  background-color: #dadada;
}
```

![](https://uploadfiles.nowcoder.com/images/20160727/213669_1469613379347_52FD5713A5B0985484D21130708A3279)

**关于 HTML 语义化，以下哪个说法是正确的？**

```
语义化的HTML有利于机器的阅读，如PDA手持设备、搜索引擎爬虫；但不利于人的阅读
Table 属于过时的标签，遇到数据列表时，需尽量使用 div 来模拟表格
语义化是HTML5带来的新概念，此前版本的HTML无法做到语义化
header、article、address都属于语义化明确的标签  √
```

---

**关于 HTTP 协议，下面哪个说法是正确的？**

```
HTTP协议是有状态协议。
以下是一个Http链接的response 的响应头： GET /xxx/xxx/js/lib/test.js HTTP/1.1 Host: 127.0.0.1 Connection: keep-alive Pragma: no-cache Cache-Control: no-cache Accept: */*
RESTful 接口中，利用HTTP协议的method字段来描述要对资源操作的方式，比如GET表示获取资源，POST表示新增一个资源，PUT表示更新资源,DELETE 表示删除资源等等。 √
一个HTTP请求返回的HTTP状态码中，304表示临时重定向。
```

- A 错误，http 是无状态的
- B 错误，后面的是 request 头
- C 正确，GET 表示获取资源，POST 表示新增一个资源，PUT 表示更新资源,DELETE 表示删除资源等等
- D 错误，状态码 304 表示：如果客户端发送了一个带条件的 GET 请求且该请求已被允许，而文档的内容（自上次访问以来或者根据请求的条件）并没有改变，则服务器应当返回这个状态码。307 表示临时重定向！！！

**使用 for in 循环数组中的元素会枚举原型链上的所有属性，过滤这些属性的方式是使用 1 函数**

`hasOwnProperty`

拼写正确

---

**代码填空记得加分号**

---

**写一个求和的函数 sum，达到下面的效果**

```js
// Should equal 15
sum(1, 2, 3, 4, 5);
// Should equal 0
sum(5, null, -5);
// Should equal 10
sum(
  "1.0",
  false,
  1,
  true,
  1,
  "A",
  1,
  "B",
  1,
  "C",
  1,
  "D",
  1,
  "E",
  1,
  "F",
  1,
  "G",
  1
);
// Should equal 0.3, not 0.30000000000000004
sum(0.1, 0.2);
```

```js
function sum() {
  var nResult = 0;
  for (var i = 0, l = arguments.length; i < l; i++) {
    nResult += window.parseFloat(arguments[i]) || 0;
  }
  return (nResult.toFixed(3) * 1000) / 1000;
}
```

**请写一个表格以及对应的 CSS，使表格奇数行为白色背景，偶数行为灰色背景，鼠标移上去时为黄色背景。**

```html
<table class="table">
  <tr>
    <td>第一行</td>
  </tr>
  <tr>
    <td>第二行</td>
  </tr>
  <tr>
    <td>第三行</td>
  </tr>
  <tr>
    <td>第四行</td>
  </tr>
</table>

<style>
  .table tr:nth-child(2n-1) {
    background-color: white;
  }
  .table tr:nth-child(2n) {
    background-color: grey;
  }
  .table tr:hover {
    background-color: yellow;
  }
</style>
```

---

**写一个 traverse 函数，输出所有页面宽度和高度大于 50 像素的节点。**

```js
function traverse(oNode) {
  var aResult = [];
  oNode = oNode || document.body;
  if (oNode.style) {
    var nWidth = window.parseInt(oNode.style.width, 10) || 0;
    var nHeight = window.parseInt(oNode.style.height, 10) || 0;
    if (nWidth > 50 && nHeight > 50) {
      aResult.push(oNode);
    }
  }
  var aChildNodes = oNode.childNodes;
  if (aChildNodes.length > 0) {
    for (var i = 0, l = aChildNodes.length; i < l; i++) {
      var oTmp = aChildNodes[i];
      aResult = aResult.concat(traverse(oTmp));
    }
  }
  return aResult;
}
```

## 阿里巴巴 2016 前端开发工程师笔试(一)

**contextmenu 是当浏览者按下鼠标右键出现菜单时或者通过键盘的按键触发页面菜单时触发的事件**

---

**下面关于 CSS 布局的描述，不正确的是？**

```
块级元素实际占用的宽度与它的 width 属性有关；
块级元素实际占用的宽度与它的 border 属性有关；
块级元素实际占用的宽度与它的 padding 属性有关；
块级元素实际占用的宽度与它的 background 属性有关。 √
```

注意是不正确的是！！！

块级元素的总的宽度=左右 padding+左右 border+内容区的 width，我们实际设置的 width 指的就是内容区的 width，所以当改变 padding、border、width 中的任一项的时候，块元素的总宽度都会发生变化

---

**下面有关 html 的描述，不推荐的是？**

```
在页面顶部添加 doctype声明；
在 </head> … <body> 中间插入 HTML 代码； √
避免使用 <font> 标签；
使用 <table> 元素展现学生成绩表等数据。
```

HTML 代码是插入在`<body>..</body>`之间，因为 body 是页面的主体部分，我们浏览网页的时候除了标题之外的东西都是在 body 中呈现的

---

**浏览器在一次 HTTP 请求中，需要传输一个 4097 字节的文本数据给服务端，可以采用那些方式?**

```
存入 IndexdDB
写入 COOKIE
放在 URL 参数
写入 Session
使用 POST  √
放在 Local Storage
```

- IndexdDB 是 HTML5 的本地存储，把一些数据存储到浏览器（客户端）中，当与网络断开时，可以从浏览器中读取数据，用来做一些离线应用。

- Cookie 通过在客户端 ( 浏览器 ) 记录信息确定用户身份，最大为 4 kb 。

- url 参数用的是 get 方法，从服务器上获取数据，大小不能大于 2 kb 。

- Session 是服务器端使用的一种记录客户端状态的机制 。

- post 是向服务器传送数据，数据量较大。

- local Storage 也是 HTML5 的本地存储，将数据保存在客户端中（一般是永久的）。

---

**下面哪个属性不会让 div 脱离文档流（normal flow）？**

```
position: absolute;
position: fixed;
position: relative; √
float: left;
```

```
在css的定位机制有三种，分别是1：文档流，2：浮动（float），3定位（position）
其中文档流的意义就是按照HTML里面的写法就是从上到下，从左到右的排版布局;
在4答案选项中的属性，float（浮动）和position（定位）了
A：position: absolute;
生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位；都绝对定位了，肯定脱离了文档流。。
B:position: fixed;
生成绝对定位的元素，相对于浏览器窗口进行定位;相对于浏览器了，也和正常顺序排下来没什么关系。。
C:position: relative;
生成相对定位的元素，相对于其正常位置进行定位。生成相对定位，也就是说还在原本的上下左右之间，上下左右的元素都不变，so这个没有能脱离文档流。。就这个了
D:float: left;都浮动出去了，还上哪保持原位置去。。
最终答案选择C。
```

---

javascript 语言特性中，有很多方面和我们接触的其他编程语言不太一样，比如说，javascript 语言实现继承机制的核心就是**1**，而不是 Java 语言那样的类式继承。Javascript 解析引擎在读取一个 Object 的属性的值时，会沿着**2**向上寻找，如果最终没有找到，则该属性值为 **3**； 如果最终找到该属性的值，则返回结果。与这个过程不同的是，当 javascript 解析引擎执行“给一个 Object 的某个属性赋值”的时候，如果当前 Object 存在该属性，则改写该属性的值，如果当前的 Object 本身并不存在该属性，则赋值该属性的值

```
(1) prototype
(2) 原型链
(3) undefined
```

---

**填写内容让下面代码支持 a.name = “name1”; b.name = “name2”;**

```js
function obj(name){
    1
}
obj.2= "name2";
var a = obj("name1");
var b = new obj;
```

```js
(1)
if (name) {
var obj = {};
obj.name = name;
return obj;
}
(2) prototype.name
```

------------------------

**请实现一个fibonacci函数，要求其参数和返回值如下所示：**

```js
function getNthFibonacci(count) {
    if(count === 0 || count === 1) return 1
    return getNthFibonacci(count) + getNthFibonacci(count-1)
}

```

----------------

**实现如下页面布局。核心区域左侧自适应，右侧固定宽度 200px**

![](http://uploadfiles.nowcoder.com/images/20150817/59_1439818277101_910920EB8AD84E02EEE1AB7C27D2E2CC)


```css
body {
    margin: 0;
}
.fn-clear:after {
    content: " ";
    clear: both;
    display: block;
    font-size: 0;
    visibility: hidden;
    height: 0;
}
.fn-clear {
    zoom: 1;
}
.container {
    padding: 10px;
}
.header {
    background: #eee;
    position: relative;
    margin-bottom: 10px;
}
.logo {
    width: 100px;
    height: 100px;
    float: left;
    background: #f60;
}
.username {
    position: absolute;
    right: 10px;
    bottom: 10px;
}
.main {
    margin-bottom: 10px;
}
.side-bar {
    width: 200px;
    float: right;
    background: #ccc;
}
.content {
    margin-right: 200px;
    background: #f6f6f6;
}
.footer {
    background: #999;
}
```

```html
<div class="container">
        <div class="header fn-clear">
            <div class="logo">logo</div>
            <div
  class="username">zhoumingXXX@163.com</div>
        </div>
        <div class="main">
            <div
  class="side-bar">menu</div>
            <div class="content">左侧内容</div>
        </div>
        <div class="footer">
            footer
        </div>
</div>
```