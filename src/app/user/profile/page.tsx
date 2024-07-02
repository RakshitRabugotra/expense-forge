// Custom Actions
import { getUser } from '@/actions/auth'
import { getUserPersonalizations } from '@/actions/user-personalization'

// Internal Dependencies
import Heading from '@/components/Heading'
import AuthButton from '@/components/Auth/AuthButton'
import ModifyAccount from '@/components/Profile/ModifyAccount'
import Section from '@/components/Profile/Section'
import ModifyPreferences from '@/components/Profile/ModifyPreferences'

// Type definitions
import { User } from '@supabase/supabase-js'
import { Tables } from '@/types/supabase'

export default async function ProfilePage() {
  // Fetch the logged-in user
  const {
    data: { user },
  } = await getUser()

  if (!user) {
    console.error('ERROR: Cannot get the logged-in user for profile page')
    return
  }

  // The personalizations of the user
  const personalizations = await getUserPersonalizations()

  if (!personalizations) {
    console.error('ERROR: Cannot fetch personalizations for the user')
    return
  }

  // Metadata of the user
  const {
    user_metadata: { firstName },
  } = user

  return (
    <>
      <Heading text={'Welcome'} coloredText={(firstName ?? '') as string} />
      <AccountSection user={user} personalizations={personalizations} />
      <PreferenceSection user={user} />
      <LogoutSection />
    </>
  )
}

function AccountSection({
  user,
  personalizations,
}: {
  user: User
  personalizations: Tables<'user_personalization'>
}) {
  return (
    <Section title='Account' border>
      <ModifyAccount user={user} personalizations={personalizations} />
    </Section>
  )
}

function PreferenceSection({ user }: { user: User }) {
  return (
    <Section title='Preferences' className='mt-0'>
      <ModifyPreferences user={user} />
    </Section>
  )
}

function LogoutSection() {
  return (
    <Section title='' className='mt-0' border>
      <AuthButton />
    </Section>
  )
}
