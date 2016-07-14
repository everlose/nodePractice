title: node表单处理演示ppt
speaker: 子云兄&赵斌
url: https://github.com/ksky521/nodePPT
transition: cards

[slide]

# node表单处理
## 演讲者：赵斌

[slide]
# 这节内容主要包括以下三个表单处理事项
* 如何在页面上响应输出一个表单 {:&.moveIn}
* 如何处理表单验证
* 如何处理表单回填

[slide]
# 首先看一个简单的表单demo

[slide]
如果说我们处理完表单要打回原来的页面进行回填，要怎么做呢？

[slide]
# 让我们再来看一个带上传图片的表单
## 演讲者：子云兄

[slide]
上面的表单操作中，我们用到了大量的文件操作，让我们来分析这些东西.
我把fs模块里的api拆分成了两类：
* often-use 常用 {:&.moveIn}
	* fs.readFile 读
	* fs.writeFile 写
	* fs.appendFile 追加
	* fs.exist 判断是否存在
	* fs.stat 查看文件或目录信息
* not-use 不常用
	* fs.chown 改变文件所有者权限
	* fs.link 创建硬链接
	* ......

demo演示

[slide]
这个表单当然还遗留了很多问题：当然这都留给后面的大神来吧。
* http服务器不够完美
* 代码乱糟糟，不忍直视
* 错误处理不够完美
* 没有数据库存储的一个过程

[slide]
thanks！