import { PROTECTED_URL } from '@/utils/constants'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href={PROTECTED_URL as string}>Return Home</Link>
    </div>
  )
}
