/**
 * 懒加载js
 * Created by 王佳欣 on 2018/6/4.
 */
export default (url) => {
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        if (script.readyState) {
            script.onreadystatechange = function (e) {
                if (script.readyState === 'loaded' || script.readyState === 'complete') {
                    script.onreadystatechange = null;
                    resolve(e);
                }
            };
        } else {
            script.onload = function (e) {
                resolve(e);
            };
        }
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    });
};
