import { HTMLElementProps } from '@/types/page-component'
import { twMerge } from 'tailwind-merge'

export default function InlineHeading({
  id,
  className,
  text,
  coloredText,
}: {
  text: string
  coloredText?: string
} & HTMLElementProps) {
  return (
    <h1
      id={id}
      className={twMerge(
        'w-full text-left text-3xl font-medium text-leaf-950',
        className,
      )}
    >
      {text}
      {coloredText && (
        <span className='inline-block px-2 text-leaf-300'>{coloredText}</span>
      )}
    </h1>
  )
}
