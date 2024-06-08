import { SubmitButton } from './submit-button'
import { signIn, signUp } from '@/actions/auth'
import BackButton from '@/components/BackButton'

export default function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  return (
    <div className='flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md'>
      <BackButton />

      <form className='animate-in flex w-full flex-1 flex-col justify-center gap-2 text-foreground'>
        <label className='text-md' htmlFor='email'>
          Email
        </label>
        <input
          className='mb-6 rounded-md border bg-inherit px-4 py-2'
          name='email'
          placeholder='you@example.com'
          required
        />
        <label className='text-md' htmlFor='password'>
          Password
        </label>
        <input
          className='mb-6 rounded-md border bg-inherit px-4 py-2'
          type='password'
          name='password'
          placeholder='••••••••'
          autoComplete='current-password'
          required
        />
        <SubmitButton
          formAction={signIn}
          className='mb-2 rounded-md bg-green-700 px-4 py-2 text-foreground'
          pendingText='Signing In...'
        >
          Sign In
        </SubmitButton>
        <SubmitButton
          formAction={signUp}
          className='mb-2 rounded-md border border-foreground/20 px-4 py-2 text-foreground'
          pendingText='Signing Up...'
        >
          Sign Up
        </SubmitButton>
        {searchParams?.message && (
          <p className='mt-4 bg-foreground/10 p-4 text-center text-foreground'>
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  )
}
