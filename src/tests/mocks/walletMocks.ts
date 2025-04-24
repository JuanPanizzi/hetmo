import { vi } from 'vitest';
import { Wallet } from '../../types/wallets';

export const mockWallet: Wallet = {
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
};

export const mockUseTransactions = {
    wallets: [mockWallet],
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
    wallet: mockWallet,
    handleAddTransaction: vi.fn(),
    handleSetVisible: vi.fn(),
    cryptos: [],
    handleSetCryptos: vi.fn(),
    handleEditTransaction: vi.fn(),
    isEditing: false,
    loading: false,
    handleLoading: vi.fn(),
    editTransaction: vi.fn()
};

export const fakeHook = {
    wallets: [] as Wallet[],                 
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
