# 前端开发笔记

<a name="e1sqpg"></a>
## 简写console.log()
> 每次写JS 开局就在 顶部  var log = console.log;<br />ES6写法  let log = ::console.log<br />然后每次输出就直接   log(XXX)  就可以打印了~  不需要  xxx.log  或者 有的编辑器需要写 console.log

<a name="zhvGu"></a>
## CSS视口单位

```javascript
vw : 1vw 等于视口宽度的1%
vh : 1vh 等于视口高度的1%
vmin : 选取 vw 和 vh 中最小的那个
vmax : 选取 vw 和 vh 中最大的那个

```

<a name="bkfXd"></a>
## CSS异形切割（clip-path）
参考网站：[https://www.cnblogs.com/xiaohuochai/p/7509225.html](https://www.cnblogs.com/xiaohuochai/p/7509225.html)
```javascript
【clip-path】

　　值: <clip-source> | [ <basic-shape> || <geometry-box> ] | none

　　<clip-source>: url()

　　<basic-shape>:  inset() | circle() | ellipse() | polygon() 

　　<geometry-box>: fill-box | stroke-box | view-box | margin-box | border-box | padding-box | content-box 

　　初始值: none

　　应用于: 所有元素

　　继承性: 无
  
【圆形裁剪】 clip-path: circle(50% at 50% 50%)
【椭圆裁剪】 clip-path: ellipse(25% 40% at 50% 50%);
【矩形裁剪】 clip-path: inset(5% 20% 15% 10%);
【三角形】   clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
【斜角】     clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%);
变形
.outer{
  width:100px;
  height: 100px;
  background:orange;
  clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%);
  transition:.5s clip-path;
}  
.outer:hover{
  clip-path:polygon(0 0,0 0,100% 0,100% 0,100% 100%,100% 100%,0 100%,0 100%);
}
<div class="outer"></div>

```

<a name="bRx6h"></a>
## 滚动条样式

```css
/*滚动条样式*/

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(84, 92, 100, 0);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background: rgba(84, 92, 100, 0.7);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(84, 92, 100, 0.9);
}

::-moz-scrollbar {
  width: 8px;
  height: 8px;
}

::-moz-scrollbar-track {
  background: rgba(84, 92, 100, 0);
  border-radius: 5px;
}

::-moz-scrollbar-thumb {
  background: rgba(84, 92, 100, 0.7);
  border-radius: 5px;
}

::-moz-scrollbar-thumb:hover {
  background: rgba(84, 92, 100, 0.9);
}
```

<a name="ixyvxo"></a>
## 字符串截取函数slice, substring, substr
<a name="gg32hs"></a>
#### str.slice(start, end)
slice的参数start和end可接受任意非NaN数值的参数，取start到end之间的字符，不包含end。如果参数为负，则会自动加上str.length进行纠正，如果依然为负值，则修正为0。如果end值小于start则返回空字符串。
```
console.log("abcdefghij".slice(3,1))            //      ''
console.log("abcdefghij".slice(-3,-1))          //     'hi'
console.log("abcdefghij".slice(1, 3))           //     'bc'
console.log("abcdefghij".slice(-20, -8))        //     'ab'
```
记住一个原则：如果end小于start，则返回空字符串。如果值为负数，加str.length纠正，依然为负，则调整为0。

<a name="9c1gsp"></a>
#### str.substring(start, end)
也是接受任意数值的参数，如果参数为0或者NaN的话，会自动修正为0；如果end小于start的话，两者位置颠倒。取start到end之间的字符，不包含end。
```
console.log("abcdefghij".substring(3,1))            //     'bc'
console.log("abcdefghij".substring(-3,-1))          //     ''
console.log("abcdefghij".substring(1, 3))           //     'bc'
console.log("abcdefghij".substring(-20, -8)) 　　　　//　　　''
```
也有一个原则：就是两个参数当中较小的会自动调整当做start参数，任何非正整数，都会当做0处理。

<a name="mcb9gi"></a>
#### str.substr(start, length)
从形参名称应该可以看出一点不同。substr第一个参数也是起始位置，但是第二个参数不是结束位置，而是需要截取多少个字符串。<br />start如果为负数，则与slice传入负数参数一样处理，让其自身加str.length进行纠正，如果还小于0，则当做0处理。　　<br />length如果为0或者负数，则直接返回一个空字符串。
```
console.log("abcdefghij".substr(-13))            //  'abcdefghij'
console.log("abcdefghij".substr(-13, 1))         //  'a'
console.log("abcdefghij".substr(0, -1))          //  ''
console.log("abcdefghij".substr(-1, 3))          //  'j'
```

<a name="oiirua"></a>
## 文字显示若干行超出部分用省略号表示
```
.recommend-goods li>a>p:first-child{
        /*display: inline-block;*/
        cursor:pointer;
        color:#86c9a6;
        width:100%;
        word-break:keep-all;/* 不换行 */
        white-space:nowrap;/* 不换行 */
        overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
        text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
    }

 .comment_inner{
    width: 200px;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 3; /** 显示的行数 **/
    overflow: hidden;  /** 隐藏超出的内容 **/
    }
```

<a name="mo12vi"></a>
## 判断是否为移动端==正则表达式;
```javascript
const isMobile = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(navigator.userAgent);
```

<a name="hh2apg"></a>
## 中断each 遍历
```
try{
    for(var i=0;i<10;i++){
        if(i===4){
            ...
            throw new Error("错误")
        }
    }    
}catch(err){
  document.writeln("Error name: " + err.name)
　document.writeln("Error message: " + err.message)
}finally{

}
```

<a name="spgztz"></a>
## JQ判断所点击的是哪个子盒子
```
//html
     <li class="mui-table-view-cell">

         <span class="iconfont icon-chuyidong1"></span>

         <a href="./order-delail-myOrder.html?id={{wxVisitRecord.id}}&type=wx">
           <p>{{wxVisitRecord.appointmentTime}}</p>
           <p>就诊人：....</p>
           <p>预约医生：....</p>

         </a>
       </li>

//js
    $("ul").on("tap","li>*",function(){
            flag= false;
            if(($(this)[0].tagName)==="SPAN"){//判断子元素tagName--标签名
                mui.confirm("确认取消当前预约？","提示",["确定","取消"],function(){
                    //
                },"div")
            }else{
                document.location.href = this.href;
            }
        })
```

<a name="zfiptd"></a>
## JQ将盒子自动滚动至底部（仿QQ聊天界面）
```
//html
     <ul class="list-group dialogue">
          <li class="list-group-item customer">
              <div class="time">
                  <span>***</span>&nbsp;
                  <span>2017年9月2日</span>
              </div>
              <div class="head-icon">

              </div>
              <div class="dialogue-content">
                  医生您好！医生您好！医生您好！医生您好！医生您好！医生您好！医生您好！医生您好！
              </div>

          </li>
          <li class="list-group-item server clearfix">
              <div class="time">
                  <span>张医生</span>&nbsp;
                  <span>2017年9月2日</span>
              </div>
              <div class="head-icon">

              </div>
              <div class="dialogue-content">
                  医生您好！医生您好！医生您好！医生您好！医生您好！
              </div>

          </li>

      </ul>

//js

    $(".sub_btn").click(function(){
        var str = $("#saytext").val();
        $("#saytext").val("")
        if(str){
            var html ='<li class="list-group-item server clearfix">' +
                '<div class="time">' +
                '<span>张医生</span>&nbsp;'+
                '<span>2017年9月2日</span>'+
                '</div>'+
                '<div class="head-icon">'+
                '</div>'+
                '<div class="dialogue-content">'+
                replace_em(str)
                +'</div>'+

                '</li>'
            $(".dialogue").append(html);
            //alert($(".dialogue").height())
            scrollToBottom()
        }else {
            common.showMessage('请输入回复信息！',"warning");
        }
    });

    //聊天框自动滚动到底部
    function scrollToBottom(){
        var li_height = 0;
        $(".dialogue li").each(function(i,e){
            //.outerHeight() 获取盒子的包括；margin+padding+border+height  的总和
            //.height() 仅获取高度height
            li_height += $(e).outerHeight();

        })

        var h = li_height - $(".dialogue").height();
        if(h>0){

            $(".dialogue").animate({"scrollTop":h},150);
        }
    }
```

<a name="xci4my"></a>
## 获取该标签除子标签以外的文本
```
<p>
  <span>hello </span>world
</p>

//JQ代码
//方法一
var text = $('p').contents().filter(function() { return this.nodeType === 3; }).text().trim();
//方法二
var text = $("div p").clone().find('*').remove().end().text().trim();
//后面添加.trim() 去除首尾空白 换行符等
console.log(text); //world
```

<a name="i0k4ep"></a>
## 格林时间：Thu May 18 2017 00:00:00 GMT+0800 (中国标准时间) 格式转换
```
var d = new Date('Thu May 12 2016 08:00:00 GMT+0800 (中国标准时间)');
youWant=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

youWant= d.getFullYear() + '-'
            + (d.getMonth()<9 ? "0"+(d.getMonth() + 1) : (d.getMonth() + 1)) + '-'
            + (d.getDate()<10 ? "0"+d.getDate() : d.getDate() )+ ' '
            + (d.getHours()<10 ? "0"+d.getHours() : d.getHours()) + ':'
            + (d.getMinutes()<10 ? "0"+d.getMinutes() : d.getMinutes()) + ':'
            + (d.getSeconds()<10 ? "0"+d.getSeconds() : d.getSeconds());


//yyyy-MM-dd hh:mm:ss
```

<a name="8h60xw"></a>
## 隐藏手机号中间四位数为“”
```
//方法1
    var tel = "13122223333";
    var reg = /^(\d{3})\d{4}(\d{4})$/;
    tel = tel.replace(reg, "$1****$2");
    console.log(tel);

  //方法2
    var tel = "13122223333";
    var hidePart = tel.substr(3, 4);
    tel = tel.replace(hidePart, "****");
    console.log(tel);

  //方法3
  var tel = "13122223333";
  tel = tel.substr(0, 3) + '****' + tel.substr(7);
```

<a name="h7nyaq"></a>
## 深度克隆复杂类型
```
//数组
  var arr = [1,2,3];
  var copyArr = arr.slice()
  arr === copyArr //false

  //对象
  var obj = {
    a:1,
    b:2,
    c:3
  }
  var copyObj = JSON.parse(JSON.stringify(obj))
```

<a name="9taaei"></a>
## 数字添加千位分隔符
```
//方法一
  String(Number).replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  //例如
  String(123456789).replace(/(\d)(?=(\d{3})+$)/g,"$1,")  // =>  123,456,789

//方法二
Number.toLocaleString('en-US');

(123456789).toLocaleString('en-US'); // =>  123,456,789
```

<a name="m3chdm"></a>
## 时间格式化
```
//作用是根据传入的时间单位参数（timeUnit，取值"d"、"M"、"y"分别表示天，月，年）与间隔n（n取负数表示n天/月/年前），获得n天、或n个月、或n年前/后的日期时间。
  function initDefaultDate(n,timeUnit) {
    var curr_date = new Date();
    if (timeUnit === 'd') {
    curr_date.setDate(curr_date.getDate() + n);
    } else if (timeUnit === 'M') {
        curr_date.setMonth(curr_date.getMonth() + n);
    } else if (timeUnit === 'y') {
        curr_date.setFullYear(curr_date.getFullYear() + n);
    }
    var strYear = curr_date.getFullYear();
    var strMonth = curr_date.getMonth()+1;
    var strDay = curr_date.getDate();
    var strHours = curr_date.getHours();
    var strMinutes = curr_date.getMinutes();
    var strSeconds = curr_date.getSeconds();
    var datastr = strYear +
    '-' + formatNumber(strMonth) +
    '-' + formatNumber(strDay) +
    ' ' + formatNumber(strHours) +
    ':' + formatNumber(strMinutes) +
    ':' + formatNumber(strSeconds);
    return datastr;
  }
  //简易格式化显示日期的函数，作用为自动补0，如1=01
  function formatNumber(value){
    return (value < 10 ? '0' : '') + value;
  }
  //例如
  initDefaultDate(-1,"d");    //获得当前时间1天前的日期
  initDefaultDate(13,"M");    //获得当前时间13个月后的日期
  initDefaultDate(14,"y");    //获得当前时间14年后的日期
```

<a name="l8tgor"></a>
## GIT一些操作
```
git add .  //添加全部到git暂存区

  git commit -m "注释内容"  // 提交暂存区里的

  git checkout -b dev origin/dev    //创建远程origin的dev分支到本地

  git merge dev -m "要加-m注释，不然有可能会报错" //在当前分支合并dev分支

  git push origin master  //推送分支修改到远程仓库

  git pull  //拉取远程仓库master里的内容

  git push -f  origin master:test  //master分支的 内容推到test远程分支上
```

<a name="xrdghz"></a>
## 移动端开发，去掉手机右侧滚动条
```
html, body{
    height:100%;
    overflow:hidden;
    overflow-y: scroll;
  }
```

<a name="tuq9og"></a>
## 多页面(html)引入多个文件（js,css）
```
//common.js   引入路径相对于当前html页面   还可配置时间戳、版本号避免更新后缓存
  document.write('<link rel="stylesheet" type="text/css" href="../css/Mreset.css"/>');
  document.write('<script type="text/javascript" src="../js/jquery.min.js"></script>');
  document.write('<script type="text/javascript" src="../js/jweixin-1.0.0.js"></script>');
  document.write('<script type="text/javascript" src="../js/sha1.js"></script>');
  document.write('<script type="text/javascript" src="../js/wx.js"></script>');
  document.write('<script type="text/javascript" src="../js/share.js"></script> ');




//进阶版  当前页面只需要引入 common.js就OK了
//判断在哪个页面
var currentPageName = location.pathname.match(/\/*[\S]*\/([\S]+)\.html/)[1];
//添加时间戳避免缓存
var verssionStr = '?v=' + (+new Date());
document.write('<link rel="stylesheet" type="text/css" href="css/Mreset.css"/>');
document.write('<link rel="stylesheet" type="text/css" href="css/' + currentPageName + '.css' + verssionStr + '"/>');
document.write('<script type="text/javascript" src="js/jquery.min.js"></script>');
document.write('<script type="text/javascript" src="js/jweixin-1.0.0.js"></script>');
document.write('<script type="text/javascript" src="js/sha1.js"></script>');
document.write('<script type="text/javascript" src="js/wx.js"></script>');
document.write('<script type="text/javascript" src="js/share.js"></script>');
document.write('<script type="text/javascript" src="js/' + currentPageName + '.js' + verssionStr + '"></script>');
```

<a name="sqgbdm"></a>
## 浏览器长按保存opacity=0的最上层图片要保证要保存图片的z-index：10（足够高）

<a name="o8qswo"></a>
## html转img
```
//   html2canvas.min.js    canvas2image.js
  //html 转为 img Begin
  var canvas2 = document.createElement("canvas");
  var _canvas = document.querySelector('.share-dom');
  var w = parseInt(window.getComputedStyle(_canvas).width);
  var h = parseInt(window.getComputedStyle(_canvas).height);
  //将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
  canvas2.width = w * 2;
  canvas2.height = h * 2;
  canvas2.style.width = w + "px";
  canvas2.style.height = h + "px";
  //可以按照自己的需求，对context的参数修改,translate指的是偏移量
  var context = canvas2.getContext("2d");
  context.scale(2, 2);
  html2canvas(document.querySelector('.share-dom'), {
    canvas: canvas2
  }).then(function(canvas) {
    options.imageData = canvas.toDataURL(); //将图片转为base64 赋值到APP分享里
    //初始化分享功能
    if(inApp()) {
      BestpayHtml5.config('4200', false, '60', '6000');
      setTitleBar();
    } else {
      share();
    };
    var context = canvas.getContext('2d');
    // 【重要】关闭抗锯齿
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;
    // 【重要】默认转化的格式为png,也可设置为其他格式
    var img = Canvas2Image.convertToJPEG(canvas, canvas.width, canvas.height);
    document.querySelector(".share-img-box").appendChild(img);

  });//html 转为 img End
```

<a name="s0v7tq"></a>
## H5 中video标签
必须使用js动态添加到页面中
```
$('.video-box').html('<video ' +
		'id="videoALL" ' +
		'class="video" ' +
		'width="90%" ' +
		'controls="controls" ' +
		'poster="img/poster.png" ' +
		'preload="auto" ' +
		'webkit-playsinline="true" ' +
		'playsinline="true" ' +
		'x-webkit-airplay="allow" ' +
		'x5-video-player-type="h5"  ' +
		'x5-video-player-fullscreen="true" ' +
		'x5-video-orientation="portraint" ' +
		'style="object-fit:fill"> ' +
		'<source src="video/video.mp4" type="video/mp4"> ' +
		'</video>');
```

<a name="xiz0vu"></a>
## 当前页面监听当前页面storage变化
```
var orignalSetItem = localStorage.setItem;
	localStorage.setItem = function(key, newValue) {
		var setItemEvent = new Event("setItemEvent");
		setItemEvent.newValue = newValue;
		window.dispatchEvent(setItemEvent);
		orignalSetItem.apply(this, arguments);
	};
	window.addEventListener("setItemEvent", function(e) {
		var newValue = e.newValue;
		renderShareImg(newValue);
});
```

<a name="7glymx"></a>
## H5弹幕
原生js实现弹幕弹幕分轨，不重叠，移动，发送弹幕，发送的弹幕颜色高亮
```
<!DOCTYPE html>
<html lang="en">

	<head>
		<meta charset="UTF-8" />
		<meta name=viewport content="width=device-width, initial-scale=1, user-scalable=no">
		<title>弹幕</title>
		<style type="text/css">
			html,
			body,
			div,
			p {
				margin: 0;
				padding: 0;
			}
			
			html,
			body {
				width: 100%;
				height: 100%;
			}
			
			.box {
				height: 100%;
				background: darkgreen;
				overflow: hidden;
			}
			
			.brrage {
				width: 90%;
				height: 210px;
				margin: 10px auto;
				position: relative;
				border: 1px solid #fff;
				border-radius: 8px;
				color: #fff;
				overflow: hidden;
			}
			
			.brrage p {
				height: 21px;
				word-break: keep-all;
				white-space: nowrap;
				line-height: 21px;
				position: absolute;
				left: 100%;
			}
			
			.current {
				color: orange;
			}
		</style>
	</head>

	<body>
		<div class="box">
			<div class="brrage">
				<p>城市因你们的辛劳而美丽</p>
				<p>千言万语汇成一首歌，名叫感激</p>
				<p>感谢有你~ ❤❤❤❤</p>
				<p>我承诺包裹严实后再扔碎玻璃</p>
				<p>不论未来多远，你永远是我最感激的人</p>
				<p>宁可一人脏，换来万家洁</p>
				<p>在我心中你们永远是最伟大的~</p>
				<p>愿你们被世界温柔以待</p>
				<p>职业平凡，奉献伟大</p>
				<p>善行无迹，尽善净美</p>
			</div>
			<input id="input" type="text" name="" placeholder="输入弹幕内容">
			<button id="btn">发送</button>
		</div>

	</body>
	<script>
		var words = [
			"城市因你们的辛劳而美丽",
			"在你们的专属节日，对你们说一声谢谢",
			"职业平凡，奉献伟大",
			"社会因你们而不平凡",
			"千言万语汇成一首歌，名叫感激",
			"再美的风景也抵不过你们的身影",
			"发射小心心，biubiubiu",
			"感谢有你~ ❤❤❤❤",
			"你们的每一份付出都值得尊重",
			"致敬城市中最可爱的人",
			'您辛苦了~',
			'愿你们被世界温柔以待',
			'谢谢你们的默默付出',
			'尊重每一个清洁工',
			'为他们减轻负担，让我们行动起来',
			'清洁一小步，文明一大步',
			'感恩~感恩~感恩~',
			'我承诺包裹严实后再扔碎玻璃',
			'谢谢你们每天给我们一个清洁城市',
			'善行无迹，尽善净美',
			'清洁城市，从你我做起',
			'不论未来多远，你永远是我最感激的人',
			'让我们为清洁工们鼓掌！喝彩！',
			'摒弃坏习惯，从小事做起！',
			'爱护环境，人人有责！',
			'宁可一人脏，换来万家洁',
			'你弯下的腰驼起的是一个城市的文明',
			'你们扫净了街道，也扫出了皱纹',
			'谢谢你们的从不缺席',
			'清洁工，是我听过最美的名字~',
			'没有豪言壮志，只有默默奉献',
			'谢谢你们，我们的“城市美容师”',
			'橙色是这个城市最美的颜色',
			'我要给你们点赞！',
			'在我心中你们永远是最伟大的~'
		];

		window.onload = function() {
			var timer = null;
			var input = document.querySelector('#input');
			var btn = document.querySelector('#btn');
			var list = document.querySelectorAll('.brrage p');
			var boxWidth = getElmStyle('.brrage', 'width');
			var len = list.length;
			var leftArr = [];
			for(var i = 0; i < len; i++) {
				var randomTop = Math.floor(Math.random() * 10) * 21;
				list[i].style.top = i * 21 + 'px';
				var itemLeft;
				if(i%2===0){
					itemLeft = getElmStyle(list[i], 'left') + (Math.random() * boxWidth * 3 / 2);
				}else {
					itemLeft = getElmStyle(list[i], 'left') + (Math.random() * boxWidth * 3 / 2) + (boxWidth *3 / 2);
				}
				leftArr.push(itemLeft);
				list[i].style.left = itemLeft + 'px';
			}
			move();
			window.addEventListener('resize',function(){
				move();
			})
			btn.onclick = function() {
				var text = input.value;
				if(text) {
					try {
						for(var i = 0; i < list.length; i++) {
							if(getElmStyle(list[i], 'left') >= boxWidth) {
								list[i].innerText = text;
								list[i].className = 'current';
								words.push(text)
								throw new Errow('终端循环');
							}
						}
					} catch(e) {

					}
					input.value = '';
				} else {
					alert('请输入内容')
				}
			};
			//获取元素css属性值   C3选择器或 dom，属性名
			function getElmStyle(selector, style) {
				if(typeof selector === 'string') {
					return parseFloat(document.defaultView.getComputedStyle(document.querySelector(selector), null)[style])
				} else {
					return parseFloat(document.defaultView.getComputedStyle(selector, null)[style])
				}
			}
			// 弹幕移动
			function move() {
				cancelAnimationFrame(timer);
				timer = null;
				for(var i = 0; i < len; i++) {
					var randomTop = Math.floor(Math.random() * 10) * 21;
					list[i].style.top = i * 21 + 'px';
					var itemLeft = getElmStyle(list[i], 'left');
					var itemWidth = getElmStyle(list[i], 'width');

					if(-itemLeft > itemWidth) { //移除弹幕可视区域
						list[i].className = '';
						if(leftArr[i] > (boxWidth + 300)) { //距离边缘300px
							leftArr[i] += (Math.random() * 600 - 300);
							list[i].style.left = leftArr[i] + 'px';
						} else {
							leftArr[i] += Math.random() * 600;
							list[i].style.left = leftArr[i] + 'px';
						}
						list[i].innerText = words[Math.floor(Math.random() * words.length)]
					} else {
						itemLeft -= 2;
						list[i].style.left = itemLeft + 'px';
					};
				}
				timer = requestAnimationFrame(move);
			}
		}
	</script>

</html>
```

<a name="grf4lb"></a>
## 静止用户选择，微信浏览器禁止长按弹出保存图片弹窗
选择包括文本和图片
```
input {
	-webkit-user-select: none;
	user-select: none;
	-webkit-touch-callout: none;
}
```

<a name="6k3zam"></a>
## 微信浏览器中自动播放音频
```
function audioAutoPlay(id) {
	var audio = document.getElementById(id);
	audio.play();
	document.addEventListener("WeixinJSBridgeReady", function() {
		audio.play();
	}, false);
	document.addEventListener('YixinJSBridgeReady', function() {
		audio.play();
	}, false);
}

audioAutoPlay('car_audio');//调用函数，传参audio标签id
```

<a name="i3i2cr"></a>
## 文字Loading...三个点动画
```
//css
dot {
	display:inline-block;
	height:1em;
	line-height:1;
	text-align:left;
	vertical-align: -.25em;
	overflow: hidden;
}
dot::before {
	display:block;
	content:'...\A..\A.';
	white-space:pre-wrap;
	animation:dot 3s infinite step-start;
}
@keyframes dot {
	33% {
		transform: translateY(-2em);	
	}
	66% {
		transform: translateY(-1em);
	}
}
//html
<div class="bk">
	Loading<dot>...</dot>
</div>
```

<a name="e0gthd"></a>
## 有样式的console.log（）
```
console.log(
    `%c index %c v3.0.2 %c`,
    'background:#35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;',
    `background:#43B883; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;`,
    'background:transparent'
)
```
<a name="l88nbo"></a>
## git本地仓库与远程仓库关联
1、完成本地仓库的相关配置<br />    git init;初始化git仓库<br />    touch .gitignore;创建忽略项配置文件<br />2、执行git add; git commit -m '...'<br />3、创建远程仓库  <br />4、连接远程仓库和本地仓库 git remote add origin {远程仓库地址}<br />5、这里特别注意，我们第一次`push`的时候,加上`-u`参数,Git就会把本地的master分支和远程的master分支进行关联起来,我们以后的`push`操作就不再需要加上`-u`参数了

<a name="9L6NB"></a>
## JS浮点数精确运算
1.2 + 0.7 + 0.7 + 'MW·h';常规运算会产生多位小数 2.599999999MW·h<br />Math.plus(1.2, 0.7 ,0.7) + 'MW·h'  可实现精确计算 2.6MW·h
```javascript
/**
 * Math添加精确乘法
 */
