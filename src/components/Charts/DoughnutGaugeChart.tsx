'use client'

import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { twMerge } from 'tailwind-merge'
import { useSpring, animated } from '@react-spring/web'

// Internal Dependencies
import LoadingFallback from '../LoadingFallback'

// Type definitions
import type { ExpensePieData } from '@/utils/functions/chart'
import type { HTMLElementProps } from '@/types/page-component'
import { clamp } from '@/utils/functions/math'

ChartJS.register(ArcElement, Tooltip)

const CHART_OPTIONS = {
  plugins: {},
  events: [],
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
}

export default function DoughnutGaugeChart({
  id,
  className,
  textClassName,
  text,
  isPending,
  ratio,
}: HTMLElementProps & {
  textClassName: string
  text: string
  isPending: boolean
  ratio: number
}) {
  /* The data for expense pie chart */
  const EXPENSE_DATA = useMemo(
    () =>
      ({
        labels: ['fill-l', 'data', 'data-pad', 'fill-r'],
        datasets: [
          {
            data: [
              20,
              clamp(100 * ratio, 0, 80),
              clamp(100 * (1 - ratio), 0, 80),
              20,
            ],
            backgroundColor: ['#000', '#0f0', '#ddd', '#000'],
          },
        ],
      }) as ExpensePieData,
    [],
  )

  return (
    <section
      id={id}
      className={twMerge(
        'relative flex flex-col items-center justify-center p-4',
        className,
      )}
    >
      <Doughnut
        data={EXPENSE_DATA}
        options={CHART_OPTIONS}
        fallbackContent={<LoadingFallback text='compiling expenses' />}
        className='rotate-180'
      />
      <ChartStats
        text={text}
        isPending={isPending}
        textClassName={textClassName}
      />
    </section>
  )
}

function ChartStats({
  isPending,
  textClassName,
  text,
}: {
  isPending: boolean
  textClassName: string
  text: string
}) {
  const [springs, api] = useSpring(() => ({
    from: { opacity: 0, width: '30%' },
  }))

  useEffect(() => {
    if (!isPending) {
      api.start({
        from: { opacity: 0, width: '30%' },
        to: { opacity: 1, width: '60%' },
      })
    }
  }, [isPending])

  return (
    <animated.div
      className={twMerge(
        'absolute left-0 right-0 top-1/2 -translate-y-1/2',
        'mx-auto aspect-square min-w-0 max-w-[60%] rounded-full',
        'bg-foreground',
        'text-center text-leaf-200',
        'flex flex-col items-center justify-center gap-2',
        textClassName,
      )}
      style={springs}
    >
      {/* Calculate the daily expense percentage, based on the limit */}
      <h4 className='w-[80%] text-wrap leading-none'>{text}</h4>
    </animated.div>
  )
}
