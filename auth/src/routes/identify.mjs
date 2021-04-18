import Router from '@koa/router';
import { pool } from '../db/index.mjs';

const router = new Router({
  prefix: '/identify',
});

router.get('/', async (ctx) => {
  const { email } = ctx.query;

  // As this is internally used within the conference domain,
  // no need to validate the emails.
  const { rows } = await pool.query(
    'SELECT id FROM accounts WHERE email = $1',
    [email],
  );
  ctx.response.body = rows;
});

export default router;
