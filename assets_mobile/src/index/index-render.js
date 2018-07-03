/**
 * Created by zj-db0666 on 2018/6/5.
 */
import layout from 'layout';
import content from './index.ejs';
const title = 'Meitu美图官网-美图手机(美图T9、美图V6、美图M8s、美图T8s)官方网站';
const keyword = 'Meitu,美图手机,美图T9,美图V6,美图M8s,美图T8s,美图M8,美图T8,美图M6s,美图V4s,美图手机官网,美图秀秀手机,美颜手 机,Meitu官方商城,自拍神器';
const description = '美图官网，提供美图手机（美图T9、美图V6、美图M8s、美图T8s）、相关配件的详细介绍及在线购买。同时也是美图秀秀、美颜相机、美拍等热门产品的官方网站。';

// 菜单配置
export default layout.render({title, keyword, description, content, gLoading: true});
