'use server'

import { Tables } from '@/types/supabase'
import { createClient } from '@/utils/supabase/server'

export const getExpenses = async (id: string) => {
  // Create a supabase client
  const supabase = await createClient()
  // Fetch all the expenses related to that id
  return await supabase.from('expenses').select('*').eq('user_id', id)
}

export const recordExpense = async (formData: FormData) => {
  // Create a supabase client
  const supabase = await createClient()
  // Get the current logged-in user
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If the session is null, then return and say we couldn't do it
  if (!session) {
    console.log('ERROR: ', 'Cannot Perform Insertion with null session')
    return null
  }

  const name = formData.get('expense-name') as string
  const category = formData.get('expense-category') as string
  const date = formData.get('expense-date') as string
  const expenditure = parseInt(formData.get('expense-expenditure') as string)

  console.log({ user_id: session.user.id, name, category, date, expenditure })

  return await supabase.from('expenses').insert([
    {
      user_id: session.user.id,
      name,
      category,
      expense_date: date,
      expenditure,
    } as Tables<'expenses'>,
  ])
}
