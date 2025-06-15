import { Link } from "react-router-dom";
import * as styles from './Admin.module.css';
import { useAuth } from "../../context/AuthContext";

const Admin = () => {
    const { userInfo } = useAuth();

    return (
        <>
            <section className={`${styles.contentLinks} ${styles.themeLocal}`}>
                <h1>Painel de Admin</h1>
                <p>Email do Admin: {userInfo.sub}</p>
                <Link to={"/posts"}>
                    <p>Cadastro de produtos</p>
                </Link>
                <Link to={"/admin-clientes"}>
                    <p>Gerenciar Clientes</p>
                </Link>
            </section>
        </>
    );
}

export default Admin;