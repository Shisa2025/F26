import { NextResponse } from 'next/server';
import { pool } from '../../../../../database/client.js';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = Number(searchParams.get('userId'));

  if (!userId || !Number.isInteger(userId)) {
    return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
  }

  try {
    const { rows } = await pool.query(
      `SELECT d.id, d.title, d.description, d.severity, d.status, d.created_at, d.occurred_at,
              d.lat, d.lng, d.location, dt.name AS disaster_type_name
       FROM disaster d
       LEFT JOIN disaster_type dt ON dt.id = d.disaster_type_id
       WHERE d.status = 'fake' AND d.reported_by = $1
       ORDER BY d.created_at DESC`,
      [userId],
    );
    return NextResponse.json({ disasters: rows }, { status: 200 });
  } catch (err) {
    console.error('List fake disasters by user error:', err);
    return NextResponse.json({ error: err?.message || 'Internal error' }, { status: 500 });
  }
}
