const locale = {
  USD: 'en',
  NGN: 'en-NG',
  ZWD: 'en-ZW',
  ZMW: 'en-ZM',
  BWP: 'en-BW',
  KES: 'en-KE',
};

export const useCurrencyFormatter = (currency = 'USD') => {
  const currencyFormatter = (value = 0) => {
    return new Intl.NumberFormat(locale[currency as keyof typeof locale], {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(value);
  };

  const customCurrencyFormatter = (value = 0) => {
    return new Intl.NumberFormat('en', {
      notation: 'compact',
      style: 'currency',
      compactDisplay: 'long',
      currency,
      minimumFractionDigits: 2,
    }).format(value);
  };

  return { currencyFormatter, customCurrencyFormatter };
};

export const formatCurrency = (num: number, currency = 'NGN') => {
  return new Intl.NumberFormat(locale[currency as keyof typeof locale], {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(num);
};
