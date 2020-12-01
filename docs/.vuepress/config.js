module.exports = {
  title: "跌倒的小黄瓜",
  description: "文档部分",
  theme: 'antdocs',
  themeConfig: {
    sidebar: 'auto',
    nav: [
      { text: "首页", link: "/" },
      { text: "面试", link: "/mian/index" },
      { text: "Demo", link: "/Demo/index" },
      {
        text: "其他",
        items: [
          { text: "github", link: "https://github.com/1793523411" },
          { text: "master", link: "http://mymaster.ygjie.icu" },
        ],
      },
    ],
    sidebar:{
      '/Demo/': [
        {
          title: "前台",
          collapsable: false,
        },
        {
          title: "首页",
          collapsable: true, //是否展开
          children: [
            ["/Demo/front/home/one", "整体流程"],
            ["/Demo/front/home/two", "如何开发"],
          ]
        },
        {
          title: "文档",
          collapsable: true, //是否展开
          children: [
            ["/Demo/front/doc/one", "整体流程"],
            ["/Demo/front/doc/two", "如何开发"],
          ]
        },
        {
          title: "后台",
          collapsable: false,
        },
        ["/Demo/end/", "后台简介"],
        {
          title: "图片存储",
          collapsable: true, //是否展开
          children: [
            ["/Demo/end/imgstore/one", "整体流程"],
            // ["/mian/end/imgstore/two", "管理文章"],
          ]
        },
        {
          title: "文章功能",
          collapsable: true, //是否展开
          children: [
            ["/Demo/end/article/one", "整体流程"],
            // ["/mian/end/article/two", "图片展示"],
          ]
        },
        {
          title: "其他",
  
          collapsable: false,
        },
        {
          title: "静态网页",
          collapsable: true, //是否展开
          children: [
            ["/Demo/other/static/one", "仿腾讯视频pc端"],
          ]
        },
        {
          title: "社团官网",
          collapsable: true, //是否展开
          children: [
            ["/Demo/other/group/one", "官网前台第一版"],
            ["/Demo/other/group/two", "官网后台第一版"],
            ["/Demo/other/group/three", "官网前台第二版"],
            ["/Demo/other/group/four", "官网后台第二版"],
            ["/Demo/other/group/five", "官网前台SSR版"],
            ["/Demo/other/group/six", "官网前台移动端"],
          ]
        },
        {
          title: "小程序开发",
          collapsable: true, //是否展开
          children: [
            ["/Demo/other/wx/one", "工具小程序"],
            ["/Demo/other/wx/two", "记账小程序"],
          ]
        },
        {
          title: "serveless开发",
          collapsable: true, //是否展开
          children: [
            ["/Demo/other/workbench/one", "社团管理后台示例"],
          ]
        },
        {
          title: "App开发",
          collapsable: true, //是否展开
          children: [
            ["/Demo/other/app/one", "时间管理"],
          ]
        },
      ],
      '/mian/': [
        {
          title: "前端",
          collapsable: false,
        },
        {
          title: "面试知识点",
          collapsable: true, //是否展开
          children: [
            ["/mian/base/browser", "浏览器"],
            ["/mian/base/html2", "HTML"],
            ["/mian/base/css", "CSS"],
            ["/mian/base/js", "Javascript"],
            ["/mian/base/vue", "vue"],
            ["/mian/base/project", "工程化"],
            ["/mian/base/network", "计算机网络"],
            ["/mian/base/design", "设计模式"],
            ["/mian/base/safe", "安全"],
            ["/mian/base/better", "性能优化"],
            ["/mian/base/tools", "工具"],
            ["/mian/base/datastruct", "数据结构"],
            ["/mian/base/jstimu", "js相关题目"],
            ["/mian/base/suanfa", "算法"],
          ]
        },
        {
          title: "其他",
          collapsable: true, //是否展开
          children: [
            ["/mian/other/es6", "es6标准入门笔记"],
            ["/mian/other/goodarticle", "好的文章"],
            ["/mian/other/book", "读书清单"],
          ]
        },
      ],
    },
     sidebarDepth: 3,
  },
};
