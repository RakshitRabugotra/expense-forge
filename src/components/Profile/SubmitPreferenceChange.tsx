'use client'

import { useFormStatus } from 'react-dom'

export function SubmitMonthlyLimitChange() {
  const { pending } = useFormStatus()

  const handleSubmit = (formData: FormData) => {
    console.log(formData.get('monthly-limit'))
  }

  return (
    <button type='submit' formAction={handleSubmit}>
      {pending ? 'Recording' : 'Save'}
    </button>
  )
}
