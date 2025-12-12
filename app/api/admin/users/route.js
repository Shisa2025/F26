import { NextResponse } from 'next/server';
import { pool } from '../../../../database/client.js';

const ALLOWED_STATUS = new Set(['active', 'banned', 'pending']);

const badRequest = (message) => NextResponse.json({ error: message }, { status: 400 });

export async function GET() {
  try {
    // Ensure schema piece exists for reported_by, then auto-pend users with 3+ fake reports
    await pool.query(
      `ALTER TABLE disaster
       ADD COLUMN IF NOT EXISTS reported_by INTEGER REFERENCES "user"(id) ON DELETE SET NULL`,
    );
    await pool.query(
      `UPDATE "user" u
       SET account_status = 'pending'
       WHERE u.account_status = 'active'
         AND u.id IN (
           SELECT reported_by
           FROM disaster
           WHERE status = 'fake' AND reported_by IS NOT NULL
           GROUP BY reported_by
           HAVING COUNT(*) >= 3
         )`,
    );

    const { rows } = await pool.query(
      `SELECT id, email, user_name, account_status, role, created_at
       FROM "user"
       ORDER BY (account_status = 'pending') DESC, created_at DESC`,
    );
    return NextResponse.json({ users: rows }, { status: 200 });
  } catch (err) {
    console.error('List users error:', err);
    return NextResponse.json({ error: err?.message || 'Internal error' }, { status: 500 });
  }
}

export async function PATCH(req) {
  let payload;
  try {
    payload = await req.json();
  } catch (err) {
    return badRequest('Invalid JSON body');
  }

  const id = Number(payload.id);
  const status = typeof payload.account_status === 'string' ? payload.account_status : '';

  if (!id || !Number.isInteger(id)) return badRequest('Invalid id');
  if (!ALLOWED_STATUS.has(status)) return badRequest('Invalid status');

  try {
    const { rowCount, rows } = await pool.query(
      `UPDATE "user" SET account_status = $1 WHERE id = $2 RETURNING id, email, user_name, account_status, role, created_at`,
      [status, id],
    );
    if (rowCount === 0) return badRequest('User not found');
    return NextResponse.json({ user: rows[0], message: 'Status updated.' }, { status: 200 });
  } catch (err) {
    console.error('Update user status error:', err);
    return NextResponse.json({ error: err?.message || 'Internal error' }, { status: 500 });
  }
}
