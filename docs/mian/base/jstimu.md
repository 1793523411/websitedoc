## js 实现一个函数，完成超过范围的两个大整数相加功能

```js
// 主要思路是通过将数字转换为字符串，然后每个字符串在按位相加。
function bigNumberAdd(number1, number2) {
  let result = "", // 保存最后结果
    carry = false; // 保留进位结果
  // 将字符串转换为数组
  number1 = number1.split("");
  number2 = number2.split("");
  // 当数组的长度都变为 0，并且最终不再进位时，结束循环
  while (number1.length || number2.length || carry) {
    // 每次将最后的数字进行相加，使用~~的好处是，即使返回值为 undefined 也能转换为0;
    carry += ~~number1.pop() + ~~number2.pop();
    // 取加法结果的个位加入最终结果
    result = (carry % 10) + result;
    // 判断是否需要进位，true 和 false 的值在加法中会被转换为 1 和 0
    carry = carry > 9;
  }
  // 返回最终结果
  return result;
}
```

## js 如何实现数组扁平化？

```js
// 这一种方法通过递归来实现，当元素为数组时递归调用，兼容性好
function flattenArray(array) {
  if (!Array.isArray(array)) return;
  let result = [];
  result = array.reduce(function(pre, item) {
    // 判断元素是否为数组，如果为数组则递归调用，如果不是则加入结果数组中
    return pre.concat(Array.isArray(item) ? flattenArray(item) : item);
  }, []);
  return result;
}
// 这一种方法是利用了 toString 方法，它的一个缺点是改变了元素的类型，只适合于数组中元素都是整数的情况
function flattenArray(array) {
  return array
    .toString()
    .split(",")
    .map(function(item) {
      return +item;
    });
}
```

## js 数组拍平(数组扁平化)的六种方式

1.数组拍平也称数组扁平化，就是将数组里面的数组打开，最后合并为一个数组

2.实现

`var arr = [1, 2, [3, 4, 5, [6, 7, 8], 9], 10, [11, 12]];`
a：递归实现

```js
function fn(arr) {
  let arr1 = [];
  arr.forEach((val) => {
    if (val instanceof Array) {
      arr1 = arr1.concat(fn(val));
    } else {
      arr1.push(val);
    }
  });
  return arr1;
}
```

b：reduce 实现

```js
function fn(arr) {
  return arr.reduce((prev, cur) => {
    return prev.concat(Array.isArray(cur) ? fn(cur) : cur);
  }, []);
}
```

c:flat

参数为层数(默认一层)

```js
arr.flat(Infinity);
```

d：扩展运算符

```js
function fn(arr) {
  let arr1 = [];
  let bStop = true;
  arr.forEach((val) => {
    if (Array.isArray(val)) {
      arr1.push(...val);
      bStop = false;
    } else {
      arr1.push(val);
    }
  });
  if (bStop) {
    return arr1;
  }
  return fn(arr1);
}
```

e：toString

```js
let arr1 = arr
  .toString()
  .split(",")
  .map((val) => {
    return parseInt(val);
  });
console.log(arr1);
```

f：apply

```js
function flatten(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat.apply([], arr);
  }
  return arr;
}
```

## js 如何实现数组去重

```js
function unique(array) {
  if (!Array.isArray(array) || array.length <= 1) return;
  var result = [];
  array.forEach(function(item) {
    if (result.indexOf(item) === -1) {
      result.push(item);
    }
  });
  return result;
}
function unique(array) {
  if (!Array.isArray(array) || array.length <= 1) return;
  return [...new Set(array)];
}
```

```js
var arr = [1, 2, 3, 3, 4, 4, 5, 5, 6, 1, 9, 3, 25, 4];
function deRepeat() {
  var newArr = [];
  var obj = {};
  var index = 0;
  var l = arr.length;
  for (var i = 0; i < l; i++) {
    if (obj[arr[i]] == undefined) {
      obj[arr[i]] = 1;
      newArr[index++] = arr[i];
    } else if (obj[arr[i]] == 1) continue;
  }
  return newArr;
}
var newArr2 = deRepeat(arr);
alert(newArr2); //输出1,2,3,4,5,6,9,25
```

## 如何求数组的最大值和最小值

```js
var arr = [6, 4, 1, 8, 2, 11, 23];
console.log(Math.max.apply(null, arr));
```

## 如何求两个数的最大公约数

```js
// 基本思想是采用辗转相除的方法，用大的数去除以小的那个数，然后再用小的数去除以的得到的余数，一直这样递归下去，直到余数为 0 时，最后的被除数就是两个数的最大公约数。
function getMaxCommonDivisor(a, b) {
  if (b === 0) return a;
  return getMaxCommonDivisor(b, a % b);
}
```

## 如何求两个数的最小公倍数

```js
// 基本思想是采用将两个数相乘，然后除以它们的最大公约数
function getMinCommonMultiple(a, b) {
  return (a * b) / getMaxCommonDivisor(a, b);
}
```

## 实现 IndexOf 方法

```js
function indexFun(array, val) {
  if (!Array.isArray(array)) return;
  let length = array.length;
  for (let i = 0; i < length; i++) {
    if (array[i] === val) {
      return i;
    }
  }
  return -1;
}
```

## 判断一个字符串是否为回文字符串

```js
function isPalindrome(str) {
  let reg = /[\W_]/g, // 匹配所有非单词的字符以及下划线
    newStr = str.replace(reg, "").toLowerCase(), // 替换为空字符并将大写字母转换为小写;
    reverseStr = newStr
      .split("")
      .reverse()
      .join(""); // 将字符串反转
  return reverseStr === newStr;
}
```

## 实现一个累加函数的功能比如 sum(1,2,3)(2).valueOf()

```js
function sum(...args) {
  let result = 0;
  result = args.reduce(function(pre, item) {
    return pre + item;
  }, 0);
  let add = function(...args) {
    result = args.reduce(function(pre, item) {
      return pre + item;
    }, result);
    return add;
  };
  add.valueOf = function() {
    console.log(result);
  };
  return add;
}
```

## 使用 reduce 现 方法实现 forEach 、map 、filter

```js
// forEach
function forEachUseReduce(array, handler) {
  array.reduce(function(pre, item, index) {
    handler(item, index);
  });
}
// map
function mapUseReduce(array, handler) {
  let result = [];
  array.reduce(function(pre, item, index) {
    let mapItem = handler(item, index);
    result.push(mapItem);
  });
  return result;
}
// filter
function filterUseReduce(array, handler) {
  let result = [];
  array.reduce(function(pre, item, index) {
    if (handler(item, index)) {
      result.push(item);
    }
  });
  return result;
}
```

## 设计一个简单的任务队列，要求分别在 1,3,4 出 秒后打印出 "1", "2", "3"

