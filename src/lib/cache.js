// src/utils/cache.js

/**
 * A simple in-memory cache with a Time-to-Live (TTL).
 * @type {Map<string, {data: any, timestamp: number}>}
 */
const cache = new Map();

/**
 * Default cache duration in milliseconds (10 minutes).
 */
const DEFAULT_TTL = 10 * 60 * 1000; // 10 minutes

/**
 * Retrieves data from the cache if it's not expired.
 * @param {string} url - The URL used as the cache key.
 * @returns {any | null} The cached data or null if expired or not found.
 */
export const getCachedData = (url) => {
  const cachedEntry = cache.get(url);

  if (!cachedEntry) {
    return null; // Not in cache
  }

  // Check if the data has expired
  const now = Date.now();
  if (now - cachedEntry.timestamp > DEFAULT_TTL) {
    // If expired, remove it from the cache and return null
    cache.delete(url);
    console.log(`Cache for ${url} has expired. Removing.`);
    return null;
  }

  // Data is still fresh
  console.log(`Using cached data for ${url}.`);
  return cachedEntry.data;
};

/**
 * Stores data in the cache with a timestamp.
 * @param {string} url - The URL to use as the cache key.
 * @param {any} data - The data to cache.
 */
export const setCachedData = (url, data) => {
  console.log(`Caching data for ${url}.`);
  cache.set(url, {
    data: data,
    timestamp: Date.now(),
  });
};

/**
 * Clears the entire cache.
 */
export const clearCache = () => {
  cache.clear();
  console.log("Cache has been cleared.");
};
