import parse from 'html-react-parser'
import { twMerge } from 'tailwind-merge'

// Internal Dependencies
import UserEditButton from './UserEditButton'

// Custom Utilities for avatar generation
import { generateUniqueAvatar } from '@/utils/dicebear/dicebear'

// Custom actions
import { recordAvatar } from '@/actions/user-personalization'

// Type definitions
import { User } from '@supabase/supabase-js'
import { Tables } from '@/types/supabase'

export default async function ModifyAccount({
  user,
  personalizations,
}: {
  user: User
  personalizations: Tables<'user_personalization'>
}) {
  // User's metadata
  const {
    user_metadata: { firstName, lastName },
  } = user

  // User's avatar
  let avatar = personalizations?.avatar ?? null

  // If the avatar is not defined, in user data
  if (!avatar) {
    // Generate a simple random avatar, and assign it to the user
    avatar = generateUniqueAvatar().toString()
    // Register this avatar
    await recordAvatar(avatar)
  }

  return (
    <section
      className={twMerge(
        'w-full',
        'flex flex-row items-center justify-between gap-3',
      )}
    >
      {/* The user's avatar */}
      <div className='aspect-square h-14 overflow-clip rounded-full border border-black/15'>
        {parse(avatar)}
      </div>

      {/* The user's name and email */}
      <div className='grow text-base font-light'>
        <h2 className='break-words text-xl'>{`${firstName} ${lastName}`}</h2>
        <h4 className='break-all text-sm'>{user.email}</h4>
      </div>

      {/* The edit button */}
      <UserEditButton />
    </section>
  )
}
