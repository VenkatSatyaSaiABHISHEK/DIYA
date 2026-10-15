/**
 * Formats a numeric value into Indian Rupee (INR) format (e.g. ₹1,24,500).
 * Handles Indian numbering system (Lakhs and Crores) and compact notation.
 */
export function formatINR(
  amount: number,
  options: {
    showDecimals?: boolean;
    compact?: boolean;
  } = {}
): string {
  const { showDecimals = false, compact = false } = options;

  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }

  if (compact) {
    return formatCompactINR(amount);
  }

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: showDecimals ? 2 : 0,
    minimumFractionDigits: showDecimals ? 2 : 0,
  });

  return formatter.format(amount);
}

/**
 * Compact Indian Rupee notation (e.g. ₹45K, ₹12.5L, ₹3.2Cr).
 */
export function formatCompactINR(amount: number): string {
  const abs = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';

  if (abs >= 10000000) {
    // 1 Crore = 10,000,000
    const val = (abs / 10000000).toFixed(1).replace(/\.0$/, '');
    return `${sign}₹${val}Cr`;
  }
  if (abs >= 100000) {
    // 1 Lakh = 100,000
    const val = (abs / 100000).toFixed(1).replace(/\.0$/, '');
    return `${sign}₹${val}L`;
  }
  if (abs >= 1000) {
    // 1 Thousand
    const val = (abs / 1000).toFixed(1).replace(/\.0$/, '');
    return `${sign}₹${val}K`;
  }

  return `${sign}₹${abs.toLocaleString('en-IN')}`;
}

/**
 * Formats a generic number with Indian locale and optional compact representation.
 */
export function formatNumber(
  value: number,
  options: {
    compact?: boolean;
    decimals?: number;
  } = {}
): string {
  const { compact = false, decimals = 0 } = options;

  if (isNaN(value) || value === null || value === undefined) {
    return '0';
  }

  if (compact) {
    const abs = Math.abs(value);
    const sign = value < 0 ? '-' : '';

    if (abs >= 10000000) {
      return `${sign}${(abs / 10000000).toFixed(1).replace(/\.0$/, '')}Cr`;
    }
    if (abs >= 100000) {
      return `${sign}${(abs / 100000).toFixed(1).replace(/\.0$/, '')}L`;
    }
    if (abs >= 1000) {
      return `${sign}${(abs / 1000).toFixed(1).replace(/\.0$/, '')}K`;
    }
  }

  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);
}

/**
 * Formats a percentage value (e.g., 4.25%).
 */
export function formatPercent(value: number, decimals = 1): string {
  if (isNaN(value) || value === null || value === undefined) {
    return '0%';
  }
  return `${value.toFixed(decimals).replace(/\.0$/, '')}%`;
}
