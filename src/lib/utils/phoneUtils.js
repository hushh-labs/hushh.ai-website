/**
 * Phone number utilities for 2FA implementation
 */

/**
 * Format phone number to international format
 * @param {string} phoneNumber - Raw phone number
 * @returns {string} - Formatted phone number
 */
export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '';
  
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // If it starts with 0, replace with country code (assuming +1 for US/Canada)
  if (cleaned.startsWith('0')) {
    return '+1' + cleaned.substring(1);
  }
  
  // If it doesn't start with +, add it
  if (!phoneNumber.startsWith('+')) {
    return '+' + cleaned;
  }
  
  return phoneNumber;
};

/**
 * Validate phone number format
 * @param {string} phoneNumber - Phone number to validate
 * @returns {boolean} - Whether the phone number is valid
 */
export const validatePhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return false;
  
  // Basic validation for international phone numbers
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  return phoneRegex.test(formatPhoneNumber(phoneNumber));
};

/**
 * Get country code from phone number
 * @param {string} phoneNumber - Phone number
 * @returns {string} - Country code
 */
export const getCountryCode = (phoneNumber) => {
  if (!phoneNumber) return '';
  
  const formatted = formatPhoneNumber(phoneNumber);
  const match = formatted.match(/^\+(\d+)/);
  return match ? match[1] : '';
};

/**
 * Mask phone number for display
 * @param {string} phoneNumber - Phone number to mask
 * @returns {string} - Masked phone number
 */
export const maskPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '';
  
  const formatted = formatPhoneNumber(phoneNumber);
  if (formatted.length < 7) return formatted;
  
  // Show first 3 and last 2 digits
  const start = formatted.substring(0, 3);
  const end = formatted.substring(formatted.length - 2);
  const middle = '*'.repeat(formatted.length - 5);
  
  return `${start}${middle}${end}`;
};

/**
 * Parse phone number components
 * @param {string} phoneNumber - Phone number to parse
 * @returns {object} - Object with country code and national number
 */
export const parsePhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return { countryCode: '', nationalNumber: '' };
  
  const formatted = formatPhoneNumber(phoneNumber);
  const countryCode = getCountryCode(formatted);
  const nationalNumber = formatted.substring(countryCode.length + 1);
  
  return { countryCode, nationalNumber };
}; 