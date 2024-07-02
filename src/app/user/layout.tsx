// Internal Dependencies
import AuthProtected from '@/components/Auth/AuthProtected'
import NavBar from '@/components/Navbar'
import PersonalizationProtected from '@/components/Personalization/PersonalizationProtected'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AuthProtected>
        <PersonalizationProtected>
          <NavBar baseUrl='/user' />
          {children}
        </PersonalizationProtected>
      </AuthProtected>
    </>
  )
}
