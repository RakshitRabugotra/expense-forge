import { getUser } from '@/actions/auth'
import { getUserPersonalizations } from '@/actions/user-personalization'
import AuthButton from '@/components/Auth/AuthButton'
import PieChart from '@/components/Charts/PieChart'
import Dashboard from '@/components/Dashboard/Dashboard'
import InlineHeading from '@/components/InlineHeading'

export default async function ProtectedPage() {
  const {
    data: { user },
  } = await getUser()

  // If not session, then there's something wrong
  if (!user) return <div>Something went wrong</div>
  // Extract the user from session
  const { user_metadata } = user

  // Get the user daily limit
  const userPreference = await getUserPersonalizations()
  // If the preference doesn't exist then we're fucked
  if (!userPreference) return <div>Something went wrong</div>

  return (
    <>
      <InlineHeading
        text='Hello,'
        coloredText={(user_metadata?.firstName ?? '') + '!'}
        className='mb-10'
      />
      {/* Show the dashboard */}
      <Dashboard className='mb-10' />
      {/* The Pie Chart for analytics */}
      <PieChart dailyLimit={userPreference.daily_limit} className='mb-10' />
      <AuthButton />
    </>
  )
}
