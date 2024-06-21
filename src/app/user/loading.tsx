import { twMerge } from 'tailwind-merge'

export default function Loading() {
  return (
    <div
      className={twMerge(
        'min-h-screen w-full',
        'text-black',
        'flex flex-col items-center justify-center',
      )}
    >
      <div className='page-loader' />
    </div>
  )
}
