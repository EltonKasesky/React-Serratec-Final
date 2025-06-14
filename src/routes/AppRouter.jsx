import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import ErrorPage from "../pages/Error";
import ProdutosPage from "../pages/Produtos";
import ClientesPage from "../pages/Clientes";
import AdminPage from "../pages/Admin";
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from "./PrivateRoute";
import UnauthorizedPage from "../pages/Unauthorized";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/produtos" element={<ProdutosPage />}></Route>
            <Route path="/clientes" element={<ClientesPage />}></Route>
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route
                path="/admin"
                element={
                    <PrivateRoute roles={["ROLE_ADMIN"]}>
                        <AdminPage />
                    </PrivateRoute>
                }
            />
            <Route
                path="/admin-clientes"
                element={
                    <PrivateRoute roles={["ROLE_ADMIN"]}>
                        <ClientesPage />
                    </PrivateRoute>
                }
            />
            <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
    )
}
