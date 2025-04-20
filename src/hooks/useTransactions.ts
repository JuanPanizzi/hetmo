import { useContext, useState } from 'react'
import { WalletContext } from '../context/walletContext';
import { Transaction, Crypto } from '../types/wallets';
import { useParams } from 'react-router-dom';



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
    const { id } = useParams();

    const wallet = wallets.find(w => w.id === id);

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

    const handleAddTransaction = () => {
        if (!newTransaction.type || !newTransaction.crypto || !newTransaction.date) {

            return { severity: "error", message: "Todos los campos son obligatorios" };
        }
        if (newTransaction.amount <= 0) {
            return { severity: "error", message: "La cantidad debe ser mayor que 0" };
        }

        if (newTransaction.type === 'venta') {
            if (!wallet) {
                return { severity: "error", message: "Cartera no encontrada" };
            }

            const crypto = newTransaction.crypto as unknown as Crypto;
            const existingCrypto = wallet.cryptocurrencies.find(c => c.name === crypto.name);

            if (!existingCrypto) {
                return { severity: "error", message: "No posee en su cartera criptomonedas de este tipo para realizar la venta" };
            }

            if (existingCrypto.amount < newTransaction.amount) {
                return { severity: "error", message: "No posee suficientes criptomonedas para realizar la transacción." };
            }
        }
        newTransaction.id = crypto.randomUUID();
        addTransaction(wallet?.id || '', newTransaction);
        setVisible(false);
        handleNewTransaction({
            type: '',
            crypto: '',
            amount: 0,
            price: 0,
            date: '',
            id: ''
        });
        return { severity: "success", message: "Transacción realizada correctamente" };
    }


    return {
        wallets,
        addTransaction,
        deleteTransaction,
        newTransaction,
        setNewTransaction,
        visible,
        handleCancel,
        handleNewTransaction,
        wallet,
        handleAddTransaction,
        setVisible
    }
}