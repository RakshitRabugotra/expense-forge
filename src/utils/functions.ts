/**
 * Makes the program sleep for some time
 * @param ms The milliseconds for which to sleep
 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Currency formatter for the app (en-IN)
 */
export const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
})
