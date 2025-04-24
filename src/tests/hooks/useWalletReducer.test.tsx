import { WalletContext } from "../../context/walletContext"
import { act, renderHook } from "@testing-library/react"
import { useWalletsReducer } from "../../hooks/useWalletsReducer"
import { describe, it, expect, vi } from 'vitest'
import {  Wallet } from "../../types/wallets"
import { transactionReducerTest, walletReducerTest } from "../mocks/mocks"
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

        act(() => {
            result.current.addWallet(walletReducerTest)
        })

        expect(result.current.wallets).toContain(walletReducerTest)
      
    })

    it('should delete wallet', () => {  
        const { result } = renderHook(() => useWalletsReducer(), { wrapper })

        act(() => {
            result.current.deleteWallet(walletReducerTest.id)
        })

        expect(result.current.wallets).not.toContain(walletReducerTest)        
    })

    it('should add transaction', () => {
        const { result } = renderHook(() => useWalletsReducer(), { wrapper })

        

        act(() => {
            result.current.addWallet(walletReducerTest)
        })

        act(() => {
            result.current.addTransaction(walletReducerTest.id, transactionReducerTest)
        })

        const walletWithTransaction = result.current.wallets.find((wallet: Wallet) => wallet.id === walletReducerTest.id)
        expect(walletWithTransaction?.transactions).toContainEqual(
            expect.objectContaining(transactionReducerTest) 
          );
          
    })  

    it('should delete transaction', () => {
        const { result } = renderHook(() => useWalletsReducer(), { wrapper })

        act(() => {
            result.current.deleteTransaction(walletReducerTest.id, transactionReducerTest)
        })
        
        expect(result.current.wallets.findIndex((w: Wallet) => w.id === walletReducerTest.id)).toBe(-1)  
    })

})

