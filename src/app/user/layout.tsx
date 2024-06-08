// Internal Dependencies
import AuthProtected from '@/components/Auth/AuthProtected'
import NavBar from '@/components/Navbar'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NavBar baseUrl='/user' />
      <AuthProtected>{children}</AuthProtected>
    </>
  )
}
