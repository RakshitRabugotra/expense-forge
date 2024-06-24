// Custom Actions
import { getUser } from '@/actions/auth'

// Internal Dependencies
import Heading from '@/components/Heading'
import AuthButton from '@/components/Auth/AuthButton'
import ModifyAccount from '@/components/Profile/ModifyAccount'
import Section from '@/components/Profile/Section'
import ModifyPreferences from '@/components/Profile/ModifyPreferences'

// Type definitions
import { User } from '@supabase/supabase-js'

export default async function ProfilePage() {
  // Fetch the logged-in user
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
      <AccountSection user={user} />
      <PreferenceSection user={user} />
      <AuthButton />
    </>
  )
}

function AccountSection({ user }: { user: User }) {
  return (
    <Section title={'Account'} border>
      <ModifyAccount user={user} />
    </Section>
  )
}

function PreferenceSection({ user }: { user: User }) {
  return (
    <Section title={'Preferences'} className='mt-0'>
      <ModifyPreferences user={user} />
    </Section>
  )
}
