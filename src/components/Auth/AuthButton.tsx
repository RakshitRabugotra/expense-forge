import Link from 'next/link'

// Custom actions
import { getUser, signOut } from '@/actions/auth'

export default async function AuthButton() {
  const {
    data: { user },
  } = await getUser()

  return user ? (
    <div className='flex items-center gap-4'>
      Hey, {user.email}!
      <form action={signOut}>
        <button
          type='submit'
          className='rounded-md bg-btn-background px-4 py-2 no-underline hover:bg-btn-background-hover'
        >
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
