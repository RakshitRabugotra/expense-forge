'use client'

import { useFormStatus } from 'react-dom'

// Custom actions
import { recordUserPersonalizations } from '@/actions/user-personalization'

// Type definitions
import { HTMLElementProps } from '@/types/page-component'

export function SubmitMonthlyLimitChange(props: HTMLElementProps) {
  const { pending } = useFormStatus()

  return (
    <button type='submit' formAction={recordUserPersonalizations} {...props}>
      {pending ? 'Recording' : 'Save'}
    </button>
  )
}