```js
class Queue {
  constructor() {
    this.queue = [];
    this.time = 0;
  }
  addTask(task, t) {
    this.time += t;
    this.queue.push([task, this.time]);
    return this;
  }
  start() {
    this.queue.forEach((item) => {
      setTimeout(() => {
        item[0]();
      }, item[1]);
    });
  }
}
```

## 如何查找一篇英文文章中出现频率最高的单词

```js
function findMostWord(article) {
  // 合法性判断
  if (!article) return;
  // 参数处理
  article = article.trim().toLowerCase();
  let wordList = article.match(/[a-z]+/g),
    visited = [],
    maxNum = 0,
    maxWord = "";
  article = " " + wordList.join(" ") + " ";
  // 遍历判断单词出现次数
  wordList.forEach(function(item) {
    if (visited.indexOf(item) < 0) {
      let word = new RegExp(" " + item + " ", "g"),
        num = article.match(word).length;
      if (num > maxNum) {
        maxNum = num;
        maxWord = item;
      }
    }
  });
  return maxWord + " " + maxNum;
}
```

## 请用 js 去除字符串空格？

答案：replace 正则匹配方法、str.trim()方法、JQ 方法：\$.trim(str)方法

解析：

方法一：replace 正则匹配方法

```
去除字符串内所有的空格：str = str.replace(/\s*/g,"");

去除字符串内两头的空格：str = str.replace(/^\s*|\s*$/g,"");

去除字符串内左侧的空格：str = str.replace(/^\s*/,"");

去除字符串内右侧的空格：str = str.replace(/(\s*$)/g,"");
```

示例：

```js
var str = " 6 6 ";
var str_1 = str.replace(/\s*/g, "");
console.log(str_1); //66

var str = " 6 6 ";
var str_1 = str.replace(/^\s*|\s*$/g, "");
console.log(str_1); //6 6//输出左右侧均无空格

var str = " 6 6 ";
var str_1 = str.replace(/^\s*/, "");
console.log(str_1); //6 6 //输出右侧有空格左侧无空格

var str = " 6 6 ";
var str_1 = str.replace(/(\s*$)/g, "");
console.log(str_1); // 6 6//输出左侧有空格右侧无空格
```

方法二：str.trim()方法

trim()方法是用来删除字符串两端的空白字符并返回，trim 方法并不影响原来的字符串本身，它返回的是一个新的字符串。

缺陷：只能去除字符串两端的空格，不能去除中间的空格

示例：

```js
var str = " 6 6 ";
var str_1 = str.trim();
console.log(str_1); //6 6//输出左右侧均无空格
```

方法三：JQ 方法：\$.trim(str)方法

\$.trim() 函数用于去除字符串两端的空白字符。

注意：\$.trim()函数会移除字符串开始和末尾处的所有换行符，空格(包括连续的空格)和制表符。如果这些空白字符在字符串中间时，它们将被保留，不会被移除。

示例：

```js
var str = " 6 6 ";
var str_1 = $.trim(str);
console.log(str_1); //6 6//输出左右侧均无空格
```

## 快速的让一个数组乱序

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] console.log(arr.sort(() => 0.5 - Math.random()))
```

---

## 你如何获取浏览器 URL 中查询字符串中的参数？

基础版：

```js
function getQueryString() {
  var sHref = window.location.href;
  var args = sHref.split("?");
  if (args[0] == sHref) {
    // 没有参数，直接返回空即可
    return "";
  }
  var arr = args[1].split("&");
  var obj = {};
  for (var i = 0; i < arr.length; i++) {
    var arg = arr[i].split("=");
    obj[arg[0]] = arg[1];
  }
  return obj;
}
var href = getQueryString();
console.log(href["categoryId"]);
```

尝试使用正则：

```js
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
console.log(getQueryString("categoryId"));
```

可以匹配哈希啦：

```js
function getQueryString(name) {
  // 未传参，返回空
  if (!name) return null;
  // 查询参数：先通过search取值，如果取不到就通过hash来取
  var after = window.location.search;
  after = after.substr(1) || window.location.hash.split("?")[1];
  // 地址栏URL没有查询参数，返回空
  if (!after) return null;
  // 如果查询参数中没有"name"，返回空
  if (after.indexOf(name) === -1) return null;
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  // 当地址栏参数存在中文时，需要解码，不然会乱码
  var r = decodeURI(after).match(reg);
  // 如果url中"name"没有值，返回空
  if (!r) return null;
  return r[2];
}
console.log(getQueryString("categoryId"));
```

## js 实现一个打点计时器

问题描述：

1、从 start 到 end（包含 start 和 end），每隔 100 毫秒 console.log 一个数字，每次数字增幅 1 2、返回的对象中需要包含一个 cancel 方法，用于停止定时操作 3、第一个数需要立即输出

答案：

```js
// 实现法一（setTimeout()方法);

function count(start, end) {
  if (start <= end) {
    console.log(start++);
    st = setTimeout(function() {
      count(start, end);
    }, 100);
  }
  return {
    cancel: function() {
      clearTimeout(st);
    },
  };
}
count(1, 10);

// 实现法二（setInterval()方法）：

