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

// Custom Utilities
import { reduceExpenses } from '@/utils/functions/expenses'

// Type definitions
import { HTMLElementProps } from '@/types/page-component'

export default function Dashboard({ id, className }: HTMLElementProps) {
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
    <section
      id={id}
      className={twMerge(
        'flex min-h-[25vh] w-full flex-col rounded-xl border bg-black/70 p-3',
        className,
      )}
    >
      <div className='flex w-full flex-row items-center justify-between'>
        <button
          onClick={() => setIsDaily(true)}
          className={twMerge(
            isDaily
              ? 'border-b-emerald-500 font-bold text-white/80'
              : 'border-b-black/10 font-normal text-black/70',
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
              ? 'border-b-emerald-500 text-white/80'
              : 'border-b-black/10 text-black/70',
            'm-2 mx-4 border-b-4 px-2',
            'transition-colors duration-200 ease-in-out',
          )}
        >
          Monthly Tracker
        </button>
      </div>

      <Dash
        current={
          isDaily
            ? { title: 'expense today', figure: thisDay }
            : { title: 'monthly figure', figure: thisMonth }
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
      <fieldset className='flex w-full grow flex-row rounded-xl bg-foreground'>
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
    config: config.default,
  })

  return (
    <div
      className={twMerge(
        'flex grow basis-1/2 flex-col',
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
        {number.to((n) => compressToUnits(n, currencyFormatterINR, 1))}
      </animated.h2>
    </div>
  )
}
