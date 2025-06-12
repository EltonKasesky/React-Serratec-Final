import * as styles from "./Register.module.css"
import {
    IoPersonSharp,
    IoLogIn,
    IoArrowBackCircle
} from "react-icons/io5";
import {
    MdPermPhoneMsg,
    MdEmail
} from "react-icons/md";
import { TbLockFilled } from "react-icons/tb";
import { HiIdentification } from "react-icons/hi2";
import { Link } from "react-router-dom";
import Copyright from "../Copyright";

const Register = () => {
    return (
        <main className={`${styles.container} ${styles.themeLocal}`}>
            <div className={styles.primarySection}>
                <section className={styles.leftSection}>
                    <Link to={"/"} className={styles.backButton}>
                        <IoArrowBackCircle className={styles.backIcon} />
                    </Link>
                    <h1>Fazer Registro</h1>
                    <div className={styles.contentForm}>
                        <form>
                            <div className={styles.inputForm}>
                                <IoPersonSharp className={styles.icon} />
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Seu nome..."
                                    required
                                />
                            </div>

                            <div className={styles.inputForm}>
                                <MdPermPhoneMsg className={styles.icon} />
                                <input
                                    type="tel"
                                    name="tel"
                                    id="tel"
                                    placeholder="Seu telefone. Ex: (xx)xxxxx-xxxx"
                                    required
                                />
                            </div>

                            <div className={styles.inputForm}>
                                <HiIdentification className={styles.icon} />
                                <input
                                    type="text"
                                    name="cpf"
                                    id="cpf"
                                    pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                                    title="Digite um CPF no formato: xxx.xxx.xxx-xx"
                                    placeholder="Seu CPF. Ex: xxx.xxx.xxx-xx"
                                    required
                                />
                            </div>

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

                            <button className={styles.btn} type="submit">Registrar</button>
                        </form>

                        <p className={styles.userLogin}>
                            Eu já sou um usuário <Link to={"/login"}>Fazer login</Link>
                            <IoLogIn className={styles.icon} />
                        </p>
                    </div>
                </section>
                <section className={styles.rightSection}>
                    <div className={styles.loginImage}></div>
                </section>
            </div>
            <Copyright/>
        </main>
    );
};

export default Register;