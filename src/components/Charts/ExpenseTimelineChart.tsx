'use client'

import { getCategorizedExpenses } from '@/actions/stats'
import { useEffect, useMemo, useState } from 'react'

// Type definitions
import {
  TIMELINES,
  getTimelineExpenses,
  type Timeline,
} from '@/utils/functions/expenses'
import { Tables } from '@/types/supabase'
import { getExpenses } from '@/actions/expenses'
import { twMerge } from 'tailwind-merge'

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

  console.log({ groupedExpenses })

  return (
    <div>
      {TIMELINES.map((tl, index) => (
        <div
          onClick={() => setTimeline(tl)}
          key={index}
          className={twMerge(timeline === tl ? 'bg-leaf-300' : '')}
        >
          {tl}
        </div>
      ))}
    </div>
  )
}
