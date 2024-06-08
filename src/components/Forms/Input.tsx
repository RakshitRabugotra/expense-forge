import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export default function Input({
  label,
  className,
  ...props
}: ComponentProps<'input'> & { label?: string }) {
  return (
    <label htmlFor={props.name}>
      {label && <span className='text-md'>{label}</span>}
      <input
        {...props}
        required
        aria-required
        className={twMerge(
          'w-full px-4 py-2',
          'text-lg placeholder-gray-500',
          'border-b border-b-gray-400',
          'rounded-md bg-inherit',
          'focus:outline-none',
          'focus:border-leaf-800 focus:border-2',
          'transition-colors duration-200',
          className,
        )}
      />
    </label>
  )
}
