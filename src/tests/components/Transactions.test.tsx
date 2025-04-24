import { Transactions } from "../../views/Transactions"
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { useTransactions } from "../../hooks/useTransactions";

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
        expect(screen.getByText('Transacciones')).toBeInTheDocument()
        expect(screen.getByText('Transacciones pendientes')).toBeInTheDocument()
    })

   

})
