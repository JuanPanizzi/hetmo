import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import 'primeicons/primeicons.css';
        
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { WalletProvider } from './context/walletContext.tsx';

createRoot(document.getElementById('root')!).render(
  <PrimeReactProvider>
    <WalletProvider>
      <App />
    </WalletProvider>
  </PrimeReactProvider>
)
