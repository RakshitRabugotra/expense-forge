import { getSession } from '@/actions/auth'
import AuthButton from '@/components/Auth/AuthButton'
import PieChart from '@/components/Charts/PieChart'
import Heading from '@/components/Heading'

export default async function ProtectedPage() {
  const {
    data: { session },
  } = await getSession()

  return (
    <>
      <Heading text='Hello' coloredText={'!'} />
      <PieChart dailyTotal={40} />
      <AuthButton />
    </>
  )
}
