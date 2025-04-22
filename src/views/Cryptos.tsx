import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable'
import { useEffect, useRef, useState } from 'react'
import { getCryptos } from '../services/API';
import { Toast } from 'primereact/toast';
import { Crypto } from '../types/wallets';
import { Card } from 'primereact/card';




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
      {/* <div className='flex justify-center items-center w-full'> */}
      <Card title="Listado de criptomonedas" className="shadow-lg sm:m-4">

        <DataTable
          value={coins ?? []}
          paginator
          scrollable
          rows={6}
          loading={loading}
          loadingIcon="pi pi-spinner pi-spin"
          emptyMessage="Sin resultados"
          className="text-xs sm:text-sm md:text-base "
          tableStyle={{ minWidth: '30rem', maxWidth: '100%' }}

        >
          <Column
            header="Criptomoneda"
            body={(row) => (
              <div className="flex items-center gap-2">
                <img src={row.image} alt={row.name} className='w-6 h-6 sm:w-10 sm:h-10 rounded-full' />
                <span>{row.name}</span>
              </div>
            )}
          />
          <Column field="symbol" header="Símbolo" />
          <Column field="current_price" header="Precio (USD)" body={priceBodyTemplate} />


        </DataTable>
          </Card>
      {/* </div> */}
    </>
  )
}
