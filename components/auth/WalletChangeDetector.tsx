'use client'

import { useEffect, useRef } from 'react'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { useRouter } from 'next/navigation'

export function WalletChangeDetector() {
  const { account, connected } = useWallet()
  const router = useRouter()
  const previousWalletRef = useRef<string | null>(null)
  const isInitialMount = useRef(true)

  useEffect(() => {
    const checkWalletChange = async () => {
      if (!connected || !account) {
        previousWalletRef.current = null
        return
      }

      const currentWallet = account.address.toString()

      // Skip on initial mount
      if (isInitialMount.current) {
        isInitialMount.current = false
        previousWalletRef.current = currentWallet
        return
      }

      // If wallet changed, logout and re-login
      if (previousWalletRef.current && previousWalletRef.current !== currentWallet) {
        console.log('🔄 Wallet changed detected!')
        console.log('Previous:', previousWalletRef.current)
        console.log('Current:', currentWallet)
        
        // Logout old session
        await fetch('/api/auth/logout', { method: 'POST' })
        
        // Login with new wallet
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ walletAddress: currentWallet }),
        })

        if (response.ok) {
          console.log('✅ Re-authenticated with new wallet')
          // Refresh the page to update all components with new session
          router.refresh()
          // Redirect to home
          router.push('/')
        }
      }

      previousWalletRef.current = currentWallet
    }

    checkWalletChange()
  }, [connected, account, router])

  return null
}
