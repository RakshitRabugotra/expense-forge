import * as Accordion from '@radix-ui/react-accordion'
import { twMerge } from 'tailwind-merge'

// Icon dependencies
import { FaChevronDown } from 'react-icons/fa'

// Type definitions
import { HTMLElementProps } from '@/types/page-component'

export function Item({
  value,
  children,
  className,
  ...props
}: { value: string; children: React.ReactNode } & HTMLElementProps) {
  return (
    <Accordion.Item value={value} className={twMerge('', className)} {...props}>
      {children}
    </Accordion.Item>
  )
}

export function Trigger({
  title,
  className,
  ...props
}: { title: string } & HTMLElementProps) {
  return (
    <Accordion.Trigger
      className={twMerge(
        'accordion-trigger',
        'w-full p-3',
        'inline-flex items-center justify-between',
        'capitalize shadow-md',
        'rounded-xl',
        className,
      )}
      {...props}
    >
      {title}
      <FaChevronDown className='chevron transition-all ease-in-out' />
    </Accordion.Trigger>
  )
}

export function Content({
  children,
  className,
  ...props
}: { children: React.ReactNode } & HTMLElementProps) {
  return (
    <Accordion.Content
      className={twMerge(
        'accordion-content',
        'w-full rounded-xl bg-leaf-300/30 shadow-md',
        className,
      )}
      {...props}
    >
      {children}
    </Accordion.Content>
  )
}

// Aliasing
export const Root = Accordion.Root
