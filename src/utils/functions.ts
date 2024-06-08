/**
 * Makes the program sleep for some time
 * @param ms The milliseconds for which to sleep
 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/* Util function related to list operations */

/**
 * Function to group certain elements in an list by a key
 * @param list
 * @param keyGetter
 * @returns A map with keyof T as key and T[] as value
 */
export function groupBy<T>(
  list: Array<T>,
  keyGetter: (item: T) => string | number,
) {
  // Create a new map
  const map = new Map<string | number, T[]>()
  // Iterate over the list and group the items
  list.forEach((item) => {
    const key = keyGetter(item)
    const collection = map.get(key)
    // If the item doesn't exist in the collection, make a new entry
    // else push
    if (!collection) {
      map.set(key, [item])
    } else {
      collection.push(item)
    }
  })
  return map
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
