# 竞赛队友招募系统TeamUp

## 系统整体介绍

​	竞赛队友招募系统TeamUp是一个专为校内竞赛爱好者设计的在线平台，旨在为寻找队友、分享比赛经验、获取比赛信息的用户提供一个集中的交流空间，让每一位用户都能在这里找到志同道合的伙伴，共同追求竞技的乐趣。

## 项目说明

### 环境准备

1. 修改 TeamUp_backend 的 .env.example 文件里面的相关配置信息并更名为 .env 文件
2. 修改 TeamUp_frontend 的 env.example 文件夹里面的相关信息并更名为 env 文件夹
3. 分别在项目的前端和后端根目录执行安装依赖的命令，具体如下：

```bash
cd TeamUp_backend
npm install
cd ..
cd TeamUp_frontend
npm install
```

4. 建立数据库对应的SQL文件在后端项目文件夹的 db 文件夹的 sql 文件中
4. 需要在 TeamUp_backend\public\ 下新建 images 文件夹

### 项目启动

> 需要先启动本地的 redis 服务

```bash
# 后端项目启动命令
cd TeamUp_backend
npm start
```

```bash
# 前端项目启动命令
cd TeamUp_frontend
npm run dev
```

> 系统用户表内置三个用户，下面是对应的登录邮箱和密码
>
> (1) 超级管理员：super@test.com	123456
>
> (2) 普通管理员：example@qq.com	123456
>
> (3) 普通用户：test@qq.com	123456
>
> 需要说明的是由于笔者把一些图片删掉了没放上来，所以如果登录后头像显示不出来是正常的
