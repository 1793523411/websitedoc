<br/>
<br/>
<br/>

## 题目一
::: details 1.JavaScript 以下哪条语句会产生运行错误

A. var obj = (); B. var obj = []; C. var obj = {}; D. var obj = //;

答案：AD
:::



::: details 2.以下哪些是 javascript 的全局函

```
A. escape	函数可对字符串进行编码，这样就可以在所有的计算机上读取该字符串。ECMAScript v3 反对使用该方法，应用使用 decodeURI() 和 decodeURIComponent() 替代它。
B. parseFloat	parseFloat() 函数可解析一个字符串，并返回一个浮点数。
该函数指定字符串中的首个字符是否是数字。如果是，则对字符串进行解析，直到到达数字的末端为止，然后以数字返回该数字，而不是作为字符串。
C. eval	 函数可计算某个字符串，并执行其中的的 JavaScript 代码。
D. setTimeout
E. alert
```

答案：ABC
:::



::: details 3.关于 IE 的 window 对象表述正确的

```
A. window.opener属性本身就是指向window对象
B. window.reload()方法可以用来刷新当前页面  应该是location.reload或者window.location.reload
C. window.location="a.html"和window.location.href="a.html"的作用都是把当前页面替换成a.html页面
D. 定义了全局变量g;可以用window.g的方式来存取该变量
```

答案：ACD
:::



::: details 4.描述错误的

```
A：HTTP状态码302表示暂时性转移
B:domContentLoaded事件早于onload事件
C: IE678不支持事件捕获
D:localStorage 存储的数据在电脑重启后丢失
```

答案：D

解析：

HTTP 状态码 302 表示被请求的资源暂时转移(Moved temporatily)，然后会给出一个转移后的 URL，而浏览器在处理服务器返回的 302 错误时，原则上会重新建立一个 TCP 连接，然后再取重定向后的 URL 的页面;但是如果页面存在于缓存中，则不重新获取;

onload 事件触发时，页面上所有的 DOM，样式表，脚本，图片，flash 都已经加载完成了，domContentLoaded 事件触发时，仅当 DOM 加载完成，不包括样式表，图片，flash。

C 正确，故选 D
:::



::: details 5.关于 link 和@import 的区别正确的

```
A: link属于XHTML标签，而@import是CSS提供的;
B：页面被加载时，link会同时被加载，而后者引用的CSS会等到页面被加载完再加载
C：import只在IE5以上才能识别 而link是XHTML标签，无兼容问题
D: link方式的样式的权重高于@import的权重
```

答案：ABCD
:::


::: details 6.下面正确的

```
A: 跨域问题能通过JsonP方案解决
B：不同子域名间仅能通过修改window.name解决跨域   还可以通过script标签src  jsonp等h5 Java split等
C：只有在IE中可通过iframe嵌套跨域
D：MediaQuery属性是进行视频格式检测的属性是做响应式的
```

答案：A
:::



::: details 7.一个.php 后缀的文件，可以在什么环境下执

```
A mysql 数据库
B 浏览器
C apache 服务器
D Windows 系统
```

答案: C

解析:php 运行环境 apache
:::



::: details 8.http 协议的默认端口号

```
A 80
B 8888
C 8080
D 3306
```

答案: A

解析:服务器安装好之后，默认端口号是 80
:::


::: details 9.ajax 跨域的前端解决方案是哪

```
A cors
B jsonp
C 服务器代理
D promise
```

答案: B

解析:jsonp 是使用标签的 src 属性链接资源接口，在 url 中传递回调函数，实现跨域请求
:::



::: details 10.foo 对象有 att 属性，那么获取 att 属性的值，以下哪些做法是可以

```
A foo("att")
B foo["att"]
C foo{"att"}
D foo[att]
```

答案: B
:::



::: details 11.下面说法正确的

```
A setTimeout 函数是同步的
B setInterval 函数是异步的
C setTimeout(function( ) { } ,100) 会立即同步执行
D setInterval 函数会立即执行
```

答案: B
:::




::: details 12.下面哪个方法不属于数组操作方法

```
A shift()
B pop()
C push()
D replace()
```

答案: D
:::



::: details 13.下面表示鼠标单击事件的

```
A onclick
B onmouseover
C onmouseout
D onmousemove
```

答案: A
:::



::: details 14.以下代码, 当调用函数 func1 时，代码中打两个问号的地方，会弹出什

```js
var v1 = 250;
function func1() {
  alert(v1); //？？
  var v1 = 350;
}
```

