import { WalletContext } from "../../context/walletContext"
import { act, renderHook } from "@testing-library/react"
import { useWalletsReducer } from "../../hooks/useWalletsReducer"
import { describe, it, expect, vi } from 'vitest'
import { Transaction, Wallet } from "../../types/wallets"

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

    it('should delete wallet', () => {  
        const { result } = renderHook(() => useWalletsReducer(), { wrapper })

        const walletTest = { 
            id: '1', 
            name: 'New Wallet test', 
            cryptocurrencies: [], 
            transactions: [] 
        }

        act(() => {
            result.current.deleteWallet(walletTest.id)
        })

        expect(result.current.wallets).not.toContain(walletTest)        
    })

    it('should add transaction', () => {
        const { result } = renderHook(() => useWalletsReducer(), { wrapper })

        const walletTest = { 
            id: '1', 
            name: 'New Wallet test', 
            cryptocurrencies: [], 
            transactions: [] 
        }

        const transactionTest: Transaction = { 
            id: '1', 
            type: 'Compra', 
            crypto: { id: '1', name: 'Bitcoin', symbol: 'BTC', image: '', current_price: 10000 }, 
            amount: 1, 
            price: 10000, 
            date: new Date().toISOString(), 
            status: 'pendiente'
           
        }

        act(() => {
            result.current.addWallet(walletTest)
        })

        act(() => {
            result.current.addTransaction(walletTest.id, transactionTest)
        })

        const walletWithTransaction = result.current.wallets.find((wallet: Wallet) => wallet.id === walletTest.id)
        expect(walletWithTransaction?.transactions).toContainEqual(
            expect.objectContaining(transactionTest) 
          );
          
    })  
})

