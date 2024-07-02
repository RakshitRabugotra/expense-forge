'use client'

import { HTMLElementProps } from '@/types/page-component'
import { LineChartData, getLineChartData } from '@/utils/functions/chart'
import { CategorizedExpenses } from '@/utils/functions/expenses'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js'
import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'

// Register various Components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler)

const options = {
  plugins: {},
  events: [],
  elements: {
    line: {
      tension: 0.3,
    },
  },
  responsive: true,
}

export default function LineChart({
  dateCategorizedExpenses,
  ...props
}: {
  dateCategorizedExpenses: CategorizedExpenses[] | null
} & HTMLElementProps) {
  // Format the given data to line chart data
  const data = useMemo(
    () => getLineChartData(dateCategorizedExpenses),
    [dateCategorizedExpenses],
  )

  return <Line options={options} data={data} {...props} />
}
