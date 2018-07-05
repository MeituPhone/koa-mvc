/**
 * 首页
 * Created by zj-db0666 on 2018/6/4.
 */
import 'resources_css/pages/index.scss';
import App from 'app';
import { ORIGIN_URL } from '../../constants/config';

let Index = new (App.extend({
    data: {

    },
    dom: {

    },
    init () {
        this.$gLoading.hide();
    }
}))();
