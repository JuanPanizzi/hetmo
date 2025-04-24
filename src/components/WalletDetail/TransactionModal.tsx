import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { Transaction, CryptoType } from "../../types/wallets";
import { useEffect, useState } from "react";

type TransactionModalProps = {
    visible: boolean;
    handleSetVisible: (visible: boolean) => void;
    newTransaction: Transaction;
    handleNewTransaction: (transaction: Transaction) => void;
    cryptos: CryptoType[];
    handleCancel: () => void;
    saveNewTransaction: () => void;
    isEditing?: boolean;
}

export const TransactionModal = ({ visible, handleSetVisible, newTransaction, handleNewTransaction, cryptos, handleCancel, saveNewTransaction, isEditing = false }: TransactionModalProps) => {

    
    const [currentTitle, setCurrentTitle] = useState(isEditing ? "Editar Transacción" : "Nueva Transacción");
    
    const getCryptoName = () => {
        if (newTransaction.crypto && typeof newTransaction.crypto === 'object') {
            return cryptos.find(crypto => crypto.name === (newTransaction.crypto as CryptoType).name)
        }
    }
    
    useEffect(() => {
        if (visible) {
            setCurrentTitle(isEditing ? "Editar Transacción" : "Nueva Transacción");
        }
    }, [visible, isEditing]);

    return (
        <>
            <Dialog header={currentTitle} className="mx-3 w-full sm:max-w-[700px] text-xs sm:text-sm md:text-base" visible={visible}  onHide={() => { if (!visible) return; handleSetVisible(false); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Dropdown
                        className="md:col-span-2"
                        options={['Compra', 'Venta']}
                        placeholder="Selecciona el tipo de transacción"
                        value={newTransaction.type}
                        onChange={(e) => handleNewTransaction({ ...newTransaction, type: e.value as 'Compra' | 'Venta' })}
                    />
                    <div className="flex flex-col gap-2">
                        <label htmlFor="crypto">Criptomoneda</label>
                        <Dropdown
                            options={cryptos}
                            optionLabel="name"
                            placeholder="Selecciona la criptomoneda"
                            value={isEditing ? getCryptoName() : newTransaction.crypto}
                            disabled={!isEditing ? !newTransaction.type : true}
                            onChange={(e) => handleNewTransaction({ ...newTransaction, crypto: e.value })}
                            pt={{
                                wrapper: {
                                    className: 'max-sm:text-xs sm:text-sm md:text-base'
                                }
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="cantidad">Cantidad</label>
                        <InputNumber
                            id="cantidad"
                            placeholder="Cantidad"
                            value={newTransaction.amount}
                            min={0}
                            disabled={!newTransaction.type}
                            onChange={(e) => handleNewTransaction({ ...newTransaction, amount: e.value || 0 })}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="precio">Precio</label>
                        <InputNumber
                            id="precio"
                            placeholder="Precio"
                            mode="currency" currency="USD" locale="es-ES"
                            value={newTransaction.price}
                            disabled={!newTransaction.type}
                            readOnly
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="fecha">Fecha</label>
                        <Calendar
                            id="fecha"
                            placeholder="DD/MM/YYYY"
                            dateFormat="dd/mm/yy"
                            disabled={!newTransaction.type}
                            value={newTransaction.date ? new Date(newTransaction.date) : null}
                            onChange={(e) => handleNewTransaction({ ...newTransaction, date: e.value?.toISOString() || '' })}
                            locale={'es'}
                        />
                    </div>
                    <Button
                        label="Cancelar"
                        severity="contrast"
                        outlined
                        icon="pi pi-times"
                        className="text-xs sm:text-sm md:text-base p-2 sm:p-3  "
                        onClick={handleCancel}
                    />
                    <Button
                        label="Aceptar"
                        icon="pi pi-check"
                        className="text-xs sm:text-sm md:text-base p-2 sm:p-3  "
                        onClick={saveNewTransaction}
                    />
                </div>
            </Dialog>
        </>
    )
}