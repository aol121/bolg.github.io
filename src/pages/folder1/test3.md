# vue笔记


<a name="yukecx"></a>
## 第一次使用vue总结

在此之前一直在学习vue的语法，利用vue-cli搭建项目自己练习，却一直无法深刻的理解脚手架里的代码为什么要这么写，直到认真学习了ES6语法，<br />前面的困惑终于豁然开朗，所以就有了首个正式vue项目的诞生。

<a name="nvrbvr"></a>
### 开发过程中遇到的问题

1、项目如何部署的问题
```
因为本项目组都没有搞过vue，甚至真正意义上的前后端分离都是在起步阶段，
这个低级问题也困扰了好久
答案是 npm run build  打包后的文件在dist文件夹里 你放啥服务器都可以
```

2、开发时要从服务器获取数据是跨域请求的问题
```
逛论坛获得答案：
```
```
//  找到项目中的 config 文件夹 中的 index.js
    dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: { //代理
      '/api': {
        target: 'http://127.0.0.1:8088',//要跨域的地址
        changeOrigin: true
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
```
4、当切换路由清除之前模块的定时器

```
//使用 beforeRouteLeave   [参考网址](https://router.vuejs.org/zh-cn/advanced/navigation-guards.html)：https://router.vuejs.org/zh-cn/advanced/navigation-guards.html
    mounted(){
      this.getData();
      clearInterval(this.timer)
      console.log(this.$router.app._route.fullPath) //可打印出当前页面路由
      this.timer=setInterval(()=>{
        this.pageIndex=1;
        this.realTimeData=[];
        this.getData()
      },10000)
    },
    beforeRouteLeave (to, from, next) {
        next()
          clearInterval(this.timer)

    },
    methods: {
      getData() {
        ...
      }
    }
```

5、我的选择器是放在一个dialog里的，我还在选择器外面另外绑定显示这里的值，显示也不会改变<br />不过dialog提交的时候，这个值就能改到我选中的值上了，而且用于提交的参数也是预期的值，但是页面视图就是不变化<br />vue版本到2.5.2，elementUI到1.4.0，<br />情景描述：<br />这是一个后台管理系统，编辑弹框页面<br />表单内容需要预填充<br />而且表单数量不确定

解决方案。。。。参考后端大神的思路，虽然人家没搞过vue，也不知道element-ui 只要功力在，万剑不离其宗，佩服。。

```
//  template
    <el-form-item>
                //精髓在   @visible-change="selectChange"
      <el-select @visible-change="selectChange" v-model="field.compareType" placeholder="请选择类型">
        <el-option label="大于" value="gt"></el-option>
        <el-option label="小于" value="lt"></el-option>
        <el-option label="等于" value="eq"></el-option>
      </el-select>
    </el-form-item>


// js


    selectChange(val) {
        console.log(val)// 展开true || 收起false

        if(this.content && this.content.length > 0 && !val) {
          let selectFieldList = []
          for(let i in this.content) {
            for(let j in this.formLabelAlign.fieldList)
              if(this.content[i].fieldName == this.formLabelAlign.fieldList[j].fieldName) {
                selectFieldList.push(this.content[i])
              }
          }
          this.formLabelAlign.fieldList = selectFieldList
        }

      }


 //总结：就是在触发select 的change事件后重新赋值 v-model  已达到重新绑定的效果，在好多编辑弹框情景下基本能解决问题了
```

6、接下来就都是些使用Element-ui 中遇到得问题了
```
仔细对比官方文档基本可以找到对应的解决方案
不过要注意使用的版本与文档版本要对应
```

7、axios [阿克希奥斯] 如何实现按顺序请求  保证A请求执行完毕再请求B

```
//同时执行多个请求

axios.all([

    axios.get('https://api.github.com/xxx/1'),

    axios.get('https://api.github.com/xxx/2')

  ])

  .then(axios.spread(function (userResp, reposResp) {

    // 上面两个请求都完成后，才执行这个回调方法

    console.log('User', userResp.data);

    console.log('Repositories', reposResp.data);

  }));



//当所有的请求都完成后，会收到一个数组，包含着响应对象，其中的顺序和请求发送的顺序相同，可以使用 axios.spread 分割成多个单独的响应对象
```

