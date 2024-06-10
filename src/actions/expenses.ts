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
  return await supabase.from('expenses').select('*')
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
  const name = formData.get('expense-name') as string
  const category = formData.get('expense-category') as string
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
  const name = formData.get('expense-name') as string
  const category = formData.get('expense-category') as string
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
