import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from './Posts.module.css';
import Footer from "../../components/Footer/footer";
import Header from "../../components/Header";

const validationPost = yup.object().shape({
  nome: yup
    .string()
    .required("O título tem que ser preenchido")
    .max(40, "Tamanho máximo permitido"),
  descricao: yup
    .string()
    .required("A descrição tem que ser preenchida")
    .max(150, "Tamanho máximo permitido"),
  preco: yup
    .number()
    .typeError("Insira um número válido")
    .required("O preço tem que ser preenchido"),
  estoque: yup
    .number()
    .typeError("Insira um número válido")
    .required("O estoque tem que ser preenchido")
    .max(500, "Máximo de 500 unidades"),
  validade: yup
    .date()
    .typeError("Insira uma data válida")
    .required("A validade tem que ser preenchida"),
  categoria: yup
    .string()
    .required("A categoria tem que ser preenchida")
    .max(100, "Máximo de 100 caracteres"),
});

export default function Posts() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationPost) });

  const addPost = (data) => {
    const produtoDTO = {
      nomeProduto: data.nome,
      descricaoProduto: data.descricao,
      precoProduto: parseFloat(data.preco),
      estoque: parseInt(data.estoque),
      validade: data.validade,
      categoria: data.categoria,
    };

    axios
      .post("http://localhost:8080/produtos", produtoDTO, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        console.log("Produto cadastrado com sucesso");
        navigate("/");
      })
      .catch((err) => {
        console.error("Erro ao cadastrar produto:", err.response?.data || err.message);
      });
  };

  return (
    <>
      <Header /> {/* Agora aparece o header no topo */}
      <div className={styles.container}>
        <div className={styles.main}>
          <h1 className={styles.title}>Cadastrar Produto</h1>
          <form onSubmit={handleSubmit(addPost)}>
            <div className={styles.formGroup}>
              <label htmlFor="nome">Produto</label>
              <input type="text" id="nome" {...register("nome")} />
              <p className={styles.errorMsg}>{errors.nome?.message}</p>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="descricao">Descrição</label>
              <input type="text" id="descricao" {...register("descricao")} />
              <p className={styles.errorMsg}>{errors.descricao?.message}</p>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="preco">Preço</label>
              <input type="number" id="preco" step="0.01" {...register("preco")} />
              <p className={styles.errorMsg}>{errors.preco?.message}</p>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="estoque">Estoque</label>
              <input type="number" id="estoque" {...register("estoque")} />
              <p className={styles.errorMsg}>{errors.estoque?.message}</p>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="validade">Validade</label>
              <input type="date" id="validade" {...register("validade")} />
              <p className={styles.errorMsg}>{errors.validade?.message}</p>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="categoria">Categoria</label>
              <input type="text" id="categoria" {...register("categoria")} />
              <p className={styles.errorMsg}>{errors.categoria?.message}</p>
            </div>

            <button className={styles.submitButton} type="submit">
              Enviar
            </button>
          </form>
        </div>
      </div>
      <Footer /> {/* Agora aparece o footer no final */}
    </>
  );
}