8、PC端页面与手机端页面根据不同终端渲染不同页面的问题

从战略上来讲就是利用userAgent 判断当前设备是手机还是PC

```
//这个是抄别人的
      is_moblie() {
        let browser = {
          versions: function() {
            let u = navigator.userAgent,
              app = navigator.appVersion;
            return { //移动终端浏览器版本信息
              trident: u.indexOf('Trident') > -1, //IE内核
              presto: u.indexOf('Presto') > -1, //opera内核
              webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
              gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
              mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
              ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
              android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
              iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
              iPad: u.indexOf('iPad') > -1, //是否iPad
              webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
              weixin: u.indexOf('MicroMessenger') > -1, //是否微信
              qq: u.match(/\sQQ/i) == " qq" //是否QQ
            };
          }(),
          language: (navigator.browserLanguage || navigator.language).toLowerCase()
        }

        if(browser.versions.mobile || browser.versions.ios || browser.versions.android ||
          browser.versions.iPhone || browser.versions.iPad) {
//        window.location = "http://m.zhaizhainv.com";
          this.isMobile = true;
        }else {
          this.isMobile = false;
        }
      },
```
具体如何实施是个很大问题

如果是分开写，分别打包就是俩个dist文件夹，里面分别有一个index.html   部署到服务器上它需要一个index作为入口，我本来是想服务入口的index里判断终端类型，然后定向到dist文件夹里的index 实现进入pc还是移动页面，但是axios访问的接口路径就会多一层/dist  就会访问失败

接下来就是集中精力搞PC端页面与移动端页面写在一个脚手架里，就不会影响原PC端页面了

首先在登录界面从点击登录开始判断终端类型  手机还是PC

```
//Login.vue里的代码
      if(!self.isMobile) {//是pc
         if(!res.data.data.accessModuleCodeList) {
           self.$router.push('/space-page'); //添加router--设置首页
         } else if(res.data.data.accessModuleCodeList.length == 6) {
           self.$router.push('/real-time-status'); //添加router--设置首页
         } else {
           self.$router.push('/' + self.filterList[0]); //添加router--设置首页
         }
         self.$message({
           type: 'success',
           message: res.data.message
         })
       } else {//是手机
         self.$router.push('/mobile');

       }
```

./src/router/index.js  如何配置呢？
```
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'  //默认定向至登录页
        },
        {//pc端页面
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/SpacePage.vue'], resolve)   // 空白页
                },
                {
                    path: '/space-page',
                    component: resolve => require(['../components/page/SpacePage.vue'], resolve)   // 空白页
                },
                {
                    path: '/real-time-status',
                    component: resolve => require(['../components/page/RealTimeStatus.vue'], resolve)    // 实时状态
                },
                {
                    path: '/historic-record',
                    component: resolve => require(['../components/page/HistoricRecord.vue'], resolve)    // 历史记录
                },
                {
                    path: '/alarm-record',
                    component: resolve => require(['../components/page/AlarmRecord.vue'], resolve)    // 告警记录
                },
                {
                    path: '/alarm-set',
                    component: resolve => require(['../components/page/AlarmSet.vue'], resolve)    // 告警设置
                },
                {
                    path: '/device-management',
                    component: resolve => require(['../components/page/DeviceManagement.vue'], resolve)    // 设备管理
                },
                {
                    path: '/user-management',
                    component: resolve => require(['../components/page/UserManagement.vue'], resolve)    // 用户管理
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {//手机端页面
            path: '/mobile',
            component: resolve => require(['../components/common/mobileHome.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/RealTimeStatus.vue'], resolve)    // 实时状态
                },
                {
                    path: '/mobile/real-time-status',
                    component: resolve => require(['../components/page/RealTimeStatus.vue'], resolve)    // 实时状态
                },
                {
                    path: '/mobile/historic-record',
                    component: resolve => require(['../components/page/HistoricRecord.vue'], resolve)    // 历史记录
                },
                {
                    path: '/mobile/alarm-record',
                    component: resolve => require(['../components/page/AlarmRecord.vue'], resolve)    // 告警记录
                },

            ]
        },
    ]
})
```

