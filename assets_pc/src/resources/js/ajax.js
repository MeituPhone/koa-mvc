/**
 * promise Ajax
 * Created by 王佳欣 on 2018/6/4.
 */
export default ({url, type = 'get', responseType = 'json', data = {}, requireLogin = false, async = true, withCredentials = true}) => {
    return new Promise((resolve, reject) => {
        return $.ajax({
            url,
            type,
            data,
            responseType,
            async,
            xhrFields: {withCredentials},
            success (response) {
                if (response.meta.code === 401 && requireLogin) {
                    window.App.$tip({message: '请先登录'});
                    // 提示跳转登录页
                    setTimeout(() => {
                        window.App.$auth.redirectLogin();
                    }, 2000);
                }
                resolve(response);
            },
            error (error) {
                reject(error);
            }
        });
    });
};
