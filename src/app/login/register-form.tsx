// Custom Actions
import { signUp } from '@/actions/auth'

// Internal Dependencies
import Input from '@/components/Forms/Input'
import { SubmitButton } from './submit-button'

export default function RegisterForm({
  searchParams,
}: {
  searchParams?: { message: string }
}) {
  return (
    <>
      <form className='animate-in flex w-full flex-1 flex-col justify-center gap-2 text-foreground'>
        <Input
          label='First Name'
          className='mb-6'
          name='first-name'
          placeholder='John'
          autoComplete={'given-name'}
          required
        />
        <Input
          label='Last Name'
          className='mb-6'
          name='last-name'
          placeholder='Doe'
          autoComplete={'family-name'}
          required
        />

        <Input
          label='Email'
          className='mb-6'
          name='email'
          placeholder='you@example.com'
          autoComplete={'email'}
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
          formAction={signUp}
          className='mb-2 rounded-md border border-foreground/20 bg-green-700 px-4 py-2 text-foreground'
          pendingText='Signing Up...'
        >
          Sign Up
        </SubmitButton>
      </form>
    </>
  )
}
