'use client'

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
  responsive: true,
}

export default function LineChart({
  dateCategorizedExpenses,
}: {
  dateCategorizedExpenses: CategorizedExpenses[] | null
}) {
  // Format the given data to line chart data
  const data = useMemo(
    () => getLineChartData(dateCategorizedExpenses),
    [dateCategorizedExpenses],
  )

  return <Line options={options} data={data} />
}
