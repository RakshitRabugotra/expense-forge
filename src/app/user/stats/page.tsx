import BarChart from '@/components/Charts/BarChart'
import Heading from '@/components/Heading'
import { Daily } from './expenditure-dash'
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
      <Daily />
    </div>
  )
}
