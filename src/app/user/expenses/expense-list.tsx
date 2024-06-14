'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

// Type definitions
import { type Tables } from '@/types/supabase'

// Custom Actions
import { getExpenses } from '@/actions/expenses'

// Internal Custom Components
import AddExpenseBtn from '@/components/Expenses/AddExpenseBtn'
import LoadingFallback from '@/components/LoadingFallback'
import UpdateExpenseForm from '@/components/Expenses/UpdateExpenseForm'
import ExpenseDateGroup from './expense-date-group'

// Custom Utilities
import {
  ReducedEntries,
  reduceToGroupedEntries,
  sortByDate,
} from '@/utils/functions/array'

type Expense = Tables<'expenses'>

export default function ExpenseList() {
  // The state variables for the component
  const [expenses, setExpenses] = useState<Expense[] | null>(null)
  // The state variable which will trigger the refresh in fetching the expenses
  const [refresh, setRefresh] = useState<number>(0)
  // The state variable to change every time we click
  const [count, setCount] = useState<number>(0)
  // The Expenses grouped by the date
  const dateGroups = useRef<ReducedEntries<Expense>[] | null>(null)

  // The selected expense for the update process
  const [selectedExpense, setSelected] = useState<Expense | null>(null)

  useEffect(() => {
    // Fetch expenses after every 10 seconds
    getExpenses().then((value) => {
      setExpenses(value)
    })
    if (refresh <= 0) return
  }, [refresh])

  // Every time the expenses change, we get the new group
  dateGroups.current = useMemo(
    () =>
      expenses
        ? reduceToGroupedEntries(
            expenses,
            (i) => i.expense_date,
            (a, b) =>
              sortByDate(a.groupKey as string, b.groupKey as string, true),
          )
        : null,
    [expenses],
  )

  // If the expenses haven't loaded yet, then show suspense
  if (!expenses) {
    return (
      <div className='loading-fallback-page'>
        <LoadingFallback text={'Fetching Expenses'} />
      </div>
    )
  }

  return (
    <>
      <div className='auto-rows-[minmax(fit-content, auto)] my-4 grid w-full grid-cols-1 gap-6'>
        {dateGroups.current &&
          dateGroups.current.map(({ groupKey, entries }, index) => (
            <ExpenseDateGroup
              expenses={entries}
              title={groupKey as string}
              key={index}
              setSelected={setSelected}
              setCount={setCount}
            />
          ))}
      </div>
      {/* Add expense button */}
      <AddExpenseBtn setRefresh={setRefresh} />
      {/* Update expense form */}
      <UpdateExpenseForm
        setRefresh={setRefresh}
        expense={selectedExpense}
        refreshCount={count}
      />
    </>
  )
}
