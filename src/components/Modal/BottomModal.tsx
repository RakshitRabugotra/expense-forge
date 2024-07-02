'use client'

import { useSpring, animated } from '@react-spring/web'
import { useState, useRef, useEffect } from 'react'

// Type definitions
import { type BottomModalProps } from '@/types/modal'

export default function BottomModal({
  setRefresh,
  ChildComponent,
  OpenButton,
  onOpen,
  onClose,
}: BottomModalProps) {
  const [springs, api] = useSpring(() => ({
    from: { bottom: '-100vh' },
  }))

  // Reference to the pop-up
  const popUpRef = useRef<HTMLDivElement>(null)
  // Check if the pop-up is open
  const [isOpen, setOpen] = useState<boolean>(false)

  const openForm = () => {
    setOpen(true)
    if (onOpen) onOpen()
    api.start({
      from: {
        bottom: '-100vh',
      },
      to: {
        bottom: '0vh',
      },
    })
  }
  const closeForm = () => {
    setOpen(false)
    if (onClose) onClose()
    api.start({
      from: {
        bottom: '0vh',
      },
      to: {
        bottom: '-100vh',
      },
    })
  }

  // Handle clicks outside
  const handleClickOutside = (event: MouseEvent) => {
    if (!popUpRef.current || !isOpen) return

    // The clicked doesn't contain the form
    if (!popUpRef.current.contains(event.target as Node)) {
      return closeForm()
    }
  }

  // Close the modal when clicked outside
  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside)
    return () => window.removeEventListener('mousedown', handleClickOutside)
  }, [popUpRef, isOpen])

  return (
    <>
      <animated.div className='pop-up-container' style={springs} ref={popUpRef}>
        <ChildComponent
          openForm={openForm}
          closeForm={closeForm}
          setRefresh={setRefresh}
        />
      </animated.div>

      {/* Toggle button for the form */}
      {OpenButton && <OpenButton openForm={openForm} />}
    </>
  )
}
