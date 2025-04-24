import { Transactions } from "../../views/Transactions"
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { useTransactions } from "../../hooks/useTransactions";
import { TransactionModal } from "../../components/WalletDetail/TransactionModal";
import { PrimeReactProvider } from 'primereact/api';
import '../../i18n/primeReactLocale';

vi.mock('../../hooks/useTransactions', () => ({
    useTransactions: vi.fn()
}));

describe('Transactions', () => { 

    const walletTest = {
        id: '1',
        name: 'Wallet 1',
        transactions: [
            { 
                id: '1', 
                amount: 100, 
                status: 'pendiente',
                type: 'buy',
                crypto: 'BTC',
                price: 10000,
                date: '2024-01-01'
            }
        ],
        cryptocurrencies: [
            { id: '1', name: 'Bitcoin', symbol: 'BTC', amount: 100, current_price: 10000 }
        ]
    }

    beforeEach(() => {
        vi.mocked(useTransactions).mockReturnValue({
            wallets: [walletTest],
            addTransaction: vi.fn(),
            deleteTransaction: vi.fn(),
            newTransaction: {
                id: '',
                type: 'buy',
                crypto: 'BTC',
                amount: 0,
                price: 0,
                date: '',
                status: 'pendiente'
            },
            setNewTransaction: vi.fn(),
            visible: false,
            handleCancel: vi.fn(),
            handleNewTransaction: vi.fn(),
            wallet: walletTest,
            handleAddTransaction: vi.fn(),
            handleSetVisible: vi.fn(),
            cryptos: [],
            handleSetCryptos: vi.fn(),
            handleEditTransaction: vi.fn(),
            isEditing: false,
            loading: false,
            handleLoading: vi.fn(),
            editTransaction: vi.fn()
        });

        render(
            <MemoryRouter>
                <Transactions />
            </MemoryRouter>
        )
    })  

    it('should render the pending transactions component when wallet exists', () => {
        const wallet = walletTest
        wallet.transactions[0].status = 'confirmada'
        expect(screen.getByText('Transacciones pendientes')).toBeInTheDocument()
        expect(screen.getByText('Confirmar')).toBeInTheDocument()
    })

    it('should render TransactionModal when clicking "Nueva Transacción" button', () => {
        
        render(
            <PrimeReactProvider value={{ locale: 'es' }}>
                <MemoryRouter>
                    <TransactionModal 
                        visible={true} 
                        handleSetVisible={vi.fn()} 
                        newTransaction={walletTest.transactions[0]} 
                        handleNewTransaction={vi.fn()} 
                        cryptos={[]} 
                        handleCancel={vi.fn()} 
                        saveNewTransaction={vi.fn()} 
                        isEditing={false} 
                    />
                </MemoryRouter>
            </PrimeReactProvider>
        )

        const newTransactionButton = screen.getByRole('button', { name: /Nueva Transacción/i });
        expect(newTransactionButton).toBeInTheDocument();

        fireEvent.click(newTransactionButton);

        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
})
