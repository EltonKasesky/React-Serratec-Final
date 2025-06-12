import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import ErrorPage from "../pages/Error";
import ProdutosPage from "../pages/Produtos";
import ClientesPage from "../pages/Clientes";
import { Route, Routes } from 'react-router-dom'

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/produtos" element={<ProdutosPage />}></Route>
            <Route path="/clientes" element={<ClientesPage />}></Route>
            <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
    )
}
