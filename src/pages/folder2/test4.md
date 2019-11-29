# vuepress+github搭建自己的博客

<a name="xNgqj"></a>
## 前言
本文基于_[1小时搞定vuepress快速制作vue文档/博客+免费部署预览](https://juejin.im/post/5dce1e0e5188254eda3936c5)一文_结合自己的摸索_，_旨在解决项目结构及创建仓库等问题<br />vuepress官网：[https://www.vuepress.cn/](https://www.vuepress.cn/)<br />代码仓库地址：[https://github.com/aol121/wzp](https://github.com/aol121/wzp)<br />博客预览地址：[https://aol121.github.io/wzp/](https://aol121.github.io/wzp/)

<a name="nyJNv"></a>
## 前期准备
1.全局安装vuepress<br />   wind键+R键，输入cmd 回车 打开命令行工具，输入 npm install -g vuepress<br />2.github上创建仓库<br />    登录你的github账号，点击New repository创建新仓库，仓库名称随意，没有具体要求。<br />3.git clone ｛刚创建的仓库地址｝ ， 将刚创建的仓库克隆下来（空白文件夹）。<br />4.克隆或下载上文[代码仓库](https://github.com/aol121/wzp)的代码，将下载好的代码复制到步骤3克隆下来的空文件夹中。<br />5.参照下文做一些配置调整<br />6.提交至远程仓库。


<a name="lR9Oa"></a>
## 项目结构
<a name="8nigT"></a>
#### package.json文件，项目基本信息文件
关键代码
```json
"scripts": {
    "dev": "vuepress dev src",//本地启动
    "build": "vuepress build src"//打包
},
```

<a name="nWZG0"></a>
#### src文件夹，开发代码
 主要关注src/.vuepress/config.js内含详细的注释，需要更充分的了解请移步[vuepress官网](https://www.vuepress.cn/)
```json
dest: './docs',  // 设置输出目录
base: '/wzp/',// 设置站点根路径
```
dest设置为'./docs'，为后续github仓库设置GitHub Pages的Source做准备的<br />base设置根路径，此处的 wzp 替换成你自己创建的github仓库名称，否则会出现css等资源加载路基错误的问题

 其他就是一些组件啦，页面啦，图片啦啥啥的<br /> 页面是.md,如果不会写可以使用[语雀](https://www.yuque.com/dashboard)来编辑md文档

<a name="xF44b"></a>
#### docs文件夹
   运行npm run build后打包出来的文件夹。

<a name="j5Uoq"></a>
## github仓库设置

点击博客仓库的**Settings**，向下滚动至**GitHub Pages，Source**的下来列表选择第二个选项**master branch/docs floder**<br />**Source**上面一行浅蓝色底文字是你设置好以后的博客地址，类似：Your site is published at [https://aol121.github.io/wzp/](https://aol121.github.io/wzp/)

<a name="PYLok"></a>
## colorfully egg
为提升网站趣味性，添加了live2d元素，<br />主要思路是页面加载完成后创建canvas标签添加至body，然后调用loadlive2d（）<br />当前的引入方案仅提供参考，不一定是最佳方案，如果有更好的可以分享至评论区，大家共同学习<br />关于live2d的教程分享张鑫旭的文章[二次元live2d看板娘效果中的web前端技术](https://www.zhangxinxu.com/wordpress/2018/05/live2d-web-webgl-js/)，他的其他文章也非常推荐大家阅读

文件路径为src/.vuepress/public/live2dModels/live2d<br />为保证在各自项目都能运行需要对init.js作一丢丢的调整---第八行 wzp 替换为你的仓库名<br />具体路径为src/.vuepress/public/live2dModels/live2d/js/init.js
```json
window.addEventListener('load',function(){
  var canvas = document.createElement('canvas');
  canvas.id = 'live2d';
  canvas.width = '280';
  canvas.height = '250';
  canvas.style.cssText = 'position: fixed;right:-40px;bottom:0;';
  document.body.appendChild(canvas);
  loadlive2d("live2d", "/wzp/live2dModels/live2d/model/kesshouban/model.json");//wzp替换为仓库名
})
```
不出意外，可爱的血小板，就服服帖帖的显示在网页的右下角等着你的挑逗了。

<a name="kYc9R"></a>
## 注意事项
本地启动开发不支持热更新<br />src中的代码调整完后先npm run build打包，再提交至远程仓库，博客内容才会更新<br />人生不如意事七八九，在实现自己的博客过程中难免会遇到些磕磕绊绊，耐心些仔细些终究是可以成功的。

