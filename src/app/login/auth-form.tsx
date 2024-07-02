'use client'

import { useState } from 'react'
import LoginForm from './login-form'
import RegisterForm from './register-form'
import { FaExternalLinkSquareAlt } from 'react-icons/fa'

export default function AuthForm() {
  const [isLogin, setLogin] = useState<boolean>(true)

  return isLogin ? (
    <>
      <LoginForm />
      <p>
        New here?
        <a
          className='text-leaf-800 cursor-pointer px-4 underline underline-offset-2'
          onClick={() => setLogin(false)}
        >
          Register instead <FaExternalLinkSquareAlt className='inline-block' />
        </a>
      </p>
    </>
  ) : (
    <>
      <RegisterForm />
      <p>
        Have an account?
        <a
          className='text-leaf-800 cursor-pointer px-4 underline underline-offset-2'
          onClick={() => setLogin(true)}
        >
          Sign In instead <FaExternalLinkSquareAlt className='inline-block' />
        </a>
      </p>
    </>
  )
}