function count(start, end) {
  console.log(start++);
  var timer = setInterval(function() {
    if (start <= end) {
      console.log(start++);
    }
  }, 100);
  return {
    cancel: function() {
      clearInterval(timer);
    },
  };
}
count(1, 10);
```

知识点： setTimeout()方法用于在指定的毫秒数后调用函数或计算表达式。 语法：setTimeout(code, millisec) 注意：setTimeout() 只执行 code 一次。如果要多次调用，请使用 setInterval() 或者让 code 自身再次调用 setTimeout()。

setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。 语法：`setInterval(code ,millisec[,"lang"])`, setInterval() 方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。由 setInterval() 返回的 ID 值可用作 clearInterval() 方法的参数。

## 用 js 实现一个标准的排序算法

答案：

[详细的排序](/mian/base/datastruct.html#排序)

一.冒泡排序

```js
function BubbleSort(array) {
  var length = array.length;
  for (var i = length - 1; i > 0; i--) {
    //用于缩小范围
    for (var j = 0; j < i; j++) {
      //在范围内进行冒泡，在此范围内最大的一个将冒到最后面
      if (array[j] > array[j + 1]) {
        var temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
    console.log(array);
    console.log("-----------------------------");
  }
  return array;
}

var arr = [10, 9, 8, 7, 7, 6, 5, 11, 3];
var result = BubbleSort(arr);
console.log(result);
/*
[ 9, 8, 7, 7, 6, 5, 10, 3, 11 ]
-----------------------------
[ 8, 7, 7, 6, 5, 9, 3, 10, 11 ]
-----------------------------
[ 7, 7, 6, 5, 8, 3, 9, 10, 11 ]
-----------------------------
[ 7, 6, 5, 7, 3, 8, 9, 10, 11 ]
-----------------------------
[ 6, 5, 7, 3, 7, 8, 9, 10, 11 ]
-----------------------------
[ 5, 6, 3, 7, 7, 8, 9, 10, 11 ]
-----------------------------
[ 5, 3, 6, 7, 7, 8, 9, 10, 11 ]
-----------------------------
[ 3, 5, 6, 7, 7, 8, 9, 10, 11 ]
-----------------------------
[ 3, 5, 6, 7, 7, 8, 9, 10, 11 ]
*/
```

二.选择排序

```js
function SelectionSort(array) {
  var length = array.length;
  for (var i = 0; i < length; i++) {
    //缩小选择的范围
    var min = array[i]; //假定范围内第一个为最小值
    var index = i; //记录最小值的下标
    for (var j = i + 1; j < length; j++) {
      //在范围内选取最小值
      if (array[j] < min) {
        min = array[j];
        index = j;
      }
    }
    if (index != i) {
      //把范围内最小值交换到范围内第一个
      var temp = array[i];
      array[i] = array[index];
      array[index] = temp;
    }
    console.log(array);
    console.log("---------------------");
  }
  return array;
}

var arr = [1, 10, 100, 90, 65, 5, 4, 10, 2, 4];
var result = SelectionSort(arr);
console.log(result);
/*
[ 1, 10, 100, 90, 65, 5, 4, 10, 2, 4 ]
---------------------
[ 1, 2, 100, 90, 65, 5, 4, 10, 10, 4 ]
---------------------
[ 1, 2, 4, 90, 65, 5, 100, 10, 10, 4 ]
---------------------
[ 1, 2, 4, 4, 65, 5, 100, 10, 10, 90 ]
---------------------
[ 1, 2, 4, 4, 5, 65, 100, 10, 10, 90 ]
---------------------
[ 1, 2, 4, 4, 5, 10, 100, 65, 10, 90 ]
---------------------
[ 1, 2, 4, 4, 5, 10, 10, 65, 100, 90 ]
---------------------
[ 1, 2, 4, 4, 5, 10, 10, 65, 100, 90 ]
---------------------
[ 1, 2, 4, 4, 5, 10, 10, 65, 90, 100 ]
---------------------
[ 1, 2, 4, 4, 5, 10, 10, 65, 90, 100 ]
---------------------
[ 1, 2, 4, 4, 5, 10, 10, 65, 90, 100 ]
*/
```

三.插入排序

```js
function InsertionSort(array) {
  var length = array.length;
  for (var i = 0; i < length - 1; i++) {
    //i代表已经排序好的序列最后一项下标
    var insert = array[i + 1];
    var index = i + 1; //记录要被插入的下标
    for (var j = i; j >= 0; j--) {
      if (insert < array[j]) {
        //要插入的项比它小，往后移动
        array[j + 1] = array[j];
        index = j;
      }
    }
    array[index] = insert;
    console.log(array);
    console.log("-----------------------");
  }
  return array;
}

var arr = [100, 90, 80, 62, 80, 8, 1, 2, 39];
var result = InsertionSort(arr);
console.log(result);
/*
[ 90, 100, 80, 62, 80, 8, 1, 2, 39 ]
-----------------------
[ 80, 90, 100, 62, 80, 8, 1, 2, 39 ]
-----------------------
[ 62, 80, 90, 100, 80, 8, 1, 2, 39 ]
-----------------------
[ 62, 80, 80, 90, 100, 8, 1, 2, 39 ]
-----------------------
[ 8, 62, 80, 80, 90, 100, 1, 2, 39 ]
-----------------------
[ 1, 8, 62, 80, 80, 90, 100, 2, 39 ]
-----------------------
[ 1, 2, 8, 62, 80, 80, 90, 100, 39 ]
-----------------------
[ 1, 2, 8, 39, 62, 80, 80, 90, 100 ]
-----------------------
[ 1, 2, 8, 39, 62, 80, 80, 90, 100 ]
*/
```

四.希尔排序 五.归并排序 六.快速排序····

## 正则表达式，验证手机号码，验证规则：11 位数字，以 1 位开头

```js
checkphonenumber(number) {
	if (number == null || number.length != 11) {
		return false
	} else {
		// 移动号段正则表达式
		var pat1 = '^((13[4-9])|(147)|(15[0-2,7-9])|(178)|(18[2-4,7-8]))\\d{8}|(1705)\\d{7}$';
		// 联通号段正则表达式
		var pat2 = '^((13[0-2])|(145)|(15[5-6])|(176)|(18[5,6]))\\d{8}|(1709)\\d{7}$';
		// 电信号段正则表达式
		var pat3 = '^((133)|(153)|(177)|(18[0,1,9])|(149))\\d{8}$';
		// 虚拟运营商正则表达式
		var pat4 = '^((170))\\d{8}|(1718)|(1719)\\d{7}$';
		if (!part1.test(number)) {
			return false
		}
		if (!part2.test(number)) {
			return false
		}
		if (!part3.test(number)) {
			return false
		}
		if (!part4.test(number)) {
			return false
		}
	}
	return true
}
```

## 请给 Array 本地对象增加一个原型方法，他的用途是删除数组中重复的条目并按升序排序，最后返回新数组。

```js
Array.prototype.distinct = function() {
  var ret = [];
  for (var i = 0; i < this.length; i++) {
    for (var j = i + 1; j < this.length; ) {
      if (this[i] === this[j]) {
        ret.push(this.splice(j, 1)[0]);
      } else {
        j++;
      }
    }
  }
  return ret;
};
console.log(["a", "b", "c", "d", "b", "a", "e"].distinct()); // ["a", "b"]
```

## 设计一道 JavaScript 的 range 算法如下

range(1, 10, 3) 返回 [1, 4, 7, 10]; range('A', 'F', 2) 返回 ['A', 'C', 'E'] 请使用 JavaScript 语言实现该功能（可以使用 ES6）

答案：

```js
function range() {
  var args = [].slice.call(arguments);
  var str = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  var result = [];
  if (args.length > 2) {
    if (typeof args[0] === "number") {
      for (var i = args[0]; i <= args[1]; i = i + args[2]) {
        result.push(i);
      }
    } else {
      for (
        var i = str.indexOf(args[0]);
        i <= str.indexOf(args[1]);
        i = i + args[2]
      ) {
        result.push(str[i]);
      }
    }
  }
  return result;
}
```

## 请说明以下各种情况的执行结果，并注明产生对应结果的理由

```html
<button id="btn">click</button>
<script>
  function doSomething() {
    console.log(this);
  }
  var btn = document.querySelector("#btn");
  console.log(btn);
  // btn.onclick = doSomething //<button id="btn">click</button>
  btn.onclick = function doSomething() {
    console.log(this);
  };
  btn.onclick = () => {
    console.log(this); //Window
  };
  doSomething(); //Window
</script>
```

## 请写出以下代码的执行结果

```js
var obj = {};
var events = { m1: "clicked", m2: "changed" };
for (e in events) {
  obj[e] = function() {
    alert(events[e]);
  };
}

alert(obj.m1 == obj.m2); //false
obj.m1(); //changed
obj.m2(); //changed
```

## 尝试实现注释部分的 JavaScript 代码， 可在其他任何地方添加更多代码。

```js
var Obj = function(msg) {
  this.msg = msg;
  this.shout = function() {
    alert(this.msg);
  };
  this.waitAndShout = function() {
    // 隔五秒钟后执行上面的 shout 方法
  };
};
```

```js
var Obj = function(msg) {
  this.msg = msg;
  this.shout = function() {
    console.log(this.msg);
  };
  this.shout2 = () => {
    console.log(this.msg);
  };
  this.waitAndShout = function() {
    console.log("111");
    //         setTimeout(() => {
    //           this.shout()
    //         },2000)
    //         this.shout()
    setTimeout(function() {
      console.log(this === window);
    }, 2000);
  };
};
var obj = new Obj("这是msg");

obj.waitAndShout();
// obj.shout()
// obj.shout2()
```

## 如何解决数组塌陷问题

```js
// 1 使用i--
for (var i = 0; i < arr.length; i++) {
  if (arr[i] === 4) {
    arr.splice(i, 1);
    i--;
  }
}
console.log(arr);

// 2 从数组的末尾一项开始遍历
for (var i = arr.length; i >= 0; i--) {
  if (arr[i] === 4) {
    arr.splice(i, 1);
  }
}
console.log(arr);
```

## 计算打印结果

```js
function fun(n, o) {
  console.log(o);
  return {
    fun: function(m) {
      return fun(m, n);
    },
  };
}
// var a = fun(0);
// a.fun(1);
// a.fun(2);
// a.fun(3);

// 打印
// undefined 0 0 0

// var b = fun(0).fun(1).fun(2).fun(3)
// 打印 undefined 0 1 2

var c = fun(0).fun(1);
c.fun(2);
c.fun(3);
// 打印
// undefined 0 1 1
//c.fun()打印 1
```

## 已知有字符串 foo="get-element-by-id",写一个 function 将其转化为驼峰表示法"getElementById"

```js
var string = "get-element-by-id";

function combo(msg) {
  var arr = msg.split("-"); //split("-")以-为分隔符截取字符串，返回数组
  for (var i = 1; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  msg = arr.join(""); //join()返回字符串
  return msg;
}
console.log(combo(string));
```

## 写一个 function，清除字符串前后的空格（兼容所有的浏览器）

```js
//重写trim方法
if (!String.prototype.trim) {
  String.prototype.trim = function() {
    return this.replace(/^\s+/, "").replace(/\s+$/, "");
  };
}
```

## this 面试题

this 指向了谁？看函数在执行的时候是如何调用的，

1. 如果这个函数是用**普通函数调用模式**来进行调用，它内部的 this 指向了**window**
2. 如果一个函数在调用的时候是通过**对象方法模式**来进行调用，则它内部的 this 就是我们的**对象**
3. 如果一个函数在调用的时候通过**构造函数模式**调用，则它内部的 this 指向了生成的**实例**
4. 如果这个函数是通过**方法借用模式调用**，则这个函数内部的 this 就是我们**手动指定 this**。

```js
//第1题
function Fn() {
  console.log(this);
}
Fn(); //window 普通函数调用模式
new Fn(); //{}  构造函数调用模式
Fn.apply(Fn); // Fn的函数体   方法借用模式

//第2题
var o = {
  f: function() {
    console.log(this);
  },
  2: function() {
    console.log(this);
    console.log(this.__proto__ === o[2].prototype);
  },
};
o.f(); //o   对象调用模式
o[2](); //o  对象调用模式
new o[2](); //存疑，存在着优先级的问题 {}  通过构造函数模式进行调用
o.f.call([1, 2]); //[1,2]   call方法进行方法借用。
o[2].call([1, 2, 3, 4]); // [1,2,3,4]  call方法进行方法借用

//第3题
var name = "out";
var obj = {
  name: "in",
  prop: {
    name: "inside",
    getName: function() {
      return this.name;
    },
  },
};

console.log(obj.prop.getName()); //对象调用模式来进行调用  obj.prop.name  'inside'
var test = obj.prop.getName; // 把test这个变量指向了obj.prop.getName所在的内存地址。
console.log(test()); //普通函数模式来进行调用  window 'out'
console.log(obj.prop.getName.apply(window)); //方法借用模式  'out'
console.log(obj.prop.getName.apply(this)); //方法借用模式  'out'
console.log(this === window); //true

//第4题
var length = 10;
function fn() {
  console.log(this.length);
}
var obj = {
  length: 5,
  method: function(f) {
    console.log(this);
    f(); // f在调用的时候是什么调用模式？普通函数调用模式  window.length  10
    arguments[0](); // 通过什么模式来进行调用的。执行之前有[]和.就是对象调用模式。
    //arguments是一个类数组，也就是一个对象，就是通过arguments来进行调用的
    //arguments.length实参的数量。实参长度是1
    //通过arguments对象进行调用，因此函数内部的this是  arguments
    // 如果一个函数在调用的时候它前面有call和apply那么就肯定是方法借用模式调用
    arguments[0].call(this);
    // 调用method方法是通过obj.method 因此在这里的this就是 obj
    //通过call方法把fn内的this指向了obj
    // 输出obj.length  5
  },
};
obj.method(fn);

//第5题
function Foo() {
  getName = function() {
    console.log(1);
  };
  return this;
}
Foo.getName = function() {
  console.log(2);
};
Foo.prototype.getName = function() {
  console.log(3);
};
var getName = function() {
  console.log(4);
};
function getName() {
  console.log(5);
}
//请写出以下输出结果：
Foo.getName(); //2
getName(); //4
Foo().getName(); //1
getName(); //1
new Foo.getName(); //2
new Foo().getName(); //3
new new Foo().getName(); //3
// new Foo()创建了一个构造函数，然后这个函数再去访问getName这个函数，
//对它进行调用
/*console.log(new Foo().getName)*/
/*var o = new new Foo().getName(); //
    console.log(o.__proto__===Foo.prototype.getName.prototype)*/
//用new Foo创建出来了一个实例，然后这个实例去访问 (new Foo().getName)

/*console.log(new new Foo().getName())

    console.log(new Foo().getName())*/

/*function Foo() {
        getName = function () {
            console.log(1);
        };
        return this;
    }
    var getName;
    Foo.getName = function () {
        console.log(2);
    };
    Foo.prototype.getName = function () {
        console.log(3);
    };
    getName = function () {
        console.log(4);
    };
    //请写出以下输出结果：
    Foo.getName();// 2
    getName();//4
/!*    Foo().getName();//!*!/
    window.getName()//1
    getName();//1
  /!*  var o = new Foo.getName();//2
    console.log(o);// {}
    console.log(o.__proto__===Foo.getName.prototype)//true*!/
    new Foo.getName();// 2
    new Foo().getName();//
    new new Foo().getName();*/

//第6题
var obj = {
  fn: function() {
    console.log(this);
  },
};
obj.fn(); //obj
var f = obj.fn;
f(); //window
console.log(f === obj.fn); // true

// f和obj.fn是同一个函数，但是他们在调用的时候使用的函数调用模式不同，因此，它们内部的this指向也就不同。

// #7题
var arr = [
  function() {
    console.log(this);
  },
];
arr[0](); //数组本身
//数组也是一个复杂数据类型，也是一个对象，那用数组去调用函数，使用的模式就是对象方法调用模式。
function f() {
  console.log(this);
}
function fn() {
  console.log(arguments); // 类数组，也是就一个对象    [0:function f(){}]
  console.log(this); // window
  arguments[0]();
  console.log(arguments[0]); //内部的this就是arguments
  // 通过arguments对f这个方法进行调用，使用的是对象方法调用模式。
}
fn(f);

// #8题
function SuperClass() {
  this.name = "women";
  this.bra = ["a", "b"];
}

SuperClass.prototype.sayWhat = function() {
  console.log("hello");
};

function SubClass() {
  this.subname = "you sister";
  SuperClass.call(this);
}

var sub = new SubClass();
console.log(sub.sayWhat());
```

## 实现一个 new 操作符

```js
function New(func) {
  var res = {};
  if (func.prototype !== null) {
    res.__proto__ = func.prototype;
  }
  var ret = func.apply(res, Array.prototype.slice.call(arguments, 1));
  if ((typeof ret === "object" || typeof ret === "function") && ret !== null) {
    return ret;
  }
  return res;
}
var obj = New(A, 1, 2);
// equals to
var obj = new A(1, 2);
```

## 实现一个 call 或 apply

call

```js
Function.prototype.call2 = function(context) {
  var context = context || window;
  context.fn = this;

  var args = [];
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push("arguments[" + i + "]");
  }

  var result = eval("context.fn(" + args + ")");

  delete context.fn;
  return result;
};
```

apply

```js
Function.prototype.apply2 = function(context, arr) {
  var context = Object(context) || window;
  context.fn = this;

  var result;
  if (!arr) {
    result = context.fn();
  } else {
    var args = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push("arr[" + i + "]");
    }
    result = eval("context.fn(" + args + ")");
  }

  delete context.fn;
  return result;
};
```

bind

```js
Function.prototype.bind2 = function(context) {
  if (typeof this !== "function") {
    throw new Error(
      "Function.prototype.bind - what is trying to be bound is not callable"
    );
  }
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  var fNOP = function() {};
  var fbound = function() {
    self.apply(
      this instanceof self ? this : context,
      args.concat(Array.prototype.slice.call(arguments))
    );
  };
  fNOP.prototype = this.prototype;
  fbound.prototype = new fNOP();
  return fbound;
};
```

## 实现一个继承

```js
function Parent(name) {
  this.name = name;
}

Parent.prototype.sayName = function() {
  console.log("parent name:", this.name);
};

function Child(name, parentName) {
  Parent.call(this, parentName);
  this.name = name;
}

function create(proto) {
  function F() {}
  F.prototype = proto;
  return new F();
}
Child.prototype = create(Parent.prototype);
Child.prototype.sayName = function() {
  console.log("child name:", this.name);
};

Child.prototype.constructor = Child;
var parent = new Parent("汪某");
parent.sayName(); // parent name: 汪某
var child = new Child("son", "汪某");
```

## 手写一个 Promise

```js
function myPromise(constructor) {
  let self = this;
  self.status = "pending";
  //定义状态改变前的初始状态
  self.value = undefined;
  //定义状态为resolved的时候的状态
  self.reason = undefined;
  //定义状态为rejected的时候的状态
  function resolve(value) {
    //两个==="pending"，保证了状态的改变是不可逆的
    if (self.status === "pending") {
      self.value = value;
      self.status = "resolved";
    }
  }
  function reject(reason) {
    //两个==="pending"，保证了状态的改变是不可逆的
    if (self.status === "pending") {
      self.reason = reason;
      self.status = "rejected";
    }
  }
  //捕获构造异常
  try {
    constructor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

//同时，需要在 myPromise的原型上定义链式调用的 then方法：
myPromise.prototype.then = function(onFullfilled, onRejected) {
  let self = this;
  switch (self.status) {
    case "resolved":
      onFullfilled(self.value);
      break;
    case "rejected":
      onRejected(self.reason);
      break;
    default:
  }
};

//测试一下：
var p = new myPromise(function(resolve, reject) {
  resolve(1);
});
p.then(function(x) {
  console.log(x);
});
```

## 手写防抖(Debouncing)和节流(Throttling)

```js
// 防抖函数
function debounce(fn, wait) {
  let timer;
  return function() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, wait);
  };
}

// （参考博客https://segmentfault.com/a/1190000018428170）
function debounce(fn, delay) {
  let timer = null; //借助闭包
  return function() {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, delay); // 简化写法
  };
}
// 节流函数 通过时间戳差值是否大于指定间隔时间来做判定
function throttle(fn, wait) {
  let prev = new Date();
  return function() {
    const args = arguments;
    const now = new Date();
    if (now - prev > wait) {
      fn.apply(this, args);
      prev = new Date();
    }
  };
}

