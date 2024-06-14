'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useInView, animated } from '@react-spring/web'

// Custom Actions
import { getExpenseThisMonth } from '@/actions/stats'

// Utility functions
import {
  CategorizedExpenses,
  reduceCategorizedExpenses,
} from '@/utils/functions/expenses'

// Internal Dependencies
import LoadingFallback from '@/components/LoadingFallback'
import SubHeading from '@/components/SubHeading'

// Type definitions
import { Tables } from '@/types/supabase'

// Content Dependencies
import { COLORS } from '@/utils/constants'
import { simpleReduce } from '@/utils/functions/array'

type Expense = Tables<'expenses'>

export default function BarChart() {
  // The State variables needed for the bar chart
  const [expThisMonth, setExpThisMonth] = useState<Expense[] | null>(null)
  // The state variable for this
  const categorizedExpenses = useRef<CategorizedExpenses[] | null>(null)
  // The maximum expense
  const stats = useRef<{ max: number; total: number }>({
    max: -Infinity,
    total: 0,
  })

  // Fetch the expenses, on mount
  useEffect(() => {
    getExpenseThisMonth().then((expenses) => setExpThisMonth(expenses))
  }, [])

  // The categorized expenses this month
  categorizedExpenses.current = useMemo(
    () => (expThisMonth ? reduceCategorizedExpenses(expThisMonth) : null),
    [expThisMonth],
  )

  stats.current = useMemo(
    () => ({
      max: categorizedExpenses.current
        ? Math.max(...categorizedExpenses.current.map((i) => i.total))
        : Infinity,
      total:
        categorizedExpenses.current && categorizedExpenses.current.length > 0
          ? simpleReduce(
              categorizedExpenses.current,
              'total',
              (prev, curr) =>
                parseInt(prev as string) + parseInt(curr as string),
            ).total
          : 0,
    }),
    [categorizedExpenses.current],
  )

  /* While the data has not been fetched */
  if (!categorizedExpenses.current || !expThisMonth)
    return (
      <div className='my-6 flex w-full flex-col gap-6'>
        <LoadingFallback text='Fetching stats' />
      </div>
    )

  return (
    <div className='my-6 flex w-full flex-col gap-6'>
      <SubHeading className='text-base'>
        {'Let us break it down for you!'}
      </SubHeading>
      {categorizedExpenses.current.length > 0 ? (
        <Chart groups={categorizedExpenses.current} stats={stats.current} />
      ) : (
        <div>No Expenses till now...</div>
      )}
    </div>
  )
}

function Chart({
  groups,
  stats,
}: {
  groups: CategorizedExpenses[]
  stats: { max: number; total: number }
}) {
  return (
    <div className='flex flex-col justify-between'>
      {groups.map((value, index) => {
        // Get the maximum expense, and set the bars according to it

        return (
          <Bar
            key={index}
            title={value.category}
            maxWidthPercentage={100 * (value.total / stats.max)}
            grossPercentage={100 * (value.total / stats.total)}
            index={index}
          />
        )
      })}
    </div>
  )
}

function Bar({
  title,
  maxWidthPercentage,
  grossPercentage,
  index,
}: {
  title: string
  maxWidthPercentage: number
  grossPercentage: number
  index: number
}) {
  // Make use of animations to animate this in,
  const [ref, springs] = useInView(() => ({
    from: { width: '0%', opacity: 0, backgroundColor: 'gray' },
    to: {
      width: maxWidthPercentage.toFixed(2) + '%',
      opacity: 1,
      backgroundColor: COLORS[index],
    },
  }))

  return (
    <animated.span
      style={springs}
      ref={ref}
      className='overflow-visible text-nowrap text-black'
    >
      {title + ' - ' + grossPercentage.toFixed(2) + '%'}
    </animated.span>
  )
}
