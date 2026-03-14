import type { ReactNode } from 'react'
import ShelbookHeader from '@/components/shared/layout/ShelbookHeader'
import ShelbookLeftSidebar from '@/components/shared/layout/ShelbookLeftSidebar'
import ShelbookRightSidebar from '@/components/shared/layout/ShelbookRightSidebar'
import BottomNav from '@/components/shared/layout/BottomNav'
import { WalletChangeDetector } from '@/components/features/auth/WalletChangeDetector'

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#18191a]">
      {/* Wallet Change Detector - Auto re-login on wallet switch */}
      <WalletChangeDetector />
      
      {/* Fixed Header */}
      <ShelbookHeader />

      {/* Three-column layout */}
      <div className="pt-14">
        {/* Left Sidebar - Desktop only */}
        <ShelbookLeftSidebar />

        {/* Main Content - Center column */}
        <main className="lg:ml-72 xl:mr-80 min-h-[calc(100vh-3.5rem)]">
          {children}
        </main>

        {/* Right Sidebar - Desktop only */}
        <ShelbookRightSidebar />

        {/* Mobile bottom nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
          <BottomNav />
        </div>
      </div>
    </div>
  )
}

