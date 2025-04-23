import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { Wallets } from "../../views/Wallets"
import { Wallet } from "../../types/wallets"
import { HeaderCard } from "../../components/UI/HeaderCard"
import { WalletModal } from "../../components/Wallet/WalletModal"
import userEvent from "@testing-library/user-event" 
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('useWallet', () => {
    const saveWallet = vi.fn();

    beforeEach(() => {
        render(
            <MemoryRouter>
                <Wallets />
                <WalletModal
                    showWalletModal={true}
                    handleWalletModal={() => {}}
                    handleCancel={() => {}}
                    handleSaveWallet={saveWallet}
                    newWallet={{name: 'Wallet 1', id: '1'}}
                    handleNewWallet={() => {}}
                    selectedWallet={undefined}
                />

                <HeaderCard
                    title="Carteras"
                    buttonLabel="Crear Cartera"
                    onButtonClick={() => {}}
                />
                <Wallets />
            </MemoryRouter>
        );
    });

    it('should add a new wallet', async () => {
        
        const walletTest= {id: '1', name: 'Wallet 1' };
        
        const inputWalletName = screen.getByTestId('wallet-name-input');
        
        await userEvent.type(inputWalletName, walletTest.name);
        
        const addWalletButton = screen.getByTestId('save-wallet-button');
        
        fireEvent.click(addWalletButton);
        
        expect(saveWallet).toHaveBeenCalled();
        expect(screen.getByDisplayValue('Wallet 1')).toBeInTheDocument();
        expect(screen.getByRole('dialog')).toHaveTextContent('Crear Nueva Cartera');
    });
});


