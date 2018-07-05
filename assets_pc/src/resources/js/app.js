/**
 * 入口文件
 * Created by 王佳欣 on 2018/4/14.
 */
import Ajax from './ajax';
import URI from './uri';
import Auth from './auth';
import Is from './is';
import 'resources_css/base/base.scss';

/* eslint-disable */
window.MtJs = {};
// 添加监听， 引入MtJs
window.addEventListener('WebviewJsBridgeReady', () => {
    window.MtJs = WebviewJsBridge.MTJs;
});

function _extend (destination, source) {
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            destination[key] = source[key];
        }
    }
    return destination;
}

function App (options) {
    this._init(options);
};

function initEvents (App) {
    // 分享信息
    App.prototype.$share = {
        /**
         * 配置分享信息
         * @param title                     分享标题
         * @param description               分享描述
         * @param thumb                     分享图标
         * @param dom                       触发dom
         * @param success                   分享成功
         * @param cancel                    取消分享
         * @param start                     点击分享
         */
        config ({title, description, thumb, dom}, success, cancel, start) {

        },
        call () {

        }
    };

    // 事件埋点
    App.prototype.$cnzz = {
        // 事件统计
        event (dom, event) {
            /* eslint-disable */
            _czc.push(['_trackEvent', dom, event]);
        },
        // pv统计
        page ({page}) {
            _czc.push(['_trackPageview', page]);
        }
    };

    App.prototype.$is = Is;

    // 全局Tip
    App.prototype.$tip = function ({message, type}) {
        $('body').append(`<div class="globalTip"><div class="globalTip-inner">${message}</div></div>`);
        $('.globalTip').addClass('show').on('animationend webkitAnimationEnd oAnimationEnd', function () {
            $(this).remove();
        });
    };

    // 全局Toast
    App.prototype.$toast = {
        open ({type, message, timeout}) {
            $('body').append(`<div class="globalToast">
                <div class="globalToast-mask"></div>
                <div class="globalToast-box">
                    <i class='globalToast-icon ${type === 'loading' ? 'weui-loading' : `weui-icon-${type}`}'></i>
                    <p class="globalToast-content">${message}</p>
                </div>
            </div>`);

            if (!timeout) {
                return;
            }

            setTimeout(() => {
                this.close();
            }, timeout)
        },
        close () {
            $('.globalToast').addClass('out').on('animationend webkitAnimationEnd oAnimationEnd', function () {
                $(this).remove();
            });
        }
    };

    // 全局的数据请求方法
    App.prototype.$ajax = function (params) {
        return Ajax(params);
    };

    // 暂无数据
    App.prototype.$none = function ({type, message, dom}) {
        dom.append(`<div class="globalNone">
            <div class="globalNone-icon globalNone-icon——${type}"></div>
            <p class="globalNone-message">${message}</p>
        </div>`);
    };

    // 数据到底了
    App.prototype.$end = function ({message = '- 到底啦！没有更多数据了 -', dom}) {
        dom.append(`<div class="end-data">
            <img src="https://mtshop1.meitudata.com/5aaa4ed48d41c63229.png">
            <span>${message}</span>
        </div>`);
    };

    // loading模块
    (() => {
        // 全局loading方法
        App.prototype.$gLoading = $('.globalLoading');

        // 局部loading方法
        App.prototype.$iLoading = {
            open ({message = '努力加载中~', dom}) {
                dom.append(`<div class="innerLoading">
                    <span class="clearfix">
                        <i class='innerLoading-icon weui-loading'></i>
                        <span class="innerLoading-message">${message}</span>
                    </span>
                </div>`);
            },
            close () {
                $('.innerLoading').remove();
            }
        };
    })();

    // 路由模块
    (() => {
        // 路由方法
        App.prototype.$router = {
            push (url) {
                window.location.href = url.indexOf('http') === 0 ? url : `${process.env.ORIGIN_URL}/${url}`;
            },
            replace (url) {
                window.location.replace(url.indexOf('http') === 0 ? url : `${process.env.ORIGIN_URL}/${url}`);
            },
            goBack () {
                if (window.App.$is.ios()) {
                    if (document.referrer) {
                        window.App.$router.replace(document.referrer);
                    } else {
                        window.history.go(-1);
                    }

                } else {
                    window.history.go(-1);
                }
            },
            reload () {
                window.location.reload();
            }
        };

        // 当前路由信息
        App.prototype.$route = URI.parseUrl();
    })();

    // 用户认证模块
    App.prototype.$auth = Auth;
    App.prototype.$auth.initUserInfo();

    // 初始化事件
    App.prototype.create = function () {
        let that = this;
        $('.globalTabbar-item').click(function (e) {
            if ($(this).hasClass('active')) {
                return false;
            }
            let path = $(this).data('path');
            that.$router.push(path);
        });

        if (this.bindEvent) {
            this.bindEvent();
        }

        if (this.bindData) {
            this.bindData();
        }

        if (this.init) {
            this.init();
        }

        window.App = this;
        Auth.webviewLogin({});
    };
};

// 定义App._init
function init (App) {
    App.prototype._init = function (options) {
        this.$options = options || this.$options;
        this.create();
    };
};

const installedPlugins = [];

// 定义App.use
function initUse (App) {
    App.use = function (plugin) {
        if (installedPlugins.indexOf(plugin) > -1) {
            return false;
        }

        const args = Array.from(arguments).slice(1);
        args.unshift(this);
        plugin.install.apply(plugin, args);

        return this;
    };
};

function initExtend (App) {
    App.extend = function () {
        const Super = this;

        const Sub = function (options) {
            this._init(options);
        };

        Sub.prototype = Object.create(Super.prototype);
        Sub.prototype.constructor = Sub;

        Array.from(arguments || []).map((item) => {
            _extend(
                Sub.prototype,
                item || {}
            );
        });

        Sub['super'] = Super;
        return Sub;
    };
}

init(App);

initEvents(App);

initUse(App);

initExtend(App);

export default App;
