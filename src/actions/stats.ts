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

export const getExpenseThisMonth = async () => {
  'use server'
  // Create a supabase client
  const supabase = await createClient()
  // Get the current logged-in user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) {
    console.error(
      "ERROR: Couldn't authenticate user before getting expenses this month",
      userError,
    )
    return null
  }

  // Define the start month
  const monthStart = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1,
  ).toISOString()
  // Define the end month
  const monthEnd = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    1,
  ).toISOString()

  // Run the query to get the rows
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .lt('expense_date', monthEnd)
    .gt('expense_date', monthStart)
    .eq('user_id', user?.id ?? '')

  // If there's any error, then return nothing
  if (error) {
    console.error(
      "ERROR: Couldn't get the expenses in specified time period",
      error,
    )
    return null
  }

  // Else, return the data
  return data
}

export const getCategorizedExpenses = async () => {
  'use server'
  // Get all the expenses made by the user, categorized by their category
  const supabase = await createClient()
  // Get the current logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If the session is null, then we can't perform the operation
  if (!user) {
    console.error('ERROR: Cannot fetch expenses for a null user')
    return null
  }

  // Fetch all the results matching with the user id
  const rows = await supabase
    .from('expenses')
    .select('*')
    .eq('user_id', user.id)

  // If we didn't receive the rows, then show the error
  if (!rows.data) {
    console.error('ERROR: ' + rows.error.toString())
    return
  }

  // Categorize the rows by their category
  return groupBy(rows.data as Tables<'expenses'>[], (item) => item.category)
}
