import { getSession, getUser } from '@/actions/auth'
import AuthButton from '@/components/Auth/AuthButton'
import PieChart from '@/components/Charts/PieChart'
import Heading from '@/components/Heading'

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
      <Heading
        text='Hello'
        coloredText={(user_metadata?.firstName ?? '') + '!'}
      />
      <PieChart dailyTotal={40} />
      <AuthButton />
    </>
  )
}
