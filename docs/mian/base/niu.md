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
