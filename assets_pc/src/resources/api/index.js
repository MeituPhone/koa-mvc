/**
 * Created by zj-db0666 on 2018/6/5.
 */
import Ajax from 'resources_js/ajax';
export default {
    banners () {
        return Ajax({ url: `${process.env.API_DOMAIN}block/banner_list.json?block_alias=small_shop` });
    },
    goods (data) {
        return Ajax({ url: `${process.env.API_DOMAIN}goods/small_get_list.json`, data });
    }
};
