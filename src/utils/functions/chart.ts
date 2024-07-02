/* Utilities for chart data processing */

// Constant Dependencies
import { CategorizedExpenses } from './expenses'
import { generateColors } from './chroma'

// Type definition for the data type in expense pie chart
export interface ExpensePieData {
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
          backgroundColor: generateColors(0),
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
          categorizedExpenses.length === 0
            ? generateColors(0)
            : generateColors(categorizedExpenses.length),
      },
    ],
  } as ExpensePieData
}

// Type definition for LineChart
export interface LineChartData {
  labels: string[]
  datasets: [
    {
      data: number[]
      label: string
      backgroundColor: string
      borderColor: string
      fill: boolean
    },
  ]
}

export const getLineChartData = (
  categorizedDateExpenses: CategorizedExpenses[] | null,
) => {
  const borderColor = '#81c995'
  const backgroundColor = '#81c995dd'

  // If the categorized expenses are null, the show no data found
  if (!categorizedDateExpenses || categorizedDateExpenses.length === 0) {
    return {
      labels: ['No Expense'],
      datasets: [
        {
          data: [100],
          label: 'Expenditure',
          backgroundColor,
          borderColor,
          fill: false,
        },
      ],
    } as LineChartData
  }

  // Else return the categorized expenses in pie chart data form
  return {
    labels: categorizedDateExpenses
      ? categorizedDateExpenses.map((value) => value.category)
      : ['No Expense'],
    datasets: [
      {
        data: categorizedDateExpenses
          ? categorizedDateExpenses.map((value) => value.total)
          : [100],
        label: 'Expenditure',
        borderColor,
        backgroundColor,
        fill: true,
      },
    ],
  } as LineChartData
}
