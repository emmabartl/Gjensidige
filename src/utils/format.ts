export function formatMonthlyPrice(yearlyAmount: number): string {
  const monthly = Math.round(yearlyAmount / 12)

  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    maximumFractionDigits: 0,
  }).format(monthly)
}