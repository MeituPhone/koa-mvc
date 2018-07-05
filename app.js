import Koa from 'koa';
import Cors from'koa-cors';
import BodyParser from 'koa-bodyparser';
import Convert from 'koa-convert';
import routes from'./routes';
import path from 'path';
import errorHandle from './middlewares/errorHandle'
import logger from './middlewares/loggerManager';
import templating from './templating';


const app = new  Koa();

// 日志收集
app.use(logger());

// 跨域处理
app.use(Convert(Cors()));

// 引用bodyparser 中间件
app.use(BodyParser());

//错误处理
app.use(errorHandle());

app.use(templating({
    noCache: true,
    watch: true
}));

app.use(routes.routes(), routes.allowedMethods());

app.listen(3000);
console.log('app sctarted at port 3000 ....');
