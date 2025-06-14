import * as styles from "./Login.module.css"
import {
    IoPersonAdd,
    IoArrowBackCircle
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
import { Link, useNavigate } from "react-router-dom";
import Copyright from "../Copyright";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useAuth } from "../../context/AuthContext";

const Login = () => {
    const { login } = useAuth();

    const validationPost = yup.object().shape({
        username: yup.string().required("O email deve ser preenchido"),
        password: yup.string().required("A senha deve ser preenchida"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(validationPost) });

    const loginUser = async (data) => {
        try {
            await login(data.username, data.password);
        } catch (error) {
            alert("Usuário ou senha inválidos");
        }
    };

    return (
        <main className={`${styles.container} ${styles.themeLocal}`}>
            <div className={styles.primarySection}>
                <section className={styles.leftSection}>
                    <Link to={"/"} className={styles.backButton}>
                        <IoArrowBackCircle className={styles.backIcon} />
                    </Link>
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

                        <form onSubmit={handleSubmit(loginUser)}>
                            <div className={styles.inputForm}>
                                <MdEmail className={styles.icon} />
                                <input
                                    type="email"
                                    name="username"
                                    id="username"
                                    placeholder="Seu email. Ex: farmacia@gmail.com"
                                    {...register('username')}
                                    required
                                />
                                <p className={yup.errorMessage}>{errors.username?.message}</p>
                            </div>

                            <div className={styles.inputForm}>
                                <TbLockFilled className={styles.icon} />
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Sua senha..."
                                    {...register('password')}
                                    required
                                />
                                <p className={yup.errorMessage}>{errors.password?.message}</p>
                            </div>

                            <button className={styles.btn} type="submit">Login</button>
                        </form>

                        <p className={styles.userLogin}>
                            Ainda não sou um usuário <Link to={"/register"}>Fazer registro</Link>
                            <IoPersonAdd className={styles.icon} />
                        </p>
                    </div>
                </section>
                <section className={styles.rightSection}>
                    <div className={styles.loginImage}></div>
                </section>
            </div>
            <Copyright />
        </main>
    );
};

export default Login;