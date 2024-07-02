import { Tables } from '@/types/supabase'
import { groupBy, simpleReduce } from './array'
import { DateGroup, getItemsBetweenDays } from './chrono'

/* Util functions related to expenses */
export type CategorizedExpenses = { category: string; total: number }

/**
 * Reduces the expenses down to cumulative expenditure
 * @param expenses The expenses to reduce
 * @returns The reduced expenditure number
 */
export const reduceExpenses = (expenses: Tables<'expenses'>[]) => {
  if (expenses.length === 0) return 0
  return simpleReduce(
    expenses,
    'expenditure',
    (prev, curr) => parseInt(prev as string) + parseInt(curr as string),
  ).expenditure
}

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
      total: reduceExpenses(value),
    } as CategorizedExpenses)
  })
  return exp
}

/**
 * The valid timelines for the expense categorization by date
 */
export type Timeline =
  | '7-days'
  | '10-days'
  | '15-days'
  | '30-days'
  | '2-months'
  | '3-months'
  | '6-months'
  | '1-year'

export const TIMELINES: Timeline[] = [
  '7-days',
  '10-days',
  '15-days',
  '30-days',

  // Will add these later on, if I think it's needed
  // '2-months',
  // '3-months',
  // '6-months',
  // '1-year',
]

export const getTimelineExpenses = (
  expenses: Tables<'expenses'>[],
  timeline: Timeline,
) => {
  let exp: DateGroup<Tables<'expenses'>> | null = null

  // Sort theses expenses in given time-periods
  switch (timeline) {
    case '7-days':
      exp = getItemsBetweenDays(expenses, 7, (i) => i.expense_date)
      break
    case '10-days':
      exp = getItemsBetweenDays(expenses, 10, (i) => i.expense_date)
      break
    case '15-days':
      exp = getItemsBetweenDays(expenses, 15, (i) => i.expense_date)
      break
    case '30-days':
      exp = getItemsBetweenDays(expenses, 30, (i) => i.expense_date)
      break

    case '2-months':
      exp = null
      break
    case '3-months':
      exp = null
      break
    case '6-months':
      exp = null
      break
    case '1-year':
      exp = null
      break
  }

  return reduceCategorizedDateExpenses(exp)
}

/**
 * Reduces the expenses down to dates and total only
 * @param categorizedExpenses The categorized expenses to reduce
 * @returns Reduced version of the expenses, with date and total as keys
 */
export const reduceCategorizedDateExpenses = (
  dateGroupedExpenses: DateGroup<Tables<'expenses'>> | null,
) => {
  // If the argument is null
  if (dateGroupedExpenses === null) return [] as CategorizedExpenses[]

  // Create a buffer to store the results from the grouped-expenses
  const exp = new Array<CategorizedExpenses>()
  // Iterate over each item in the map (object), and get the total of each category
  Object.entries(dateGroupedExpenses).forEach(([date, expenses]) => {
    exp.push({
      category: date,
      total: reduceExpenses(expenses),
    } as CategorizedExpenses)
  })
  return exp
}
