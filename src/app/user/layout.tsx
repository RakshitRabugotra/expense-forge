import { GeistSans } from 'geist/font/sans'

// Internal Dependencies
import AuthProtected from '@/components/AuthProtected'
import NavBar from '@/components/Navbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NavBar />
      <AuthProtected>{children}</AuthProtected>
    </>
  )
}
