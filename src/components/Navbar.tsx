'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import Link from 'next/link'

// Icon dependencies
import {
  FaHome,
  FaFileInvoiceDollar,
  FaProjectDiagram,
  FaUserAlt,
  FaBars,
} from 'react-icons/fa'

// Internal Dependencies
import { NavLinkType } from '@/types/navbar'

// Custom Utilities
import { mapStyles } from '@/utils/functions/css'
import { useTrail, animated, useSpring } from '@react-spring/web'
import { MdClose } from 'react-icons/md'

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
    <>
      <nav
        className={twMerge(
          'fixed bottom-0 left-0 right-0 z-10',
          'flex flex-row items-center justify-around',
          'bg-white/95 shadow-md backdrop-blur-sm',
          'overflow-clip',
          '[&>*]:transition-all [&>*]:duration-300',
          '[&>*]:text-2xl [&>*]:text-foreground',
          'md:hidden',
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

      {/* The navbar which is visible only when we go beyond 768px */}
      <ButtonMenuNav baseUrl={baseUrl} pathname={pathname} />
    </>
  )
}

function ButtonMenuNav({
  baseUrl,
  pathname,
}: {
  baseUrl: string
  pathname: string
}) {
  // Whether to show the menu
  const [visible, setVisible] = useState<boolean>(false)

  // To make overlay for navigation
  const [springs, api] = useSpring(() => ({
    from: { opacity: 0, backgroundColor: '#fff' },
  }))

  // To make a smooth trailing animation
  const [trail, trailApi] = useTrail(links.length, () => ({
    from: {
      transform: 'translateY(10%)',
      opacity: 0,
    },
    to: {
      transform: 'translateY(0%)',
      opacity: 1,
    },
    reset: true,
  }))

  useEffect(() => {
    if (visible && trailApi && api) {
      trailApi.start({ to: { opacity: 1 }, reset: true })
      api.start({
        to: { opacity: 1, backgroundColor: '#242424dd' },
        reset: true,
      })
    }
    if (!visible && trailApi && api) {
      trailApi.start({
        to: { opacity: 0, transform: 'translateY(-10%)' },
        reset: true,
      })
      api.start({ to: { opacity: 0 }, reset: true })
    }
  }, [visible, trailApi, api])

  return (
    // This will be hamburger type navigation
    <nav className='hidden md:block'>
      {/* The navigation links */}
      <animated.div
        className={twMerge(
          'fixed inset-0',
          'min-h-screen w-full',
          'backdrop-blur-sm',
          visible ? 'z-[699]' : '-z-[1]',
        )}
        style={springs}
      >
        <animated.div
          className={twMerge(
            'absolute bottom-0 left-0 z-[699] m-6 my-28',
            'flex flex-col',
          )}
        >
          {trail.map((props, index) => (
            <animated.div
              key={index}
              style={props}
              className='my-2 max-w-fit rounded-full bg-white/90 backdrop-blur-sm'
              onClick={() => setVisible(false)}
            >
              <NavLink
                key={index}
                {...links[index]}
                baseUrl={baseUrl}
                pathname={pathname}
                activeClass='[&>svg]:bg-leaf-300 [&>p]:text-leaf-300 [&>svg]:text-white md:bg-leaf-300 md:rounded-full md:[&>p]:text-white'
                hoverClass={['bg-leaf-300/50', 'text-white']}
              />
            </animated.div>
          ))}
        </animated.div>
      </animated.div>

      {/* Hamburger icon */}
      <button
        className={twMerge(
          'fixed bottom-0 left-0 z-[899] m-6',
          'p-4',
          'bg-leaf-300 text-3xl text-white',
          'rounded-full',
          'hover:bg-leaf-400 hover:opacity-80',
          'transition-colors duration-700',
        )}
        onClick={() => setVisible((prev) => !prev)}
      >
        {visible ? <MdClose /> : <FaBars />}
      </button>
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
        'm-2 basis-[22%] md:w-[80%]',
        'md:inline-flex md:gap-3',
        className,
        isActive ? activeClass : inactiveClass,
        hoverClass ? mapStyles(hoverClass, ['[&>*]:hover', '[&>*]:focus']) : '',
      )}
    >
      <IconComponent
        className={twMerge(
          'mx-auto w-full rounded-full py-1 text-4xl',
          'md:min-w-16',
          'transition-colors duration-200 ease-in',
        )}
      />
      <p
        className={twMerge(
          'my-1 w-full text-center text-sm capitalize',
          'md:my-auto md:min-w-52 md:text-left md:text-xl',
        )}
      >
        {id}
      </p>
    </Link>
  )
}
