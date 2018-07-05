/**
 * Created by 王佳欣 on 2018/6/4.
 */
export default {
    parseUrl () {
        let hash = '';
        let queryStr = '';
        let query = {};
        let url = window.location.href;
        const hashIndex = url.indexOf('#');
        const queryIndex = url.indexOf('?');

        // 获取hash值
        if (hashIndex >= 0) {
            hash = url.slice(hashIndex + 1, url.length);
        }

        // 解析queryStr
        if (queryIndex >= 0) {
            queryStr = url.slice(queryIndex + 1);
            if (queryStr.indexOf('#') > -1) {
                queryStr = queryStr.split('#')[0];
            }
        }

        // 解析query对象
        if (queryStr) {
            queryStr.split('&').map((item) => {
                let values = item.split('=');
                if (values[0]) {
                    query[values[0]] = values.length > 1 ? values[1] : '';
                }
            });
        }

        // 获取当前路径
        let pathname = window.location.pathname;
        let path = pathname.slice(0, pathname.lastIndexOf('/') + 1);
        return { path, query, hash };
    }
};
