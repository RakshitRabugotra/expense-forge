import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export default function SubHeading({
  className,
  children,
  ...props
}: ComponentProps<'h2'>) {
  return (
    <h2
      className={twMerge(
        className,
        'my-2 w-full px-2',
        'text-xl font-medium',
        'rounded-md border-l-8 border-leaf-300',
      )}
      {...props}
    >
      {children}
    </h2>
  )
}
