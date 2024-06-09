'use client'

import { useEffect, useState } from 'react'

// Type definitions
import { type User } from '@supabase/supabase-js'
import { type Tables } from '@/types/supabase'

// Custom Actions
import { getExpenses } from '@/actions/expenses'

// Internal Custom Components
import ExpenseItem from './expense-item'
import AddExpenseBtn from '@/components/Expenses/AddExpenseBtn'
import LoadingFallback from '@/components/LoadingFallback'
import UpdateExpenseForm from '@/components/Expenses/UpdateExpenseForm'

// Icon Dependencies
import { RiMoneyDollarCircleFill } from 'react-icons/ri'

type Expense = Tables<'expenses'>

export default function ExpenseList({ user }: { user: User }) {
  // The state variables for the component
  const [expenses, setExpenses] = useState<Expense[] | null>(null)
  // The state variable which will trigger the refresh in fetching the expenses
  const [refresh, setRefresh] = useState<number>(0)

  // The selected expense for the update process
  const [selectedExpense, setSelected] = useState<Expense | null>(null)

  useEffect(() => {
    getExpenses(user.id).then((response) => {
      setExpenses(response.data)
    })
    if (refresh <= 0) return
  }, [user, refresh])

  // If the expenses haven't loaded yet, then show suspense
  if (!expenses) {
    return (
      <div className='flex w-full grow items-center justify-center'>
        <LoadingFallback text={'Fetching Expenses'} />
      </div>
    )
  }

  return (
    <>
      <div className='auto-rows-[minmax(fit-content, auto)] my-4 grid w-full grid-cols-1 gap-6'>
        {expenses?.map((value, index) => {
          return (
            <ExpenseItem
              key={index}
              {...value}
              IconComponent={RiMoneyDollarCircleFill}
              onClick={() => {
                // if the selected isn't equal to the value, then only set
                if (value.id === selectedExpense?.id) return
                else setSelected(value)
              }}
            />
          )
        })}
      </div>
      {/* Add expense button */}
      <AddExpenseBtn setRefresh={setRefresh} />
      {/* Update expense form */}
      <UpdateExpenseForm setRefresh={setRefresh} expense={selectedExpense} />
    </>
  )
}
