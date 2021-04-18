import Router from '@koa/router';
import { router as sessionRouter } from './session.mjs';
import { router as accountRouter } from './accounts.mjs';
import { router as swaggerRouter } from './swagger.mjs';
import identifyRouter from './identify.mjs';

export const router = new Router();

router.use(swaggerRouter.routes()).use(swaggerRouter.allowedMethods());
router.use('/api', sessionRouter.routes(), sessionRouter.allowedMethods());
router.use('/api', accountRouter.routes(), accountRouter.allowedMethods());
router.use('/api', identifyRouter.routes(), identifyRouter.allowedMethods());
