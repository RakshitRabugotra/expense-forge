'use client'
import { useFormStatus } from 'react-dom'
import { twMerge } from 'tailwind-merge'

export default function SubmitButton({
  children,
  className,
  formAction,
  onChange,
}: {
  children?: React.ReactNode
  className?: string
  formAction: (formData: FormData) => void
  onChange?: () => void
}) {
  const { pending } = useFormStatus()

  return (
    <button
      type='submit'
      className={twMerge(
        'bg-leaf-800 rounded-xl p-2 text-lg text-white',
        className,
      )}
      formAction={(formData: FormData) => {
        if (onChange) onChange()
        return formAction(formData)
      }}
    >
      {pending ? 'Recording...' : children}
    </button>
  )
}
