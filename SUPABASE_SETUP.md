# Supabase setup

This project can load content data from Supabase and includes admin pages for CRUD operations.

## 1) Create table and policy

Run SQL in [data/supabase-schema.sql](data/supabase-schema.sql) on Supabase SQL Editor.

## 2) Add data rows

Insert rows into the target tables (`research_papers`, `farm_updates`, `enjoy_entries`, `product_entries`).

## 3) Configure frontend

Edit [data/supabase-config.js](data/supabase-config.js):

- `enabled`: true
- `url`: your Supabase project URL
- `anonKey`: your Supabase anon public key
- `table`: research_papers
- `adminApiMode`: `rest-direct` (A案) or `edge-function` (B案)
- `adminFunctionName`: Edge Function name for B案

Example:

window.SUPABASE_CONFIG = {
  enabled: true,
  url: "https://YOUR_PROJECT.supabase.co",
  anonKey: "YOUR_ANON_KEY",
  table: "research_papers",
  adminApiMode: "rest-direct",
  adminFunctionName: "admin-content"
};

## 4) Admin authentication (A案)

- Admin login page: [admin/login.html](admin/login.html)
- Admin pages require Supabase Auth sign-in (email + password).
- Access token is used as `Authorization: Bearer <JWT>` for CRUD API calls.
- If not signed in, users are redirected to login automatically.

## 5) A案からB案へ切り替える手順

1. Implement Edge Function (example: `admin-content`) with action handlers: `list/insert/update/delete`.
2. Change `adminApiMode` to `edge-function` in [data/supabase-config.js](data/supabase-config.js).
3. Keep `adminFunctionName` aligned with the deployed function name.
4. Tighten RLS so direct table writes from client are no longer allowed.

## 6) Notes

- Keep Row Level Security enabled.
- This is a static site, so anon key is public by design.
- For production-grade security, prefer B案 (Edge Function / backend mediated writes).
- If Supabase is unavailable, page loads from [data/research-data.json](data/research-data.json).
