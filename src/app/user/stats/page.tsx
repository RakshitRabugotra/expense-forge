
// Internal Dependencies
import BarChart from '@/components/Charts/BarChart'
import DuoGaugeChart from '@/components/Charts/DuoGaugeChart'
import Heading from '@/components/Heading'


export default function StatsPage() {
  return (
    <>
      <Heading text='Your' coloredText='Stats' />
      <BarChart />
      <DuoGaugeChart />
    </>
  )
}
