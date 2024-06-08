import { getUser } from '@/actions/auth'
import ExpenseList from './expense-list'
import Heading from '@/components/Heading'

export default async function ExpensePage() {
  // Get the current logged in user
  const {
    data: { user },
  } = await getUser()

  if (!user) return <div>Loading...</div>

  return (
    <>
      <Heading text='Your' coloredText='Expenses' />
      <ExpenseList user={user} />
    </>
  )
}
