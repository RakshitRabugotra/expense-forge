// Internal Dependencies
import Heading from '@/components/Heading'
import BarChart from '@/components/Charts/BarChart'
import DuoGaugeChart from '@/components/Charts/DuoGaugeChart'
import ExpenseTimelineChart from '@/components/Charts/ExpenseTimelineChart'

export default async function StatsPage() {
  return (
    <>
      <Heading text='Your' coloredText='Stats' />
      <div className='grid w-full grid-cols-1 md:grid-cols-2 md:gap-4'>
        <ExpenseTimelineChart />
        <BarChart />
        <DuoGaugeChart />
      </div>
    </>
  )
}
