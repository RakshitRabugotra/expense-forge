'use client'

import { useEffect, useState } from 'react'

// Type definitions
import { type User } from '@supabase/supabase-js'
import { type Tables } from '@/types/supabase'

// Custom Actions
import { getExpenses } from '@/actions/expenses'

// Internal Custom Components
import ExpenseItem from './expense-item'

// Icon Dependencies
import { RiMoneyDollarCircleFill } from 'react-icons/ri'

type Expense = Tables<'expenses'>

export default function ExpenseList({ user }: { user: User }) {
  // The state variables for the component
  const [expenses, setExpenses] = useState<Expense[] | null>(null)

  useEffect(() => {
    getExpenses(user.id).then((response) => {
      console.log(response)
      setExpenses(response.data)
    })
  }, [user])

  // If the expenses haven't loaded yet, then show suspense
  if (!expenses) {
    return <div>fetching expenses...</div>
  }

  return (
    <div className='auto-rows-[minmax(fit-content, auto)] grid w-full grid-cols-1 gap-6'>
      {expenses?.map((value, index) => {
        return (
          <ExpenseItem
            key={index}
            {...value}
            IconComponent={RiMoneyDollarCircleFill}
          />
        )
      })}
    </div>
  )
}
