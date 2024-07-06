// Internal Dependencies
import GetStarted from '@/components/LandingPage/GetStarted'
import Header from '@/components/LandingPage/Header'
import { twMerge } from 'tailwind-merge'

export default async function Index() {
  return (
    <>
      <main>
        <Header />
        <div
          className={twMerge(
            'absolute inset-0 p-5',
            'flex flex-col items-center justify-center',
            'text-center',
          )}
        >
          <div className='mb-5 text-4xl font-bold'>ExpenseForge</div>
          <div className='tagline mb-8 text-2xl'>
            Your Ultimate Expense Tracking Solution
          </div>
          <div className='mb-5 text-xl'>
            Track your expenses, set budgets, and gain insights into your
            financial habits.
          </div>
          <GetStarted />
        </div>
        <div
          className={twMerge(
            'absolute bottom-5 left-0 right-0',
            'text-center text-base text-[#bbb]',
          )}
        >
          ExpenseForge © 2024 |{' '}
          <a href='privacy.html' className='text-[#bbb]'>
            Privacy Policy
          </a>{' '}
          |{' '}
          <a href='terms.html' className='text-[#bbb]'>
            Terms of Service
          </a>
        </div>
      </main>
    </>
  )
}
