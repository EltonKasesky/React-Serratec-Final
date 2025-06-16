import { useEffect } from "react";
import * as styles from "./Login.module.css";

import Header from "../../components/Header";
import Copyright from "../Copyright";

import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useNavigate, Link } from "react-router-dom";

import { IoPersonAdd, IoArrowBackCircle } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { TbLockFilled, TbBrandGithubFilled } from "react-icons/tb";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

import { useTheme } from "../../context/ThemeContext";
document.documentElement.setAttribute('native-dark-active', '');


const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    // ✅ Tema escuro aplicado corretamente com React
    useEffect(() => {
        document.documentElement.classList.add('dark');
        return () => {
            document.documentElement.classList.remove('dark');
        };
    }, []);

    // ✅ Validação com Yup
    const validationSchema = yup.object().shape({
        username: yup.string().email("Email inválido").required("O email deve ser preenchido"),
        password: yup.string().required("A senha deve ser preenchida"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(validationSchema) });

    const loginUser = async (data) => {
        try {
            await login(data.username, data.password);
            navigate("/dashboard"); // Redireciona após login, ajuste conforme sua rota
        } catch (error) {
            alert("Usuário ou senha inválidos");
        }
    };

    return (
        <>
            <Header />

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
                                        id="username"
                                        placeholder="Seu email. Ex: farmacia@gmail.com"
                                        {...register('username')}
                                        required
                                    />
                                    {errors.username && (
                                        <p className={styles.errorMessage}>{errors.username.message}</p>
                                    )}
                                </div>

                                <div className={styles.inputForm}>
                                    <TbLockFilled className={styles.icon} />
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Sua senha..."
                                        {...register('password')}
                                        required
                                    />
                                    {errors.password && (
                                        <p className={styles.errorMessage}>{errors.password.message}</p>
                                    )}
                                </div>

                                <button className={styles.btn} type="submit">
                                    Login
                                </button>
                            </form>

                            <p className={styles.userLogin}>
                                Ainda não sou um usuário{" "}
                                <Link to={"/register"}>Fazer registro</Link>
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
        </>
    );
};

export default Login;
