import Home from "../pages/Home";
import Login from "../pages/Login";
import Produtos from "../pages/Produtos";
import Clientes from "../pages/Clientes";
import Error from "../pages/Error";
import { Route, Routes } from 'react-router-dom'

export default function AppRouter() {
  return (
    <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/produtos" element={<Produtos/>}></Route>
        <Route path="/clientes" element={<Clientes/>}></Route>
        <Route path="*" element={<Error/>}></Route>
    </Routes>
  )
}
