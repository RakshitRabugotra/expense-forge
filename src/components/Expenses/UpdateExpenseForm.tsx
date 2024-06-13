'use client'

import React, { useEffect, useRef, useState } from 'react'
import moment from 'moment'

// Icon dependencies
import { MdClose } from 'react-icons/md'

// Type definitions
import type { Tables } from '@/types/supabase'
import type { ModalOpenButtonProps } from '@/types/modal'

// Internal Dependencies
import Input from '@/components/Forms/Input'
import SubmitButton from '@/components/Forms/SubmitButton'
import BottomModal from '@/components/Modal/BottomModal'

// Custom Actions
import { deleteExpense, updateExpense } from '@/actions/expenses'

// Set an alias for expense type
type Expense = Tables<'expenses'>

export default function UpdateExpenseForm({
  setRefresh,
  refreshCount,
  expense,
}: {
  setRefresh: React.Dispatch<React.SetStateAction<number>>
  refreshCount: number
  expense: Expense | null
}) {
  // Create a mutable instance of expense to update
  const [updateExpense, setExpense] = useState<Expense | null>(null)

  // Change the expense, once mounted
  useEffect(() => {
    setExpense(expense)
  }, [expense, refreshCount])

  return (
    <BottomModal
      setRefresh={setRefresh}
      ChildComponent={(props) => (
        <UpdateExpense {...props} expense={expense} setExpense={setExpense} />
      )}
      OpenButton={(props) => (
        <OpenButton
          {...props}
          updateExpense={updateExpense}
          refreshCount={refreshCount}
        />
      )}
      onClose={() => setExpense(null)}
    />
  )
}

function OpenButton({
  openForm,
  updateExpense,
  refreshCount,
}: ModalOpenButtonProps & {
  updateExpense: Expense | null
  refreshCount: number
}) {
  // This is just a dummy stateful open button

  // Check if the expense changes, then open the update form
  useEffect(() => {
    if (updateExpense !== null) {
      return openForm()
    }

    return () => {
      refreshCount = 0
    }
  }, [updateExpense, refreshCount])

  return <div className='hidden' />
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
    <div className='pop-up'>
      <h3 className='relative w-full p-4 text-3xl font-light capitalize'>
        {name.length !== 0 ? name : 'Update Expense'}
        <MdClose className='pop-up-close' onClick={() => resetMenu()} />
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
            className='bg-emerald-600/70 hover:bg-emerald-700'
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
            className='bg-red-600/70 hover:bg-red-600'
          >
            Delete
          </SubmitButton>
        </div>
      </form>
    </div>
  )
}
