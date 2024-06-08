'use client'
import { useFormStatus } from 'react-dom'

// Custom actions
import { recordExpense } from '@/actions/expenses'

export default function SubmitButton({
  children,
  onChange,
}: {
  children?: React.ReactNode
  onChange?: () => void
}) {
  const { pending } = useFormStatus()

  return (
    <button
      type='submit'
      className='bg-leaf-800 rounded-xl p-2 text-lg text-white'
      formAction={(formData: FormData) => {
        if (onChange) onChange()
        return recordExpense(formData)
      }}
    >
      {pending ? 'Recording...' : children}
    </button>
  )
}
