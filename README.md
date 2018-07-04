## 安装配置
`npm install`

## 启动前端代码
`cd asserts_mobile`
`npm start`

## 启动服务端代码
`npm start`

## demo访问
http://localhost:3000/api/bilibili/ding

## 目录说明

```bash
    ├──assets_common/              * 通用的静态资源
    ├──assets_mobile/              * mobile 静态资源
    ├──pc_mobile/                  * pc 静态资源
    ├──dist/                       * 构建后的文件
    ├──├──pc_views/                * pc端模板
    ├──├──mobile_views/            * mobile端模板
    ├──├──v1/                      * 静态资源版本号
    ├──config/                     * 配置文件
    ├──consts/                     * 常量文件
    ├──controllers/                * 控制器目录
    ├──middlewares/                * 中间件文件
    ├──routes/                     * 路由目录文件
    ├──utils/                      * 工具文件

```


## 静态资源模板
/asserts_mobile/layout/index.js 模板渲染入口，使用ejs作为前端文件引擎

## koa2 模板
/templating.js 使用nunjucks 作为koa2的模板渲染引擎

https://mozilla.github.io/nunjucks/ 文档说明

## 本地开发域名配置

#### 静态资源域名（assets.meitu.com）配置
```
    ### switchhost配置
    127.0.0.1	assets.meitu.com
```
```
    ### 本地服务器配置
    <VirtualHost *:80>
        ServerAdmin zhy@meitu.com
        DocumentRoot "/www/koa-mvc/dist"
        ServerName assets.meitu.com
        ServerAlias assets.meitu.com
        DirectoryIndex index.html index.php
        Header set Access-Control-Allow-Origin "*"

        <Directory "/www/koa-mvc/dist">
         	DirectoryIndex index.html index.php
                SetEnv  MY_ENV local
                AllowOverride All
                #Order allow,deny
                Allow from all
                Require all granted
                RewriteEngine on
                RewriteCond %{REQUEST_FILENAME} !-f
                RewriteRule .* index.php
        </Directory>
        #ErrorLog "/www/log/assets.meitu.com.log"
        #CustomLog "/www/log/assets.meitu.com.err" common
    </VirtualHost>
```

#### 本地开发域名（localmall.meitu.com）配置
```
    ### switchhost配置
    127.0.0.1	localmall.meitu.com
```
```
    ### 本地服务器配置
<VirtualHost *:80>
    ServerAdmin zhy@meitu.com
    DocumentRoot "/www/koa-mvc/dist"
    ServerName localmall.meitu.com
    ServerAlias localmall.meitu.com
    DirectoryIndex index.html index.php
    Header set Access-Control-Allow-Origin "*"

    <Location "/">
         ProxyPass http://localhost:3000/
         ProxyPassReverse http://localhost:3000/
    </Location>

    <Directory "/www/koa-mvc/dist">
     	DirectoryIndex index.html index.php
            SetEnv  MY_ENV local
            AllowOverride All
            #Order allow,deny
            Allow from all
            Require all granted
            RewriteEngine on
            RewriteCond %{REQUEST_FILENAME} !-f
            RewriteRule .* index.php
    </Directory>
    #ErrorLog "/www/log/localmall.meitu.com.log"
    #CustomLog "/www/log/localmall.meitu.com.err" common
</VirtualHost>
```