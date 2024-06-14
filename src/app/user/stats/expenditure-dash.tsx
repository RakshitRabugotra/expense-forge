'use client'

import { getExpensesToday } from '@/actions/stats'
import { Tables } from '@/types/supabase'
import {
  compressToUnits,
  currencyFormatterINR,
} from '@/utils/functions/currency'
import { reduceExpenses } from '@/utils/functions/expenses'
import { useEffect, useMemo, useState } from 'react'

// Alias for the type
type Expense = Tables<'expenses'>

export function Daily() {
  // The expenses done today in total
  const [expToday, setExpToday] = useState<Expense[] | null>(null)

  // The total of these expenses
  const dailyTotal = useMemo(
    () => (expToday ? reduceExpenses(expToday) : 0),
    [expToday],
  )

  // Fetch the expenses today
  useEffect(() => {
    getExpensesToday().then((value) => setExpToday(value))
  }, [])

  return (
    <div>Daily: {compressToUnits(dailyTotal, currencyFormatterINR, 2)}</div>
  )
}
