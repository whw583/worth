# Worth （网站价值估算）

[cn.web-worth.net](https://cn.web-worth.net) 是一个免费的网站估值服务。此外，你还可以在这里查看该网站每日广告收入，每日PV， Alexa全球排名等数据。

## Features

- 前端angular，组件库使用angular material,图表制作使用chart.js

- 后端nodejs /typescript / koa

- 数据库mongodb/mongoose

- 支持PWA(Progress Web App)

- 支持服务端渲染（使用angular universal）

- 支持简体中文，繁体中文，英语

- 整合google recaptcha v3,防止机器人攻击后端api

- 整合google analytics,统计访问数据。

- 使用nginx进行反向代理

- 支持https, http2.0

## 如何运行？

1. 你需要一对AWS的IAM用户的key和secret（拥有AWIS权限）[AWIS文档](https://amazonaws-china.com/awis/getting-started/)

1. 参照 .env-example, 在根目录创建 .env文件，替换你自己的key和secret

1.  安装依赖, 构建项目，运行服务器,成功之后访问 localhost:3000
   ```bash
   $ yarn install
   $ yarn run build 
   $ yarn run server
   ```

