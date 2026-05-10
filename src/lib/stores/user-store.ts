import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { User, KYCStatus } from '@/types/user'

interface UserState {
  user: User | null
  isAuthenticated: boolean
  kycStatus: KYCStatus
  kycStep: number
  setUser: (user: User | null) => void
  setKycStatus: (status: KYCStatus) => void
  setKycStep: (step: number) => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      kycStatus: 'Unverified',
      kycStep: 1,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setKycStatus: (kycStatus) => set({ kycStatus }),
      setKycStep: (kycStep) => set({ kycStep }),
      logout: () => set({ user: null, isAuthenticated: false, kycStatus: 'Unverified', kycStep: 1 }),
    }),
    {
      name: 'user-storage',
    }
  )
)