```
A 250
B 350
C undefined
D 以上都不对
```

答案: C

解析:函数内部的 var v1 声明会提升到当前作用域顶部，但是赋值不会提升，所以 alert 的时候首先弹出当前作用域的 v1，值位 undefined
:::


::: details 15.下面哪个不是 js 的数据类型

```
A int
B number
C string
D boolean
```

答案: A
:::



::: details 16.在 Javascript 中，需要声明一个整数类型的变量 num，以下哪个语句能实现上述要求

```
A int num
B number num
C var num
D Integer num
```

答案: C

解析: var 关键字声明变量
:::



::: details 17.关于 Javascript 中数组的说法中，不正确的是

```
A 数组的长度必须在创建时给定，之后便不能改变
B 由于数组是对象，因此创建数组时可以使用 new 运算符 当然也可以不用的
C 数组内元素的类型可以不同
D 数组可以在声明的同时进行初始化
```

答案: A

解析: js 数组长度是可以变化的
:::


::: details 18.以下关于 Javascript 中事件的描述中，不正确的是

```
A onclick–鼠标单击事件
B onfocus–获取焦点事件
C onmouseover–鼠标指针移动到事件源对象上时触发的事件
D onsubmit–选择字段时触发的事件
```

答案: D

解析: change 需要选择的字段发生变化时才触发的事件
:::



::: details 19.表示表单提交事件的是

```
A onmousemove
B onchange
C onclick
D onsubmit
```

答案: D
:::



::: details 20.array 为数组对象，下面不是数组方法的

```
A array.zero()
B array.map()
C array.filter()
D array.push()
```

答案: A
:::


::: details 21.使用 offsetWidth 获取···正确的数值

使用 offsetWidth 获取`<div style="border：1px solid red;width:200px";>`正确的数值

```
A 199
B 197
C 198
D 202
```

答案: D

解析: offsetWidth 获取的时候包括了边框 并且不带 px 单位
:::


::: details 22.以下方法 1s 以后弹出 n 的值为

```js
var n = 10;
setInterval(function() {
  alert(n);
  var n = 100;
}, 1000);
```

```
A 10
B 100
C undefined
D 报错
```

答案: C

解析:
计时函数中，定义的变量 n 有声明提升，被提升到函数作用域顶部，即在 alert()之前，只提升声明，变量赋值位置不变，所以为 undefined
:::


::: details 23.选出有兼容性的方法或者属性

```
A event.cancelBubble
B getElementById
C getElementsByTagName
D nodeType
```

答案: A

解析: event.cancelBubble 是 IE 老版本取消事件冒泡的方式
:::



::: details 24.关于函数参数说法正确的是：

```
A 函数必须有参数
B 函数体中可以使用 arguments 来获取传递的实际参数值
C 函数必须有返回值
D 函数体中可以使用 parameters 来获取传递的实际参数
```

答案: B

解析: 可使用 arguments 在函数体中获取函数调用时的参数列表，在函数调用时，实参个数和形参个数可以不一致。
:::



::: details 25.以下代码 var t = 0 || 5，t 的值是

```
A true
B false
C 5
D 0
```

答案: C

解析: 逻辑或的应用 0 位 false
:::



::: details 26.下面不是用于创建一个新的对象的语句

```
A var d = new Date();
B var f = ( );
C var o = new Object();
D var o = {title: "hello", author: "Tom"};
```

答案: B
:::



::: details 27.事件委托的好处是

```
A 减少了事件绑定的数量;对后来动态创建的元素依然有效
B 和普通事件的执行没什么区别
C 降低了程序执行效率
D 以上都不对
```

答案: A
:::



::: details 28.以下( )表达式产生一个 0~7 之间(含 0,7)的随机整

```
A Math.floor(Math.random()*6)
B Math.floor(Math.random()*7)
C Math. floor(Math.random()\*8)
D Math.ceil(Math.random()8)
```

答案: C

解析:
生成 min ~ max （包含 max）的随机数公式：
Math.floor(Math.random()(max - min+1) + min)
:::



::: details 29.要实现拖拽效果，需要用到以下哪些事件除

```
A onmousedown
B onmouseup
C onmouseover
D onmousemove
```

答案: C

解析:
鼠标按下（onmousedown），鼠标移动（onmousemove），鼠标抬起（onmouseup）
:::



::: details 30.要检测值是否为 NaN，应使用 （ ）函

```
A Number( )
B parseInt ( )
C IsNaN( )
D isNaN( )
```

答案: D
:::