// 通过setTimeout的返回的标记当做判断条件实现（参考博客https://segmentfault.com/a/1190000018428170）
function throttle(fn, delay) {
  let valid = true;
  return function() {
    if (!valid) {
      //休息时间 暂不接客
      return false;
    }
    // 工作时间，执行函数并且在间隔期内把状态位设为无效
    valid = false;
    setTimeout(() => {
      fn();
      valid = true;
    }, delay);
  };
}
```

## 手写一个 JS 深拷贝

```js
function deepCopy(obj) {
  //判断是否是简单数据类型，
  if (typeof obj == "object") {
    //复杂数据类型
    var result = obj.constructor == Array ? [] : {};
    for (let i in obj) {
      result[i] = typeof obj[i] == "object" ? deepCopy(obj[i]) : obj[i];
    }
  } else {
    //简单数据类型 直接 == 赋值
    var result = obj;
  }
  return result;
}
let o1 = {
  a: {
    b: 1,
  },
};
let o2 = JSON.parse(JSON.stringify(o1));
```

另一种方法

```js
function deepCopy(s) {
  const d = {};
  for (let k in s) {
    if (typeof s[k] == "object") {
      d[k] = deepCopy(s[k]);
    } else {
      d[k] = s[k];
    }
  }

  return d;
}
```

## 写一个通用的事件侦听器函数

```js
// event(事件)工具集，来源：https://github.com/markyun
markyun.Event = {
  // 页面加载完成后
  readyEvent: function(fn) {
    if (fn == null) {
      fn = document;
    }
    var oldonload = window.onload;
    if (typeof window.onload != "function") {
      window.onload = fn;
    } else {
      window.onload = function() {
        oldonload();
        fn();
      };
    }
  },
  // 视能力分别使用dom0||dom2||IE方式 来绑定事件
  // 参数： 操作的元素,事件名称 ,事件处理程序
  addEvent: function(element, type, handler) {
    if (element.addEventListener) {
      //事件类型、需要执行的函数、是否捕捉
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, function() {
        handler.call(element);
      });
    } else {
      element["on" + type] = handler;
    }
  },
  // 移除事件
  removeEvent: function(element, type, handler) {
    if (element.removeEnentListener) {
      element.removeEnentListener(type, handler, false);
    } else if (element.datachEvent) {
      element.detachEvent("on" + type, handler);
    } else {
      element["on" + type] = null;
    }
  },
  // 阻止事件 (主要是事件冒泡，因为IE不支持事件捕获)
  stopPropagation: function(ev) {
    if (ev.stopPropagation) {
      ev.stopPropagation();
    } else {
      ev.cancelBubble = true;
    }
  },
  // 取消事件的默认行为
  preventDefault: function(event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },
  // 获取事件目标
  getTarget: function(event) {
    return event.target || event.srcElement;
  },
  // 获取event对象的引用，取到事件的所有信息，确保随时能使用event；
  getEvent: function(e) {
    var ev = e || window.event;
    if (!ev) {
      var c = this.getEvent.caller;
      while (c) {
        ev = c.arguments[0];
        if (ev && Event == ev.constructor) {
          break;
        }
        c = c.caller;
      }
    }
    return ev;
  },
};
```

## 判断一个字符串中出现次数最多的字符，统计这个次数

```js
var str = "asdfssaaasasasasaa";
var json = {};
for (var i = 0; i < str.length; i++) {
  if (!json[str.charAt(i)]) {
    json[str.charAt(i)] = 1;
  } else {
    json[str.charAt(i)]++;
  }
}
var iMax = 0;
var iIndex = "";
for (var i in json) {
  if (json[i] > iMax) {
    iMax = json[i];
    iIndex = i;
  }
}
alert("出现次数最多的是:" + iIndex + "出现" + iMax + "次");
```

## 写一个获取非行间样式的函数

```js
function getStyle(obj, attr, value) {
  if (!value) {
    if (obj.currentStyle) {
      return obj.currentStyle(attr);
    } else {
      obj.getComputedStyle(attr, false);
    }
  } else {
    obj.style[attr] = value;
  }
}
```

## 将数字 12345678 转化成 RMB 形式 如： 12,345,678

```js
//个人方法；
//思路：先将数字转为字符， str= str + '' ;
//利用反转函数，每三位字符加一个 ','最后一位不加； re()是自定义的反转函数，最后再反转回去！
for (var i = 1; i <= re(str).length; i++) {
  tmp += re(str)[i - 1];
  if (i % 3 == 0 && i != re(str).length) {
    tmp += ",";
  }
}
```

## 生成 5 个不同的随机数

```js
//思路：5个不同的数，每生成一次就和前面的所有数字相比较，如果有相同的，则放弃当前生成的数字！
var num1 = [];
for (var i = 0; i < 5; i++) {
  num1[i] = Math.floor(Math.random() * 10) + 1; //范围是 [1, 10]
  for (var j = 0; j < i; j++) {
    if (num1[i] == num1[j]) {
      i--;
    }
  }
}
```

## 去掉数组中重复的数字

方法一

```js
//思路：每遍历一次就和之前的所有做比较，不相等则放入新的数组中！
//这里用的原型 个人做法；
Array.prototype.unique = function() {
  var len = this.length,
    newArr = [],
    flag = 1;
  for (var i = 0; i < len; i++, flag = 1) {
    for (var j = 0; j < i; j++) {
      if (this[i] == this[j]) {
        flag = 0; //找到相同的数字后，不执行添加数据
      }
    }
    flag ? newArr.push(this[i]) : "";
  }
  return newArr;
};
```

方法二

```js
(function(arr) {
  var len = arr.length,
    newArr = [],
    flag;
  for (var i = 0; i < len; i += 1, flag = 1) {
    for (var j = 0; j < i; j++) {
      if (arr[i] == arr[j]) {
        flag = 0;
      }
    }
    flag ? newArr.push(arr[i]) : "";
  }
  alert(newArr);
})([1, 1, 22, 3, 4, 55, 66]);
```

## 阶乘函数

```js
//原型方法
Number.prototype.N = function() {
  var re = 1;
  for (var i = 1; i <= this; i++) {
    re *= i;
  }
  return re;
};
var num = 5;
alert(num.N());
```

## 下面输出多少？

```js
function changeObjectProperty(o) {
  o.siteUrl = "http://www.csser.com/";
  o = new Object();
  o.siteUrl = "http://www.popcg.com/";
}
var CSSer = new Object();
changeObjectProperty(CSSer);
console.log(CSSer.siteUrl); //
```

如果 CSSer 参数是按引用传递的，那么结果应该是"http://www.popcg.com/"，但实际结果却仍是"http://www.csser.com/"。事实是这样的：在函数内部修改了引用类型值的参数，该参数值的原始引用保持不变。我们可以把参数想象成局部变量，当参数被重写时，这个变量引用的就是一个局部变量，局部变量的生存期仅限于函数执行的过程中，函数执行完毕，局部变量即被销毁以释放内存。 （补充：内部环境可以通过作用域链访问所有的外部环境中的变量对象，但外部环境无法访问内部环境。每个环境都可以向上搜索作用域链，以查询变量和函数名，反之向下则不能。）

## 精度问题: JS 精度不能精确到 0.1 所以 。。。。同时存在于值和差值中

```js
var n = 0.3,
  m = 0.2,
  i = 0.2,
  j = 0.1;
