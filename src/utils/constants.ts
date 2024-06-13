import { Tables } from '@/types/supabase'
import { ComponentProps } from 'react'

/**
 * The metadata about the app
 */
export const PROTECTED_URL = '/user'

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
}
