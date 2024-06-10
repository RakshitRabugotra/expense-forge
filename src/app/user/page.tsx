import { getUser } from '@/actions/auth'
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

  return (
    <>
      <InlineHeading
        text='Hello,'
        coloredText={(user_metadata?.firstName ?? '') + '!'}
        className='mb-10'
      />
      {/* Show the dashboard */}
      <Dashboard />

      <PieChart dailyTotal={40} />
      <AuthButton />
    </>
  )
}
