import moment from 'moment'

// Custom Actions
import {
  getUserPersonalizations,
  updateDailyLimit,
} from '@/actions/user-personalization'

// Custom Utilities
import { areRequiredFieldsValid } from '@/utils/functions/user-personalization'

// Custom Components
import PromptPersonalizations from './prompt-personalizations'

export default async function PersonalizationProtected({
  children,
}: {
  children?: React.ReactNode
}) {
  // If the user doesn't have personalization, then prompt him to do so
  const data = await getUserPersonalizations()

  // Get all the invalid fields
  const invalidFields = areRequiredFieldsValid(data)
  if (!invalidFields || invalidFields.length > 0) {
    return <PromptPersonalizations invalidFields={invalidFields} />
  }

  // If the updated_date is expired, then calculate a new one
  if (
    Date.parse(data?.updated_at as string) <
    Date.parse(moment.utc().format('YYYY-MM-DD'))
  ) {
    // Then change the daily_limit with regards to the updated date
    await updateDailyLimit(data?.monthly_limit ?? 0)
  }

  return <>{children}</>
}
