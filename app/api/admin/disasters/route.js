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

  try {
    const { rowCount, rows } = await pool.query(
      `UPDATE disaster SET status = $1 WHERE id = $2 RETURNING id, title, status`,
      [status, id],
    );
    if (rowCount === 0) return badRequest('Disaster not found');
    return NextResponse.json({ disaster: rows[0], message: 'Disaster status updated.' }, { status: 200 });
  } catch (err) {
    console.error('Update disaster status error:', err);
    return NextResponse.json({ error: err?.message || 'Internal error' }, { status: 500 });
  }
}
