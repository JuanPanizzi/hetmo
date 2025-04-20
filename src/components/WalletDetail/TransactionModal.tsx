import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { Transaction, Crypto } from "../../types/wallets";


    type Props = {
    visible: boolean;
    handleSetVisible: (visible: boolean) => void;
    newTransaction: Transaction;
    handleNewTransaction: (transaction: Transaction) => void;
    cryptos: Crypto[];
    handleCancel: () => void;
    saveNewTransaction: () => void;
}

export const TransactionModal = ({ visible, handleSetVisible, newTransaction, handleNewTransaction, cryptos, handleCancel, saveNewTransaction }: Props) => {
  return (
    <>
    <Dialog header="Nueva Transacción" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; handleSetVisible(false); }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Dropdown
                        className="col-span-2"
                        options={['compra', 'venta']}
                        placeholder="Selecciona el tipo de transacción"
                        value={newTransaction.type}
                        onChange={(e) => handleNewTransaction({ ...newTransaction, type: e.value as 'compra' | 'venta' })}
                    />
                    <div className="flex flex-col gap-2">
                        <label htmlFor="crypto">Criptomoneda</label>
                        <Dropdown
                            options={cryptos}
                            optionLabel="name"
                            placeholder="Selecciona la criptomoneda"
                            value={newTransaction.crypto}
                            disabled={!newTransaction.type}
                            onChange={(e) => handleNewTransaction({ ...newTransaction, crypto: e.value })}
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
                            disabled={!newTransaction.type}
                            value={newTransaction.date ? new Date(newTransaction.date) : null}
                            onChange={(e) => handleNewTransaction({ ...newTransaction, date: e.value?.toISOString() || '' })}
                            locale={'es'}
                        />
                    </div>
                    <Button
                        label="Cancelar"
                        severity="secondary"
                        icon="pi pi-times"
                        onClick={handleCancel}
                    />
                    <Button
                        label="Aceptar"
                        icon="pi pi-check"
                        onClick={saveNewTransaction}

                    />
                </div>
            </Dialog>
    </>
  )
}