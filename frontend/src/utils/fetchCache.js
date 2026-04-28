const memoryCache = new Map();
const inflightRequests = new Map();
const STORAGE_PREFIX = 'sonish_cache_';

export const CACHE_KEYS = {
  health: 'health',
  settings: 'settings',
  categories: 'categories',
  banners: 'banners',
  products: 'products',
};

export const CACHE_TTLS = {
  health: 60 * 1000,
  settings: 10 * 60 * 1000,
  categories: 10 * 60 * 1000,
  banners: 5 * 60 * 1000,
  products: 5 * 60 * 1000,
};

const getStorageKey = (cacheKey) => `${STORAGE_PREFIX}${cacheKey}`;

const readSessionCache = (cacheKey) => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const rawValue = window.sessionStorage.getItem(getStorageKey(cacheKey));
    return rawValue ? JSON.parse(rawValue) : null;
  } catch {
    return null;
  }
};

const writeSessionCache = (cacheKey, entry) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.sessionStorage.setItem(getStorageKey(cacheKey), JSON.stringify(entry));
  } catch {
    // Ignore storage quota and privacy-mode failures.
  }
};

export const getCachedValue = (cacheKey, ttlMs) => {
  const now = Date.now();
  const memoryEntry = memoryCache.get(cacheKey);

  if (memoryEntry && now - memoryEntry.timestamp < ttlMs) {
    return memoryEntry.data;
  }

  const storedEntry = readSessionCache(cacheKey);
  if (storedEntry && now - storedEntry.timestamp < ttlMs) {
    memoryCache.set(cacheKey, storedEntry);
    return storedEntry.data;
  }

  return null;
};

export const setCachedValue = (cacheKey, data) => {
  const entry = {
    data,
    timestamp: Date.now(),
  };

  memoryCache.set(cacheKey, entry);
  writeSessionCache(cacheKey, entry);

  return data;
};

export const fetchJsonWithCache = async (url, { cacheKey = url, ttlMs = 60 * 1000, timeoutMs = 6000 } = {}) => {
  const cachedValue = getCachedValue(cacheKey, ttlMs);
  if (cachedValue !== null) {
    return cachedValue;
  }

  if (inflightRequests.has(cacheKey)) {
    return inflightRequests.get(cacheKey);
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  const request = fetch(url, { signal: controller.signal })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      return setCachedValue(cacheKey, data);
    })
    .catch((error) => {
      const fallbackValue = getCachedValue(cacheKey, Number.MAX_SAFE_INTEGER);
      if (fallbackValue !== null) {
        return fallbackValue;
      }

      throw error;
    })
    .finally(() => {
      clearTimeout(timeoutId);
      inflightRequests.delete(cacheKey);
    });

  inflightRequests.set(cacheKey, request);
  return request;
};
