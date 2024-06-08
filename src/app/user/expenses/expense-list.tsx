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

// Icon Dependencies
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import UpdateExpenseForm from '@/components/Expenses/UpdateExpenseForm'

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
      console.log(response)
      setExpenses(response.data)
    })
    if (refresh <= 0) return
  }, [user, refresh])

  // If the expenses haven't loaded yet, then show suspense
  if (!expenses) {
    return <div>fetching expenses...</div>
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
              onClick={() => setSelected(value)}
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