alert(n - m == i - j); //false
alert(n - m == 0.1); //false
alert(i - j == 0.1); //true

> 0.2-0.1
0.1
> 0.9-0.2
0.7
> 0.3-0.2
0.09999999999999998
> 0.5-0.4
0.09999999999999998
> 0.1+0.2
0.30000000000000004
> 0.1+0.3
0.4
>
```

## 计算字符串字节数

```js
new (function(s) {
  if (!arguments.length || !s) return null;
  if ("" == s) return 0;
  var l = 0;
  for (var i = 0; i < s.length; i++) {
    if (s.charCodeAt(i) > 255) l += 2;
    else l += 1; //charCodeAt()得到的是unCode码
  } //汉字的unCode码大于 255bit 就是两个字节
  alert(l);
})("hello world!");
```

## 请问代码实现 outerHTML

```js
//说明：outerHTML其实就是innerHTML再加上本身；
Object.prototype.outerHTML = function() {
  var innerCon = this.innerHTML, //获得里面的内容
    outerCon = this.appendChild(innerCon); //添加到里面
  alert(outerCon);
};
```

演示代码：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body>
    <div id="outer">
      hello
    </div>
    <script>
      Object.prototype.outerHTML = function() {
        var innerCon = this.innerHTML, //获得里面的内容
          outerCon = this.appendChild(innerCon); //添加到里面
        alert(outerCon);
      };
      function $(id) {
        return document.getElementById(id);
      }
      alert($("outer").innerHTML);
      alert($("outer").outerHTML);
    </script>
  </body>
</html>
```

