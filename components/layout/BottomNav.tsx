'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import clsx from 'clsx'

type BottomItem = {
  key: string
  href: string
  label: string
  icon: React.ReactNode
  match?: (pathname: string) => boolean
}

function IconHome(props: { className?: string }) {
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.5 10.25 12 3l8.5 7.25" />
      <path d="M6 10v10h12V10" />
    </svg>
  )
}

function IconPlus(props: { className?: string }) {
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  )
}

function IconExplore(props: { className?: string }) {
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m9 15 1.5-4.5L15 9l-1.5 4.5L9 15Z" />
    </svg>
  )
}

function IconBell(props: { className?: string }) {
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

export default function BottomNav() {
  const pathname = usePathname()
  const { account } = useWallet()

  const items: BottomItem[] = [
    {
      key: 'home',
      href: '/',
      label: 'Home',
      icon: <IconHome className="w-5 h-5" />,
      match: (p) => p === '/',
    },
    {
      key: 'explore',
      href: '/explore',
      label: 'Explore',
      icon: <IconExplore className="w-5 h-5" />,
    },
    {
      key: 'create',
      href: '/',
      label: 'Create',
      icon: <IconPlus className="w-6 h-6" />,
      match: (p) => false,
    },
    {
      key: 'notifications',
      href: '#',
      label: 'Notifications',
      icon: <IconBell className="w-5 h-5" />,
    },
    {
      key: 'profile',
      href: account ? `/profile/${account.address.toString()}` : '#',
      label: 'Profile',
      icon: account ? (
        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-semibold">
          {account.address.toString().slice(0, 2).toUpperCase()}
        </div>
      ) : (
        <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs">
          U
        </div>
      ),
      match: (p) => account ? p.startsWith(`/profile/${account.address.toString()}`) : false,
    },
  ]

  return (
    <nav
      aria-label="Primary bottom navigation"
      className="bg-white dark:bg-[#242526] border-t border-gray-200 dark:border-[#3e4042]"
    >
      <div className="flex items-center justify-around px-2 py-1">
        {items.map((item) => {
          const active = item.match ? item.match(pathname) : pathname === item.href
          return (
            <Link
              key={item.key}
              href={item.href}
              className={clsx(
                'flex flex-col items-center justify-center gap-1 rounded-lg px-3 py-2 transition-colors',
                active
                  ? 'text-blue-500'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#3a3b3c]'
              )}
              aria-current={active ? 'page' : undefined}
            >
              <span className={clsx(
                'flex items-center justify-center',
                active && 'relative'
              )}>
                {item.icon}
                {active && (
                  <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-blue-500" />
                )}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}


