import Axios from 'axios';

// 接口转发获取ding
let ding = async function (ctx, next) {
    let result = await Axios.get(`http://www.bilibili.com/index/ding.json`);

    await ctx.render('index.html', {
        title: '标题啦啦啦',
        users: [{name: '科比.布莱恩特', age: 39}, {name: '艾弗森', age: 43}],
        balls: [
            {name: '篮球'},
            {name: '足球'},
        ],
        data: JSON.stringify(result.data.douga)
    });
};

module.exports = {
    ding
};