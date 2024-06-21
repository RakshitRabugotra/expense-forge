'use client'

import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import { useEffect, useMemo } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { Doughnut } from 'react-chartjs-2'
import { twMerge } from 'tailwind-merge'

// Internal Dependencies
import LoadingFallback from '../LoadingFallback'

// Type definitions
import type { ExpensePieData } from '@/utils/functions/chart'
import type { HTMLElementProps } from '@/types/page-component'

// Custom utilities
import { lconv } from '@/utils/functions/math'
import { interpolateGreen2Red } from '@/utils/functions/chroma'

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
              Math.round(
                100 * lconv(ratio, { min: 0, max: 1 }, { min: 0, max: 0.8 }),
              ),
              Math.round(
                100 *
                  lconv(1 - ratio, { min: 0, max: 1 }, { min: 0, max: 0.8 }),
              ),
              20,
            ],
            backgroundColor: [
              '#00000000',
              interpolateGreen2Red(ratio),
              '#ddd',
              '#00000000',
            ],
          },
        ],
      }) as ExpensePieData,
    [ratio],
  )

  return (
    <section
      id={id}
      className={twMerge(
        'relative',
        'flex flex-col items-center justify-center p-4',
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
