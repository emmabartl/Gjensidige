// Divides input (yearlyAmount) by 12 to display as monthly
export function formatYearlyPrice(yearlyAmount: number): string {
  const monthly = Math.round(yearlyAmount / 12)

  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    maximumFractionDigits: 0,
  }).format(monthly)
}