## 轻商城

#### 下载代码及编译

```
$ npm install
$ npm start
```

#### 访问
http://pages.meitu.com/index


#### 构建本地环境主程序
```
$ npm build:dev
```


### 前端目录说明

```assets
├── assets
│   └── build/   webpack 配置文件
│   └── config/  项目配置项，区分开发/测试/生产配置
│   └── layout/  页面渲染配置
│   └── src/     源码目录
│       ├── resources  基础资源
│           ├── api api资源
│           ├── scss 样式资源
│           ├── js 基础脚本
```

### 模板渲染配置
```
// title：标题
// keyword: 关键字
// description: 描述
// content: 内容，可为EJS文本
// config
// menus: 配置全局bar
// gLoading: 进入页面是否显示全局loading，默认true
render: ({title, keyword, description, content, config, menus = { display: true, active: 'home' }, gLoading = true})

```
### App内定义的共有模块

#### 权限控制对象：this.$auth
具体对应  resources/js/auth.js;
调用如下：
```
// 强制登录
this.$auth.requireLogin();
// 是否登录
this.$auth.hasLogined();
// 跳转登录
this.$auth.redirectLogin('https://xxxx');
```

#### 路由共有模块：this.$route、this.$router
具体如下：
```
// 当前路由对象
let {query, path, hash} = this.$route;

// 路由跳转
this.$router.push('/cart');
this.$router.push('https://www.meitu.com');
// 路由替换
this.$router.replace('/cart');
// 路由后退
this.$router.goBack();
// 路由重新加载
this.$router.reload();
```
#### 提示模块：this.$tip、this.$toast
具体如下：
```
// 提示信息
this.$tip({message: '请先登录'});

// toast信息，
// timeout：主动关闭时间(不传，则为不主动关闭)
// type：icon类型，传入所有iconfont 内的weui内的icon
// message：文案
that.$toast.open({type: 'success-no-circle', message: '删除成功', timeout: 1000});
// toast代码执行关闭
that.$toast.close();
```

#### 数据缺省模块：this.$none
具体如下：
```
// message：提示文案
// type：icon类型，目前支持: cart、order、coupon
// dom: append的target dom
this.$none({message: '购物车空空的，去逛逛吧~', type: 'cart', dom: this.dom.$list});
```

#### 全局loading: this.$gLoading, this.$iLoading
具体如下：
```
// 关闭全局loading
this.$gLoading.hide();
// 打开全局loading
this.$gLoading.show();

// 打开行内loading
// message: 文案
// dom: append 目标 dom
this.$iLoading.open({message: '努力加载中~', dom: $('.test')});
// 关闭行内loading
this.$iLoading.close();
```

#### 数据获取模块: this.$ajax
返回promise对象；具体如下：
```
this.$ajax({url, type, data, requireLogin});
```
### 已有组件

#### Dialog
调用如下：
```
   import Dialog from 'resources_js/dialog';
   // done异步执行后回调的方法，必须执行
   Dialog.confirm({
        options: {
            content: '确认删除吗？',
        },
        okCb (done) {
            done();
        }
    });
```
