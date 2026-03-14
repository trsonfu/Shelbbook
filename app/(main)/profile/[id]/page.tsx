import { getSession } from '@/lib/features/auth'
import ShelbookProfile from '@/components/features/profile/ShelbookProfile'

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getSession()

  // Await params to get the id
  const { id } = await params

  // Use wallet address from session (can be undefined for unauthenticated users)
  const currentWalletAddress = session?.walletAddress
  const currentUserId = session?.userId

  return (
    <div className="min-h-screen py-4">
      <ShelbookProfile 
        userId={id} 
        currentUserId={currentUserId}
        currentWalletAddress={currentWalletAddress}
      />
    </div>
  )
}
