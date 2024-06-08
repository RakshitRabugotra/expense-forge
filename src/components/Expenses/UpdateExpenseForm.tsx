'use client'

import { animated, useSpring } from '@react-spring/web'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

// Icon dependencies
import { MdClose } from 'react-icons/md'

// Type definitions
import { Tables } from '@/types/supabase'

// Internal Dependencies
import Input from '@/components/Forms/Input'
import moment from 'moment'
import SubmitButton from './expense-submit-button'
import { deleteExpense, updateExpense } from '@/actions/expenses'

// Set an alias for expense type
type Expense = Tables<'expenses'>

export default function UpdateExpenseForm({
  setRefresh,
  expense,
}: {
  setRefresh?: React.Dispatch<React.SetStateAction<number>>
  expense: Expense | null
}) {
  // Create a mutable instance of expense to update
  const [updateExpense, setExpense] = useState<Expense | null>(null)

  // Springs for animations
  const [springs, api] = useSpring(() => ({
    from: { bottom: '-100vh' },
  }))

  const openForm = () => {
    api.start({
      from: {
        bottom: '-100vh',
      },
      to: {
        bottom: '0vh',
      },
    })
  }

  const closeForm = () => {
    api.start({
      from: {
        bottom: '0vh',
      },
      to: {
        bottom: '-100vh',
      },
    })
  }

  // Change the expense, once mounted
  useEffect(() => {
    setExpense(expense)
  }, [expense])

  // Check if the expense changes, then open the update form
  useEffect(() => {
    if (updateExpense !== null) return openForm()
  }, [updateExpense])

  return (
    <>
      <animated.div
        className={twMerge(
          'fixed z-30',
          'bg-transparent',
          'min-h-[50vh] w-full',
        )}
        style={springs}
      >
        <UpdateExpense
          expense={updateExpense}
          setExpense={setExpense}
          closeForm={closeForm}
          setRefresh={setRefresh}
        />
      </animated.div>
    </>
  )
}

function UpdateExpense({
  closeForm,
  expense,
  setExpense,
  setRefresh,
}: {
  closeForm: () => void
  expense: Expense | null
  setExpense: React.Dispatch<React.SetStateAction<Expense | null>>
  setRefresh?: React.Dispatch<React.SetStateAction<number>>
}) {
  // Set the title of the adding section dynamically
  const [name, setName] = useState<string>('')

  // Reference to the form
  const formRef = useRef<HTMLFormElement>(null)

  // Resets the form
  const resetMenu = () => {
    // Reset the state variables
    setName('')
    setExpense(null)
    // Reset the form
    if (formRef?.current) formRef?.current.reset()
    // Close the form
    closeForm()
  }

  return (
    <div
      className={twMerge(
        'min-h-[50vh] w-full',
        'flex flex-col items-center',
        'border-leaf-800 rounded-3xl border-t-2',
        'bg-white/80 text-black backdrop-blur-md',
      )}
    >
      <h3 className='relative w-full p-4 text-3xl font-light capitalize'>
        {name.length !== 0 ? name : 'Update Expense'}
        <MdClose
          className={twMerge(
            'absolute right-4 top-[50%] -translate-y-1/2 font-medium',
          )}
          onClick={() => resetMenu()}
        />
      </h3>

      <form
        className='my-auto flex w-full flex-col justify-around gap-6 p-6'
        ref={formRef}
      >
        <Input
          type='text'
          name='expense-name'
          placeholder='Expense Name'
          aria-label='expense name field'
          defaultValue={expense?.name ?? ''}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          type='text'
          name='expense-category'
          placeholder='Expense Category'
          defaultValue={expense?.category ?? ''}
          aria-label='expense category field'
        />

        <Input
          type='number'
          name='expense-expenditure'
          placeholder='Expenditure'
          defaultValue={expense?.expenditure.toString()}
          aria-label='expense expenditure field'
        />

        <Input
          type='date'
          name='expense-date'
          placeholder='Expense Date'
          defaultValue={
            expense?.expense_date ?? moment.utc().format('YYYY-MM-DD')
          }
          aria-label='expense data field'
        />

        <div className='flex flex-row justify-between gap-4 [&>*]:grow'>
          <SubmitButton
            formAction={async (formData: FormData) => {
              await updateExpense(formData, expense?.id ?? '')
              setExpense(null)
            }}
            onChange={() => {
              if (setRefresh) setRefresh((prev) => ++prev)
              resetMenu()
            }}
          >
            Update
          </SubmitButton>
          <SubmitButton
            formAction={async (formData: FormData) => {
              await deleteExpense(expense?.id ?? '')
              setExpense(null)
            }}
            onChange={() => {
              if (setRefresh) setRefresh((prev) => ++prev)
              resetMenu()
            }}
            className='bg-red-600'
          >
            Delete
          </SubmitButton>
        </div>
      </form>
    </div>
  )
}
