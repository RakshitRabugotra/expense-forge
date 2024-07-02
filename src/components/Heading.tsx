import { twMerge } from 'tailwind-merge'

export default function Heading({
  id,
  className,
  text,
  coloredText,
}: {
  text: string
  coloredText: string
  className?: string
  id?: string
}) {
  return (
    <h1
      id={id}
      className={twMerge(
        className,
        'text-leaf-950 w-full text-left text-5xl font-medium',
        'select-none'
      )}
    >
      {text}
      <p className='text-leaf-300'>{coloredText}</p>
    </h1>
  )
}
