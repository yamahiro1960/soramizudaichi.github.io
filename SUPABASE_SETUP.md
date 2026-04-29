# Supabase setup for research page

This project can load research data from Supabase first, then fallback to local JSON.

## 1) Create table and policy

Run SQL in [data/supabase-schema.sql](data/supabase-schema.sql) on Supabase SQL Editor.

## 2) Add data rows

Insert rows into `public.research_papers` with all section fields.

## 3) Configure frontend

Edit [data/supabase-config.js](data/supabase-config.js):

- `enabled`: true
- `url`: your Supabase project URL
- `anonKey`: your Supabase anon public key
- `table`: research_papers

Example:

window.SUPABASE_CONFIG = {
  enabled: true,
  url: "https://YOUR_PROJECT.supabase.co",
  anonKey: "YOUR_ANON_KEY",
  table: "research_papers"
};

## 4) Notes

- Keep Row Level Security enabled.
- This is a static site, so anon key is public by design.
- Write operations should be done from Supabase dashboard or secure backend only.
- If Supabase is unavailable, page loads from [data/research-data.json](data/research-data.json).
