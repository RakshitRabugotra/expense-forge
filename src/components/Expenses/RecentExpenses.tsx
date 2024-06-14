'use client'

import { useEffect, useState } from 'react'

// Type definitions
import type { Tables } from '@/types/supabase'

// Custom Actions
import { getRecentExpenses } from '@/actions/expenses'

// Internal Dependencies
import LoadingFallback from '../LoadingFallback'
import ExpenseItem from './ExpenseItem'

type Expense = Tables<'expenses'>

/**
 *
 * @returns A list of recent expenses, can be provided with a limit
 */
export default function RecentExpenses({ limit }: { limit: number }) {
  const [expenses, setExpenses] = useState<Expense[] | null>(null)

  // Fetch the 'n' number of recent expenses
  useEffect(() => {
    getRecentExpenses(limit).then((value) => {
      setExpenses(value)
    })
  }, [])

  if (!expenses) {
    return <LoadingFallback text='Getting recent expenses' />
  }

  return (
    <>
      {expenses.map((expense, index) => (
        <div
          key={index}
          className='inline-flex w-full gap-2 overflow-hidden rounded-xl'
        >
          <ExpenseDate date={expense.expense_date} />
          <ExpenseItem {...expense} className='grow' />
        </div>
      ))}
    </>
  )
}

function ExpenseDate({ date }: { date: string }) {
  // Split the Year, Month, Day
  const [year, month, day] = date.split('-')
  const monthDate = new Date()
  monthDate.setMonth(parseInt(month))

  return (
    <div className='flex min-w-[15%] flex-col items-center justify-center rounded-lg border bg-leaf-800/80 p-2 text-white'>
      <span>{day}</span>
      <span>{monthDate.toLocaleString('en-IN', { month: 'short' })}</span>
    </div>
  )
}
