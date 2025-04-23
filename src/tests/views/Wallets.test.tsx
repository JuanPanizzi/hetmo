// tests/views/Wallets.test.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Wallets } from '../../views/Wallets';
import * as useWalletHook from '../../hooks/useWallet';

describe('Wallets view', () => {

    const fakeHook = {
    wallets: [],                 
    cryptos: [],                  
    loading: false,               
    showWalletModal: false,
    isEditing: false,
    newWallet: { id: '', name: '' },
    selectedWallet: undefined,
    //Funciones del mi hook useWallet
    deleteWallet: vi.fn(),
    handleWalletModal: vi.fn(),
    handleCryptos: vi.fn(),
    handleNewWallet: vi.fn(),
    handleLoading: vi.fn(),
    saveWallet: vi.fn(),
    addWallet: vi.fn(),
    handleIsEditing: vi.fn()
  };

  beforeEach(() => {
      vi.spyOn(useWalletHook, 'useWallet').mockReturnValue(fakeHook);
      render(<Wallets />)
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render the wallets view with the HeaderCard', () => {

    const heading = screen.getByText('Carteras')
    expect(heading).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /Crear Cartera/i })
    ).toBeInTheDocument();
  });

  it('should render Spinner when loading',()=>{
    fakeHook.loading = true
    render(<Wallets />)
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })
    


});
