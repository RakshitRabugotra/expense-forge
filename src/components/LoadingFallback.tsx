export default function LoadingFallback({ text }: { text?: string }) {
  return (
    <div className='flex flex-row items-center justify-between gap-2 p-2'>
      <div className='loader'></div>
      <p>{text}</p>
    </div>
  )
}
