'use server'

import { createClient } from '@/utils/supabase/server'

// Type definitions
import { Tables } from '@/types/supabase'

// Custom utilities
import { groupBy } from '@/utils/functions'

/* Server actions related to stats */

export const getExpensesToday = async () => {
  'use server'
}

export const getCategorizedExpenses = async () => {
  'use server'
  // Get all the expenses made by the user, categorized by their category
  const supabase = await createClient()
  // Get the current logged-in user
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If the session is null, then we can't perform the operation
  if (!session) {
    console.error('ERROR: Cannot fetch expenses for a null session')
    return null
  }

  // Fetch all the results matching with the user id
  const rows = await supabase
    .from('expenses')
    .select('*')
    .eq('user_id', session.user.id)

  // If we didn't receive the rows, then show the error
  if (!rows.data) {
    console.error('ERROR: ' + rows.error.toString())
    return
  }

  // Categorize the rows by their category
  return groupBy(rows.data as Tables<'expenses'>[], (item) => item.category)
}
