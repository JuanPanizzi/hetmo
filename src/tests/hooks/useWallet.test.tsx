// tests/hooks/useWallet.test.tsx
import { renderHook, act } from '@testing-library/react'
import React from 'react'
import { WalletContext } from '../../context/walletContext'
import { useWallet } from '../../hooks/useWallet'
import { vi, describe, it, expect} from 'vitest'
import { CryptoType } from '../../types/wallets'

describe('useWallet hook', () => {

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
            result.current.handleCryptos(testCrypto);
        })

        expect(result.current.cryptos).toEqual(testCrypto);
    })



})
