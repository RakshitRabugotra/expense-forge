'use client'

import { useEffect, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
// Custom Utilities
import { TIMELINES, getTimelineExpenses } from '@/utils/functions/expenses'

// Type definitions
import { type Timeline } from '@/utils/functions/expenses'
import type { Tables } from '@/types/supabase'

// Custom Actions
import { getExpenses } from '@/actions/expenses'

// Internal Dependencies
import LineChart from './LineChart'
import SubHeading from '../SubHeading'

// Type Aliasing
type Expense = Tables<'expenses'>

export default function ExpenseTimelineChart() {
  const [timeline, setTimeline] = useState<Timeline>('7-days')
  const [allExpenses, setAllExpenses] = useState<Expense[] | null>(null)

  // Fetch the data for the given timeline
  useEffect(() => {
    getExpenses().then((value) => setAllExpenses(value))
  }, [])

  // Whenever there's a change in the timeline, or expenses we calculate the expenses
  const groupedExpenses = useMemo(
    () => (allExpenses ? getTimelineExpenses(allExpenses, timeline) : null),
    [timeline, allExpenses],
  )

  return (
    <section className='mt-4'>
      <SubHeading className='text-base'>{'See your timeline!'}</SubHeading>
      <div
        className={twMerge(
          'glass my-4 w-full bg-black/10',
          'flex flex-col items-center justify-center',
        )}
      >
        <LineChart
          dateCategorizedExpenses={groupedExpenses}
          className='my-4 px-2'
        />
        <LineChartTabs timeline={timeline} setTimeline={setTimeline} />
      </div>
    </section>
  )
}

function LineChartTabs({
  timeline,
  setTimeline,
}: {
  timeline: Timeline
  setTimeline: React.Dispatch<React.SetStateAction<Timeline>>
}) {
  const style = [
    'rounded-full border-2',
    'px-3 py-1',
    'transition-colors duration-300',
  ]
  const activeStyle = 'border-leaf-300 bg-leaf-300 font-medium text-white'
  const inactiveStyle = 'border-black/50'

  return (
    <div
      className={twMerge(
        'inline-flex w-[75%] flex-wrap items-center justify-around gap-2',
        'mb-4',
      )}
    >
      {TIMELINES.map((tl, index) => (
        <button
          onClick={() => setTimeline(tl)}
          key={index}
          className={twMerge(
            ...style,
            timeline === tl ? activeStyle : inactiveStyle,
          )}
        >
          {tl}
        </button>
      ))}
    </div>
  )
}
