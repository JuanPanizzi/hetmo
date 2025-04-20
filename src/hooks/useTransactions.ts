import  { useContext, useState } from 'react'
import { WalletContext } from '../context/walletContext';
import { Transaction } from '../types/wallets';



export const useTransactions = () => {
    
    
    const { wallets, addTransaction, deleteTransaction } = useContext(WalletContext);

    const [newTransaction, setNewTransaction] = useState<Transaction>({
        type: '',
        crypto: '',
        amount: 0,
        price: 0,
        date: '',
        id: ''
    })  
    const [visible, setVisible] = useState<boolean>(false)

    const handleNewTransaction = (transaction: Transaction | any) => setNewTransaction(prev => ({ ...prev, ...transaction }));
    
    
    const handleCancel = () => {
        setVisible(false);
        setNewTransaction({
            type: '',
            crypto: '',
            amount: 0,
            price: 0,
            date: '',
            id: ''
        })
    }
    
    return {
        wallets,
        addTransaction,
        deleteTransaction,
        newTransaction,
        setNewTransaction,
        visible,
        handleCancel,
        handleNewTransaction
    }
}