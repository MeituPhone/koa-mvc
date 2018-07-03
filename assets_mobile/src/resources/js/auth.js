/**
 * 全局Auth
 * Created by 王佳欣 on 2018/6/4.
 */
import Cookies from 'resources_js/cookies.js';
import LoadJs from './loadjs';

export default {
    userInfo: {

    },
    /**
     * webview 同步登录
     */
    webviewLogin ({bindPhone = false, requireLogin = false, done}) {
        if (this.hasLogined()) {
            done && done();
            return false;
        }
        if (!window.App.$is.meituApp()) {
            return false;
        }
        // 动态加载大账号SDK
        LoadJs(process.env.ACCOUNT_JS_SDK).then(() => {
            if (window.MTAccount) {
                let mtAccount = window.MTAccount({
                    env: process.env.ACCOUNT_WEBVIEW
                });

                let accountToken = mtAccount.accessToken;

                if (!accountToken && requireLogin) {
                    this.requireLogin();
                    return false;
                } else if (!accountToken) {
                    done && done();
                }
                // AuthApi.webviewLogin({webview_token: accountToken, client_id: '1089867664'}).then((result) => {
                //     if (result.meta.code === 0) {
                //         done && done();
                //     } else if (result.meta.code === 401 && requireLogin) {
                //         this.requireLogin();
                //     } else if (result.meta.code === 14000 && !bindPhone && !requireLogin) {
                //         done && done();
                //     } else if (result.meta.code === 14000 && bindPhone && requireLogin) {
                //         window.App.$tip({message: '请先绑定手机号码~'});
                //         setTimeout(() => {
                //             let client_callback = encodeURIComponent(`${process.env.ACCOUNT_CALLBACK}`);
                //             let client_params = encodeURIComponent(JSON.stringify({back_url: encodeURIComponent(`${(top || window).location.href}`), link_in: 'link_in'}));
                //             (top || window).location.href = `${process.env.ACCOUNT_LOGIN}/#!/client/dispatch?action=bind_phone&client_id=1089867664&client_callback=${client_callback}&client_params=${client_params}`;
                //         }, 1500);
                //     } else if (requireLogin) {
                //         this.redirectLogin();
                //     }
                // }).catch((e) => {
                //     done && done();
                // });
            }
        });

        // 执行完成回调
        done && done();
    },
    /**
     * 强制登录
     * @returns {boolean}
     */
    requireLogin () {
        if (!this.userInfo.uid) {
            window.App.$tip({message: '请先登录~'});
            setTimeout(() => {
                this.redirectLogin();
            }, 2000);
            return false;
        }
        return true;
    },
    /**
     * 登录跳转
     * @param link
     */
    redirectLogin (link) {
        // callback传递参数
        let client_params = encodeURIComponent(JSON.stringify({back_url: encodeURIComponent(`${link || (top || window).location.href}`)}));
        // 登录回调页面
        let client_callback = encodeURIComponent(`${process.env.ACCOUNT_CALLBACK}`);
        window.App.$router.push(`${process.env.ACCOUNT_LOGIN}&client_callback=${client_callback}&client_params=${client_params}`);
    },
    // 判断用户是否已登录
    hasLogined () {
        return !!this.userInfo.uid;
    },
    /**
     * 加载用户信息
     */
    initUserInfo () {
        let uid = Cookies.getCookie('uid');
        let userName = Cookies.getCookie('name');

        if (!uid && !userName) {
            return false;
        }

        this.userInfo = {
            uid,
            userName
        };
    }
};