手机端页面怎么配合呢？

中容器是  mobileHome.vue<br />组件    mobileHeader.vue

根据路由动态变化的是PC端的子页面<br />注意虽然加载的是相同的子组件但在配置路由的时候不要与PC页面的路由相同否则会跳成PC端的页面

css样式

```
*{
margin:0;
padding:0;
-webkit-tap-highlight-color: transparent;/*去除点击按钮出现黑块的问题*/
-webkit-overflow-scrolling : touch; /*兼容ios上下滚动的问题*/
}
```

vue的过渡动画

```
<transition name="xx">
  <div>

  </div>
</transition>

.xx-enter-active, .xx-leave-active {
    transition: all .3s ease-in-out;
  }
  .xx-enter, .xx-leave-to{
    opacity: .5;
    transform: translateX(-100%);
  }
```

<a name="bxzekv"></a>
## 开发
```bash
# 安装依赖
    npm install
    //or # 建议不要用cnpm  安装有各种诡异的bug 可以通过如下操作解决npm速度慢的问题
    npm install --registry=https://registry.npm.taobao.org

    # 本地开发 开启服务
    npm run dev
```

<a name="fll2xy"></a>
## 上传文件（图片 || excel）
```bash
# 安装依赖
    npm install
    //or # 建议不要用cnpm  安装有各种诡异的bug 可以通过如下操作解决npm速度慢的问题
    npm install --registry=https://registry.npm.taobao.org

    # 本地开发 开启服务
    npm run dev
```

<a name="2943km"></a>
## 倍数提高打包速度vue

```bash
//  使用  vendor.dll.js   插件
//  https://zhuanlan.zhihu.com/p/26174425
```

<a name="fifezr"></a>
## element-ui  多选表格 翻页 回显 记录多选的id

