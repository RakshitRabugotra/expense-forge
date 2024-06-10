import { MAX_SIGNIFICANT_DIGITS } from '../constants'

/**
 * Currency formatter for the app (en-IN)
 */
export const currencyFormatterINR = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumSignificantDigits: MAX_SIGNIFICANT_DIGITS,
})

/**
 * Forms the number in popular metric units
 * (K: Thousand, M: Million, B: Billion, T: Trillion)
 *
 */
export const compressToUnits = (
  currency: number,
  formatter: Intl.NumberFormat,
  fixedDigits?: number,
) => {
  // Out format guide
  const guide = [
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'B' },
  ]

  let sym = ''
  let newValue = currency
  // Replace the number with this formatted version
  guide.forEach(({ value, symbol }) => {
    if (currency >= value) {
      newValue = currency / value
      sym = symbol
    }
  })

  // Return the formatted version of the currency
  return (
    formatter.format(
      fixedDigits ? parseFloat(newValue.toFixed(fixedDigits)) : newValue,
    ) + sym
  )
}
