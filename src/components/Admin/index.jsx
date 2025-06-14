import { Link } from "react-router-dom";

const Admin = () => {
    return (
        <>
            <h1>Admin</h1>
            <div>
              <div >
                    <Link to={"/posts"}>
                        <button>Cadastro de Produtos</button>
                    </Link>
                </div>
            </div>
            <h1>Painel de Admin</h1>
            <Link to={"/admin-clientes"}>Gerenciar Clientes</Link>
        </>
    );
}

export default Admin;