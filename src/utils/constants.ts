import { Tables } from '@/types/supabase'
import { ComponentProps } from 'react'

/**
 * The metadata about the app
 */

export const APP_NAME = 'ExpenseForge'
export const APP_SLOGAN = 'Sculpt Your Finances'
export const APP_DESCRIPTION =
  "ExpenseForge is your ultimate personal finance companion, designed to help you master your money with ease and confidence. Whether you're looking to track your daily expenses, set and stick to a budget, or plan for future savings, ExpenseForge provides the tools you need to take control of your financial destiny."

/* Constants for the app */

export const PROTECTED_URL = '/user'
export const RECENT_EXPENSES_LIMIT = 3

// Colors used to categorized expenses in graphs
export const COLORS = [
  '#fe2e55' /* Red */,
  '#33a4db' /* light-blue */,
  '#fe9600' /* Orange */,
  '#fecf01' /* Yellow */,
  '#1775fe' /* Blue */,
  '#c7c6cb' /* Grey */,
]

// The Maximum number of significant digits to show
export const MAX_SIGNIFICANT_DIGITS = 6

/* Required fields of personalization */
export type PersonalizationFields = Tables<'user_personalization'>
export const REQUIRED_PERSONALIZATION_FIELDS: Partial<PersonalizationFields> = {
  monthly_limit: 0,
}

// export const PERSONALIZATION_FIELDS_INPUTS: {
//   fieldName: keyof PersonalizationFields
//   fieldInputProps: ComponentProps<'input'>
// }

export const PERSONALIZATION_FIELDS_INPUTS: Record<
  keyof PersonalizationFields,
  (ComponentProps<'input'> & { label: string }) | null
> = {
  monthly_limit: {
    label: 'Your Monthly Expenditure Limit',
    type: 'number',
    name: 'monthly_limit',
    placeholder: '1000',
    'aria-label': 'monthly expenditure limit',
  },
  daily_limit: null,
  user_id: null,
  updated_at: null,
}
