import { redirect } from 'next/navigation'
// Custom actions
import { getUser } from '@/actions/auth'
import React from 'react'

export default async function AuthProtected({
  children,
}: {
  children: React.ReactNode
}) {
  const {
    data: { user },
  } = await getUser()

  if (!user) {
    return redirect('/login')
  }

  return <>{children}</>
}
