import { twMerge } from 'tailwind-merge'

export default function InlineHeading({
  id,
  className,
  text,
  coloredText,
}: {
  id?: string
  className?: string
  text: string
  coloredText?: string
}) {
  return (
    <h1
      id={id}
      className={twMerge(
        className,
        'w-full text-left text-3xl font-medium text-leaf-950',
      )}
    >
      {text}
      {coloredText && (
        <span className='inline-block px-2 text-leaf-300'>{coloredText}</span>
      )}
    </h1>
  )
}
