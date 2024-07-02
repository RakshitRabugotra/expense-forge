// Internal Dependencies
import Heading from '@/components/Heading'

// Custom Components to keep things clean!✨
import ExpenseList from './expense-list'

export default async function ExpensePage() {
  return (
    <>
      <Heading text='Your' coloredText='Expenses' />
      <ExpenseList />
    </>
  )
}
