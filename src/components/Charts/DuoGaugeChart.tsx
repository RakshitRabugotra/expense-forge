'use client'

import { useEffect, useMemo, useState } from 'react'

// Custom Actions
import { getExpenseThisMonth, getExpensesToday } from '@/actions/stats'
import { getUserPersonalizations } from '@/actions/user-personalization'

// Custom Utility function
import { reduceExpenses } from '@/utils/functions/expenses'
import {
  compressToUnits,
  currencyFormatterINR,
} from '@/utils/functions/currency'

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
    <section id='expense-gauge' className='flex w-full flex-row gap-6'>
      <DailyTotalGauge
        dailyLimit={preferences ? preferences.daily_limit : null}
      />
      <MonthlyTotalGauge
        monthlyLimit={preferences ? preferences.monthly_limit : null}
      />
    </section>
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
      ratio={dailyTotal2LimitRatio}
      text={compressToUnits(dailyTotal, currencyFormatterINR, 2)}
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
      ratio={monthlyTotal2LimitRatio}
      text={compressToUnits(monthlyTotal, currencyFormatterINR, 2)}
      stringFormatter={(text) =>
        `${text} | ${(monthlyTotal2LimitRatio * 100).toFixed(2)}% spent`
      }
    />
  )
}

function Gauge({
  text,
  stringFormatter,
  ...props
}: {
  id?: string
  ratio: number
  text: string
  stringFormatter?: (value: string) => string
}) {
  return (
    <DoughnutGaugeChart
      {...props}
      text={stringFormatter ? stringFormatter(text) : text}
      className='my-2 w-[30%] basis-1/2 rounded-xl bg-black'
      isPending={false}
      textClassName={'text-lg'}
    />
  )
}
