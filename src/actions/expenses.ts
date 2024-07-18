'use server'

import { Tables } from '@/types/supabase'
import { checkWithinMonth } from '@/utils/functions/chrono'
import { createClient } from '@/utils/supabase/server'
import { updateDailyLimit } from './user-personalization'
import { SupabaseClient } from '@supabase/supabase-js'

/**
 *
 * @param id The id of the user
 * @returns All the expenses done by the user
 */
export const getExpenses = async () => {
  // Create a supabase client
  const supabase = await createClient()
  // Fetch all the expenses related to that id
  const { data, error } = await supabase.from('expenses').select('*')

  // If we encounter some error
  if (error) {
    console.error('error while fetching the expenses', error)
    return null
  }

  return data
}

/**
 *
 * @param limit The number of records to fetch
 * @returns first 'limit' number of records in chronological order
 */
export const getRecentExpenses = async (limit: number) => {
  // Create a supabase client
  const supabase = await createClient()
  // Fetch all the recent N expenses
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
  // If we encounter some error
  if (error) {
    console.error('error while fetching the recent expenses', error)
    return null
  }

  return data
}

/**
 * Records an expense to the date
 * @param formData The data from the form
 * @returns Query builder form supabase if success, else null
 */
export const recordExpense = async (formData: FormData) => {
  // Create a supabase client
  const supabase = await createClient()

  // Extract the information
  const name = (formData.get('expense-name') as string).toLowerCase()
  const category = (formData.get('expense-category') as string).toLowerCase()
  const date = formData.get('expense-date') as string
  const expenditure = parseInt(formData.get('expense-expenditure') as string)

  const { error } = await supabase.from('expenses').insert([
    {
      name,
      category,
      expense_date: date,
      expenditure,
    } as Tables<'expenses'>,
  ])

  if (error) {
    console.error('error while recording the expense: ', { error })
    return null
  }

  // Else, update the daily limit if we have to
  // If the date of the expendtiure, doesn't match today isn't today, and is within this month
  // then recalculate the daily limit
  return handleDateMismatch(supabase, date)
}

/**
 * Updates an expense to the date
 * @param formData The data from the form
 * @param id The id of the expense to update
 * @returns Query builder form supabase if success, else null
 */
export const updateExpense = async (formData: FormData, id: string) => {
  // Create a supabase client
  const supabase = await createClient()
  // Extract the fields
  const name = (formData.get('expense-name') as string).toLowerCase()
  const category = (formData.get('expense-category') as string).toLowerCase()
  const date = formData.get('expense-date') as string
  const expenditure = parseInt(formData.get('expense-expenditure') as string)

  const { error } = await supabase
    .from('expenses')
    .update({
      name,
      category,
      expense_date: date,
      expenditure,
    } as Tables<'expenses'>)
    .eq('id', id)

  if (error) {
    console.error('error while updating the expense: ', { error })
    return null
  }
  // Else handle if the date falls in this month, update daily limiy
  return handleDateMismatch(supabase, date)
}

/**
 * Deletes an expense to the date
 * @param formData The data from the form
 * @returns Query builder form supabase if success, else null
 */
export const deleteExpense = async (id: string) => {
  // Create a supabase client
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('expenses')
    .select('created_at')
    .eq('id', id)
    .single()

  if (!data || error) {
    console.error('error while fetching the expense to delete with id: ' + id, {
      error,
      data,
    })
    return null
  }
  // Delete the given expense
  const { error: er } = await supabase.from('expenses').delete().eq('id', id)

  if (er) {
    console.error('error while deleting the expense: ', { error: er })
    return null
  }
  // Extract the date
  const { created_at: date } = data

  // If the date of the expense, isn't today, and is within this month then
  // update the daily limit
  return handleDateMismatch(supabase, date)
}

/**
 * Checks if the given expense date is out of range for a transaction (create, update, delete)
 * @param supabase The supabase client to interact with Supabase
 * @param date The date of the expense (created_at)
 */
const handleDateMismatch = async (supabase: SupabaseClient, date: string) => {
  const isWithinMonth = checkWithinMonth(new Date(date))

  // If it isn't the case, we don't need to do anything
  if (!isWithinMonth) return null

  // Else, get the user's monthly limit and update the daily limit accordingly
  const { data, error } = await supabase
    .from('user_personalization')
    .select('monthly_limit')
    .single()

  if (!data || error) {
    console.error('error while fetching the monthly limit of the user: ', {
      data,
      error,
    })
    return null
  }
  // Else, update the daily limit
  return await updateDailyLimit(data.monthly_limit)
}
