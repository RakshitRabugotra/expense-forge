import { Tables } from '@/types/supabase'
import { groupBy, simpleReduce } from './array'

/* Util functions related to expenses */
export type CategorizedExpenses = { category: string; total: number }

/**
 * Reduces the expenses down to cumulative expenditure
 * @param expenses The expenses to reduce
 * @returns The reduced expenditure number
 */
export const reduceExpenses = (expenses: Tables<'expenses'>[]) => {
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
