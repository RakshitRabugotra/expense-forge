import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export default function LoadingFallback({
  text,
  className,
  ...props
}: { text?: string } & ComponentProps<'div'>) {
  return (
    <div
      className={twMerge(
        'flex flex-row items-center justify-between gap-2',
        'm-auto p-2',
        'max-w-fit',
        className,
      )}
      {...props}
    >
      <div className='loader'></div>
      <p className='capitalize'>{text}</p>
    </div>
  )
}
