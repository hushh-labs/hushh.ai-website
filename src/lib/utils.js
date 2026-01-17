import { format } from 'date-fns';

/**
 * Format a date string into a readable format
 * @param {string|Date} date - The date to format
 * @param {string} formatStr - The format string to use
 * @returns {string} The formatted date
 */
export function formatDate(date, formatStr = 'd MMMM yyyy') {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, formatStr);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}

/**
 * Calculate reading time for a given content
 * @param {string} content - The content to calculate reading time for
 * @param {number} wordsPerMinute - Average reading speed
 * @returns {number} Reading time in minutes
 */
export function calculateReadingTime(content, wordsPerMinute = 238) {
  if (!content) return 0;
  
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime < 1 ? 1 : readingTime;
}

/**
 * Creates a clean slug from a string
 * @param {string} str - The string to slugify
 * @returns {string} A URL-friendly slug
 */
export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Truncate a string to a specified length
 * @param {string} str - The string to truncate
 * @param {number} length - The maximum length
 * @returns {string} The truncated string
 */
export function truncateString(str, length = 100) {
  if (!str || str.length <= length) return str;
  return `${str.substring(0, length)}...`;
}

/**
 * Gracefully handle image paths in MDX content
 * @param {string} imagePath - The image path
 * @returns {string} A properly formatted image path
 */
export function getImagePath(imagePath) {
  if (!imagePath) return '';
  
  // If it's already a full URL, return it as is
  if (imagePath.startsWith('http')) return imagePath;
  
  // Otherwise, clean up the path
  return imagePath.replace('../public', '');
} 

/**
 * Extract a UUID from a string value.
 * @param {string} value - The value that may contain a UUID
 * @returns {string|null} The UUID or null if not found
 */
export function extractUuid(value) {
  if (!value) return null;
  const text = String(value).trim();
  const match = text.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
  return match ? match[0] : null;
}

/**
 * Resolve the site base URL, preferring the current origin in the browser.
 * @returns {string} The base URL without a trailing slash
 */
export function getSiteUrl() {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl) {
    const normalizedEnv = /^https?:\/\//i.test(envUrl) ? envUrl : `https://${envUrl}`;
    return normalizedEnv.replace(/\/$/, '');
  }
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin.replace(/\/$/, '');
  }
  return 'https://www.hushh.ai';
}
