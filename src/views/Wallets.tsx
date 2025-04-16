import { Button } from "primereact/button"
import WalletCard from "../components/Wallet/WalletCard"

export const Wallets = () => {
  return (
    <section>
      <div className="flex w-full items-center justify-between p-2">
      <h1 className="text-4xl ">Carteras</h1>
      <Button label="Crear Cartera" icon="pi pi-plus"/>
      </div>

        <WalletCard />

    </section>
  )
}
