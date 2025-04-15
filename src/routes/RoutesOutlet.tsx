import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "../views/Layout"
import { Test } from "../views/Test"

export const RoutesOutlet = () => {
  return (
    <>
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<Layout />}>

    <Route index element={<Test />} />


    </Route>

    </Routes>
  
  </BrowserRouter>

    </>
  )
}
