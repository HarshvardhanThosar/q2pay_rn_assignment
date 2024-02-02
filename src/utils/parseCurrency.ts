import {Platform} from 'react-native';

const numberFormatOptionsUSD: Intl.NumberFormatOptions = {
  style: 'currency',
  currency: 'USD',
};
const numberFormatUSD = new Intl.NumberFormat('en-US', numberFormatOptionsUSD);

/**
 * Parse amount with currency symbol and readable separators
 * @param {number} amount Amount to be parsed
 * @param {string} currencySymbol Currency symbol to be prefixed with the amount
 * @returns {string}
 */
function parseCurrency(amount: number, currencySymbol: string = '$'): string {
  const parsed = numberFormatUSD.format(amount);
  return Platform.OS === 'ios' ? `${currencySymbol} ${parsed}` : parsed;
}

export default parseCurrency;
