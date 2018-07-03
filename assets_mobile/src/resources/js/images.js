import { PLACEHOLDER_PICTURE } from 'resources_const/index.js';

/**
 * 图片加载
 * Created by 王佳欣 on 2018/6/4.
 */
export const loadImage = (images) => {
    let hasLoadCount = 0;
    return new Promise((resolve, reject) => {
        const load = (src) => {
            let image = new Image();
            image.onload = function (status) {
                hasLoadCount++;
                if (hasLoadCount === images.length) {
                    resolve();
                }
            };
            image.onerror = function (e) {
                hasLoadCount++;
                if (hasLoadCount === images.length) {
                    resolve();
                }
            };
            image.src = src;
        };

        images.map((item, index) => {
            load(item);
        });

        images.length === 0 && resolve();
    });
};

/**
 * 兼容旧的图片地址后缀使用'!thumbxxx'
 */
export const suffixImage = (images, suffix = '!thumb850') => {
    let imageProtocol = /\/\/mshopimg/;
    return images.map((item) => {
        item = imageProtocol.test(item) ? `${item}${suffix}` : item;
        return item;
    });
};

// 图片懒加载
export const lazyLoadImage = () => {
    let $domLazyImages = $('.lazy-image').toArray();
    $domLazyImages.map(function (item, index) {
        let $dom = $(item);
        let $parentDom = $dom.parent('.lazy-box');
        if ($dom.hasClass('lazy-loading')) {
            return false;
        }
        if ($parentDom) {
            $parentDom.append(`<div class="lazy-thumb"><img src="${PLACEHOLDER_PICTURE}"></div>`);
        }

        $dom.addClass('lazy-loading').addClass('lazy-loading-img');
        let imageSrc = $dom.attr('lazy-src');
        loadImage([imageSrc]).then(() => {
            $dom.attr('src', imageSrc);
            if ($parentDom) {
                $parentDom.find('.lazy-thumb').fadeOut();
            }
        });
    });
};
