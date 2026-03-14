import Feed from '@/components/features/post/Feed'
import ThemeToggle from '@/components/shared/layout/ThemeToggle'

export default async function HomePage() {
  return (
    <div className="min-h-screen py-4">
      <div className="max-w-[680px] mx-auto px-4">
        <Feed />
      </div>
    </div>
  )
}
