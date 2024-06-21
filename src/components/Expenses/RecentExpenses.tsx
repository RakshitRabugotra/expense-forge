'use client'

import { useEffect, useState } from 'react'

// Type definitions
import type { Tables } from '@/types/supabase'

// Custom Actions
import { getRecentExpenses } from '@/actions/expenses'

// Internal Dependencies
import LoadingFallback from '../LoadingFallback'
import ExpenseItem from './ExpenseItem'
import { twMerge } from 'tailwind-merge'

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
          className={twMerge(
            'my-1 inline-flex w-full overflow-hidden',
            'rounded-xl border',
            'shadow-sm',
          )}
        >
          <ExpenseDate date={expense.expense_date} />
          <ExpenseItem {...expense} className='grow rounded-none' />
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
    <div className='flex min-w-[15%] flex-col items-center justify-center border bg-leaf-950 p-2 text-white'>
      <span>{day}</span>
      <span>{monthDate.toLocaleString('en-IN', { month: 'short' })}</span>
    </div>
  )
}
