import { Link } from 'react-router-dom';
import * as styles from './Error.module.css';
import { IoIosArrowRoundBack } from "react-icons/io";
import Copyright from '../Copyright';

const Error = () => {
    return (
        <>
            <main className={`${styles.container} ${styles.themeLocal}`}>
                <section className={styles.primarySection}>
                    <section className={styles.leftSection}>
                        <img src="/images/logo/FarmaDev-logo.png" alt="Logo" />
                        <div className={styles.leftTexts}>
                            <p>404</p>
                            <h1>Pagina não encontrada</h1>
                            <h2>Desculpe, nós não conseguimos encontrar a página que você esta buscando.</h2>
                            <div className={styles.backHome}>
                                <Link to={"/"}>
                                    <IoIosArrowRoundBack className={styles.icon} />
                                    Voltar para pagina inicial
                                </Link>
                            </div>
                        </div>
                    </section>
                    <section className={styles.rightSection}>
                        <div className={styles.rightImage}></div>
                    </section>
                </section>
                <Copyright/>
            </main>
        </>
    );
}

export default Error;