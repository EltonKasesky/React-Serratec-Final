import { Link } from "react-router-dom";
import * as styles from './Admin.module.css';
import { useAuth } from "../../context/AuthContext";

document.documentElement.classList.add('dark');

const Admin = () => {
    const { userInfo } = useAuth();

    return (
        <>
  <div className={styles.container}>
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
  </div>
</>
    );
}

export default Admin;