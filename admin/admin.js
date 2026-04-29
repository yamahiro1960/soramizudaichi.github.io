/**
 * 管理者画面 共通ロジック
 * Supabase REST API を直接 fetch で呼び出す（supabase-js CDN 不使用）
 *
 * TODO: 認証実装後は Authorization ヘッダーを
 *       service_role key または JWT（ログイン済みユーザーのアクセストークン）に切り替える。
 *       現在は開発用に anon key を使用しており、RLS ポリシーで INSERT/UPDATE/DELETE を許可している。
 */

// ---- 設定読み込み ----
function getConfig() {
  if (!window.SUPABASE_CONFIG || !window.SUPABASE_CONFIG.enabled) {
    throw new Error('Supabase 設定が読み込まれていません。../data/supabase-config.js を確認してください。');
  }
  return window.SUPABASE_CONFIG;
}

// ---- 共通ヘッダー ----
function apiHeaders(config) {
  return {
    'apikey': config.anonKey,
    'Authorization': 'Bearer ' + config.anonKey,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  };
}

// ---- GET: レコード一覧取得 ----
async function fetchRecords(table, orderParam) {
  const config = getConfig();
  const params = new URLSearchParams({ select: '*' });
  if (orderParam) params.set('order', orderParam);
  const url = `${config.url}/rest/v1/${table}?${params.toString()}`;
  const res = await fetch(url, { headers: apiHeaders(config) });
  if (!res.ok) throw new Error(`GET ${table} failed: ${res.status}`);
  return res.json();
}

// ---- POST: レコード追加 ----
async function insertRecord(table, data) {
  const config = getConfig();
  const url = `${config.url}/rest/v1/${table}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: apiHeaders(config),
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`INSERT ${table} failed: ${res.status} - ${err}`);
  }
  return res.json();
}

// ---- PATCH: レコード更新 ----
async function updateRecord(table, id, data) {
  const config = getConfig();
  const url = `${config.url}/rest/v1/${table}?id=eq.${id}`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: apiHeaders(config),
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`UPDATE ${table} id=${id} failed: ${res.status} - ${err}`);
  }
  return res.json();
}

// ---- DELETE: レコード削除 ----
async function deleteRecord(table, id) {
  const config = getConfig();
  const url = `${config.url}/rest/v1/${table}?id=eq.${id}`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: apiHeaders(config)
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`DELETE ${table} id=${id} failed: ${res.status} - ${err}`);
  }
  return true;
}

// ---- UI ユーティリティ ----
function showMsg(el, text, type) {
  el.textContent = text;
  el.className = `msg msg--${type} show`;
  clearTimeout(el._timer);
  el._timer = setTimeout(() => { el.classList.remove('show'); }, 5000);
}

function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ---- 削除確認ダイアログ ----
function confirmDelete(title) {
  return confirm(`「${title}」を削除しますか？\nこの操作は取り消せません。`);
}
