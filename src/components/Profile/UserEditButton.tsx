'use client'

import { useRef, useState } from 'react'

// Internal dependencies
import Input from '@/components/Forms/Input'
import BottomModal from '@/components/Modal/BottomModal'
import SubmitButton from '@/components/Forms/SubmitButton'

// Icon dependencies
import { FaEdit } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'

// Type definitions
import { ModalChildProps } from '@/types/modal'
import { User } from '@supabase/supabase-js'

export default function UserEditButton({ user }: { user: User }) {
  const [refresh, setRefresh] = useState<number>(0)

  return (
    <BottomModal
      setRefresh={setRefresh}
      ChildComponent={(props) => <UpdateUserForm {...props} user={user} />}
      OpenButton={({ openForm }) => (
        // To be implemented later on
        <button /*onClick={() => openForm()}*/>
          <FaEdit fontSize={24} className='cursor-pointer text-black/80' />
        </button>
      )}
    />
  )
}

/* Open a modal to update the user information */
function UpdateUserForm({ closeForm, user }: ModalChildProps & { user: User }) {
  // Reference to the form
  const formRef = useRef<HTMLFormElement>(null)

  // Resets the form
  const resetMenu = () => {
    // Reset the form
    if (formRef?.current) formRef?.current.reset()
    // Close the form
    closeForm()
  }

  return (
    <div className='pop-up'>
      <h3 className='relative w-full p-4 text-3xl font-light capitalize'>
        {'Make your changes!'}
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
          defaultValue={user.user_metadata.firstName}
        />

        <Input
          type='text'
          name='expense-category'
          placeholder='Expense Category'
          defaultValue={user.user_metadata.lastName}
          aria-label='expense category field'
        />

        <div className='flex flex-row justify-between gap-4 [&>*]:grow'>
          <SubmitButton
            formAction={async (formData: FormData) => {}}
            onChange={() => {
              resetMenu()
            }}
            className='bg-green-600/70 hover:bg-green-700'
          >
            Update
          </SubmitButton>
        </div>
      </form>
    </div>
  )
}
