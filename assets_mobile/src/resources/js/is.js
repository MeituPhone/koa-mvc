export default (() => {
    const UA = navigator.userAgent.toLowerCase();

    return {
        weibo () {
            return /weibo/.test(UA);
        },
        wechat () {
            return /micromessenger/.test(UA) && !/wxwork/.test(UA);
        },
        qq () {
            return /qq\//gi.test(UA);
        },
        qqzone () {
            return /qzone\//gi.test(UA);
        },
        android () {
            return /android/.test(UA);
        },
        ios () {
            return /iphone|ipad|ipod/.test(UA);
        },
        meituApp () {
            return /com\.(meitu|commsource)\./.test(UA);
        }
    };
})();
