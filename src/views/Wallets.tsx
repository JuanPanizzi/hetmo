import { Button } from "primereact/button"
import WalletCard from "../components/Wallet/WalletCard"
import { WalletContext } from "../context/walletContext"
import { useContext } from "react";
export const Wallets = () => {

    const { wallets } = useContext(WalletContext);

    console.log('wallets', wallets)
  return (
    <section>
      <div className="flex w-full items-center justify-between p-2">
      <h1 className="text-4xl ">Carteras</h1>
      <Button label="Crear Cartera" icon="pi pi-plus"/>
      </div>

      {wallets.map((wallet) => (
        <WalletCard key={wallet.id} wallet={wallet} />
      ))}
        {/* <WalletCard /> */}

    </section>
  )
}
