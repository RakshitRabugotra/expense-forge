'use server'

import { Tables } from '@/types/supabase'
import { createClient } from '@/utils/supabase/server'

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
    console.log('ERROR: while fetching the expenses', error)
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
    console.log('ERROR: while fetching the recent expenses', error)
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

  return await supabase.from('expenses').insert([
    {
      name,
      category,
      expense_date: date,
      expenditure,
    } as Tables<'expenses'>,
  ])
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

  return await supabase
    .from('expenses')
    .update({
      name,
      category,
      expense_date: date,
      expenditure,
    } as Tables<'expenses'>)
    .eq('id', id)
}

/**
 * Deletes an expense to the date
 * @param formData The data from the form
 * @returns Query builder form supabase if success, else null
 */
export const deleteExpense = async (id: string) => {
  // Create a supabase client
  const supabase = await createClient()

  return await supabase.from('expenses').delete().eq('id', id)
}
