// Internal Dependencies
import Heading from '@/components/Heading'
import BarChart from '@/components/Charts/BarChart'
import DuoGaugeChart from '@/components/Charts/DuoGaugeChart'
import ExpenseTimelineChart from '@/components/Charts/ExpenseTimelineChart'

export default async function StatsPage() {
  return (
    <>
      <Heading text='Your' coloredText='Stats' />
      <ExpenseTimelineChart />
      <DuoGaugeChart />
      <BarChart />
    </>
  )
}