::: details 31.下面哪个方法可以匹配数组是否含有某个值

```
A sort()
B push()
C join()
D indexOf()
```

答案: D
:::



::: details 32.在 JavaScript 中,执行下面的代码后，num 的值是 

```js
var num = 0;
var t = num++ + num++;
```

```
A -1
B 0
C 2
D 13
```

答案: C

解析:
这个代码跟变量 t 没有关系，表达式中完成了两次 num 的自增，所以，结果是 2
:::



::: details 33.在 HTML 页面中，CSS 样式的属性名为 background-image 对应的 style 对象的属性名是

```
A background-image
B backgroundImage
C image
D background
```

答案: B

解析: 省略中间的-，后面的单词，首字母大写
:::

## 题目二


::: details 1.(单选题)下面代码的输出是什么 

```js
const name = "Lydia";
age = 21;

console.log(delete name);
console.log(delete age);
```

```
A：false, true
B: "Lydia", 21
C: true, true
D: undefined, undefined
```

答案：A

解析：

delete 操作符返回一个布尔值：true 指删除成功，否则返回 false .但是通过 var , const 或 let 关键字声明的变量无法用 delete 操作符来删除。

name 变量由 const 关键字声明，所以删除不成功:返回 false 而我们设定 age 等于 21 时，我们实际上添加了一个名为 age 的属性给全局对象。对象中的属性是可以删除的，全局对象也是如此，所以 delete age 返回 true

:::




::: details 2.(单选题)我们需要向对象 person 添加什么，以致执行[…person]时获得形如['Lydia Hallie', 21]的输出？ 

```js
const person = {
    name: 'Lydia Hallie',
    age: 21
}
[...person] // ['Lydia Hallie', 21]
```

```
A：不需要，对象默认就是可迭代的
B: *[Symbol.iterator]() { for (let x in this) yield* this
[x]}
C: *[Symbol.iterator]() {yield* Object.values(this)}
D: *[Symbol.iterator]() { for (let x in this) yield this }
```

答案：C

解析：

对象默认是不可迭代的。如果迭代规则被定义，则一个对象是可迭代的（ An iterable is an iterable if the iterator protocol is present)。我们可以通过添加迭代器 symbol [Symbol.iterator]来定义迭代规则，其返回一个 generator 对象，比如说构建一个 generator 函数 _[Symbol.iterator](){}。如果我们想要返回数担['Lydia Halli', 21] :yield_ Object.values(this),这个 geneator 函数一定要 yield 对象 person 的 Object.values

:::




::: details 3.(单选题)下面代码的输出是什么 

```js
const set = new Set();

set.add(1);
set.add("Lydia");
set.add({ name: "Lydia" });

for (let item of set) {
  console.log(item + 2);
}
```

```
A：3, NaN, NaN
B: 3, 7, NaN
C: 3, Lydia2( [Object object]2
D: "12", Lydia2, [Object object]2
```

答案：C

解析：

“+”运算符不仅用于添加数值，还可以使用它来连接字符
串。每当 JavaScript 引擎发现一个或多个值不是数字时，就会持数字强制为字符串。
第一个是数字 1。1+2 返回数字 3。
但是，第二个是字符串“Lydia”。“Lydia”是一 t 字符串，2 是一数字：2 被强制转换为字符串。“Lydia”和“2”被连接起来，产生字符串“Lydia2”。
{name : "Lydia"}是一个对象。数字和对象都不是字符串，因此将二者都字符串化。每当我们对常规对象进行字符串化时，它就会变成[Object object]。与“2”串联的“[Object object]”成为“[Object object]2”。

:::




::: details 4.(单选题)下面代码的输出是什么 

```js
const settings = {
    username: 'lydiahallie',
    level: 19,
    health: 90
}；
const data = JSON.stringify(settings, ['level', 'health']
console.log(data);
```

```
A："{"level":19, "health":90}"
B: "{"username": "lydiahallie"}"
C: "{"level", "health"]"
D: "{"username": "lydiahallie", "level":19, "health":90}"
```

答案：A

解析：

JSON.stringify 的第二个参数是替代者（replacer）.替代者(replacer)可以是个函数或数组，用以控制哪些值如何被转换为字符串。
如果替代者(replacer)是个数组，那么就只有包含在数组中的属性将会被转化为字符串。在本例中，只有名为'level'和'health'的属性被包括进来，'username'则被排除在外。data 就等于 "{"level":19, "health":90}"

