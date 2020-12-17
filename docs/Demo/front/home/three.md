## 描述

我就是想最近看了看Nextjs的官网，所以就想尝试使用一下他，由于这回文档半中文英文，看着好不是滋味，所以就觉得Nextjs好像比Nuxtjs难一点点

这就是个简单的博客展示，分为首页和文章详情页，数据来源于管理后台，支持黑暗模式

## 技术

react + ant-design+ antd-motion + Nextjs


[展示地址](http://xingsiend2.ygjie.icu/)

[项目地址](https://github.com/1793523411/next-blog)

部署使用了静态托管

:::tip 
为什么要用静态托管？我是使用命令将项目打包成静态文件了，所以访问的是个静态网站，因为这样子很快，所以要这样子
:::

## 使用服务端渲染方式部署

[访问地址1](http://nextjsblog2.ygjie.icu/)

[访问地址2](http://nextjsblog.ygjie.icu/)

上面第一个服务器是：5M带宽 + 1核2G内存

上面第二个服务器是：1M贷款 + 1核2G内存

访问起来都很慢，第二个更慢（为啥我用Nuxt做服务端渲染，在第一个服务器上访问很快，难道是我使用的姿势不对？？？？？）

每次访问时，使用`htop`命令都能看到，cpu和内存使用率达到很高，然后就没有然后了

用Nextjs做静态生成的话，很那个啥，最终打包文件夹很大，超级大，因为他把所有路由都解析了一边，然后对应生成对应的页面，但使用静态托管访问起来还是很快的

```shell

  CPU[|||||||||||||||||||||||||||||||||||95.4%]   Tasks: 55, 324 thr; 1 running
  Mem[|||||||||||||||||||||||||||||1.59G/1.80G]   Load average: 1.65 0.96 0.42
  Swp[                                   0K/0K]   Uptime: 57 days, 00:27:57

  PID USER      PRI  NI  VIRT   RES   SHR S CPU% MEM%   TIME+  Command                              13073 root       20   0 1189M  419M  9752 R 93.4 22.8  0:26.93 node /root/blog/node_modules/.bin/nex13077 root       20   0 1189M  419M  9752 R  7.2 22.8  0:02.19 node /root/blog/node_modules/.bin/nex13078 root       20   0 1189M  419M  9752 S  6.6 22.8  0:02.16 node /root/blog/node_modules/.bin/nex13076 root       20   0 1189M  419M  9752 S  6.6 22.8  0:02.14 node /root/blog/node_modules/.bin/nex13075 root       20   0 1189M  419M  9752 S  5.3 22.8  0:02.15 node /root/blog/node_modules/.bin/nex13092 root       20   0  119M  2312  1492 R  1.3  0.1  0:00.24 htop                                 13081 root       20   0 1189M  419M  9752 R  1.3 22.8  0:00.19 node /root/blog/node_modules/.bin/nex13083 root       20   0 1189M  419M  9752 R  0.7 22.8  0:00.17 node /root/blog/node_modules/.bin/nex 1111 root       10 -10  153M 28688   888 S  0.7  1.5  5h09:39 /usr/local/aegis/aegis_client/aegis_113051 root       20   0  746M 21692  8724 R  0.7  1.2  0:00.52 npm                                  23175 root       20   0 17892   592     0 S  0.7  0.0  5:53.34 /usr/local/share/assist-daemon/assist  472 root       20   0  596M 18832  4552 S  0.0  1.0  1h39:14 CmsGoAgent-Worker start               1139 root       10 -10  153M 28688   888 S  0.0  1.5 20:55.95 /usr/local/aegis/aegis_client/aegis_113080 root       20   0 1189M  419M  9752 R  0.0 22.8  0:00.17 node /root/blog/node_modules/.bin/nex13082 root       20   0 1189M  419M  9752 R  0.0 22.8  0:00.21 node /root/blog/node_modules/.bin/nex 1138 root       10 -10  153M 28688   888 S  0.0  1.5  1h31:07 /usr/local/aegis/aegis_client/aegis_1 4727 root       20   0 2444M  197M     0 S  0.0 10.8 15:34.69 java -Djava.security.egd=file:/dev/./ 9190 root       20   0  750M 21880  1932 S  0.0  1.2 40:41.46 npm                 
```