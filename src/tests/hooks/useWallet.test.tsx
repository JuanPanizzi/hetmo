// tests/hooks/useWallet.test.tsx
import { renderHook, act } from '@testing-library/react'
import React from 'react'
import { WalletContext } from '../../context/walletContext'
import { useWallet } from '../../hooks/useWallet'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { Wallet, Crypto as CryptoType } from '../../types/wallets'

describe('useWallet hook', () => {

    // 
    let fakeAdd: ReturnType<typeof vi.fn>
    let fakeUpdate: ReturnType<typeof vi.fn>
    let fakeDelete: ReturnType<typeof vi.fn>
    let fakeAddTransaction: ReturnType<typeof vi.fn>
    let fakeDeleteTransaction: ReturnType<typeof vi.fn>
    let fakeEditTransaction: ReturnType<typeof vi.fn>
    let fakeUpdateTransactionStatus: ReturnType<typeof vi.fn>


    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <WalletContext.Provider
            value={{
                wallets: [],
                addWallet: fakeAdd,
                updateWallet: fakeUpdate,
                deleteWallet: fakeDelete,
                addTransaction: fakeAddTransaction,
                deleteTransaction: fakeDeleteTransaction,
                editTransaction: fakeEditTransaction,
                updateTransactionStatus: fakeUpdateTransactionStatus
            }}
        >
            {children}
        </WalletContext.Provider>
    )

    beforeEach(() => {
        fakeAdd = vi.fn()
        fakeUpdate = vi.fn()
        fakeDelete = vi.fn()
        fakeAddTransaction = vi.fn()
        fakeDeleteTransaction = vi.fn()
        fakeEditTransaction = vi.fn()
        fakeUpdateTransactionStatus = vi.fn()
    })

    it('should initialize default states of useWallet custom hook', () => {
        const { result } = renderHook(() => useWallet(), { wrapper })

        expect(result.current.showWalletModal).toBe(false)
        expect(result.current.isEditing).toBe(false)
        expect(result.current.newWallet.name).toBe('')
        expect(typeof result.current.newWallet.id).toBe('string')
        expect(result.current.cryptos).toEqual([])
        expect(result.current.loading).toBe(false)
        expect(result.current.selectedWallet).toBeUndefined()
    })


    it('should add a new wallet with handleNewWallet ', () => {
        const { result } = renderHook(() => useWallet(), { wrapper })

        result.current.isEditing = false;
        act(() => {
            result.current.handleNewWallet({ id: '1', name: 'New Wallet test' })
        })
        expect(result.current.newWallet.name).toBe('New Wallet test')
    })

    it('shoul add cryptos with handleCryptos ', () => {
        const { result } = renderHook(() => useWallet(), { wrapper })

        result.current.cryptos = [];
        const testCrypto = [ {
                id: '1',
                symbol: 'BTC',
                name: 'Bitcoin',
                current_price: 10000,
            }] as CryptoType[];
        
        act(() => {
            result.current.handleCryptos(testCrypto)
        })

        expect(result.current.cryptos).toEqual(testCrypto)
    })



})
