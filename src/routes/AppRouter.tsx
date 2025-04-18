import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "../views/Layout"
import { Wallets } from "../views/Wallets"
import { Cryptos } from "../views/Cryptos"

export const AppRouter = () => {
  return (
    <>
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<Layout />}>

    <Route index element={<Wallets />} />
    <Route path="/cryptos" element={<Cryptos />} />

    </Route>

    </Routes>
  
  </BrowserRouter>

    </>
  )
}
