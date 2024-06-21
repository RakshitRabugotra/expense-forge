'use client'

import { useEffect, useMemo, useState } from 'react'

// Internal Dependencies
import SubHeading from '@/components/SubHeading'

// Custom Actions
import { getExpenseThisMonth, getExpensesToday } from '@/actions/stats'
import { getUserPersonalizations } from '@/actions/user-personalization'

// Custom Utility function
import { reduceExpenses } from '@/utils/functions/expenses'

// Type definitions
import type { Tables } from '@/types/supabase'
import DoughnutGaugeChart from './DoughnutGaugeChart'

// Alias for the type
type Expense = Tables<'expenses'>
type Preferences = Tables<'user_personalization'>

export default function DuoGaugeChart() {
  // The daily and monthly total preferences of the user
  const [preferences, setPreferences] = useState<Preferences | null>(null)

  // Fetch the user preferences (or limits)
  useEffect(() => {
    getUserPersonalizations().then((value) => setPreferences(value))
  }, [])

  return (
    <div className='w-full'>
      <SubHeading>{'These are your limits!'}</SubHeading>
      <section id='expense-gauge' className='flex w-full flex-row gap-6'>
        <DailyTotalGauge
          dailyLimit={preferences ? preferences.daily_limit : null}
        />
        <MonthlyTotalGauge
          monthlyLimit={preferences ? preferences.monthly_limit : null}
        />
      </section>
    </div>
  )
}

function DailyTotalGauge({ dailyLimit }: { dailyLimit: number | null }) {
  // The expenses done today in total
  const [expToday, setExpToday] = useState<Expense[] | null>(null)

  // The total of these expenses
  const dailyTotal = useMemo(
    () => (expToday ? reduceExpenses(expToday) : 0),
    [expToday],
  )

  // The percentage of limit used
  const dailyTotal2LimitRatio = useMemo(
    () => (dailyLimit ? dailyTotal / dailyLimit : 0),
    [dailyTotal, dailyLimit],
  )
  console.log({ dailyTotal2LimitRatio })

  // Fetch the expenses today
  useEffect(() => {
    getExpensesToday().then((value) => setExpToday(value))
  }, [])

  return (
    <Gauge
      id='daily-gauge'
      title='DAILY LIMIT'
      ratio={dailyTotal2LimitRatio}
      text={(dailyTotal2LimitRatio * 100).toFixed(2) + '%'}
    />
  )
}

function MonthlyTotalGauge({ monthlyLimit }: { monthlyLimit: number | null }) {
  // The expenses made in this month
  const [expMonth, setExpMonth] = useState<Expense[] | null>(null)

  // The Total of expenditure done in this month
  const monthlyTotal = useMemo(
    () => (expMonth ? reduceExpenses(expMonth) : 0),
    [expMonth],
  )

  // The percentage of limit used
  const monthlyTotal2LimitRatio = useMemo(
    () => (monthlyLimit ? monthlyTotal / monthlyLimit : 0),
    [monthlyTotal, monthlyLimit],
  )

  console.log({ monthlyTotal2LimitRatio })

  // Fetch the expenses today
  useEffect(() => {
    getExpenseThisMonth().then((value) => setExpMonth(value))
  }, [])

  return (
    <Gauge
      id='monthly-gauge'
      title='MONTHLY LIMIT'
      ratio={monthlyTotal2LimitRatio}
      text={(monthlyTotal2LimitRatio * 100).toFixed(2) + '%'}
    />
  )
}

function Gauge({
  title,
  ...props
}: {
  id?: string
  ratio: number
  title: string
  text: string
}) {
  return (
    <div className='glass my-2 w-[30%] basis-1/2 rounded-xl bg-black/15'>
      <DoughnutGaugeChart
        {...props}
        isPending={false}
        textClassName={'text-lg'}
      />
      <h2 className='my-1 w-full text-center font-bold uppercase text-black/80'>
        {title}
      </h2>
    </div>
  )
}
