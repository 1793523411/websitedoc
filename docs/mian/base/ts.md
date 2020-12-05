## typescript 遇到过什么坑

main.ts 报错（ Cannot find module './App.vue'.）

原因： typescript 不能识别.vue 文件

解决办法： 引入 vue 的 typescript declare 库

