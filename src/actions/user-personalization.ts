'use server'

import { Tables } from '@/types/supabase'
import { daysLeftInThisMonth } from '@/utils/functions/chrono'
import { createClient } from '@/utils/supabase/server'
import moment from 'moment'
import { getExpenseThisMonth } from './stats'
import { simpleReduce } from '@/utils/functions/array'

// Alias for the type
type Personalization = Tables<'expenses'>

/**
 *
 * @returns The user preferences that is logged in
 */
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

  // Else return the data
  return data
}

/**
 * Updates the required fields in the table
 * @param formData The form data from the form
 * @returns The data updated in the table
 */
export const recordUserPersonalizations = async (formData: FormData) => {
  // The required fields
  const monthly_limit = parseInt(formData.get('monthly_limit') as string)

  // Create a supabase client
  const supabase = await createClient()

  // Get the user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    console.log("ERROR: Couldn't update the preference for null user")
    return null
  }

  // Check if the record exits
  const { error: rowFetchError } = await supabase
    .from('user_personalization')
    .select('*')
    .eq('user_id', user.id)
    .single()
  // If the record doesn't exists, then send an insertion request
  if (rowFetchError && rowFetchError.code === 'PGRST116') {
    // This means the record doesn't exists, insert a new row
    const { data, error } = await supabase.from('user_personalization').insert([
      {
        monthly_limit,
        daily_limit: Math.floor(monthly_limit / daysLeftInThisMonth()),
        updated_at: moment.utc().format('YYYY-MM-DD'),
      },
    ])

    if (error) {
      console.log("ERROR: Couldn't update the user preferences", error)
      return null
    }
    return data
  }

  // Else send an insert query
  const { data, error } = await supabase
    .from('user_personalization')
    // To get the daily-limit, we divide the monthly-limit by the days left in this month
    // which gives the average expenditure for each day for this month
    .update({
      monthly_limit,
      daily_limit: Math.floor(monthly_limit / daysLeftInThisMonth()),
      updated_at: moment.utc().format('YYYY-MM-DD'),
    })
    .eq('user_id', user.id)
    .select()

  if (error) {
    console.log("ERROR: Couldn't update the user preferences", error)
    return null
  }

  return data
}

/**
 * Updates the daily limit with regard to the new date
 */
export const updateDailyLimit = async (monthlyLimit: number) => {
  // The expenditure done by the user this month
  const expenditureThisMonth = await getExpenseThisMonth()
  let monthTotalNow = 0

  // If there are no expenditures this month, then the total is 0
  if (!expenditureThisMonth) {
    monthTotalNow = 0
  } else {
    // If the length is zero, then return empty result
    if (expenditureThisMonth.length === 0) return 0
    // Get the total expenditure this month
    monthTotalNow = simpleReduce(
      expenditureThisMonth,
      'expenditure',
      (prev, curr) => parseInt(prev as string) + parseInt(curr as string),
    ).expenditure
  }

  // Days left in this month
  const daysLeft = daysLeftInThisMonth()

  // Divide the monthly limit by this number
  const daily_limit = Math.floor(
    Math.max(0, monthlyLimit - monthTotalNow) / daysLeft,
  )

  // Create a supabase client
  const supabase = await createClient()

  // Get the current logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    console.log('ERROR: Cannot update preference for a null user')
    return null
  }

  // Make the query for updating
  const { data, error } = await supabase
    .from('user_personalization')
    .update({ daily_limit, updated_at: moment.utc().format('YYYY-MM-DD') })
    .eq('user_id', user.id)
    .select()

  if (error) {
    console.log("ERROR: Couldn't update the daily limit for user", error)
    return null
  }

  return data
}

/**
 * Registers a given avatar to the user
 * @param avatar The avatar html string (containing svg code)
 * @returns The data on successful insertion, else null
 */
export const recordAvatar = async (avatar: string) => {
  // Create a supabase client
  const supabase = await createClient()

  // Get the current logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    console.log('ERROR: Cannot update avatar for a null user')
    return null
  }

  // Make the query for updating
  const { data, error } = await supabase
    .from('user_personalization')
    .update({
      avatar,
    })
    .eq('user_id', user.id)
    .select()

  if (error) {
    console.log("ERROR: Couldn't update the avatar for user", error)
    return null
  }

  return data
}
