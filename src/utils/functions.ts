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

/* Util function related to time */

/**
 * @returns Number of days in this month
 */
export const daysInCurrentMonth = () =>
  new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()

/**
 * @returns Number of days left in this month
 */
export const daysLeftInThisMonth = () =>
  daysInCurrentMonth() - new Date().getDate()
