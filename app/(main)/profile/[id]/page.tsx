import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import FacebookProfile from '@/components/profile/FacebookProfile'

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getSession()

  if (!session?.authenticated) {
    redirect('/login')
  }

  // Await params to get the id
  const { id } = await params

  // Use wallet address from session instead of getCurrentUser
  // since getCurrentUser requires the user to exist in database
  const currentWalletAddress = session.walletAddress

  return (
    <div className="min-h-screen py-4">
      <FacebookProfile 
        userId={id} 
        currentUserId={session.userId}
        currentWalletAddress={currentWalletAddress}
      />
    </div>
  )
}
