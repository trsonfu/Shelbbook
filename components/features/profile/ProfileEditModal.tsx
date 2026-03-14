'use client'

import { useState } from 'react'

interface ProfileEditModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: { display_name: string; bio: string; avatar_url: string }) => void
  initialData?: {
    display_name?: string
    bio?: string
    avatar_url?: string
  }
}

function IconClose(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  )
}

export default function ProfileEditModal({ isOpen, onClose, onSave, initialData }: ProfileEditModalProps) {
  const [displayName, setDisplayName] = useState(initialData?.display_name || '')
  const [bio, setBio] = useState(initialData?.bio || '')
  const [avatarUrl, setAvatarUrl] = useState(initialData?.avatar_url || '')
  const [isSaving, setIsSaving] = useState(false)

  if (!isOpen) return null

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onSave({
        display_name: displayName.trim() || undefined as any,
        bio: bio.trim() || undefined as any,
        avatar_url: avatarUrl.trim() || undefined as any,
      })
      onClose()
    } catch (error) {
      console.error('Error saving profile:', error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#242526] rounded-lg shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="relative border-b border-gray-200 dark:border-[#3e4042] px-4 py-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 text-center">
            Edit Profile
          </h2>
          <button
            onClick={onClose}
            disabled={isSaving}
            className="absolute right-4 top-3 w-9 h-9 rounded-full hover:bg-gray-100 dark:hover:bg-[#3a3b3c] flex items-center justify-center transition-colors disabled:opacity-50"
          >
            <IconClose className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Display Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your name"
              disabled={isSaving}
              className="w-full px-4 py-2 border border-gray-300 dark:border-[#3e4042] rounded-lg bg-white dark:bg-[#3a3b3c] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself"
              disabled={isSaving}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-[#3e4042] rounded-lg bg-white dark:bg-[#3a3b3c] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Avatar URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Avatar URL
            </label>
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://example.com/avatar.jpg"
              disabled={isSaving}
              className="w-full px-4 py-2 border border-gray-300 dark:border-[#3e4042] rounded-lg bg-white dark:bg-[#3a3b3c] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Enter a URL to an image for your profile picture
            </p>
          </div>

          {/* Avatar Preview */}
          {avatarUrl && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Preview
              </label>
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                <img
                  src={avatarUrl}
                  alt="Avatar preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-[#3e4042] p-4 flex gap-3">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="flex-1 py-2 px-4 bg-gray-200 dark:bg-[#3a3b3c] hover:bg-gray-300 dark:hover:bg-[#4e4f50] disabled:opacity-50 text-gray-900 dark:text-gray-100 font-semibold rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 py-2 px-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-[#3a3b3c] disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
