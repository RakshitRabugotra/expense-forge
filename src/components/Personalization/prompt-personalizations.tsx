'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSpring, animated } from '@react-spring/web'

// Custom Components
import FullScreenModal from '@/components/Modal/FullScreenModal'
import Input from '@/components/Forms/Input'
import SubmitButton from '@/components/Forms/SubmitButton'
import LoadingFallback from '@/components/LoadingFallback'

// Custom Actions
import { recordUserPersonalizations } from '@/actions/user-personalization'

// Constants Dependencies
import { PERSONALIZATION_FIELDS_INPUTS } from '@/utils/constants'

// Type definitions
import type { Tables } from '@/types/supabase'
import type { ModalChildProps } from '@/types/modal'

// Type aliasing of Supabase definition to simple types
type PersonalizationType = Tables<'user_personalization'>

export default function PromptPersonalizations({
  invalidFields,
}: {
  invalidFields: (keyof PersonalizationType)[] | null
}) {
  // Router for re-routing to the user page
  const router = useRouter()
  // State variables for the component
  const [done, setDone] = useState<boolean>(false)

  // When we're done, re-route to the protected route
  useEffect(() => {
    if (done) {
      router.refresh()
    }
  }, [done])

  // When we close the form, we need to show the loading
  const [springs, api] = useSpring(() => ({
    from: { opacity: 0 },
  }))

  return (
    <>
      <FullScreenModal
        defaultOpen
        ChildComponent={(props) => (
          <PersonalizationForm
            {...props}
            invalidFields={invalidFields}
            setDone={setDone}
          />
        )}
        onClose={() => api.start({ from: { opacity: 0 }, to: { opacity: 1 } })}
      />
      <animated.div
        style={springs}
        className='absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2'
      >
        <LoadingFallback text='Saving' />
      </animated.div>
    </>
  )
}

function PersonalizationForm({
  invalidFields,
  closeForm,
  setDone,
}: ModalChildProps & {
  invalidFields: (keyof PersonalizationType)[] | null
  setDone: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element {
  // Reference to the form
  const formRef = useRef<HTMLFormElement>(null)

  // Resets the form
  const resetMenu = () => {
    // Reset the form
    if (formRef?.current) formRef?.current.reset()
    // Close the form
    closeForm()
    // The process is done
    setDone(true)
  }

  return (
    <div className='pop-up-fullscreen'>
      <h3 className='relative w-full p-4 text-3xl font-light capitalize'>
        Set Preferences
      </h3>

      <form
        className='my-auto flex w-full flex-col justify-around gap-6 p-6'
        ref={formRef}
      >
        {invalidFields === null
          ? // If the invalid fields are null, then all fields are required to be entered by the user
            Object.values(PERSONALIZATION_FIELDS_INPUTS).map((props) =>
              props !== null ? (
                <Input {...props} />
              ) : (
                <div className='hidden' />
              ),
            )
          : // The Input fields contain specific null fields (or default fields), prompt the user only that
            invalidFields.map((field, index) => (
              <Input {...PERSONALIZATION_FIELDS_INPUTS[field]} key={index} />
            ))}

        <SubmitButton
          formAction={recordUserPersonalizations}
          onChange={() => {
            resetMenu()
          }}
        >
          Save Changes
        </SubmitButton>
      </form>
    </div>
  )
}
