'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

// Icon dependencies
import {
  FaHome,
  FaFileInvoiceDollar,
  FaProjectDiagram,
  FaUserAlt,
} from 'react-icons/fa'
import { NavLinkType } from '@/types/navbar'
import { useMemo } from 'react'

const links: NavLinkType[] = [
  {
    id: 'home',
    href: '',
    IconComponent: FaHome,
  },
  {
    id: 'expenses',
    href: '/expenses',
    IconComponent: FaFileInvoiceDollar,
  },
  {
    id: 'stats',
    href: '/stats',
    IconComponent: FaProjectDiagram,
  },
  {
    id: 'profile',
    href: '/profile',
    IconComponent: FaUserAlt,
  },
]

export default function NavBar({ baseUrl }: { baseUrl: string }) {
  // Getting the path to get which link is active
  const pathname = usePathname()

  console.log(pathname)

  return (
    <nav
      className={twMerge(
        'fixed bottom-0 left-0 right-0 z-10',
        'flex flex-row items-center justify-around',
        'shadow-md backdrop-blur-sm',
        'overflow-clip rounded-full',
        '[&>*]:transition-all [&>*]:duration-300',
        '[&>*]:text-2xl [&>*]:text-foreground',
      )}
    >
      {links.map((navLink, index) => (
        <NavLink
          key={index}
          {...navLink}
          baseUrl={baseUrl}
          pathname={pathname}
          activeClass='[&>svg]:bg-leaf-300 [&>p]:text-leaf-300 [&>svg]:text-white'
        />
      ))}
    </nav>
  )
}

function NavLink({
  id,
  href,
  IconComponent,
  baseUrl,
  pathname,
  className,
  activeClass,
  inactiveClass,
}: NavLinkType & {
  baseUrl?: string
  pathname: string
  className?: string
  activeClass: string
  inactiveClass?: string
}) {
  // Get the Url for the link, if some base is provided or not
  const url = useMemo(() => (baseUrl ? baseUrl + href : href), [baseUrl, href])
  // Check if this link is active or not
  const isActive = useMemo(
    () => (baseUrl ? baseUrl + href === pathname : href === pathname),
    [baseUrl, href, pathname],
  )

  return (
    <Link
      href={url}
      className={twMerge(
        'm-2 basis-[22%]',
        className,
        isActive ? activeClass : inactiveClass,
      )}
    >
      <IconComponent
        className={twMerge(
          'mx-auto w-full rounded-full py-1 text-4xl',
          'transition-colors duration-200 ease-in',
        )}
      />

      <p className='my-1 w-full text-center text-sm capitalize'>{id}</p>
    </Link>
  )
}
