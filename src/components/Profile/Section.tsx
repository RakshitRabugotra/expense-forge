import SubHeading from '@/components/SubHeading'
import { HTMLElementProps } from '@/types/page-component'
import { twMerge } from 'tailwind-merge'

export default function Section({
  title,
  children,
  className,
  border,
  ...props
}: {
  title: string
  border?: boolean
  children: React.ReactNode
} & HTMLElementProps) {
  return (
    <section
      className={twMerge(
        'max-w-screen-md',
        'my-6 w-full py-3',
        border ? 'border-y-2' : '',
        className,
      )}
      {...props}
    >
      <SubHeading noBorder className='font-normal'>
        {title}
      </SubHeading>
      {children}
    </section>
  )
}