而如果替代者(replacer)是个函数，这个函数将被对象的每个属性都调用一遍。函数返回的值会成为这个属性的值，最终体现在转化后的 JSON 字符串中（译者注：Chrome 下，经过实验，如果所有属性均返回同一个值的时候有异
常，会直接将返回值作为结果输出而不会输出 JSON 字符串），而如果返回值为 undefined ,则该属性会被排除在外。

:::




::: details 5.(单选题)下面代码的输出是什么 

```js
const name = "Lydia";

console.log(name());
```

```
A：SyntaxError
B: ReferenceError
C: TypeError
D: undefined
```

答案：C

解析：

变量 name 保存字符串的值，该字符串不是函数，因此无
法调用。

当值不是预期类型时，到抛出 TypeErrors。JavaScript 期望 name 是一个函数，因为我们试图调用它。但它是一个字符串，因此抛出 TypeError : name is not a function

:::




::: details 6.(单选题)下面代码的输出是什么 

```js
console.log("🐭" + "🐍");
```

```
A：🐭🐍
B:257548
C:A string containing their code points
D:Error
```

答案：A

解析：

使用+运算符，您可以连接字符串。上述情况，我们将字符串"🐭" 与 字 符 串 "🐍"连 接 起 来 ， 产 生 🐭🐍

:::




::: details 7.(单选题)下面代码的输出是什么 

```js
let newList = [1, 2, 3].push(4);

console.log(newList.push(5));
```

```
A：[1,2,3,4,5]
B: [1,2,3,5]
C: [1,2,3,4]
D: Error
```

答案：D

解析：

.push()方法返回数组的长度，而不是数组的本身。

:::




::: details 8.(单选题)下面代码的输出是什么 

```js
let name = "Lydia";

function getName() {
  console.log(name);
  let name = "Sarah";
}
getName();
```

```
A：Lydia
B: Sarah
C: undefined
D: ReferenceError
```

答案：D

解析：

每个函数都有其自己的执行上下文。getName 函数首先在其自身的上下文（范围）内查找，以查看其是否包含我们尝试访问的变量 name。上述情况，getName
函数包含其自己的 name 变量：我们用 let 关键字和 Sarah 的值声明变量 name。

带有 let 关键字（和 const)的变量被提升，但是与 var 不同，它不会被初始化。在我们声明（初始化） 它们之前，无法访问它们。这称为“暂时性死区”。当我们尝试在声明变量之前访问变量时，JavaScript 会抛出 ReferenceError: Cannot access 'name' before initialization。

如果我们不在 getName 函数中声明 name 变量，则 javascript 引擎会查看原型链。会找到其外部作用域有一个名为 name 的变量，其值为 Lydia。在这种情况下，它
将打印 Lydia :

```js
let name = 'Lydia'
function getName()
  console.log(name)
}
getName() // Lydia
```

:::




::: details 9.(单选题)下面代码的输出是什么 

```js
function getAge(...args) { 
  console.log(typeof args);
}
getAge(21);
```

```
A："number"
B: "array"
C: "object"
D: "NaN"
```

答案：C

解析：

扩展运算符（...args )返回一个带参数的数组。 
数组是一个对象，因此typeof args返回object。

:::




::: details 10.(单选题)下面代码的输出是什么 

```js
[1, 2, 3, 4].reduce((x, y) => console.log(x,y))
```

```
A：1 2 and 3 3 and 6 4 
B: 1 2 and 2 3 and 3 4
C: 1 undefined and 2 undefined and 3 undefined and 4 undefined
D: 1 2 and undefined 3 and undefined 4 
```

答案：D

解析：

