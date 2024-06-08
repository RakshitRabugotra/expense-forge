'use server'

import { Tables } from '@/types/supabase'
import { createClient } from '@/utils/supabase/server'

export const getExpenses = async (id: string) => {
  // Create a supabase client
  const supabase = await createClient()
  // Fetch all the expenses related to that id
  return await supabase.from('expenses').select('*').eq('user_id', id)
}
