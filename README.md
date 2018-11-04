# 朋友圈
#####技术栈：微信小程序

###### 页面截图
![功能截图](./img/img.png)
###### 功能实现
![功能截图](./img/show.gif)
###### 功能脑图
![功能截图](./img/mind.png)
###### 调用API
- [X] 获取用户信息（头像和昵称） wx.getSetting / wx.getUserInfo
- [X] 本地服务器数据请求 wx.request
- [X] 页面路由 wx.navigateTo / wx.navigateBack
- [X] 图片全屏预览 wx.previewImage
- [X] 弹窗显示 wx.showModal
- [X] 图片选择（相册还是拍照） wx.chooseImage
- [X] 打开地图选择位置 wx.chooseLocation
###### 本地服务器
nodejs的express框架，使用中间件body-parser解析POST请求的数据。


###### 更新计划
数据请求方式和路径优化

## 本地运行
```
git clone https://github.com/xutao0793/music163-project.git 
cd firendsCircle-server
npm install
node index.js

在微信开发者工具中打开firendsCircle项目文件，编译预览
```

