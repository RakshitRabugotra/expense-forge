'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import Link from 'next/link'

// Icon dependencies
import {
  FaHome,
  FaFileInvoiceDollar,
  FaProjectDiagram,
  FaUserAlt,
} from 'react-icons/fa'

// Internal Dependencies
import { NavLinkType } from '@/types/navbar'

// Custom Utilities
import { mapStyles } from '@/utils/functions/css'

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

  return (
    <nav
      className={twMerge(
        'fixed bottom-0 left-0 right-0 z-10',
        'flex flex-row items-center justify-around',
        'bg-white/95 shadow-md backdrop-blur-sm',
        'overflow-clip',
        '[&>*]:transition-all [&>*]:duration-300',
        '[&>*]:text-2xl [&>*]:text-foreground',
        'lg:bottom-0 lg:left-0 lg:right-auto lg:top-0',
        'lg:flex-col',
      )}
    >
      {links.map((navLink, index) => (
        <NavLink
          key={index}
          {...navLink}
          baseUrl={baseUrl}
          pathname={pathname}
          prefetch
          activeClass='[&>svg]:bg-leaf-300 [&>p]:text-leaf-300 [&>svg]:text-white'
          hoverClass={['bg-leaf-300/50', 'text-white']}
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
  hoverClass,
  prefetch,
}: NavLinkType & {
  baseUrl?: string
  pathname: string
  className?: string
  activeClass: string
  inactiveClass?: string
  hoverClass?: string[]
  prefetch?: boolean
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
      prefetch={prefetch}
      className={twMerge(
        'm-2 basis-[22%] lg:w-[80%]',
        className,
        isActive ? activeClass : inactiveClass,
        hoverClass ? mapStyles(hoverClass, ['[&>*]:hover', '[&>*]:focus']) : '',
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
