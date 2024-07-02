'use client'

import { useSpring, animated } from '@react-spring/web'
import { useState, useRef, useEffect } from 'react'

// Type definitions
import { type ModalProps } from '@/types/modal'

export default function FullScreenModal({
  ChildComponent,
  defaultOpen,
  onOpen,
  onClose,
}: ModalProps) {
  const [springs, api] = useSpring(() => ({
    from: { opacity: 0, zIndex: -10 },
  }))

  // Reference to the pop-up
  const popUpRef = useRef<HTMLDivElement>(null)
  // Check if the pop-up is open
  const [isOpen, setOpen] = useState<boolean>(defaultOpen ?? false)

  const openForm = () => {
    setOpen(true)
    if (onOpen) onOpen()
    api.start({
      from: {
        opacity: 0,
        zIndex: -10,
      },
      to: {
        opacity: 1,
        zIndex: 999,
      },
    })
  }
  const closeForm = () => {
    setOpen(false)
    if (onClose) onClose()
    api.start({
      from: {
        opacity: 1,
        zIndex: 999,
      },
      to: {
        opacity: 0,
        zIndex: -10,
      },
    })
  }

  // Check if we need to open the modal by default
  useEffect(() => {
    if (defaultOpen) openForm()
  }, [defaultOpen])

  return (
    <>
      <animated.div
        className='pop-up-container-fullscreen'
        style={springs}
        ref={popUpRef}
      >
        <ChildComponent openForm={openForm} closeForm={closeForm} />
      </animated.div>
    </>
  )
}
