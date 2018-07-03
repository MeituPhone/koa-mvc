import Router from 'koa-router';
import meitu from './meitu';

let router = Router();

router.use(meitu.routes(), meitu.allowedMethods());

export default router;