// Custom Actions
import { getUser } from '@/actions/auth'

// Internal Dependencies
import Heading from '@/components/Heading'

// Custom Components to keep things clean!✨
import ExpenseList from './expense-list'

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