```bash
<template>

    <el-dialog title="绑定子诊所" center :visible.sync="dialogFormVisible1" top="0" :modal="false" class="bind-clinic" @close="closeDialog">
      <el-form ref="bindform" :model="bindform" label-width="90px">
        <el-row :gutter="20" style="padding-top:10px;border-bottom:1px solid #EBF0F2;">
          <el-col :span="10">
            <div class="grid-content bg-purple">
              <el-form-item label="诊所名称">
                <el-input v-model="bindform.name__blk"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple">
              <el-form-item label="诊所注册人">
                <el-input v-model="bindform.contact__blk||mobile__blk"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <el-button type="primary" @click="searchClinic">搜索</el-button>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple" style="padding:10px 10px 20px;color:#F56C6C">
              *注：输入诊所名称或护牙士诊所注册人的用户名或其绑定的手机号进行搜索
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div>
        <el-table :data="bindTableData" ref="multipleTable" stripe style="width: 100%" max-height="600" @select="tabSelect" @select-all="tabSelectAll" @selection-change="handleSelectionChange">
          <!--<el-table :data="bindTableData" stripe style="width: 100%" max-height="600"  @selection-change="handleSelectionChange">-->
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="name" label="诊所" min-width="100">
          </el-table-column>
          <el-table-column prop="contact" label="姓名" min-width="100">
          </el-table-column>
          <el-table-column prop="mobile" label="手机号" min-width="100">
          </el-table-column>
        </el-table>
        <el-pagination style="padding-bottom: 0;" background="true" :page-size="bindPageSize" @current-change="bindhandleCurrentChange" layout="prev, pager, next" :total="bindTotalRecord">
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitBind">提交</el-button>
      </div>
    </el-dialog>


</template>

<script>
  export default {
    data() {

      return {


        searchParams: {},
        bindTableData: [],
        bindPageIndex: 1, //绑定诊所当前页
        bindPageSize: 8, //绑定诊所每页容量
        bindTotalRecord: null, //绑定诊所数据总条数
        isAbleGet: false,
        dialogFormVisible1: false,
        selectedArr: [], //选中诊所列表
        labelPosition: "left",
      }
    },
    mounted() {
    },
    methods: {
      submitBind() {
        if(this.multipleSelection.length > 0) {

          this.$axios({
            url: this.url.submitBInd,
            method: 'post',
            data: {
              params: {
                tenantIdList: this.selectedArr
              }
            }
          }).then((res) => {
            if(res.data.success) {
              this.dialogFormVisible1 = false;
              this.getData();
              this.$message.success(res.data.message || "绑定成功")
              console.log(res.data.data)
            } else if(res.data.code == 200) {
              this.$router.push('/login')
            } else {
              console.log(res.data.data)
              this.$message.error(res.data.message)
            }
          })
        } else {
          this.$message.error('请至少选择一个要绑定的诊所')
        }
      },
      handleCurrentChange(val) { //翻页
        this.pageIndex = val;
        this.getData();
      },
      registClinic() {
        this.dialogFormVisible = true;
      },
      searchClinic() { //搜索诊所用于绑定
        this.searchParams = {}
        for(let key in this.bindform) {
          if(this.bindform[key]) {
            this.searchParams[key] = this.bindform[key]
          }
        }
        this.bindClinic(this.searchParams)
        console.log(this.bindform)
      },
      bindhandleCurrentChange(val) { //翻页
        this.bindPageIndex = val;
        this.bindClinic(this.searchParams)
        console.log("433--selectedArr=",this.selectedArr)
      },
      closeDialog(){
        this.bindform = {
          name__blk: '',
          'contact__blk||mobile__blk': ''
        }
        this.bindTableData = [];
        this.selectedArr = [];
        this.searchParams = {};//重置搜索参数
      },
      bindClinic(v) { //绑定诊所

        let params = {};
        if(!!v && JSON.stringify(v) != '{}') {
          params = {
            params: v,
            pageIndex: this.bindPageIndex - 1,
            pageSize: this.bindPageSize,
          }
        } else {
          this.dialogFormVisible1 = true;
          this.bindTableData = [];
          this.bindTotalRecord = null
          return

        }

        this.$axios({
          url: this.url.searchClinic,
          method: 'get',
          params: params
        }).then((res) => {
          if(res.data.success) {
            this.dialogFormVisible1 = true;
            this.bindTotalRecord = res.data.data.totalRecord
            this.bindTableData = res.data.data.items;

            for(let i in this.bindTableData) { //用于多选翻页回显
              this.bindTableData[i].check = false;
              if(this.selectedArr.length>0){
                for(let j in this.selectedArr){
                  if(this.selectedArr[j] === this.bindTableData[i].tenantId){
                    this.bindTableData[i].check = true;
                    this.$nextTick(() => {
                      this.$refs.multipleTable.toggleRowSelection(this.bindTableData[i], true);
                    })
                  }
                }
              }
            }
            console.log(463, this.bindTableData)
          } else if(res.data.code == 200) {
            this.$router.push('/login')
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      tabSelect(selection, row) { //表格逐个选择
        console.log(row)
        row.check = !row.check
        if(row.check) { //选中状态
          if(this.selectedArr.length === 0) {
            this.selectedArr.push(row.tenantId)
          } else {
            if(this.selectedArr.indexOf(row.tenantId) === -1) {
              this.selectedArr.push(row.tenantId)
            }
          }
        } else { //取消选中状态
          let index = this.selectedArr.indexOf(row.tenantId)
          this.selectedArr.splice(index, 1)
        }

        console.log('488-this.selectedArr=', this.selectedArr)

      },
      tabSelectAll(selection) { //表格全选
        alert('tabSelectAll==change')
        console.log('selection',selection)
        if(selection.length > 0) {
          for(let i in selection) {
            selection[i].check = true;
            if(selection[i].check) { //选中状态
              if(this.selectedArr.length === 0) {
                this.selectedArr.push(selection[i].tenantId)
              } else {
                if(this.selectedArr.indexOf(selection[i].tenantId) === -1) {
                  this.selectedArr.push(selection[i].tenantId)
                }
              }
            } else { //取消选中状态
              if(this.selectedArr.indexOf(selection[i].tenantId) > -1) {
                let index = this.selectedArr.indexOf(selection[i].tenantId)
                this.selectedArr.splice(index, 1)
              }

            }

          }
          console.log('520-this.selectedArr==', this.selectedArr)
        }else {//全不选
//        this.selectedArr = []//清空选择
          for(let i in this.bindTableData) { //用于多选翻页回显
              this.bindTableData[i].check = false;
              for(let j in this.selectedArr){
                if(this.bindTableData[i].tenantId===this.selectedArr[j]){
                  this.selectedArr.splice(j,1);
                }
              }
          }
          console.log('531--this.selectedArr=',this.selectedArr)
        }

      },


    }
  }
</script>
```

