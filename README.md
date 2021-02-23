# 移动端后台管理系统框架

# 创建此项目的初衷
目前移动端越来越重要，好多项目都从PC端转移到了移动端。  
前一段给客户做了一个PC和M自适应的项目，用vue-element-admin框架，手机端也能用，但体验有点差，客户改了好多。本来是好意，客户只要一端，然后我做了两端都可以用的。  
结果啪啪打脸，我是以PC为主的，同时M也能用，但体验不如PC好，但客户根本不在电脑上用，只要手机上用，所以提了好多手机端使用的问题。
有时候大而全的东西并不好，手机能拍照，但还是不如专业的相机好用。
所以就在网上找移动端的后台管理系统，发现并没有，所以就想着整理一个，方便以后使用。


[在线预览页面效果](http://47.93.136.161/mobileH5System)


## 项目配置
```
npm install
```

### 编译及热更新
```
npm run serve
```

### 发布生成
```
npm run build
```

### 自定义配置
See [Configuration Reference](https://cli.vuejs.org/config/).


## 其他说明

本框架中部分素材来源于网络，如有侵权行为，请联系本人，立马删除。


提示以下错误时，请重新安装less,less-loader,用低版本的安装，原因是因为版本不兼容造成的。

 Syntax Error: TypeError: this.getOptions is not a function
