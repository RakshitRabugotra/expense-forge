/* Utilities for chart data processing */

// Constant Dependencies
import { COLORS } from '@/utils/constants'
import { CategorizedExpenses } from './expenses'

// Type definition for the data type in expense pie chart
export type ExpensePieData = {
  labels: string[]
  datasets: [
    {
      data: number[]
      backgroundColor: string[]
    },
  ]
}

/**
 * The function which converts categorized expenses to pie chart data
 * @param categorizedExpenses The categorized expenses of the user
 * @returns Pie Chart data for the expenses
 */
export const getPieChartData = (
  categorizedExpenses: CategorizedExpenses[] | null,
) => {
  // If the categorized expenses are null, the show no data found
  if (!categorizedExpenses || categorizedExpenses.length === 0) {
    return {
      labels: ['No Expense'],
      datasets: [
        {
          data: [100],
          backgroundColor: COLORS.slice(-1),
        },
      ],
    } as ExpensePieData
  }

  // Else return the categorized expenses in pie chart data form
  return {
    labels: categorizedExpenses
      ? categorizedExpenses.map((value) => value.category)
      : ['No Expense'],
    datasets: [
      {
        data: categorizedExpenses
          ? categorizedExpenses.map((value) => value.total)
          : [100],
        backgroundColor:
          categorizedExpenses.length === 0 ? COLORS.slice(-1) : COLORS,
      },
    ],
  } as ExpensePieData
}
