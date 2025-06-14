import { Link } from "react-router-dom";

const Admin = () => {
    return (
        <>
            <h1>Painel de Admin</h1>
            <Link to={"/admin-clientes"}>Gerenciar Clientes</Link>
        </>
    );
}

export default Admin;