'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useInView, animated } from '@react-spring/web'

// Custom Actions
import { getExpenseThisMonth } from '@/actions/stats'

// Utility functions
import {
  CategorizedExpenses,
  reduceCategorizedExpenses,
} from '@/utils/functions/expenses'
import { COLORS } from '@/utils/functions/chroma'

// Internal Dependencies
import SubHeading from '@/components/SubHeading'

// Type definitions
import { Tables } from '@/types/supabase'

// Content Dependencies
import { simpleReduce } from '@/utils/functions/array'
import { twMerge } from 'tailwind-merge'

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

  return (
    <div className='my-6 flex w-full flex-col gap-2'>
      <SubHeading className='text-base'>
        {'Let us break it down for you!'}
      </SubHeading>
      {!categorizedExpenses.current || !expThisMonth ? (
        <Image
          src={'/breakdance-cat-electronic-jazz.gif'}
          layout={'responsive'}
          height={132}
          width={132}
          alt={`A cute animal!`}
          unoptimized={true}
        />
      ) : categorizedExpenses.current.length > 0 ? (
        <Chart groups={categorizedExpenses.current} stats={stats.current} />
      ) : (
        <p className='animate-in px-2 font-medium text-black/60'>
          No Expenses till now...
        </p>
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
    <div className='glass flex flex-col justify-between rounded-xl bg-black/15 p-2 py-3 backdrop-blur-md'>
      {groups.map((value, index) => {
        // Get the maximum expense, and set the bars according to it

        return (
          <Bar
            key={index}
            title={value.category}
            maxWidthPercentage={100 * (value.total / stats.max)}
            grossPercentage={100 * (value.total / stats.total)}
            color={COLORS[index]}
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
  color,
}: {
  title: string
  maxWidthPercentage: number
  grossPercentage: number
  color: string
}) {
  // Make use of animations to animate this in,
  const [ref, springs] = useInView(() => ({
    from: { width: '0%', opacity: 0, backgroundColor: 'gray' },
    to: {
      width: maxWidthPercentage.toFixed(2) + '%',
      opacity: 1,
      backgroundColor: color,
    },
  }))

  return (
    // The width and the bar of the chart
    <animated.span
      style={springs}
      ref={ref}
      className={twMerge(
        'relative',
        'overflow-visible text-nowrap',
        'capitalize text-white/80',
        'px-2 py-1',
        'my-3 min-h-6',
      )}
    >
      <span
        className={twMerge(
          'absolute top-0 -translate-y-1/2',
          'rounded-full border border-black/40',
          'px-2',
          `bg-black/70 text-white/80 backdrop-blur-md`,
          'font-light',
        )}
      >
        {title + ' - ' + grossPercentage.toFixed(2) + '%'}
      </span>
    </animated.span>
  )
}
