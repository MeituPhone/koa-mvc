// 判断CSS属性是否存在
export let css3Property = function (attr) {
    let style = document.createElement('div').style;
    let prefix = ['O', 'ms', 'Ms', 'Moz', 'Webkit'];
    let prefixLen = prefix.length;

    css3Property = function (attr) {
        if (attr in style) {
            return attr;
        }

        attr = attr.replace(/^[a-z]/, function (val) {
            return val.toUpperCase();
        });

        let len = prefixLen;

        while (len--) {
            if (prefix[len] + attr in style) {
                return prefix[len] + attr;
            }
        }

        return '';
    };

    return css3Property(attr);
};
