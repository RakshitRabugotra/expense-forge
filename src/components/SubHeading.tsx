import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export default function SubHeading({
  noBorder,
  className,
  children,
  ...props
}: ComponentProps<'h2'> & {
  noBorder?: boolean
}) {
  return (
    <h2
      className={twMerge(
        'my-2 w-full px-2',
        'text-xl font-medium',
        'rounded-md',
        !noBorder ? 'border-l-8 border-leaf-300' : '',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  )
}
