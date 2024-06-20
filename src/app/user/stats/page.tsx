import BarChart from '@/components/Charts/BarChart'
import DuoGaugeChart from '@/components/Charts/DuoGaugeChart'
import Heading from '@/components/Heading'
import SubHeading from '@/components/SubHeading'

export default function StatsPage() {
  return (
    <>
      <Heading text='Your' coloredText='Stats' />
      <BarChart />
      <Dashboard />
    </>
  )
}

function Dashboard() {
  return (
    <div className='w-full'>
      <SubHeading>Dashboard</SubHeading>
      <DuoGaugeChart />
    </div>
  )
}
