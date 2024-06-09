import { Tables } from '@/types/supabase'
import { MAX_SIGNIFICANT_DIGITS } from './constants'

/* tailwindCSS Util functions */

/**
 * Generates a tailwindCSS style className string for each style and prefix
 * @param styles The styles like ['bg-white', 'text-black']
 * @param prefixes The prefix or state selectors like ['hover', 'focus', 'md']
 * @returns A joined string containing all the styles
 */
export const mapStyles = (styles: string[], prefixes: string[]) =>
  prefixes
    .map((prefix) => styles.map((style) => `${prefix}:${style}`).join(' '))
    .join(' ')

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
  return formatter.format(newValue) + sym
}

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

/* Util functions related to expenses */
export type CategorizedExpenses = { category: string; total: number }

/**
 * Reduces the expenses down to category and total only
 * @param categorizedExpenses The categorized expenses to reduce
 * @returns Reduced version of the map, with category and total as keys
 */
export const reduceCategorizedExpenses = (
  expenses: Tables<'expenses'>[],
): CategorizedExpenses[] => {
  // Categorize the expenses
  const categorizedExpenses = groupBy(expenses, (item) => item.category)
  // Create a buffer to store the results from map
  const exp = new Array<CategorizedExpenses>()
  // Iterate over each item in the map, and get the total of each category
  categorizedExpenses.forEach((value, key) => {
    exp.push({
      category: key,
      total: value.reduce((prev, curr) => ({
        ...prev,
        expenditure: prev.expenditure + curr.expenditure,
      })).expenditure,
    } as CategorizedExpenses)
  })
  return exp
}
