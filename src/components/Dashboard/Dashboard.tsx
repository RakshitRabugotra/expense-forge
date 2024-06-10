'use client'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { animated, config, useSpring } from '@react-spring/web'

// Custom Utilities
import {
  compressToUnits,
  currencyFormatterINR,
} from '@/utils/functions/currency'

// Internal Dependencies
import SubHeading from './sub-heading'

// Custom Actions
import { getUserPersonalizations } from '@/actions/user-personalization'
import { getExpenseThisMonth, getExpensesToday } from '@/actions/stats'
import { reduceExpenses } from '@/utils/functions/expenses'

export default function Dashboard() {
  // The state variables for the dashboard
  const [monthlyGoal, setMonthlyGoal] = useState<number>(0)
  const [thisMonth, setThisMonth] = useState<number>(0)

  const [dailyGoal, setDailyGoal] = useState<number>(0)
  const [thisDay, setThisDay] = useState<number>(0)

  useEffect(() => {
    // Get the daily and monthly goal of the user
    getUserPersonalizations().then((value) => {
      setMonthlyGoal(value ? value.monthly_limit : 0)
      setDailyGoal(value ? value.daily_limit : 0)
    })
  }, [])

  useEffect(() => {
    // Get the expenses for the current month
    getExpenseThisMonth().then((value) => {
      setThisMonth(value ? reduceExpenses(value) : 0)
    })
    // Get the expenses for current day
    getExpensesToday().then((value) => {
      setThisDay(value ? reduceExpenses(value) : 0)
    })
  }, [])

  console.log({ monthlyGoal })

  return (
    <section className='flex w-full flex-col items-center'>
      <SubHeading>Daily Tracker</SubHeading>
      <fieldset className='flex w-full flex-row rounded-xl border bg-foreground [&>*]:basis-1/2'>
        <ExpenseField title="today's expense" figure={thisDay} />
        <ExpenseField title='daily goal' figure={dailyGoal} />
      </fieldset>

      <SubHeading>Monthly Tracker</SubHeading>
      <fieldset className='flex w-full flex-row rounded-xl border bg-foreground [&>*]:basis-1/2'>
        <ExpenseField title='expenditure' figure={thisMonth} />
        <ExpenseField title='monthly goal' figure={monthlyGoal} />
      </fieldset>
    </section>
  )
}

function ExpenseField({
  title,
  figure,
  onClick,
}: {
  title: string
  figure: number
  onClick?: React.MouseEventHandler<HTMLDivElement>
}) {
  // Use a count-up animation
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: figure },
    delay: 0,
    config: config.gentle,
  })

  return (
    <div
      className={twMerge(
        'select-none text-white',
        'p-2 px-4',
        onClick ? 'cursor-pointer' : '',
      )}
      onClick={onClick}
    >
      <p className='break-words text-base font-medium capitalize text-white/70'>
        {title}
      </p>
      <animated.h2 className='max-w-full break-words text-3xl font-bold leading-snug'>
        {number.to((n) => compressToUnits(n, currencyFormatterINR, 2))}
      </animated.h2>
    </div>
  )
}
