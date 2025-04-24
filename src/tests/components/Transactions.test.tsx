import { Transactions } from "../../views/Transactions"
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { useTransactions } from "../../hooks/useTransactions";
import { TransactionModal } from "../../components/WalletDetail/TransactionModal";
import { PrimeReactProvider } from 'primereact/api';
import '../../i18n/primeReactLocale';
import { mockWallet } from "../mocks/mocks";
import { mockUseTransactions } from "../mocks/mocks";

vi.mock('../../hooks/useTransactions', () => ({
    useTransactions: vi.fn()
}));


describe('Transactions', () => { 
    beforeEach(() => {
        vi.mocked(useTransactions).mockReturnValue(mockUseTransactions);
        render(
            <MemoryRouter>
                <Transactions />
            </MemoryRouter>
        );
    });  

    it('should render the pending transactions component when wallet exists', () => {
        const wallet = { ...mockWallet };
        wallet.transactions[0].status = 'confirmada';
        
        expect(screen.getByText('Transacciones pendientes')).toBeInTheDocument();
        expect(screen.getByText('Confirmar')).toBeInTheDocument();
    });

    it('should render TransactionModal when clicking "Nueva Transacción" button', () => {
        render(
            <PrimeReactProvider value={{ locale: 'es' }}>
                <MemoryRouter>
                    <TransactionModal 
                        visible={true} 
                        handleSetVisible={vi.fn()} 
                        newTransaction={mockWallet.transactions[0]} 
                        handleNewTransaction={vi.fn()} 
                        cryptos={[]} 
                        handleCancel={vi.fn()} 
                        saveNewTransaction={vi.fn()} 
                        isEditing={false} 
                    />
                </MemoryRouter>
            </PrimeReactProvider>
        );

        const newTransactionButton = screen.getByRole('button', { name: /Nueva Transacción/i });
        expect(newTransactionButton).toBeInTheDocument();

        fireEvent.click(newTransactionButton);
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
});
