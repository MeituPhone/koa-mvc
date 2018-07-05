import Axios from 'axios';

// 接口转发获取ding
let ding = async function (ctx, next) {
    let {title} = ctx.query;

    let result = await Axios.get(`http://www.bilibili.com/index/ding.json`);

    let data = [];
    for (let key in result.data.douga) {
        data.push(result.data.douga[key]);
    }

    await ctx.render('index.html', {
        title,
        users: [{name: '科比.布莱恩特', age: 39}, {name: '艾弗森', age: 43}],
        balls: [
            {name: '篮球'},
            {name: '足球'},
        ],
        data
    });
};

module.exports = {
    ding
};