'use client'

// Type definitions
import { Tables } from '@/types/supabase'

// Internal Dependencies
import ExpenseItem from './expense-item'

// Icon dependencies
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'
import { useMemo } from 'react'
import { sortByDate } from '@/utils/functions/array'

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
      <h2
        className={twMerge(
          'my-2 px-2',
          'font-bold text-black/60',
          'rounded-md border-l-8 border-leaf-300',
        )}
      >
        {title}
      </h2>
      {sortedExpenses.map((value, index) => (
        <ExpenseItem
          key={index}
          {...value}
          IconComponent={RiMoneyDollarCircleFill}
          onClick={() => {
            setSelected(value)
            setCount((prev) => prev + 1)
          }}
        />
      ))}
    </div>
  )
}
