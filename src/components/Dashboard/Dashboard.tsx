'use client'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { animated, config, useSpring } from '@react-spring/web'

// Custom Utilities
import {
  compressToUnits,
  currencyFormatterINR,
} from '@/utils/functions/currency'

// Custom Actions
import { getUserPersonalizations } from '@/actions/user-personalization'
import { getExpenseThisMonth, getExpensesToday } from '@/actions/stats'
import { reduceExpenses } from '@/utils/functions/expenses'

export default function Dashboard() {
  // The state for selecting the selected dash
  const [isDaily, setIsDaily] = useState<boolean>(true)

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
    <section className='flex w-full flex-col items-center rounded-xl border bg-black/50 p-3'>
      <div className='flex w-full flex-row items-center justify-between'>
        <button
          onClick={() => setIsDaily(true)}
          className={twMerge(
            isDaily
              ? 'border-b-emerald-500 font-bold text-white/80'
              : 'border-b-black/10 font-normal text-black/50',
            'm-2 mx-4 border-b-4 px-2',
            'transition-all duration-200 ease-in-out',
          )}
        >
          Daily Tracker
        </button>
        <button
          onClick={() => setIsDaily(false)}
          className={twMerge(
            !isDaily
              ? 'border-b-emerald-500 font-bold text-white/80'
              : 'border-b-black/10 font-normal text-black/50',
            'm-2 mx-4 border-b-4 px-2',
            'transition-all duration-200 ease-in-out',
          )}
        >
          Monthly Tracker
        </button>
      </div>

      <Dash
        current={
          isDaily
            ? { title: 'expense today', figure: thisDay }
            : { title: 'monthly expense', figure: thisMonth }
        }
        goal={
          isDaily
            ? { title: 'daily goal', figure: dailyGoal }
            : { title: 'monthly goal', figure: monthlyGoal }
        }
      />
    </section>
  )
}

function Dash({
  current,
  goal,
}: {
  current: ExpenseFieldProps
  goal: ExpenseFieldProps
}) {
  return (
    <>
      <fieldset className='flex w-full flex-row rounded-xl bg-foreground [&>*]:basis-1/2'>
        <ExpenseField {...current} />
        <ExpenseField {...goal} />
      </fieldset>
    </>
  )
}

type ExpenseFieldProps = {
  title: string
  figure: number
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

function ExpenseField({ title, figure, onClick }: ExpenseFieldProps) {
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
        'flex flex-col',
        'select-none text-white',
        'p-2 px-4',
        onClick ? 'cursor-pointer' : '',
      )}
      onClick={onClick}
    >
      <p className='grow break-words text-base font-medium capitalize text-white/70'>
        {title}
      </p>
      <animated.h2 className='max-w-full break-words text-3xl font-bold leading-snug'>
        {number.to((n) => compressToUnits(n, currencyFormatterINR, 2))}
      </animated.h2>
    </div>
  )
}