reducer函数接收4个参数：
• Accumulator (acc)(累计器）
• Current Value (cur)(当前值）
• Current Index (idx)(当前索引）
• Source Array (src)(源数组）

reducer 函数的返回值将会分配给累计器，该返回值在数组的每个迭代中被记住，并最后成为最终的单个结果值。

reducer函数还有一个可选参数initialValue ,该参数将作为第一次调用回调函数时的第一个参数的值。如果没有提供initialValue ,则将使用数组中的第一个元素。
在上述例子,reduce方法接收的第一个参数(Accumulator)是 x,第二个参数(Current Value)是 y。
在第一次调用时，累加器x为1 , 当 前 值'y'为 2  , 打印出累加器和当前值：1和2。

例子中我们的回调函数没有返回任何值，只是打印累加器的值和当前值。如果函数没有返回值，则默认返回undefined。在下一次调用时，累加器为undefined ,当前值为'3'，因此undefined和3被打印出。

在第四次调用时，回调函数依然没有返回值。累加器再次为 undefined ,当前值为“4”。undefined 和 4 被打印出

:::

## 题目三


::: details 1.(单选题)下面代码的输出是什么 

```js
let a = 3;
let b = new Number(3) 
let c = 3;

console.log(a == b); 
console.log(a === b); 
console.log(b === c);
```

```
A：true false true
B: false false true
C: true false false
D: false true true
```

答案：C

解析：

new Number ()是一个内置的函数构造函数。虽然它看起来像一个数字，但它并 不是一个真正的 数 字 ： 它 有 一堆额外的功能，是一个对象。

当我们使用 == 运算符时，它只检查它是否具有相同的值。他们都有3的值，所以返回true

译者注：==会引发隐式类型转换，右侧的对象类型会自动转换为Number类型

然而，当我们使用 === 操作符是，类型和值都需要相等，Number()不是一个数字，是对象类型。两者都返回false

:::



::: details 2.(单选题）当我们这样做时会发生什么? 

```js
function bark() {
    console.log('Woof!');
}
bark.animal - 'dog';
```

```
A：Nothing, this is totally fine!
B: SyntaxError. You cannot add properties to a function this way.
C: undefined
D: ReferenceError
```

答案：A

解析：

这在JavaScript中是可能的，因为函数也是对象！（ 原始类型之外的所有东西都是对象）

函数是一种特殊类型的对象。您自己编写的代码并不是实际的函数。该函数是具有属性的对象，此属性是可调用的。

:::



::: details 3.(单选题)下面代码的输出是什么 

```js
String.prototype.giveLydiaPizza = ( ) = > {  
    return 'Just give Lydia pizza already!';
};

const name = 'Lydia'; 
name.giveLydiaPizza();
```

```
A："Just give Lydia pizza already!"
B: TypeError: not a function
C: SyntaxError 
D: undefined
```

答案：A

解析：

String是一个内置的构造函数，我们可以为它添加属性。我刚给它的原型添加了一t方法。原始类型的字符串自动转换为字符串对象，由字符串原型函数生成。因此，所有字符串（字符串对象）都可以访问该方法！

当使用基本类型的字符串调用giveLydiaPizza时，实际上发生了下面的过程：

* 创 建 一 个String的包装类型实例 
* 在 实 例 上 调 用substring方法 
* 销毁实例

:::



::: details 4.(单选题)下面代码的输出是什么 

```js
const { name: myName } = { name:'Lydia'}

console.log(name)
```

```
A："Lydia" 
B: "myName" 
C: undefined 
D: ReferenceError
```

答案：D

解析：

当我们从右侧的对象解构属性name时，我们将其值Lydia分配给名为myName的变量。

使用{name: myName}，我们是在告诉JavaScript我们要创建一个名为myName的新变量，并且其值是右侧对象的name属性的值。

当我们尝试打印name，一个未定义的变量时，就会引发 ReferenceError

:::



::: details 5.(单选题)下面代码的输出是什么 

```js
const name = 'Lydia'

console.log(name())
```

```
A：SyntaxError 
B: ReferenceError 
C: TypeError 
D: undefined
```

答案：C

解析：

变量name保存字符串的值，该字符串不是函数，因此无法调用。

当值不是预期类型时，到抛出TypeErrors。JavaScript期望name是一个函数，因为我们试图调用它。但它是一个字符串，因此抛出TypeError : name is not a function

当你编写了一些非有效的JavaScript时，会拋出语法错误，例如当你把return这个词写成retrun时。当Script无法找到您尝试访问的值的引用时，抛出ReferenceErrors

:::



::: details 6.(单选题)下面代码的输出是什么 

```js
var status = '🐰'
setTimeout(() => { 
    const status = '🐎'
    const data = { 
        status: '🐍'
        getStatus() {
            return this.status
        }
    }
    console.log(data.getStatus()) 
    console.log(data.getStatus.call(this)) 
}, 0)
```

```
A：'🐍' and '🐎'
B: '🐍' and '🐰'
C: '🐎' and '🐰'
D: '🐰' and '🐰'
```

答案：B

解析：

this关键字的指向取决于使用它的位置。在函数中,比如 getStatus,this指向的是调用它的对象,上述例子中data对象调用了 getStatus因此this指向的就是data对象,当我们打印this.status时,data对象
的 status属性被打印,即'🐍'。

使用call方法,可以更政this指向的对象。data.getStatus.call(this)是将this的指向由data对象更改为全局对象。在全局对象上,有一个名为 status的变量,其值为'🐰'。因此打印this.status时,会打印'🐰'

:::



::: details 7.(单选题)下面代码的输出是什么 

```js
const person = { 
    name: 'Lydia',
    age: 21
}

let city = person.city 
city = 'Amsterdam'
console.log(person)
```

```
A：{ name: "Lydia", age: 21}
B: { name: "Lydia", age: 21, city: "Amsterdam"}
C: { name: "Lydia", age: 21, city: undefined }
D: "Amsterdam"
```

答案：A

解析：

我们将变量city设置为等于person对象上名为city的属性的值。这个对象上沒有名为city的属性，因此变量city 的值为 undefined。

请注意，我们没有引用person对象本身，只是将变量city设置为等于person对象上city属性的当前值。
然后，我们将city设置为等于字符串"Amsterdam'。这不会更改person对象：没有对该对象的引用。因此打印person对象时，会返回未修改的对象。

:::



::: details 8.(单选题)下面代码的输出是什么 

```js
function sum(numl, num2 = numl) { 
    console.log(numl + num2)
}
sum(10)
```

```
A：NaN
B: 20
C: ReferenceError
D: undefined
```

答案：B

解析：

您可以将默认参数的值设置为函数的另一个参数，只要另一个参数定义在其之前即可。我们将值10传递给sum函数。如果sum函数只接收1个参数，则意味看没有传递 num2 的 值 . 这 种 情 况 下 的 值 等 于 传 递 的 值 10。num2 的默认值是num1 的值，即10 。 num1  + num2 返回 20。

如果您尝试将默认参数的值设置为后面定义的参数，则可能导致参数的值尚未初始化，从而引发错误。比如：
```js
function test(m = n, n = 2) { 
    console.log(m, n)
}
test() // Uncaught ReferenceEmor: Cannot access 
test(3) // 3 2
test(3, 4) // 3 4
```

:::



::: details 9.(单选题)下面代码的输出是什么 

```js
function* generatorOne() { 
    yield ['a', 'b', 'c'];
}
function* generatorTwo() { 
    yield* ['a', 'b', 'c'];
}

const one = generatorOne() 
const two = generatorTwo()

console.log(one.next().value) 
console.log(two.next().value)
```

```
A：a and a
B: a and undefined 
C: ['a', 'b', 'c'] and a
D: a and ['a', 'b', 'c']
```

答案：C

解析：

通过yield关键字,我们在Generator函数里执行yield表达式.通过yield*关键字，我们可以在一个Generator函数里面执行（yield表达式）另一个Generator 函数，或可遍历的对象(如数组).

在函数generatorOne中，我们通过yield关键字yield 了一个完整的数组['a', 'b', 'c']。函数one通过next方法返回的对象的value属性的值（one.next().value)等价于数组['a', 'b', 'c']

```js
console.log(one.next().value) // ['a', 'b', 'c'] 
console.log(one.next().value) // undefined
```

在函数generatorTwo中，我们使用yield*关键字。就相当于函数two第一个yield的值,等价于在迭代器中第一个yield的值。数组 ['a', 'b', 'c'] 就是个迭代器.第一个 yield的值就是a ,所以我们第_次调用two.next().value 时，就返回 a。

```js
console.log(two.next().value) // 'a'
console.log(two.next().value) // 'b'
console.log(two.next().value) // 'c'
console.log(two.next().value) // underfined
```

:::



::: details 10.(单选题)下面代码的输出是什么 

```js
const set = new Set([1, 1, 2, 3, 4]); 
console.log(set);
```

```
A：[1,1, 2, 3, 4]
B: [1,2, 3, 4]
C: {1,1, 2, 3, 4}
D: {1, 2, 3, 4}
```

答案：D

解析：

Set对象是独一无 二 的 值 的 集 合 ： 也 就 是 说 同 一 在 其中仅出现一次。

我 们 传 入 了 数 组 [ 1 ,  1 ,  2 ,  3 ,  4 ] , 他 有 一个重复值以为一个集合里不能有两个重复的值，其中一个就被移除了。所以结果是{1, 2, 3, 4}.
:::

## 题目四


::: details 1.(单选题)下面代码的输出是什么 

```js
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius
};

shape.diameter();
shape.perimeter();
```

```
A：20 and 62.83185307179586
B: 20 and NaN
C: 20 and 63
D: NaN and 63
```

答案：B

解析：

请注意, diameter 是普通函数,而 perimeter 是箭头函数。对于箭头函数,this 关键字指向是它所在上下文(定义时的位置)的环境,与普通函数不同!这意味着当我们调用 perimeter 时,它不是指向 shape 对象,而是指其定义时的环境
( window)。没有值 radius 属性,返回 undefined。
:::




::: details 2.(单选题)下面代码的输出是什么 

```js
const person = {
  name: "Lydia Hallie",
  hobbies: ["coding"]
};

function addHobby(hobby, hobbies = person.hobbies) {
  hobbies.push(hobby);
  return hobbies;
}

addHobby("running", []);
addHobby("dancing");
addHobby("baking", person.hobbies);
console.log(person.hobbies);
```

```
A：["coding"]
B: ["coding", "dancing"]
C: ["coding", "dancing", "baking"]
D: ["coding", "running", "dancing","baking"]
```

答案：C

解析：

函数 addHobby 接受两个参数，hobby 和有看对象 person 中数组 hobbies 默认值的 hobbies。

首先，我们调用函数 addHobby ,并给 hobby 传递'running'以及 hobbies 传递一个空数组。因为我们给 hobbies 传递了空数组，'running' 被 添加到这个空数组。

然后，我们调用函数 addHobby ,并给 hobby 传递'dancing'。我们不向 hobbies 传递值，因此它获取其默认值---对象 person 的属性 hobbies。我们向数组 person.hobbies push dancing

最后，我们调用函数 addHobby ,并向 hobby 传递值'baking'，并且向 hobbies 传递 person.hobbies。我们向数组 person.hobbies push dancing。

pushing dancing 和 baking 之后，person.hobbies 的值为['coding','dancing’，'baking']
:::




::: details 3.(单选题)下面代码的输出是什么 

```js
const myLifeSummedUp = ["a", "b", "c", "d"];

for (let item in myLifeSummedUp) {
  console.log(item);
}

for (let item of myLifeSummedUp) {
  console.log(item);
}
```

```
A：0 1 2 3 and 'a' 'b' 'c' 'd'
B: 'a' 'b' 'c' 'd' and 'a' 'b' 'c' 'd'
C: 0 1 2 3 and 0 1 2 3
D: 0 1 2 3 and {0:'a',1:'b',2:'c',3:'d'}
```

答案：A

解析：

通过 for-in 循环，我们可以遍历一个对象自有的、继承的、可枚举的、非 symbol 的属性。在数组中，可枚举属性是数组元素的键，即它们的索引。类似于下面的这个对象：

```js
{0:'a',1:'b',2:'c',3:'d'}
```

其中键则是可枚举属性，因此 0,1,2,3 被记录。通过 for-of 循环，我们可以迭代可迭代对象（包括 Array，Map，Set，String，arguments 等）。当我们迭代数组时，在每次迭代中，不同属性的值将被分配给变量 item，因此'a' 'b' 'c' 'd'被打印
:::




::: details 4.(单选题)下面代码的输出是什么 

```js
const myFunc = ({ x, y, z }) => {
  console.log(x, y, z);
};

myFunc(1, 2, 3);
```

```
A：1 2 3
B: {1: 1} {2:2} {3:3}
C: {1: undefined} undefined undefined
D: undefined undefined undefined
```

答案：D

解析：

myFunc 期望接收一个包含 x，y 和 z 属性的对象作为它的参数，因为我们仅仅传递三个单独的数字值（1,2,3）不是一个含有 x，y 和 z 属性的对象({x:1,y:2,z:3}),x,y 和 z 有着各自的默认值 undefined
:::




::: details 5.(单选题)输出什么 

```js
const colorConfig = {
  red: true,
  blue: false,
  green: true,
  black: true,
  yellow: false
};

const colors = ["pink", "red", "blue"];

console.log(colorConfig.colors[1]);
```

```
A：true
B: false
C: undefined
D: TypeError
```

答案：D

解析：

在 JavaScript 中，我们有两种访问对象属性的方法：括号表示法或点表示法。在此示例中，我们使用点表示法(colorConfig.colors) 代替括号表示法(colorConfig["colors"]) 。

使用点表示法，JavaScript 会尝试使用该确切名称在对象 上查找属性。在此示例中，JavaScript 尝试在 colorconfig 对象上找到名为 colors 的属性。没有名为"colors"的属性，因此返回"undefined"。然后，我们尝试使用[1]访问第一个元 素 的 值 。 我 们 无 法 对 未 定 义 的 值执 行 此 操 作 ， 因此会抛出 Cannot read property '1' of undefined。JavaScript 解释（或取消装箱）语句。当我们使用方括号表示法时，它会看到第一个左方括号[并一直进行下去， 直到找到右方括号]。只有这样，它才会评估该语句。
如果我们使用了 colorConfig [colors [1]],它将返回 colorConfig 对象上 red 属性的值。
:::




::: details 6.(单选题)输出什么 

```js
const food = ["A", "B", "C", "D"];
const info = { favoriteFood: food[0] };
info.favoriteFood = "E";
console.log(food);
```

```
A：['A','B','C','D']
B: ['E','B','C','D']
C: ['E', 'A', 'B','C','D']
D: ReferenceError
```

答案：A

解析：

我们将 info 对象上的 favoriteFood 属性的值设置为"E"。字符串是原始数据类型。在 javaScript 中，原始数据类型通过值起作用。在这种情况下.我们将 info 对象上的 favoriteFood 属性

性的值设置为等于 food 数组中的第一个元素的值，"A"。字符串是原始数据类型， 并且通过值进行交互，我们更改 info 对象上 favoriteFood 属性的值。food 数组没有改变，因为 favoriteFood 的值只是该数组中第一个元素的值的复制，并且与该元素上的元素没有相同的内存引用 food[0]。当我们记录 food 时，它仍然是原始数组['A','B','C','D']
:::




::: details 7.(单选题)输出什么 

```js
const randomValue = 21;
function getInfo() {
  console.log(typeof randomValue);
  const randomValue = "Lydia Hallie";
}
getInfo();
```

```
A："number"
B: "string"
C: undefined
D: ReferenceError
```

答案：D

解析：

通过 const 关键字声明的变量在被初始化之前不可被引用：这被称之为暂时性死区。在函数 getlnfo 中，变量 randomValue 声明在 getlnfo 的作用域的词法环境中。
在想要对 typeof randomValue 进行 log 之前，变量 randomValue 仍未被初始化：错误 ReferenceError 被抛出! JS 引擎并不会根据作用域链网上寻找该变量，因为我们已经在 getlnfo 函数中声明了randomValue 变量。
:::




::: details 8.(单选题)以下哪—项会对对象 person有副作用？

```js
const person = {
  name: 'Lydia Hallie', 
  address: {
    street: '100 Main St'
  }
};
Object.freeze(person);
```

```
A：person.name = "Evan Bacon" 
B: delete person.address
C: person.address.street = "101 Main St" 
D: person.pet = { name: "Mara"}
```

答案：C

解析：

便用方法Object.freeze对一个对象进行冻结。不能对属性进行添加，修改，删除。然而，它仅对对象进行浅冻结，意味着只有对象中的直接属性被冻结。如果属性是另一个object,像案例中的address, address中的属性没有被冻结，仍然可以被修改。
:::




::: details 9.(单选题)输出什么？

```js
// module.js
export default () => 'Hello world'
export const name s 'Lydia'
// index.js
import * as data from './module'
console.log(data)
```

```
A：{ default: function default(), name: "Lydia"}  
B: { default: function default() }
C: { default: "Hello world", name: "Lydia"}
D: Global object of module.js 
```

答案：A

解析：

使用import * as name语法，我们将module.js文件中所有export导入到index, js文件中，并且创建了一个名为data的新对象。在module.js文件中，有两个导出：默认导出和命名导出，默认导出是一个返回字符串'Hello world'的函数，命名导出是一个名为name的变量，其值为字符串
'Lydia'。

data对象具有默认导出的default属性，其他属性具有指定exports的名称及其对应的值
:::




::: details 10.(单选题）我们怎样才能在indexjs中调用sum.js中的sum ?

```js
// sum.js
export default function sum(x) { 
  return x + x;
}

// index.js
import * as sum from './sum';

```

```
A：sum(4)
B: sum.sum(4)
C: sum.default(4)
D: 默认导出不用*来导入，只能具名导出 
```

答案：C

解析：

使用符号*，我们引入文件中的所有值，包括默认和具分章 
名。如果我们有以下文件：

```js
// info.js
export const name = 'Lydia';
export const age = 21;
export default 'I love JavaScript';

// index.js
import * as info from './info'; 
console.log(info);
```
将会输出以下内容：
```js
{
  default: 'I love JavaScript',
  name: 'Lydia',
  age: 21
}
```
以sum为例，相当于以下形式引入值sum :
```js
{ default: function sum(x) { return x + x }}
```
我们可以通过调用sum.default来调用该函数

:::
