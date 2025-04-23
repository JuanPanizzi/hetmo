import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './i18n/primeReactLocale.ts'
import 'primeicons/primeicons.css';
        
import { PrimeReactProvider } from 'primereact/api';
import { WalletProvider } from './context/walletContext.tsx';

createRoot(document.getElementById('root')!).render(
  <PrimeReactProvider>
    <WalletProvider>
      <App />
    </WalletProvider>
  </PrimeReactProvider>
)
