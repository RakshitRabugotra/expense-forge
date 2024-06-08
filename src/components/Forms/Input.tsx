import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export default function Input(props: ComponentProps<'input'>) {
  return (
    <label htmlFor={props.name}>
      <input
        {...props}
        required
        aria-required
        className={twMerge(
          'w-full py-2',
          'text-lg placeholder-gray-500',
          'border-b border-b-gray-400',
          'bg-transparent',
          'focus:outline-none',
          'focus:border-b-leaf-800 focus:border-b-2',
          'transition-colors duration-200',
          props.className,
        )}
      />
    </label>
  )
}
