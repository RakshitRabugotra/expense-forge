'use client'

import { useFormStatus } from 'react-dom'
import { type ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentProps<'button'> & {
  pendingText?: string
}

export function SubmitButton({
  children,
  pendingText,
  className,
  ...props
}: Props) {
  const { pending, action } = useFormStatus()

  const isPending = pending && action === props.formAction

  return (
    <button
      {...props}
      type='submit'
      aria-disabled={pending}
      className={twMerge(className, 'inline-flex justify-center gap-6')}
    >
      {isPending ? pendingText : children}
      {isPending && (
        <span className='my-auto inline-block px-2'>
          <div className='loader' style={{ width: '4px' }} />
        </span>
      )}
    </button>
  )
}
