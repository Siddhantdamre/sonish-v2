const cacheStore = new Map();

export const PUBLIC_CACHE_KEYS = {
  products: 'public_products',
  product: (id) => `public_product_${id}`,
  categories: 'public_categories',
  banners: 'public_banners',
  settings: 'public_settings',
};

export const PUBLIC_CACHE_TTLS = {
  products: 60 * 1000,
  product: 60 * 1000,
  categories: 5 * 60 * 1000,
  banners: 5 * 60 * 1000,
  settings: 10 * 60 * 1000,
};

const getFreshEntry = (key) => {
  const entry = cacheStore.get(key);
  if (!entry) {
    return null;
  }

  if (entry.expiresAt <= Date.now()) {
    cacheStore.delete(key);
    return null;
  }

  return entry.value;
};

export const withPublicCache = async (key, ttlMs, loader) => {
  const cachedValue = getFreshEntry(key);
  if (cachedValue !== null) {
    return cachedValue;
  }

  const freshValue = await loader();
  cacheStore.set(key, {
    value: freshValue,
    expiresAt: Date.now() + ttlMs,
  });

  return freshValue;
};

export const invalidatePublicCache = (...keys) => {
  keys.flat().forEach((key) => cacheStore.delete(key));
};

export const invalidatePublicCacheByPrefix = (prefix) => {
  for (const key of cacheStore.keys()) {
    if (key.startsWith(prefix)) {
      cacheStore.delete(key);
    }
  }
};

export const setPublicCacheHeaders = (
  res,
  {
    browserSeconds = 60,
    edgeSeconds = browserSeconds,
    staleSeconds = edgeSeconds,
  } = {},
) => {
  res.set(
    'Cache-Control',
    `public, max-age=${browserSeconds}, s-maxage=${edgeSeconds}, stale-while-revalidate=${staleSeconds}`,
  );
};
