import { authorize, identify } from '../security.mjs';
import { pool } from '../db/index.mjs';
import qrcode from 'qrcode';
import Router from '@koa/router';

export const router = new Router({
  prefix: '/events/:eventId/badges',
});

router.use(authorize);
router.use(identify);

router.get('/', async ctx => {
  const { eventId } = ctx.params;
  let v = await ctx.validator(ctx.params, {
    eventId: 'required|integer',
  });
  let fails = await v.fails();
  if (fails) {
    ctx.status = 400;
    return ctx.body = {
      code: 'INVALID_PARAMETER',
      message: 'Could not find that event.',
      errors: v.errors,
    };
  }

  const { rows } = await pool.query(`
    SELECT b.id, b.email, b.name, b.company_name AS "companyName", b.role
    FROM badges b
    JOIN events e ON (b.event_id = e.id)
    WHERE e.id = $1
  `, [eventId])
  ctx.body = rows.map(x => ({
    name: x.name,
    companyName: x.companyName,
    role: x.role,
  }));
  for (let item of ctx.body) {
    item.qrcode = await qrcode.toString(`${item.id}|${item.name}`);
  }
});
