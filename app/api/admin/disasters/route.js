import { NextResponse } from 'next/server';
import { pool } from '../../../../database/client.js';

const ALLOWED_STATUS = new Set(['unverified', 'verified', 'fake']);

const badRequest = (message) => NextResponse.json({ error: message }, { status: 400 });

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const typeId = searchParams.get('typeId');
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const clauses = [];
  const params = [];

  if (typeId) {
    params.push(Number(typeId));
    clauses.push(`d.disaster_type_id = $${params.length}`);
  }
  if (from) {
    params.push(from);
    clauses.push(`d.occurred_at >= $${params.length}`);
  }
  if (to) {
    params.push(to);
    clauses.push(`d.occurred_at <= $${params.length}`);
  }

  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';

  try {
    const { rows } = await pool.query(
      `SELECT d.id, d.title, d.description, d.severity, d.status, d.location, d.lat, d.lng, d.occurred_at, d.created_at,
              dt.name as disaster_type_name, d.disaster_type_id
       FROM disaster d
       LEFT JOIN disaster_type dt ON dt.id = d.disaster_type_id
       ${where}
       ORDER BY d.occurred_at DESC, d.created_at DESC`,
      params,
    );
    return NextResponse.json({ disasters: rows }, { status: 200 });
  } catch (err) {
    console.error('List disasters error:', err);
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
  const status = typeof payload.status === 'string' ? payload.status : '';

  if (!id || !Number.isInteger(id)) return badRequest('Invalid id');
  if (!ALLOWED_STATUS.has(status)) return badRequest('Invalid status');

  const client = await pool.connect();
  try {
    // Ensure reported_by column exists so we can enforce fake-count rule
    await client.query(
      `ALTER TABLE disaster
       ADD COLUMN IF NOT EXISTS reported_by INTEGER REFERENCES "user"(id) ON DELETE SET NULL`,
    );

    await client.query('BEGIN');

    const updateRes = await client.query(
      `UPDATE disaster SET status = $1 WHERE id = $2 RETURNING id, title, status, reported_by`,
      [status, id],
    );
    if (updateRes.rowCount === 0) {
      await client.query('ROLLBACK');
      return badRequest('Disaster not found');
    }

    const disasterRow = updateRes.rows[0];

    if (status === 'fake') {
      // Re-evaluate all active users: if they have 3+ fake disasters, set to pending.
      await client.query(
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
    }

    await client.query('COMMIT');
    return NextResponse.json(
      { disaster: { id: disasterRow.id, title: disasterRow.title, status: disasterRow.status }, message: 'Disaster status updated.' },
      { status: 200 },
    );
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Update disaster status error:', err);
    return NextResponse.json({ error: err?.message || 'Internal error' }, { status: 500 });
  } finally {
    client.release();
  }
}
