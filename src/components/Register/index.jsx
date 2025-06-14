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
import { Link, useNavigate } from "react-router-dom";
import Copyright from "../Copyright";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup"

const Register = () => {
    const validationPost = yup.object().shape({
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
    } = useForm({ resolver: yupResolver(validationPost) });

    const registerUser = (data) => {
        axios.post("http://localhost:8080/clientes", data)
            .then(() => {
                useNavigate("/login")
            }).catch((error) => {
                console.error("Erro ao enviar requisição: ", error)
            })
    }

    return (
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
                                    name="nome"
                                    id="nome"
                                    placeholder="Seu nome..."
                                    {...register('nome')}
                                    required
                                />
                                <p className={yup.errorMessage}>{errors.nome?.message}</p>
                            </div>

                            <div className={styles.inputForm}>
                                <MdPermPhoneMsg className={styles.icon} />
                                <input
                                    type="tel"
                                    name="telefone"
                                    id="telefone"
                                    placeholder="Seu telefone. Ex: (xx)xxxxx-xxxx"
                                    {...register('telefone')}
                                    required
                                />
                                <p className={yup.errorMessage}>{errors.telefone?.message}</p>
                            </div>

                            <div className={styles.inputForm}>
                                <HiIdentification className={styles.icon} />
                                <input
                                    type="text"
                                    name="cpf"
                                    id="cpf"
                                    placeholder="Seu CPF. Ex: xxx.xxx.xxx-xx"
                                    {...register('cpf')}
                                    required
                                />
                                <p className={yup.errorMessage}>{errors.cpf?.message}</p>
                            </div>

                            <div className={styles.inputForm}>
                                <HiIdentification className={styles.icon} />
                                <input
                                    type="text"
                                    name="cep"
                                    id="cep"
                                    placeholder="Seu CEP. Ex: xxxxx-xxx"
                                    {...register('cep')}
                                    required
                                />
                                <p className={yup.errorMessage}>{errors.cep?.message}</p>
                            </div>

                            <div className={styles.inputForm}>
                                <MdEmail className={styles.icon} />
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Seu email. Ex: farmacia@gmail.com"
                                    {...register('email')}
                                    required
                                />
                                <p className={yup.errorMessage}>{errors.email?.message}</p>
                            </div>

                            <div className={styles.inputForm}>
                                <TbLockFilled className={styles.icon} />
                                <input
                                    type="password"
                                    name="senha"
                                    id="senha"
                                    placeholder="Sua senha..."
                                    {...register('senha')}
                                    required
                                />
                                <p className={yup.errorMessage}>{errors.senha?.message}</p>
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
    );
};

export default Register;