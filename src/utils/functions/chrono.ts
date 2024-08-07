/* Util function related to time */
import moment from 'moment'

/**
 * Checks if the given date is wihin 1 month of today, but not today
 * @param day The day to check
 */
export const checkWithinMonth = (day: Date) => {
  // Get today's date
  const today = new Date()
  // Setting the last month's date
  const firstMonthDay = new Date()
  firstMonthDay.setDate(0)

  // Convert to moment format
  const mToday = moment(today).format('YYYY-MM-DD')
  const mDay = moment(day).format('YYYY-MM-DD')
  const mFirstMonthDay = moment(firstMonthDay).format('YYYY-MM-DD')

  // If the date matches today, return false
  if (mToday === mDay) return false
  // If the date matches last-month's last date, yes!
  if (mFirstMonthDay === mDay) return true

  // Return if the given day falls within the range [firstMonthDay, today)
  return firstMonthDay < day && day < today
}

/**
 * @returns Number of days in this month
 */
export const daysInCurrentMonth = () => {
  const newDate = new Date()
  return new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate()
}

/**
 * @returns Number of days left in this month
 */
export const daysLeftInThisMonth = () =>
  daysInCurrentMonth() - new Date().getDate()

// Expenses grouped by date
export type DateGroup<T> = { [date: string]: T[] }

/**
 * Gives the items between a time-frame of days from now
 */
export function getItemsBetweenDays<T>(
  items: T[],
  days: number,
  dateGetter: (item: T) => string,
) {
  // Today's date
  const today = new Date()
  // The day before 'days' number of days
  const last = new Date()
  last.setDate(today.getDate() - days - 1)

  // Convert these to UTC millisecond number
  const todayUTC = today.valueOf()
  const lastUTC = last.valueOf()

  // This will hold the dates between the given time-period
  const DAYS: DateGroup<T> = {}

  // Fill the empty date slots
  for (let i = days; i >= 0; i--) {
    const prev = new Date()
    prev.setDate(today.getDate() - i)

    // Format the date to YYYY-MM-DD
    const dateString = moment.utc(prev).format('YYYY-MM-DD')
    // Check if this doesn't exist in the object, then push
    if (typeof DAYS[dateString] === 'undefined') {
      DAYS[dateString] = new Array<T>()
    }
  }

  // Iterate over the given list and add the matching items to the object
  let itemDateUTC = null
  let itemDateString = null
  for (const item of items) {
    // Get the date of this item
    itemDateString = dateGetter(item)
    // Convert to UTC milliseconds
    itemDateUTC = Date.parse(itemDateString)

    // Check if the itemDate falls within the time period
    // The time period doesn't fall within our interest, so skip
    if (itemDateUTC < lastUTC || todayUTC < itemDateUTC) continue

    // The item is of our interest, append to it
    DAYS[itemDateString].push(item)
  }

  return DAYS
}

/**
 * Gives the items between a time-frame of months from now
 */
// export function getItemsBetweenMonths<T>(
//   items: T[],
//   months: number,
//   dateGetter: (item: T) => string,
// ) {
//   // Today's date
//   const today = new Date()
//   // The today's date before 'month' number of months
//   const last = new Date()
//   last.setMonth(today.getMonth() - months - 1)

//   // Convert these to UTC millisecond number
//   const todayUTC = today.valueOf()
//   const lastUTC = last.valueOf()

//   // This will hold the dates between the given time-period
//   const MONTHS: {
//     [key: string]: T[]
//   } = {}

//   // Fill the empty date slots
//   for (let i = months; i >= 0; i--) {
//     const prev = new Date()
//     prev.setDate(today.getDate() - i)

//     // Format the date to YYYY-MM-DD
//     const dateString = moment.utc(prev).format('YYYY-MM-DD')
//     // Check if this doesn't exist in the object, then push
//     if (typeof DAYS[dateString] === 'undefined') {
//       DAYS[dateString] = new Array<T>()
//     }
//   }

//   // Iterate over the given list and add the matching items to the object
//   let itemDateUTC = null
//   let itemDateString = null
//   for (const item of items) {
//     // Get the date of this item
//     itemDateString = dateGetter(item)
//     // Convert to UTC milliseconds
//     itemDateUTC = Date.parse(itemDateString)

//     // Check if the itemDate falls within the time period
//     // The time period doesn't fall within our interest, so skip
//     if (itemDateUTC < lastUTC || todayUTC < itemDateUTC) continue

//     // The item is of our interest, append to it
//     DAYS[itemDateString].push(item)
//   }

//   return DAYS
// }
