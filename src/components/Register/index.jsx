import { useEffect } from "react";
import * as styles from "./Register.module.css";

import Header from "../../components/Header";
import Copyright from "../Copyright";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useNavigate, Link } from "react-router-dom";

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

import { useTheme } from "../../context/ThemeContext";
import axios from "axios";

document.documentElement.setAttribute('native-dark-active', '');

const Register = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.documentElement.classList.add('dark');
        return () => {
            document.documentElement.classList.remove('dark');
        };
    }, []);

    const validationSchema = yup.object().shape({
        nome: yup.string().required("O nome deve ser preenchido"),
        telefone: yup.string().required("O telefone deve ser preenchido"),
        cpf: yup.string().required("O CPF deve ser preenchido"),
        cep: yup.string().required("O CEP deve ser preenchido"),
        email: yup.string().email("Email inválido").required("O email deve ser preenchido"),
        senha: yup.string().required("A senha deve ser preenchida"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(validationSchema) });

    const registerUser = async (data) => {
        try {
            await axios.post("http://localhost:8080/clientes", data);
            navigate("/login");
        } catch (error) {
            console.error("Erro ao registrar usuário:", error);
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
                        <h1>Fazer Registro</h1>
                        <div className={styles.contentForm}>
                            <form onSubmit={handleSubmit(registerUser)}>
                                <div className={styles.inputForm}>
                                    <IoPersonSharp className={styles.icon} />
                                    <input
                                        type="text"
                                        placeholder="Seu nome..."
                                        {...register('nome')}
                                    />
                                    <p className={styles.errorMessage}>{errors.nome?.message}</p>
                                </div>

                                <div className={styles.inputForm}>
                                    <MdPermPhoneMsg className={styles.icon} />
                                    <input
                                        type="tel"
                                        placeholder="Seu telefone. Ex: (xx)xxxxx-xxxx"
                                        {...register('telefone')}
                                    />
                                    <p className={styles.errorMessage}>{errors.telefone?.message}</p>
                                </div>

                                <div className={styles.inputForm}>
                                    <HiIdentification className={styles.icon} />
                                    <input
                                        type="text"
                                        placeholder="Seu CPF. Ex: xxx.xxx.xxx-xx"
                                        {...register('cpf')}
                                    />
                                    <p className={styles.errorMessage}>{errors.cpf?.message}</p>
                                </div>

                                <div className={styles.inputForm}>
                                    <HiIdentification className={styles.icon} />
                                    <input
                                        type="text"
                                        placeholder="Seu CEP. Ex: xxxxx-xxx"
                                        {...register('cep')}
                                    />
                                    <p className={styles.errorMessage}>{errors.cep?.message}</p>
                                </div>

                                <div className={styles.inputForm}>
                                    <MdEmail className={styles.icon} />
                                    <input
                                        type="email"
                                        placeholder="Seu email. Ex: farmacia@gmail.com"
                                        {...register('email')}
                                    />
                                    <p className={styles.errorMessage}>{errors.email?.message}</p>
                                </div>

                                <div className={styles.inputForm}>
                                    <TbLockFilled className={styles.icon} />
                                    <input
                                        type="password"
                                        placeholder="Sua senha..."
                                        {...register('senha')}
                                    />
                                    <p className={styles.errorMessage}>{errors.senha?.message}</p>
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

                <Copyright />
            </main>
        </>
    );
};

export default Register;
