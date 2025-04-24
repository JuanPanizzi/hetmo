import { render, screen } from '@testing-library/react'
import { CryptoTable } from '../../components/WalletDetail/CryptoTable'
import { Wallet } from '../../types/wallets'
import { describe, it, expect,  } from 'vitest';

describe('CryptoTable', () => {
   
   
    const mockWallet: Wallet = {
        id: '1',
        name: 'Test Wallet',
        transactions: [],
        cryptocurrencies: [
            {
                id: 'bitcoin',
                name: 'Bitcoin',
                symbol: 'BTC',
                image: 'lorem',
                amount: 0.5,
                current_price: 50000
            },
            {
                id: 'ethereum',
                name: 'Ethereum',
                symbol: 'ETH',
                image: 'lorem',
                amount: 2,
                current_price: 3000
            }
        ]
    }

    it('renders the table with correct title', () => {
        render(<CryptoTable wallet={mockWallet} />)
        expect(screen.getByText('Criptomonedas')).toBeDefined()
    })

    it('displays cryptocurrency data correctly', () => {
        render(<CryptoTable wallet={mockWallet} />)
        
       
        expect(screen.getByText('Bitcoin')).toBeDefined()
        expect(screen.getByText('Ethereum')).toBeDefined()
        
    })
      
 

})