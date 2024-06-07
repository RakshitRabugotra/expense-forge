'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

// Supabase client for the server
import { createClient } from '@/utils/supabase/server'
import { PROTECTED_URL } from '@/utils/constants'

// Create a supabase client
const supabase = createClient()

/**
 * @returns The metadata of current logged in user
 */
export const getUser = async () => {
  'use server'

  return await supabase.auth.getUser()
}

/**
 * Signs out the user from current session
 * @returns Redirects to the login page
 */
export const signOut = async () => {
  'use server'

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

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = createClient()

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

  const origin = headers().get('origin')
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    return redirect('/login?message=Could not authenticate user')
  }

  return redirect('/login?message=Check email to continue sign in process')
}
