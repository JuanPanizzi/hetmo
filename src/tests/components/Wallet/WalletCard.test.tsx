import { render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import WalletCard from '../../../components/Wallet/WalletCard'
import { Wallet } from '../../../types/wallets'
import { MemoryRouter } from 'react-router-dom'

const wallet: Wallet = {
    id: '1',
    name: 'Cartera 1',
    cryptocurrencies: [],
    transactions: [],
}
describe('WalletCard', () => {
    test('should render', () => {
        render(
            <MemoryRouter>
                <WalletCard wallet={wallet} handleDeleteWallet={() => {}} cryptos={[]} handleWalletModal={() => {}} />
            </MemoryRouter>
        )
        expect(screen.getByText('Ingresar')).toBeInTheDocument()
    })
})
