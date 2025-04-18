import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable'
import { useEffect, useState } from 'react'
import { Crypto } from '../types/wallets';

// En Vite, las variables de entorno van en import.meta.env
const API_KEY = 'CG-MX4Unb5kP7XqRvxDnBrRD2PA';
const BASE_URL = "https://api.coingecko.com/api/v3";

export async function fetchCoinsList() {
  const url = `${BASE_URL}/coins/markets?vs_currency=usd&x_cg_demo_api_key=${API_KEY}`;  
  const resp = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-cg-demo-api-key": API_KEY
    }
  });
  if (!resp.ok) {
    throw new Error(`CoinGecko responded ${resp.status}`);
  }
  return resp.json();
}


export const Cryptos = () => {

  const [coins, setCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const coins: Crypto[] = await fetchCoinsList();
      setCoins(coins);
      setLoading(false);
      console.log('COINS', coins)
    };
    fetchData();
  }, [])


  return (
<div className='flex justify-center items-center w-full'>

    <DataTable 
      value={coins} 
      paginator 
      rows={8}  
      tableStyle={{minWidth: '80vw'}}
      loading={loading}
      loadingIcon="pi pi-spinner pi-spin"
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
      <Column field="current_price" header="Precio" />
      
     
    </DataTable>
</div>
  )
}
