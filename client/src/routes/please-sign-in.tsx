import PageContainer from '@/components/page-container'
import SigninButton from '@/components/signin-button'

export default function PleaseSignIn() {
  return (
    <PageContainer name="Please sign in">
      <p className="pb-4">Please sign in to view this page.</p>
      <SigninButton />
    </PageContainer>
  )
}
