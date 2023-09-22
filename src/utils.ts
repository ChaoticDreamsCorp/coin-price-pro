export const formatCurrency = function formatCurrency(amount: number, currencyCode: string): string {
  if (!currencyCode) currencyCode = 'USD';
  const formattedString = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
  return formattedString;
}