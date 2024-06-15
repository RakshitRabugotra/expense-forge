'use client'

import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Doughnut, Pie } from 'react-chartjs-2'
import { twMerge } from 'tailwind-merge'

// Internal Dependencies
import SubHeading from '@/components/SubHeading'
import LoadingFallback from '../LoadingFallback'

// Custom Actions
import { getExpensesToday } from '@/actions/stats'

// Type definitions
import type { Tables } from '@/types/supabase'
import type { ExpensePieData } from '@/utils/functions/chart'
import type { HTMLElementProps } from '@/types/page-component'
import type { CategorizedExpenses } from '@/utils/functions/expenses'

// Custom Utilities
import {
  compressToUnits,
  currencyFormatterINR,
} from '@/utils/functions/currency'
import { reduceCategorizedExpenses } from '@/utils/functions/expenses'
import { getPieChartData } from '@/utils/functions/chart'
import { simpleReduce } from '@/utils/functions/array'

// Constant dependencies
import { COLORS, PROTECTED_URL } from '@/utils/constants'
import Link from 'next/link'

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

// Alias for the expense entry type
type Expense = Tables<'expenses'>

export default function DoughnutChart({
  id,
  className,
  dailyLimit,
}: HTMLElementProps & { dailyLimit: number }) {
  // State variables for the pie chart
  const [expenses, setExpenses] = useState<Expense[] | null>(null)
  // Sort them into categories
  const categorizedExp = useRef<CategorizedExpenses[] | null>(null)
  // Get the total of the expenses
  const dailyTotal = useRef<number>(0)

  // Get the categorized expenses, when the component mounts
  useEffect(() => {
    getExpensesToday().then((value) => setExpenses(value))
  }, [])

  console.log({ expenses })

  // Set the categorized expenses
  categorizedExp.current = useMemo(
    () => (expenses ? reduceCategorizedExpenses(expenses) : null),
    [expenses],
  )

  // Set the total
  dailyTotal.current = useMemo(
    () =>
      categorizedExp.current && categorizedExp.current.length > 0
        ? simpleReduce(
            categorizedExp.current,
            'total',
            (prev, curr) => parseInt(prev as string) + parseInt(curr as string),
          ).total
        : 0,
    [categorizedExp.current],
  )

  /* The percentage of daily limit used by the user */
  const dailyLimitExpenditurePercent = useMemo(() => {
    console.log('daily total: ', dailyTotal.current)
    let number = 0
    if (dailyTotal.current !== 0 && dailyLimit) {
      number = (dailyTotal.current * 100) / dailyLimit
    }
    return number.toFixed(2) + '%'
  }, [dailyLimit, dailyTotal.current])

  /* The data for expense pie chart */
  const EXPENSE_DATA = useMemo(
    () => getPieChartData(categorizedExp.current),
    [categorizedExp.current],
  )

  return (
    <>
      <SubHeading>
        Today's Expenses{' '}
        <Link
          href={`${PROTECTED_URL}/stats`}
          className='float-right my-auto inline-block text-sm text-black/50 underline underline-offset-4'
        >
          {'See all >'}
        </Link>
      </SubHeading>
      <article
        id={id}
        className={twMerge(
          'flex w-full flex-col rounded-xl bg-black/70',
          className,
        )}
      >
        <section className='relative flex w-full flex-col items-center justify-center p-4'>
          <Doughnut data={EXPENSE_DATA} options={CHART_OPTIONS} />
          <ChartStats
            dailyLimit={dailyLimit}
            dailyLimitPercent={dailyLimitExpenditurePercent}
          />
        </section>
        <PieChartLegends
          total={dailyTotal.current}
          expenseData={EXPENSE_DATA}
        />
      </article>
    </>
  )
}

function ChartStats({
  dailyLimit,
  dailyLimitPercent,
}: {
  dailyLimit: number
  dailyLimitPercent: string
}) {
  return (
    <div
      className={twMerge(
        'absolute left-0 right-0 top-1/2 -translate-y-1/2',
        'mx-auto aspect-square min-w-0 max-w-[60%] rounded-full',
        'bg-foreground',
        'text-center text-base font-medium text-leaf-200',
        'flex flex-col items-center justify-center gap-2',
      )}
    >
      {/* Calculate the daily expense percentage, based on the limit */}
      <h4 className='text-[32px]'>{dailyLimitPercent}</h4>

      <div>of daily limit</div>
      <h4 className='text-[32px]'>
        {compressToUnits(dailyLimit, currencyFormatterINR, 2)}
      </h4>
    </div>
  )
}

type ColorMap = Map<string, { color: string; part: string }>

// The legends for the pie chart
function PieChartLegends({
  total,
  expenseData: { labels: keys, datasets },
}: {
  total: number
  expenseData: ExpensePieData
}) {
  // Create a color map from the given data
  const colorMap = useMemo(() => {
    // Set the new color map
    const tempMap = new Map() as ColorMap
    for (let i = 0; i < Math.min(keys.length, COLORS.length); i++) {
      tempMap.set(keys[i], {
        color: datasets[0].backgroundColor[i],
        part:
          total > 0
            ? (100 * (datasets[0].data[i] / total)).toFixed(2) + '%'
            : '0%',
      })
    }
    return tempMap
  }, [keys, datasets])

  return (
    <div className='flex w-full flex-col items-center justify-center px-8 pb-4'>
      {Array.from(colorMap).map((pair, index) => {
        // The first item in the pair is label name,
        // The second item in the pair is the label color
        const { color, part } = pair[1]
        const legendName = pair[0]
        return (
          <div
            className='inline-flex w-full items-center justify-start gap-4 p-2 text-base capitalize text-white/90'
            key={index}
          >
            <div
              className='h-6 w-6 rounded-lg'
              style={{ backgroundColor: color }}
            ></div>
            <div className='grow'>{legendName}</div>
            <div className='text-base font-medium' style={{ color: color }}>
              {part}
            </div>
          </div>
        )
      })}
    </div>
  )
}