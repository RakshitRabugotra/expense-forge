// Custom actions
import { signIn } from '@/actions/auth'

// Internal Dependencies
import { SubmitButton } from './submit-button'
import Input from '@/components/Forms/Input'

export default function LoginForm({
  searchParams,
}: {
  searchParams?: { message: string }
}) {
  return (
    <>
      <form className='animate-in flex w-full flex-1 flex-col justify-center gap-2 text-foreground'>
        <Input
          label='Email'
          className='mb-6'
          name='email'
          placeholder='you@example.com'
          required
        />

        <Input
          label='Password'
          className='mb-6'
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
      </form>
    </>
  )
}
