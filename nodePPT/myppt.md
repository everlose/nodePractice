title: ppt演示
speaker: 陈子云
url: https://github.com/ksky521/nodePPT
transition: cards
files: /js/demo.js,/css/demo.css

[slide]

# ppt演示.text-danger
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

[slide data-transition="circle"]

## 主页面样式
### ----是上下分界线
----

nodeppt是基于nodejs写的支持 **Markdown!** 语法的网页PPT，当前版本：1.4.1

Github：https://github.com/ksky521/nodePPT

[slide]
上下左右方向键翻页,目前支持的单条动画效果包括：
* moveIn，列表支持渐显动画 {:&.moveIn}
* fadeIn 
* bounceIn 
* rollIn 
* zoomIn

