import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

// Custom Actions
import { getUser } from '@/actions/auth'

// Content dependencies
import { PROTECTED_URL } from '@/utils/constants'

export default async function GetStarted() {
  const {
    data: { user },
    error,
  } = await getUser()

  // Flag for checking if the user session is valid or not
  const isValid = !error && user !== null

  return (
    <Link
      href={isValid ? PROTECTED_URL : '/login'}
      className={twMerge(
        'inline-block px-8 py-4',
        'text-xl font-bold text-white',
        'rounded-md',
        'transition-colors duration-300',
        'hover:bg-[#f40612]',
      )}
    >
      Get Started
    </Link>
  )
}
