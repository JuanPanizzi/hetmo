import { Transaction } from "../types/wallets";

export  const getSeverity = (transaction: Transaction) => {
    switch (transaction.status) {
        case 'confirmada':
            return 'success';

        case 'pendiente':
            return 'warning';

        case 'cancelada':
            return 'danger';

        default:
            return null;
    }
};

export const formatCurrency = (value: number) => {
    return value.toLocaleString('es-ES', { style: 'currency', currency: 'USD' });
};