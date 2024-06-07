import AuthButton from '@/components/AuthButton'
import AuthProtected from '@/components/AuthProtected'

export default function ProtectedPage() {
  return (
    <div className='flex w-full flex-1 flex-col items-center gap-20'>
      <div className='w-full'>
        <nav className='flex h-16 w-full justify-center border-b border-b-foreground/10'>
          <div className='flex w-full max-w-4xl items-center justify-between p-3 text-sm'>
            <AuthButton />
          </div>
        </nav>
      </div>
    </div>
  )
}
