import Router from 'koa-router';
import meiuControl from '../controllers/meitu';

let router = new Router({
    prefix: '/bilibili'
});

router.get('/', meiuControl.ding);
router.get('/dtail', meiuControl.ding);

export default router;
