import { WalletContext } from "../../context/walletContext"
import { act, renderHook } from "@testing-library/react"
import { useWalletsReducer } from "../../hooks/useWalletsReducer"
import { describe, it, expect, vi } from 'vitest'

describe('useWalletReducer', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <WalletContext.Provider
            value={{
                wallets: [],
                addWallet: vi.fn(),
                deleteWallet: vi.fn(),
                addTransaction: vi.fn(),
                deleteTransaction: vi.fn(),
                updateWallet: vi.fn(),
                editTransaction: vi.fn(),
                updateTransactionStatus: vi.fn()
            }}
        >
            {children}
        </WalletContext.Provider>
    )                                       

    it('should add new wallet', () => {
        const { result } = renderHook(() => useWalletsReducer(), { wrapper })

        const walletTest = { 
            id: '1', 
            name: 'New Wallet test', 
            cryptocurrencies: [], 
            transactions: [] 
        }

        act(() => {
            result.current.addWallet(walletTest)
        })

        expect(result.current.wallets).toContain(walletTest)
      
    })
})


