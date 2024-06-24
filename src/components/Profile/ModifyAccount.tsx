import { generateUniqueAvatar } from '@/utils/dicebear/dicebear'
import { User } from '@supabase/supabase-js'
import parse from 'html-react-parser'
import { twMerge } from 'tailwind-merge'
import UserEditButton from './UserEditButton'

export default function ModifyAccount({ user }: { user: User }) {
  // User's metadata
  let {
    user_metadata: { firstName, lastName, avatar },
  } = user

  // If the avatar is not defined, in user data
  if (!avatar) {
    // Generate a simple random avatar, and assign it to the user
    console.log('avatar not found')
    avatar = generateUniqueAvatar().toString()
    console.log({ avatar })
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
