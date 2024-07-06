import Link from 'next/link'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

// Internal Dependencies
import InlineHeading from '@/components/InlineHeading'
// Custom Actions
import { getUser } from '@/actions/auth'
// Constant Dependencies
import { PROTECTED_URL } from '@/utils/constants'
import GetStarted from './GetStarted'

export default function Header() {
  return (
    <div
      className={twMerge(
        'fixed left-0 right-0 top-0',
        'flex flex-row items-center gap-2',
        'p-6 md:px-20',
      )}
    >
      {/* Show the logo */}
      <Image
        src={'/logo/logo512x512.png'}
        alt='logo'
        width={48}
        height={48}
        className='my-auto'
      />
      <InlineHeading
        text='Expense'
        coloredText='Forge'
        className='w-fit text-4xl font-bold md:text-5xl'
      />
    </div>
  )
}

