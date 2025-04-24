import { Transactions } from "../../views/Transactions"
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"


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

    it('should render the transaction modal when the button is clicked', () => {
        const buttonAddTransaction = screen.getByText('Nueva Transacción')
       
        fireEvent.click(buttonAddTransaction)

        expect(screen.getByTestId('transaction-modal')).toBeInTheDocument()
    })

})
