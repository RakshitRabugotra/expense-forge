'use server'

import { createClient } from '@/utils/supabase/server'

export const getUserPersonalizations = async () => {
  'use server'
  // Create a supabase client instance
  const supabase = await createClient()

  // Else, fetch the preference of this user
  const { data, error } = await supabase
    .from('user_personalization')
    .select('*')
    .single()

  // If there is some
  if (error) {
    console.error(
      'ERROR: Something went wrong while fetching the preferences',
      error,
    )
    return null
  }

  console.log({ data })

  // Else return the data
  return data
}