<a name="79zvzw"></a>
## vue 内 监听window.resize 事件

```bash
mounted() {
      this.getData()//初始加载
      const that = this
        window.onresize = () => {
          that.getData()//窗口变化重新加载
        }
    },
```

<a name="s86xtl"></a>
## vue 打包文件放到服务器子目录下出现的问题

1.图片资源作为背景时无法访问<br />解决：

```bash
// build/utils.js
     if (options.extract) {
     return ExtractTextPlugin.extract({
       use: loaders,
       publicPath:'../../',//修改这个
       fallback: 'vue-style-loader',

     })
   } else {
     return ['vue-style-loader'].concat(loaders)
   }
// config/index.js
   build: {//注意位置！
   // Template for index.html
   index: path.resolve(__dirname, '../dist/index.html'),

   // Paths
   assetsRoot: path.resolve(__dirname, '../dist'),
   assetsSubDirectory: 'static',
   assetsPublicPath: './',//改为相对路径
     ...
 }
```

##打包后css引入的图片无法显示

```bash
// config/index.js

   build:{
     assetsPublicPath: './',//改这里
   }
   //  build/until.js
   if (options.extract) {
     return ExtractTextPlugin.extract({
       use: loaders,
        publicPath:'../../', //修改这里
       fallback: 'vue-style-loader'
     })
   } else {
     return ['vue-style-loader'].concat(loaders)
   }
```

<a name="ig3qys"></a>
## vue父子组件生命周期顺序
<a name="haJ3U"></a>
### 一、加载渲染过程
父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted
<a name="L5WjN"></a>
### 二、子组件更新过程
父beforeUpdate->子beforeUpdate->子updated->父updated
<a name="71DKC"></a>
### 三、父组件更新过程
父beforeUpdate->父updated
<a name="yr0fG"></a>
### 四、销毁过程
父beforeDestroy->子beforeDestroy->子destroyed->父destroyed

<a name="cx1vob"></a>
## Vue生命周期

1. 实例、组件通过new Vue() 创建出来之后会初始化事件和生命周期，然后就会执行beforeCreate钩子函数，这个时候，数据还没有挂载，只是一个空壳，无法访问到数据和真实的dom，一般不做操作

2. 挂载数据，绑定事件等等，然后执行created函数，这个时候已经可以使用到数据，也可以更改数据,在这里更改数据不会触发updated函数，这里是渲染前倒数第二次更改数据的机会，不会触发其他的钩子函数，一般可以在这里做初始数据的获取

3. 接下来开始找实例或者组件对应的模板，编译模板为虚拟dom放入到render函数中准备渲染，然后执行beforeMount钩子函数，在这个函数中虚拟dom已经创建完成，马上就要渲染,在这里也可以更改数据，不会触发updated，这里是渲染前最后一次更改数据的机会，不会触发其他的钩子函数，一般可以在这里做初始数据的获取

4. 接下来开始render，渲染出真实dom，然后执行mounted钩子函数，此时，组件已经出现在页面中，数据、真实dom都已经处理好了,事件都已经挂载好了，可以在这里操作真实dom等事情...

5. 当组件或实例的数据更改之后，会立即执行beforeUpdate，然后vue的虚拟dom机制会重新构建虚拟dom与上一次的虚拟dom树利用diff算法进行对比之后重新渲染，一般不做什么事儿

6. 当更新完成后，执行updated，数据已经更改完成，dom也重新render完成，可以操作更新后的虚拟dom

7. 当经过某种途径调用$destroy方法后，立即执行beforeDestroy，一般在这里做一些善后工作，例如清除计时器、清除非指令绑定的事件等等

8. 组件的数据绑定、监听...去掉后只剩下dom空壳，这个时候，执行destroyed，在这里做善后工作也可以



