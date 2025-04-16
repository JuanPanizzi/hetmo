import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "../views/Layout"
import { Wallets } from "../views/Wallets"

export const AppRouter = () => {
  return (
    <>
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<Layout />}>

    <Route index element={<Wallets />} />


    </Route>

    </Routes>
  
  </BrowserRouter>

    </>
  )
}
