// Internal Dependencies
import GetStarted from '@/components/LandingPage/GetStarted'
import Header from '@/components/LandingPage/Header'
import { twMerge } from 'tailwind-merge'

/*
  <style>
        body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            font-family: Arial, sans-serif;
            background-image: url('background.jpg'); // Replace with your background image
            background-size: cover;
            background-position: center;
            color: #fff;
        }
        .overlay {
            background-color: rgba(0, 0, 0, 0.6);
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 20px;
        }
        .logo {
            font-size: 2.5em;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .tagline {
            font-size: 1.5em;
            margin-bottom: 30px;
        }
        .cta {
            font-size: 1.2em;
            margin-bottom: 20px;
        }
        .button {
            display: inline-block;
            padding: 15px 30px;
            background-color: #e50914;
            color: #fff;
            border-radius: 5px;
            text-decoration: none;
            font-size: 1.2em;
            font-weight: bold;
            transition: background-color 0.3s;
        }
        .button:hover {
            background-color: #f40612;
        }
        .footer {
            position: absolute;
            bottom: 20px;
            width: 100%;
            text-align: center;
            font-size: 0.9em;
            color: #bbb;
        }
    </style>
*/

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
            'bg-black/60',
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
