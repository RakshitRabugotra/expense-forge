import Link from 'next/link'

export default function NavBar({ baseUrl }: { baseUrl?: string }) {
  // Get the base url
  const base = baseUrl ? baseUrl : ''

  return (
    <nav className='fixed bottom-0 left-0 right-0 z-10 flex flex-row items-center justify-around overflow-hidden rounded-full bg-lime-400 shadow-md backdrop-blur-sm [&>*]:transition-all [&>*]:duration-300'>
      <Link href={base + '/user'}>Home</Link>
      <Link href={base + '/other'}>Other link</Link>
    </nav>
  )
}
