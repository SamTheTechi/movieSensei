const fetchJson = async (url, options, retries = 2, timeoutMs = 10000) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    if (!res.ok) {
      const error = new Error(`Upstream error: ${res.status}`);
      error.status = res.status;
      throw error;
    }
    return await res.json();
  } catch (err) {
    if (retries > 0) {
      return fetchJson(url, options, retries - 1, timeoutMs);
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
};

module.exports = fetchJson;
module.exports.fetchJson = fetchJson;