## JS 中的简单继承 call 方法

```js
//顶一个父母类，注意：类名都是首字母大写的哦！
function Parent(name, money) {
  this.name = name;
  this.money = money;
  this.info = function() {
    alert("姓名： " + this.name + " 钱： " + this.money);
  };
} //定义孩子类
function Children(name) {
  Parent.call(this, name); //继承 姓名属性，不要钱。
  this.info = function() {
    alert("姓名： " + this.name);
  };
} //实例化类
var per = new Parent("parent", 800000000000);
var chi = new Children("child");
per.info();
chi.info();
```

## 解析 URL 成一个对象？

```js
String.prototype.urlQueryString = function() {
  var url = this.split("?")[1].split("&"),
    len = url.length;
  this.url = {};
  for (var i = 0; i < len; i += 1) {
    var cell = url[i].split("="),
      key = cell[0],
      val = cell[1];
    this.url["" + key + ""] = val;
  }
  return this.url;
};
var url = "?name=12&age=23";
console.log(url.urlQueryString().age);
```

## 下面这个 ul，如何点击每一列的时候 alert 其 index?（闭包）

```js
<ul id="test">
  <li>这是第一条</li>
  <li>这是第二条</li>
  <li>这是第三条</li>
</ul>
```

答案：

```js
// 方法一：
var lis = document.getElementById("test").getElementsByTagName("li");
for (var i = 0; i < 3; i++) {
  lis[i].index = i;
  lis[i].onclick = function() {
    alert(this.index);
  };
}
//方法二：
var lis = document.getElementById("test").getElementsByTagName("li");
for (var i = 0; i < 3; i++) {
  lis[i].index = i;
  lis[i].onclick = (function(a) {
    return function() {
      alert(a);
    };
  })(i);
}
```

