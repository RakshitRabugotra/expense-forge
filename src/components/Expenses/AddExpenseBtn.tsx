'use client'

import { useSpring, animated } from '@react-spring/web'
import React, { SetStateAction, useRef, useState } from 'react'

// Icon dependencies
import { MdAdd, MdClose } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'

// Custom Components
import Input from '@/components/Forms/Input'
import moment from 'moment'
import SubmitButton from './expense-submit-button'

// Custom Actions
import { recordExpense } from '@/actions/expenses'

export default function AddExpenseBtn({
  setRefresh,
}: {
  setRefresh?: React.Dispatch<SetStateAction<number>>
}) {
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

  return (
    <>
      <animated.div
        className={twMerge(
          'fixed z-20',
          'bg-transparent',
          'min-h-[50vh] w-full',
        )}
        style={springs}
      >
        <AddExpense closeForm={closeForm} setRefresh={setRefresh} />
      </animated.div>

      {/* Toggle button for the form */}
      <button
        onClick={() => openForm()}
        className={twMerge(
          'animate-in shadow-md',
          'fixed bottom-[15vh] right-4 z-10',
          'bg-leaf-200 rounded-full p-4',
        )}
      >
        <MdAdd className='text-4xl font-medium text-background' />
      </button>
    </>
  )
}

function AddExpense({
  closeForm,
  setRefresh,
}: {
  closeForm: () => void
  setRefresh?: React.Dispatch<SetStateAction<number>>
}) {
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
    <div
      className={twMerge(
        'min-h-[50vh] w-full',
        'flex flex-col items-center',
        'border-leaf-800 rounded-3xl border-t-2',
        'bg-white/80 text-black backdrop-blur-md',
      )}
    >
      <h3 className='relative w-full p-4 text-3xl font-light capitalize'>
        {name.length !== 0 ? name : 'Add Expense'}
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
