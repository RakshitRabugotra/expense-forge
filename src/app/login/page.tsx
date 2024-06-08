import BackButton from '@/components/BackButton'
import AuthForm from './auth-form'

/* The Auth flow will happen in two-steps
  The user will be prompted to enter the email,
   1. if the email is found in the database, then password box will appear with email box already there.
   2. if not, then the user will taken a sign-up form
 */

export default function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  return (
    <div className='flex w-full flex-1 flex-col justify-center gap-2 sm:max-w-md'>
      <BackButton />
      {/* The auth form */}
      <AuthForm />

      {searchParams?.message && (
        <p className='mt-4 bg-foreground/10 p-4 text-center text-foreground'>
          {searchParams.message}
        </p>
      )}
    </div>
  )
}
