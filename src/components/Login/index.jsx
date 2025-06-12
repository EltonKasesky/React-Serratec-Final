import * as styles from "./Login.module.css"
import {
    IoPersonAdd
} from "react-icons/io5";
import {
    MdEmail
} from "react-icons/md";
import { TbLockFilled } from "react-icons/tb";
import { TbBrandGithubFilled } from "react-icons/tb";
import {
    FaFacebookF,
    FaGoogle
} from "react-icons/fa";

const Login = () => {
    return (
        <main className={styles.container}>
            <div className={styles.primarySection}>
                <section className={styles.leftSection}>
                    <div className={styles.contentForm}>
                        <h1>Fazer Login</h1>
                        <div className={styles.contentLoginButtons}>
                            <button className={styles.loginButton}>
                                <FaGoogle className={styles.icon} />
                            </button>

                            <button className={styles.loginButton}>
                                <TbBrandGithubFilled className={styles.icon} />
                            </button>

                            <button className={styles.loginButton}>
                                <FaFacebookF className={styles.icon} />
                            </button>
                        </div>

                        <form>
                            <div className={styles.inputForm}>
                                <MdEmail className={styles.icon} />
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Seu email. Ex: farmacia@gmail.com"
                                    required
                                />
                            </div>

                            <div className={styles.inputForm}>
                                <TbLockFilled className={styles.icon} />
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Sua senha..."
                                    required
                                />
                            </div>

                            <button className={styles.btn} type="submit">Login</button>
                        </form>

                        <p className={styles.userLogin}>
                            Ainda não sou um usuário <a href="#">Fazer registro</a>
                            <IoPersonAdd className={styles.icon} />
                        </p>
                    </div>
                </section>
                <section className={styles.rightSection}>
                    <div className={styles.loginImage}></div>
                </section>
            </div>
            <p className={styles.copy}>Todos os direitos reservados© 2025</p>
        </main>
    );
};

export default Login;