#!/usr/bin/env node
import { Pool } from 'pg';
import { run, closePool, connectionString } from './client.js';

/**
 * Creates database "Hackatonlolo" by default, then ensures an admin table exists in that DB.
 * You can still override via argv[2] or NEON_TARGET_DB if needed.
 */

const dbName = process.argv[2] ?? process.env.NEON_TARGET_DB ?? 'Hackatonlolo';

async function main() {
  if (!dbName) {
    console.error('Database name is required (argv[2] or NEON_TARGET_DB).');
    process.exit(1);
  }

  try {
    // Quote identifier to avoid injection; PostgreSQL CREATE DATABASE lacks IF NOT EXISTS,
    // so catch duplicate_database (42P04) instead.
    try {
      await run(`CREATE DATABASE "${dbName}"`);
      console.log(`Database created: ${dbName}`);
    } catch (err) {
      if (err.code === '42P04') {
        console.log(`Database already exists: ${dbName}`);
      } else {
        throw err;
      }
    }

    // Connect to the newly created database to set up admin table.
    const url = new URL(connectionString);
    url.pathname = `/${dbName}`;
    const dbPool = new Pool({
      connectionString: url.toString(),
      ssl: { rejectUnauthorized: false },
    });

    const createAdmin = `
      CREATE TABLE IF NOT EXISTS admin (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `;

    const createUsers = `
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_status') THEN
          CREATE TYPE user_status AS ENUM ('active', 'banned', 'pending');
        END IF;
      END
      $$;

      CREATE TABLE IF NOT EXISTS app_user (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        account_status user_status NOT NULL DEFAULT 'active',
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `;

    const createDisasterType = `
      CREATE TABLE IF NOT EXISTS disaster_type (
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        description TEXT
      );
    `;

    const createDisaster = `
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'disaster_severity') THEN
          CREATE TYPE disaster_severity AS ENUM ('low', 'medium', 'high');
        END IF;
      END
      $$;

      CREATE TABLE IF NOT EXISTS disaster (
        id SERIAL PRIMARY KEY,
        disaster_type_id INTEGER NOT NULL REFERENCES disaster_type(id) ON DELETE RESTRICT,
        title TEXT NOT NULL,
        description TEXT,
        severity disaster_severity NOT NULL DEFAULT 'low',
        location TEXT,
        lat DOUBLE PRECISION,
        lng DOUBLE PRECISION,
        occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `;

    await dbPool.query(createAdmin);
    await dbPool.query(createUsers);
    await dbPool.query(createDisasterType);
    await dbPool.query(createDisaster);
    await dbPool.end();
    console.log(`Admin table ensured in database: ${dbName}`);
  } catch (err) {
    console.error('Create database failed:', err.message);
    process.exitCode = 1;
  } finally {
    await closePool();
  }
}

main();
