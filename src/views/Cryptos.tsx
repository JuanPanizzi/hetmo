import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable'
import { useEffect, useRef, useState } from 'react'
import { getCryptos } from '../services/API';
import { Toast } from 'primereact/toast';
import { Crypto } from '../types/wallets';




export const Cryptos = () => {

  const [coins, setCoins] = useState<Crypto[] | null>(null);
  const [loading, setLoading] = useState(false);

  const toast = useRef<Toast>(null);

  
  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

  const priceBodyTemplate = (crypto: Crypto) => {
      return formatCurrency(crypto.current_price);
};

  useEffect(() => {

    const cryptos = sessionStorage.getItem('cryptos');
    if (cryptos) {
      setCoins(JSON.parse(cryptos));
    } else {
    const fetchData = async () => {
      setLoading(true);

      const response: { success: boolean, data: Crypto[] | null } = await getCryptos();

      if (response.success) {
        setCoins(response.data);
        sessionStorage.setItem('cryptos', JSON.stringify(response.data));
      } else {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error al obtener las criptomonedas, intente nuevamente', life: 3000 });
      }
      setLoading(false);
    };

    fetchData();
  }
  }, []);


  return (

    <>
      <Toast ref={toast} />
      <div className='flex justify-center items-center w-full'>
        <DataTable
          value={coins ?? []}
          paginator
          rows={8}
          tableStyle={{ minWidth: '80vw' }}
          loading={loading}
          loadingIcon="pi pi-spinner pi-spin"
          emptyMessage="Sin resultados"
        >
          <Column
            header="Criptomoneda"
            body={(row) => (
              <div className="flex items-center gap-2">
                <img src={row.image} alt={row.name} className='w-10 h-10 rounded-full' />
                <span>{row.name}</span>
              </div>
            )}
          />
          <Column field="symbol" header="Símbolo" />
          <Column field="current_price" header="Precio (USD)" body={priceBodyTemplate} />


        </DataTable>
      </div>
    </>
  )
}
