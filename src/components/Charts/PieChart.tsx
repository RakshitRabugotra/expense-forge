'use client'

import { getCategorizedExpenses } from '@/actions/stats'
import { Tables } from '@/types/supabase'
import { COLORS } from '@/utils/constants'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import { useEffect, useMemo, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { twMerge } from 'tailwind-merge'

ChartJS.register(ArcElement, Tooltip)

const CHART_OPTIONS = {
  plugins: {},
  events: [],
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
}

// Type definition for the data type in expense pie chart
type ExpensePieData = {
  labels: string[]
  datasets: [
    {
      data: number[]
      backgroundColor: string[]
    },
  ]
}

// Alias for the expense entry type
type Expense = Tables<'expenses'>

export default function PieChart({ dailyTotal }: { dailyTotal: number }) {
  // State variables for the pie chart
  const [categorizedExp, setCategorizedExp] = useState<Map<
    string | number,
    Expense[]
  > | null>(null)

  // Get the categorized expenses, when the component mounts
  useEffect(() => {
    getCategorizedExpenses().then((value) => setCategorizedExp(value ?? null))
  }, [])

  console.log(categorizedExp)

  /* The data for expense pie chart */
  const EXPENSE_DATA = useMemo(
    () =>
      categorizedExp
        ? ({
            labels:
              categorizedExp.size === 0
                ? ['No Expense']
                : Array.from(categorizedExp.keys()),
            datasets: [
              {
                data:
                  categorizedExp.size === 0
                    ? [100]
                    : Array.from(categorizedExp.values()).map(
                        // Iterate over the groups of the expense arrays
                        (itemArray) =>
                          // Reduce the array to single valued cumulative expenditure
                          // Get the expenditure from the cumulative group
                          itemArray.reduce((prev, curr) => ({
                            ...prev,
                            expenditure: prev.expenditure + curr.expenditure,
                          })).expenditure,
                      ),
                backgroundColor:
                  categorizedExp.size === 0 ? COLORS.slice(-1) : COLORS,
              },
            ],
          } as ExpensePieData)
        : ({
            labels: ['No Expense'],
            datasets: [
              {
                data: [100],
                backgroundColor: ['#ddd'],
              },
            ],
          } as ExpensePieData),
    [categorizedExp],
  )

  console.log(EXPENSE_DATA)

  return (
    <div className='flex flex-col gap-6'>
      <h3>{"Today's Expense"}</h3>
      <div className='relative flex w-full flex-col justify-center'>
        <Pie data={EXPENSE_DATA} options={CHART_OPTIONS} />
        <div
          className={twMerge(
            'absolute left-0 right-0',
            'mx-auto min-h-[80%] w-[80%] rounded-full',
            'bg-foreground',
            'text-center text-base font-medium text-leaf-200',
            'flex flex-col items-center justify-center gap-2',
          )}
        >
          {/* Calculate the daily expense percentage, based on the limit */}
          <h4 className='text-[32px]'>
            {((dailyTotal * 100) / dailyTotal).toFixed(2) + '%'}
          </h4>
          {/* {dailyLimit && (
            <>
              <div>of daily limit</div>
              <h4 className='text-[32px]'>
                {currencyFormatter.format(dailyLimit.toFixed(2))}
              </h4>
            </>
          )} */}
        </div>
      </div>
    </div>
  )
}
