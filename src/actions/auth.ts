'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

// Supabase client for the server
import { createClient } from '@/utils/supabase/server'
import { PROTECTED_URL } from '@/utils/constants'

/**
 * @returns The metadata of current session
 */
export const getSession = async () => {
  'use server'
  // Supabase client
  const supabase = await createClient()
  return await supabase.auth.getSession()
}

/**
 * @returns The metadata of current logged in user
 */
export const getUser = async () => {
  'use server'
  const supabase = await createClient()
  return await supabase.auth.getUser()
}

/**
 * Signs out the user from current session
 * @returns Redirects to the login page
 */
export const signOut = async () => {
  'use server'
  // Supabase client
  const supabase = await createClient()
  await supabase.auth.signOut()
  return redirect('/login')
}

/**
 * Signs in the user to the Supabase
 * @param formData The form data from the form
 * @returns Redirects to the protected link
 */
export const signIn = async (formData: FormData) => {
  'use server'
  // Supabase client
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect('/login?message=Could not authenticate user')
  }

  return redirect(PROTECTED_URL)
}

/**
 *
 * @param formData The form data from the form
 * @returns
 */
export const signUp = async (formData: FormData) => {
  'use server'
  // Supabase client
  const supabase = await createClient()

  const origin = headers().get('origin')
  const firstName = formData.get('first-name') as string
  const lastName = formData.get('last-name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { firstName, lastName },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    return redirect('/login?message=Could not authenticate user')
  }

  return redirect('/login?message=Check email to continue sign in process')
}
