## nodeppt安装
npm install -g nodeppt

## nodeppt的创建
nodeppt create <ppt-name>

## nodeppt的启动
nodeppt start -p <port> -d <you-ppt-path>

## 查看帮助 
nodeppt -h

## 使用实例
> [推库使用简介](http://www.tuicool.com/articles/buaQjy)
> [nodeppt官网demo](http://www.qdemo.sinaapp.com/)
> [github的nodeppt项目README](https://github.com/ksky521/nodePPT)

## nodeppt语法
	/* 先写总的配置 */
	title: ppt1
	speaker: 陈子云
	url: https://github.com/ksky521/nodePPT
	transition: 全局转场动效，效果比较好的有
		zoomin/zoomout
		move
		circle
		earthquake
		newspaper
		cover-diamond
		horizontal3d/horizontal
		vertical3d
		cover-circle
	files: 引入的js和css文件，多个以半角逗号隔开
	theme: 皮肤样式，colors-moon-blue-dark-green-light 共六套自带皮肤可供选择
	highlightStyle: 代码高亮样式，默认monokai_sublime
	usemathjax: yes 启用MathJax渲染公式


	[slide]

	# ppt演示
	## 演讲者：陈子云

	[slide]

	# 封面样式2 {:&.flexbox.vleft}
	## 左对齐

	[slide style="background-image:url('/img/bg1.png')"]

	## 使用背景

	[slide]
	## 使用.class/#id/自定义属性样式
	----

	```javascript
	alert('nodeppt');
	```

	[slide]

	## 主页面样式
	### ----是上下分界线
	----

	nodeppt是基于nodejs写的支持 **Markdown!** 语法的网页PPT，当前版本：1.4.1

	Github：https://github.com/ksky521/nodePPT
