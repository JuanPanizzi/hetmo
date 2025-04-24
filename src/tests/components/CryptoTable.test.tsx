import { render, screen } from '@testing-library/react'
import { CryptoTable } from '../../components/WalletDetail/CryptoTable'
import { describe, it, expect,  } from 'vitest';
import { mockWalletCrypto } from '../mocks/walletMocks';


describe('CryptoTable', () => {
      

    it('renders the table with correct title', () => {
        render(<CryptoTable wallet={mockWalletCrypto} />)
        expect(screen.getByText('Criptomonedas')).toBeDefined()
    })

    it('displays cryptocurrency data correctly', () => {
       
        render(<CryptoTable wallet={mockWalletCrypto} />)
        expect(screen.getByText('Bitcoin')).toBeDefined()
        expect(screen.getByText('Ethereum')).toBeDefined()
        
    })
      
 

})