'use client'

import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()

  return (
    <a
      onClick={() => router.replace('/')}
      className='group absolute left-8 top-8 flex cursor-pointer select-none items-center rounded-md bg-btn-background px-4 py-2 text-sm text-foreground no-underline hover:bg-btn-background-hover'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1'
      >
        <polyline points='15 18 9 12 15 6' />
      </svg>{' '}
      Back
    </a>
  )
}
