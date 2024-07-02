'use client'

import { twMerge } from 'tailwind-merge'
import { useRef, useState } from 'react'
import moment from 'moment'

// Icon dependencies
import { MdAdd, MdClose } from 'react-icons/md'

// Custom Components
import Input from '@/components/Forms/Input'
import SubmitButton from '@/components/Forms/SubmitButton'
import BottomModal from '@/components/Modal/BottomModal'

// Custom Actions
import { recordExpense } from '@/actions/expenses'

// Type definitions
import type { ModalChildProps, ModalOpenButtonProps } from '@/types/modal'

export default function AddExpenseBtn({
  setRefresh,
}: {
  setRefresh: React.Dispatch<React.SetStateAction<number>>
}) {
  return (
    <BottomModal
      setRefresh={setRefresh}
      ChildComponent={AddExpense}
      OpenButton={OpenButton}
    />
  )
}

function OpenButton({ openForm }: ModalOpenButtonProps) {
  return (
    <button
      onClick={() => openForm()}
      className={twMerge(
        'animate-in shadow-md',
        'fixed bottom-[15vh] right-4 z-10',
        'rounded-full bg-leaf-200 p-4',
        'flex flex-row items-center text-white',
        'hover:bg-leaf-800 focus:bg-leaf-800',
        'transition-colors duration-150 ease-out',
      )}
    >
      <span
        className={twMerge(
          'transition-all',
          'hidden w-0 md:inline-block md:w-full',
        )}
      >
        Add Expense
      </span>
      <MdAdd className='text-4xl font-medium text-background' />
    </button>
  )
}

function AddExpense({ closeForm, setRefresh }: ModalChildProps) {
  // Set the title of the adding section dynamically
  const [name, setName] = useState<string>('')

  // Reference to the form
  const formRef = useRef<HTMLFormElement>(null)

  // Resets the form
  const resetMenu = () => {
    // Reset the state variables
    setName('')
    // Reset the form
    if (formRef?.current) formRef?.current.reset()
    // Close the form
    closeForm()
  }

  return (
    <div className='pop-up'>
      <h3 className='relative w-full p-4 text-3xl font-light capitalize'>
        {name.length !== 0 ? name : 'Add Expense'}
        <MdClose className={'pop-up-close'} onClick={() => resetMenu()} />
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
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          type='text'
          name='expense-category'
          placeholder='Expense Category'
          aria-label='expense category field'
        />

        <Input
          type='number'
          name='expense-expenditure'
          placeholder='Expenditure'
          aria-label='expense expenditure field'
        />

        <Input
          type='date'
          name='expense-date'
          placeholder='Expense Date'
          defaultValue={moment.utc().format('YYYY-MM-DD')}
          aria-label='expense data field'
        />

        <SubmitButton
          formAction={recordExpense}
          onChange={() => {
            if (setRefresh) setRefresh((prev) => ++prev)
            resetMenu()
          }}
        >
          Add Expense
        </SubmitButton>
      </form>
    </div>
  )
}
