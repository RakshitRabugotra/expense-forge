import Link from 'next/link'

// Custom actions
import { getUser, signOut } from '@/actions/auth'
import { MdExitToApp } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'

export default async function AuthButton() {
  const {
    data: { user },
  } = await getUser()

  return user ? (
    <div className='flex items-center gap-4'>
      <form action={signOut}>
        <button
          type='submit'
          className={twMerge(
            'cursor-pointer rounded-md bg-btn-background',
            'text-red-500',
            'hover:bg-btn-background-hover',
            'inline-flex items-center gap-2',
            'text-xl font-medium',
          )}
        >
          <MdExitToApp />
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href='/login'
      className='flex rounded-md bg-btn-background px-3 py-2 no-underline hover:bg-btn-background-hover'
    >
      Login
    </Link>
  )
}
