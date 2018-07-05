/**
 * 首页
 * Created by zj-db0666 on 2018/6/4.
 */
import 'resources_css/pages/index.scss';
import App from 'app';
import { ORIGIN_URL } from '../../constants/config';

let Index = new (App.extend({
    data: {
        loading: false,
        end: false
    },
    dom: {

    },
    bindEvent () {
        let $lister = $(window);
        let height = $lister.height();
        let scrollFunc = () => {
            if (this.data.loading || this.data.end) {
                return false;
            }
            let scrollHeight = $(document).height();
            let scrollTop = $(document).scrollTop();

            console.log(scrollTop, height, scrollHeight);
            // if (scrollTop + height + 100 >= scrollHeight) {
            //     this.$iLoading.open({dom: this.dom.$statusContainer});
            //     this.loadGoods((goods) => {
            //         if (goods.length < this.data.count && !this.data.end) {
            //             $lister.get(0).removeEventListener('scroll', scrollFunc);
            //             this.$end({dom: this.dom.$statusContainer});
            //             this.data.end = true;
            //         }
            //         this.$iLoading.close();
            //     });
            // }
        };

        $lister[0].addEventListener('scroll', scrollFunc, false);
    },
    init () {
        this.bindEvent();
        this.$gLoading.hide();
    }
}))();
