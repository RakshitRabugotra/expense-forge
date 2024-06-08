import AuthButton from '@/components/Auth/AuthButton'
import PieChart from '@/components/Charts/PieChart'

export default async function ProtectedPage() {
  return (
    <>
      <AuthButton />
      <PieChart dailyTotal={40} />
    </>
  )
}
