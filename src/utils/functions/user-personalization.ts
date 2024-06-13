// Constants
import {
  PersonalizationFields,
  REQUIRED_PERSONALIZATION_FIELDS,
} from '../constants'

// Type definitions
import { Tables } from '@/types/supabase'

export const areRequiredFieldsValid = (
  fields: Tables<'user_personalization'> | null,
) => {
  // If the object is null, then all fields are invalid
  if (!fields) {
    return null
  }

  const invalidFields: Array<keyof PersonalizationFields> = []

  Object.keys(fields).forEach((objKey, index) => {
    // Cast the key to type of the object
    const key = objKey as keyof PersonalizationFields
    // Check if a default value exists in the table
    if (
      fields[key] === REQUIRED_PERSONALIZATION_FIELDS[key] &&
      typeof REQUIRED_PERSONALIZATION_FIELDS[key] !== 'undefined'
    ) {
      invalidFields.push(key)
    }
  })

  return invalidFields
}