## 实现一个函数 clone，可以对 JavaScript 中的 5 种主要的数据类型（包括 Numer、String、Object、Array、Boolean）进行值复制

- 1：对于基本数据类型和引用数据类型在内存中存放的是值还是指针这一区别是否清楚
- 2：是否知道如何判断一个变量是什么类型的
- 3：递归算法的设计

```js
// 方法一：
Object.prototype.clone = function() {
  var o = this.constructor === Array ? [] : {};
  for (var e in this) {
    o[e] = typeof this[e] === "object" ? this[e].clone() : this[e];
  }
  return o;
};
/**
 * 克隆一个对象
 * @param Obj
 * @returns
 */
//方法二：
function clone(Obj) {
  var buf;
  if (Obj instanceof Array) {
    buf = []; //创建一个空的数组
    var i = Obj.length;
    while (i--) {
      buf[i] = clone(Obj[i]);
    }
    return buf;
  } else if (Obj instanceof Object) {
    buf = {}; //创建一个空对象
    for (var k in Obj) {
      //为这个对象添加新的属性
      buf[k] = clone(Obj[k]);
    }
    return buf;
  } else {
    //普通变量直接赋值
    return Obj;
  }
}
```

## 用 js 实现随机选取 10–100 之间的 10 个数字，存入一个数组，并排序。

```js
var iArray = [];
function getRandom(istart, iend) {
  var iChoice = iend - istart + 1;
  return Math.floor(Math.random() * iChoice + istart);
}
for (var i = 0; i < 10; i++) {
  iArray.push(getRandom(10, 100));
}
iArray.sort((a, b) => a - b);
```

## 输出今天的日期，以 YYYY-MM-DD 的方式，比如今天是 2014 年 9 月 26 日，则输出 2014-09-26

```js
var d = new Date();
// 获取年，getFullYear()返回4位的数字
var year = d.getFullYear();
// 获取月，月份比较特殊，0是1月，11是12月
var month = d.getMonth() + 1;
// 变成两位
month = month < 10 ? "0" + month : month;
// 获取日
var day = d.getDate();
day = day < 10 ? "0" + day : day;
alert(year + "-" + month + "-" + day);
```

## 下列 JavaScript 代码执行后，依次 alert 的结果是

```js
var obj = { proto: { a: 1, b: 2 } };
function F() {}
F.prototype = obj.proto;
console.log(F.prototype === obj.proto); //true
var f = new F();
obj.proto.c = 3;
console.log(f.__proto__ === obj); // false
console.log(obj);
obj.proto = { a: -1, b: -2 };
// alert(f.a); //1
// alert(f.c); //3
// console.log(f)
// console.log(obj)
delete F.prototype["a"];
alert(f.a); //undefined
alert(obj.proto.a); // -1
// console.log(obj.proto.c)
```

## js 中如何实现一个 map

数组的 map 方法：

```
概述
map() 方法返回一个由原数组中的每个元素调用一个指定方法后的返回值组成的新数组。

语法
array.map(callback[, thisArg])

参数
callback

原数组中的元素经过该方法后返回一个新的元素。

currentValue

callback 的第一个参数，数组中当前被传递的元素。

index

callback 的第二个参数，数组中当前被传递的元素的索引。

array

callback 的第三个参数，调用 map 方法的数组。

thisArg

执行 callback 函数时 this 指向的对象。
```

实现：

```js
Array.prototype.map2 = function(callback) {
  for (var i = 0; i < this.length; i++) {
    console.log(this);
    this[i] = callback(this[i]);
  }
  return this;
};
```

## 判断输出

```js
//考点：函数声明提前
function bar() {
  console.log(foo); //function foo(){}
  foo = 111; //此时foo为函数内的变量
  return foo;
  //   foo = 10;
  function foo() {}
}
alert(typeof bar()); //"function"
```

