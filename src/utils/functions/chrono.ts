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
