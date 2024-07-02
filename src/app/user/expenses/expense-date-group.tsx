'use client'

import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

// Type definitions
import { Tables } from '@/types/supabase'

// Internal Dependencies
import ExpenseItem from '@/components/Expenses/ExpenseItem'

// Custom Utilities
import { sortByDate } from '@/utils/functions/array'
import SubHeading from '@/components/SubHeading'

// Alias for the type
type Expense = Tables<'expenses'>

export default function ExpenseDateGroup({
  title,
  expenses,
  setSelected,
  setCount,
}: {
  title: string
  expenses: Expense[]
  setSelected: React.Dispatch<React.SetStateAction<Expense | null>>
  setCount: React.Dispatch<React.SetStateAction<number>>
}) {
  // The sorted expenses by date
  const sortedExpenses = useMemo(
    () => expenses.sort((a, b) => sortByDate(a.created_at, b.created_at, true)),
    [expenses],
  )

  return (
    <div>
      <SubHeading>{title}</SubHeading>
      {sortedExpenses.map((value, index) => (
        <ExpenseItem
          key={index}
          {...value}
          onClick={() => {
            setSelected(value)
            setCount((prev) => prev + 1)
          }}
        />
      ))}
    </div>
  )
}
