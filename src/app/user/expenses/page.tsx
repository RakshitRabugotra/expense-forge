// Custom Actions
import { getUser } from '@/actions/auth'

// Internal Dependencies
import Heading from '@/components/Heading'

// Custom Components to keep things clean!✨
import ExpenseList from './expense-list'
import LoadingFallback from '@/components/LoadingFallback'

export default async function ExpensePage() {
  // Get the current logged in user
  const {
    data: { user },
  } = await getUser()

  if (!user)
    return (
      <div className='loading-fallback-page'>
        <LoadingFallback text={'Loading User'} />
      </div>
    )

  return (
    <>
      <Heading text='Your' coloredText='Expenses' />
      <ExpenseList user={user} />
    </>
  )
}
