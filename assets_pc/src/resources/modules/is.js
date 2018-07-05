/**
 * Created by 王佳欣 on 2018/6/27.
 */

class Is {
    constructor () {
        this.userAgent = navigator.userAgent.toLowerCase();
    }

    /**
     * 资源加载完成
     */
    is () {

    }

    /**
     * 倒计时
     */
    android (timeout) {

    }

    /**
     * 美图秀秀
     */
    xiuxiu () {

    }

    /**
     * 美图美拍
     */
    meipai () {

    }

    /**
     * 美颜
     */
    meiyuan () {

    }
};

// install
function install (App, config, loadOver) {
    if (install.installed) {
        return false;
    }

    install.installed = true;

    let is = new Is();

    Object.defineProperty(App.prototype, '$is', {
        get () {
            return is;
        }
    });
}

Is.install = install;

export default Is;
