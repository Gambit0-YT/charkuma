// fetch con timeout y User-Agent (algunas APIs, como mcsrvstat, lo exigen).
const UA = 'CharkumaDiscordBot/1.0 (+https://charkuma.es)';

async function request(url, { timeoutMs = 15000, headers = {}, ...opts } = {}) {
  const res = await fetch(url, {
    ...opts,
    headers: { 'User-Agent': UA, ...headers },
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} en ${new URL(url).host}`);
  return res;
}

const getJson = async (url, opts) => (await request(url, opts)).json();
const getText = async (url, opts) => (await request(url, opts)).text();

module.exports = { request, getJson, getText };
