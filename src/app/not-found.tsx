import Heading from '@/components/Heading'
import { PROTECTED_URL } from '@/utils/constants'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <Heading text={'Not'} coloredText='Found' />
      <p>Could not find requested resource</p>
      <Link href={PROTECTED_URL as string}>Return Home</Link>
    </div>
  )
}
