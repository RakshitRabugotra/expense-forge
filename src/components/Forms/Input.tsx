import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export default function Input({
  label,
  className,
  ...props
}: ComponentProps<'input'> & { label?: string }) {
  return (
    <label htmlFor={props.name}>
      {label && <span className='text-md select-none'>{label}</span>}
      <input
        {...props}
        required
        aria-required
        className={twMerge(
          'w-full px-4 py-2',
          'text-lg placeholder-gray-500',
          'border-b-2 border-b-gray-400',
          'bg-inherit',
          'focus:border-leaf-800 focus:outline-none',
          'transition-colors duration-200',
          className,
        )}
      />
    </label>
  )
}
