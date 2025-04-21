import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { HeaderCard } from "../UI/HeaderCard";
import { Crypto } from "../../types/wallets";

interface TransactionFormProps {
    newTransaction: {
        type: string;
        crypto: any;
        amount: number;
        price: number;
        date: string;
    };
    cryptos: Crypto[];
    onTypeChange: (value: 'compra' | 'venta') => void;
    onCryptoChange: (value: Crypto) => void;
    onAmountChange: (value: number) => void;
    onDateChange: (value: string) => void;
    onSave: () => void;
    onCancel: () => void;
    toastRef: React.RefObject<Toast | null>;
}

export const TransactionForm = ({
    newTransaction,
    cryptos,
    onTypeChange,
    onCryptoChange,
    onAmountChange,
    onDateChange,
    onSave,
    onCancel,
    toastRef
}: TransactionFormProps) => {
    return (
        <section className="p-4">
            <Toast ref={toastRef} />
            <HeaderCard 
                title="Nueva Transacción"
                subtitle="Ingresa los detalles de la transacción"
            />
            
            <Card className="mx-5 mt-5 shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
                    <div className="lg:col-span-2">
                        <label className="block text-sm font-medium mb-2">Tipo de Transacción</label>
                        <Dropdown
                            className="w-full"
                            options={['compra', 'venta']}
                            placeholder="Selecciona el tipo de transacción"
                            value={newTransaction.type}
                            onChange={(e) => onTypeChange(e.value as 'compra' | 'venta')}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Criptomoneda</label>
                        <Dropdown
                            className="w-full"
                            options={cryptos}
                            optionLabel="name"
                            placeholder="Selecciona la criptomoneda"
                            value={newTransaction.crypto}
                            disabled={!newTransaction.type}
                            onChange={(e) => onCryptoChange(e.value)}
                            itemTemplate={(option) => (
                                <div className="flex items-center gap-2">
                                    <img src={option.image} alt={option.name} className="w-6 h-6 rounded-full" />
                                    <span>{option.name}</span>
                                </div>
                            )}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Cantidad</label>
                        <InputNumber
                            className="w-full"
                            placeholder="Cantidad"
                            value={newTransaction.amount}
                            minFractionDigits={0}
                            maxFractionDigits={8}
                            min={0}
                            disabled={!newTransaction.type || !newTransaction.crypto}
                            onChange={(e) => onAmountChange(e.value || 0)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Precio Total (USD)</label>
                        <InputNumber
                            className="w-full"
                            placeholder="Precio"
                            mode="currency" 
                            currency="USD" 
                            locale="es-ES"
                            value={newTransaction.price}
                            disabled={true}
                            readOnly
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Fecha</label>
                        <Calendar
                            className="w-full"
                            placeholder="DD/MM/YYYY"
                            value={newTransaction.date ? new Date(newTransaction.date) : null}
                            onChange={(e) => onDateChange(e.value?.toISOString() || '')}
                            locale="es"
                            showIcon
                            maxDate={new Date()}
                            dateFormat="dd/mm/yy"
                        />
                    </div>

                    <div className="lg:col-span-2 flex justify-end gap-3 mt-4">
                        <Button
                            label="Cancelar"
                            severity="secondary"
                            icon="pi pi-times"
                            onClick={onCancel}
                        />
                        <Button
                            label="Guardar Transacción"
                            icon="pi pi-check"
                            onClick={onSave}
                        />
                    </div>
                </div>
            </Card>
        </section>
    );
}; 