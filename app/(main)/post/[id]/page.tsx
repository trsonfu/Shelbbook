import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import PostDetail from '@/components/post/PostDetail'

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getSession()

  if (!session?.authenticated) {
    redirect('/login')
  }

  const { id } = await params

  return <PostDetail postId={id} />
}