Math.times = function(){

    var _list = arguments,
        times = 1,
        result = 1;
    for(var i =0;i<_list.length;i++){
        var y = (_list[i]+'').split(".")[1];
        if(y){
            times *= Math.pow(10,y.length) ;
//            var _times = Math.pow(10,y.length);
//            result = (result * (_list[i] * _times));
            result = result * (_list[i].toString().split(".").join("") * 1);

        }else{
            result = (result * (_list[i]));
        }

    }

    return result/times;

}
/**
 * Math添加精确加法
 */
Math.plus  = function(){

    var _list = arguments,
        times = 1,
        result = 0;
    //先获取最大倍数
    var len = _list.length;
    for(var i=0;i<len;i++){
        var y = (_list[i]+'').split(".")[1];
        if(y && times < y.length){
            times = y.length;
        }
    }

    times = Math.pow(10,times) ;

    //整数计算
    for(var i=0;i<len;i++){

        result = (result + (_list[i] * times));

    }

    return result/times;

}
```

<a name="Avvra"></a>
### 退出或刷新页面前提示

```javascript
mounted(){
  window.onbeforeunload = cleanRedisCacheLoad;
    window.onunload = cleanRedisCacheLoad;
    function cleanRedisCacheLoad (event) {
    	var event = event || window.event;
    	// 兼容IE8和Firefox 4之前的版本
    	if (event) {
    	event.returnValue = "确定要关闭窗口吗？";
    	}
    	// Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
    	return '确定要关闭窗口吗？';
    }
}
```

