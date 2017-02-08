# fisc
## copy：https://github.com/zuojj/fis3-arrow
基于fis3+Velocity的前端解决方案

## 特性及优势
* 扩展自 fis3，包含 fis(3) 的所有提供功能以及 fis(3) 的插件都可使用
* 基于 velocity 模板，前后端分离
* 内置 sass 解析插件，使用 sass 无需再设置
* 内置 utc 前端模板解析插件
* 指定目录规范
* 提供后端数据模拟及 URL 转发功能
* 公共组件库模块可抽离
* 单模块更新与发布
* 跨模块调用静态资源和VM模板
* 共享UI组件库及通用业务模块
* UI组件库更新CDN单独发布
* 代理功能

## 安装
1.安装nodejs
Node 版本要求 0.8.x，0.10.x, 0.12.x，4.x，6.x，不在此列表中的版本不予支持。下载[nodejs](http://www.nodejs.org/)
2.安装fisc
```
sudo npm install fisc -g --registry=https://registry.npm.taobao.org
```
安装完之后执行看是否安装成功
```
fisc -v
```

## 编译
```
cd project
fisc release -r home
fisc release -r common
```

## 发布
```
// 发布到生成环境
fisc release prod
// 发布到rd环境
fisc release rd
// 发布到指定output目录
fisc release -d ../output
```

## 预览
```
fisc server start
// 指定8090端口
fisc server start -p 8090
```

## 设置代理
```
fisc proxy

在编译目录下面添加proxyConfig.json文件，进行代理配置，内容如下:
{
	"pxhostPage": "127.0.0.1",
	"pxportPage": "8080",
	"pxhostApi": "127.0.0.1",
	"pxportApi": "9090",
	"pxlisten": "8090"
}
// 参数含义
--pxhostPage 代理page的host
--pxportPage 代理page的端口
--pxhostApi 代理api的host
--pxportApi 代理api的端口
--pxlisten 代理服务器的端口