```js
var foo = 1;
function bar() {
  foo = 10;
  return;
  function foo() {}
}
bar();
alert(foo); //答案：1
```

## 只允许使用 `+ - _ /` 和 `Math._` ，求一个函数 `y = f(x, a, b);`当 `x > 100` 时返回 a 的值，否则返回 b 的值，不能使用 `if else` 等条件语句，也不能使用`|,?:,`数组

```js
function f(x, a, b) {
  var temp = Math.ceil(Math.min(Math.max(x - 100, 0), 1));
  return a * temp + b * (1 - temp);
}
console.log(f(-10, 1, 2));
```

## 求 num 的值

```js
// 面试题1
var num = 123;
function f1() {
  console.log(num); // 123
}
function f2() {
  var num = 456;
  f1();
}
f2();

// 面试题1 变式
var num = 123;
function f1(num) {
  console.log(num); // 456
}
function f2() {
  var num = 456;
  f1(num);
}
f2();

// 面试题1 变式
var num = 123;
function f1() {
  console.log(num); // 456
}
f2();
function f2() {
  num = 456; //这里是全局变量
  f1();
}
console.log(num); // 456
```

## 有一个函数，参数是一个函数，返回值也是一个函数，返回的函数功能和入参的函数相似，但这个函数只能执行 3 次，再次执行无效，如何实现

这个题目是考察闭包的使用

```js
function sayHi(){
  console.log("hi)
}
function threeTimes(fn){
  let times = 0;
  return () => {
    if(times++ < 3) {
      fn()
    }
  }
}
```

通过闭包变量 times 来控制函数的执行

## 实现 add 函数,让 add(a)(b)和 add(a,b)两种调用结果相同

```js
function add(a, b) {
  if (b === undefined) {
    return function(x) {
      return a + x;
    };
  }
  return a + b;
}
```

## 格式化金钱，每千分位加逗号

```js
function format(str) {
  let s = "";
  let count = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    s = str[i] + s;
    count++;
    if (count % 3 == 0 && i != 0) {
      s = "," + s;
    }
  }
  return s;
}
function format(str) {
  return str.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
}
```

## 反转数组

```js
function reverseArry(arry) {
  const str = arry.join(" ");
  const result = [];
  let word = "";
  for (let i = 0, len = str.length; i < len; i++) {
    if (str[i] != " ") {
      word += str[i];
    } else {
      result.unshift(word);
      word = "";
    }
  }

  result.unshift(word);
  return result;
}

console.log(reverseArry(["I", "am", "a", "student"]));
// ["student", "a", "am", "I"]
```

```js
function reverseArry(arry) {
  const result = [];
  const distance = arry.length - 1;
  for (let i = distance; i >= 0; i--) {
    result[distance - i] = arry[i];
  }

  return result;
}
```

## 说出以下函数的作用是？空白区域应该填写什么？

```js
//define
(function(window) {
  function fn(str) {
    this.str = str;
  }
  fn.prototype.format = function() {
    var arg = ______; //arguments
    return this.str.replace(_____, function(a, b) {
      ///{(\d+)}/ig
      return arg[b] || "";
    });
  };
  window.fn = fn;
})(window);
//use
(function() {
  var t = new fn('<p><a href="{0}">{1}</a><span>{2}</span></p>');
  console.log(t.format("http://www.alibaba.com", "Alibaba", "Welcome"));
})();
```

访函数的作用是使用 format 函数将函数的参数替换掉{0}这样的内容，返回一个格式化后的结果： 第一个空是：arguments 第二个空是：/{(\d+)}/ig

## 原生 JS 的 window.onload 与 Jquery 的\$(document).ready(function(){})有什么不同？如何用原生 JS 实现 Jq 的 ready 方法？

```js
function ready(fn) {
  if (document.addEventListener) {
    //标准浏览器
    document.addEventListener(
      "DOMContentLoaded",
      function() {
        //注销事件, 避免反复触发
        document.removeEventListener(
          "DOMContentLoaded",
          arguments.callee,
          false
        );
        fn(); //执行函数
      },
      false
    );
  } else if (document.attachEvent) {
    //IE
    document.attachEvent("onreadystatechange", function() {
      if (document.readyState == "complete") {
        document.detachEvent("onreadystatechange", arguments.callee);
        fn(); //函数执行
      }
    });
  }
}
```

## 介绍下深度优先遍历和广度优先遍历，如何实现？

深度优先遍历——是指从某个顶点出发，首先访问这个顶点，然后找出刚访问这个结点的第一个未被访问的邻结点，然后再以此邻结点为顶点，继续找它的下一个顶点进行访问。重复此步骤，直至所有结点都被访问完为止。广度优先遍历——是从某个顶点出发，首先访问这个顶点，然后找出刚访问这个结点所有未被访问的邻结点，访问完后再访问这些结点中第一个邻结点的所有结点，重复此方法，直到所有结点都被访问完为止。

```js
//DFS递归
function deepTraversal(node) {
  let nodes = [];
  if (node != null) {
    nodes.push(node);
    let childrens = node.children;
    for (let i = 0; i < childrens.length; i++) {
      deepTraversal(childrens[i]);
    }
    return nodes;
  }
}

//DFS非递归
function deepTraversal(node) {
  let nodes = [];
  if (node != null) {
    let stack = [];
    stack.push(node);
    while (stack.length != 0) {
      let item = stack.pop();
      nodes.push(item);
      let childrens = item.children;
      for (let i = childrens.length - 1; i >= 0; i--) {
        stack.push(childrens[i]);
      }
    }
  }
  return nodes;
}

//BFS递归
function wideTraversal(node) {
  let nodes = [],
    i = 0;
  if (node != null) {
    nodes.push(node);
    wideTraversal(node.nextElementSibling);
    node = nodes[i++];
    wideTraversal(node.firstElementChild);
  }
  return nodes;
}

//BFS非递归
function wideTraversal() {
  let nodes = [],
    i = 0;
  while (node != null) {
    nodes.push(node);
    node = nodes[i++];
    let childrens = node.children;
    for (let i = 0; i < childrens.length; i++) {
      nodes.push(childrens[i]);
    }
  }
  return nodes;
}
```

## 异步笔试题请写出下面代码的运行结果

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
console.log("script start");
setTimeout(function() {
  console.log("setTimeout");
}, 0);
async1();
new Promise(function(resolve) {
  console.log("promise1");
  resolve();
}).then(function() {
  console.log("promise2");
});
console.log("script end");
//输出
//script start
//async1 start
//async2
//promise1
//script end //第一次事件循环的调用栈执行完，开始执行微任务
//async1 end
//promise2 //微任务执行完开始执行宏任务
//setTimeout
```
