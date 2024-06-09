// Custom Actions
import { getUser } from '@/actions/auth'

// Internal Dependencies
import Heading from '@/components/Heading'
import ProfileMenu from './profile-menu'

export default async function ProfilePage() {
  // Fetch the logged-in usr
  const {
    data: { user },
  } = await getUser()

  if (!user) {
    console.error('ERROR: Cannot get the logged-in user for profile page')
    return
  }

  // Metadata of the user
  const {
    user_metadata: { firstName },
  } = user

  return (
    <>
      <Heading text={'Welcome'} coloredText={(firstName ?? '') as string} />
      <ProfileMenu />
    </>
  )
}
