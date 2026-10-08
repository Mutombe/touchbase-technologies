export const cn = (...c) => c.filter(Boolean).join(' ');

export const money = (n, opts = {}) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: opts.cents ? 2 : 0,
    minimumFractionDigits: opts.cents ? 2 : 0,
  }).format(n || 0);

export const orderNumber = () =>
  'TB-' + new Date().getFullYear().toString().slice(2) + Math.random().toString(36).slice(2, 7).toUpperCase();
