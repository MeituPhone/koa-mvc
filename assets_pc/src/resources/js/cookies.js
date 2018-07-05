export default {
    setCookie (name, value, expireMinute) {
        expireMinute = expireMinute || 60;
        let millisecond = new Date().getTime();
        let expiresTime = new Date(millisecond + 60 * 1000 * expireMinute);
        document.cookie = name + '=' + escape(value) + ';domain=meitu.com;path=/' + ((expireMinute === null) ? '' : ';expires=' + expiresTime.toGMTString());
    },
    getCookie (name) {
        if (document.cookie.length > 0) {
            let start = document.cookie.indexOf(name + '%3D');
            let end;
            if (start !== -1) {
                start = start + name.length + 1;
                end = document.cookie.indexOf('%26', start);
                if (end === -1) {
                    end = document.cookie.length;
                }

                return decodeURI(decodeURI((document.cookie.substring(start + 2, end))));
            }
        }
        return '';
    },
    getJsCookie (name) {
        if (document.cookie.length > 0) {
            let c_start = document.cookie.indexOf(name + '=');
            if (c_start !== -1) {
                c_start = c_start + name.length + 1;
                let c_end = document.cookie.indexOf(';', c_start);
                if (c_end === -1) {
                    c_end = document.cookie.length;
                }
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return '';
    },
    deleteCookie (name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
};
