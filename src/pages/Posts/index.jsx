import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as styles from '../Posts/Posts.module.css';


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
    .required("O conteúdo tem que ser preenchido"),
  estoque: yup
    .number()
    .required("O conteúdo tem que ser preenchido")
    .max(500, "Tamanho máximo permitido"),
  validade: yup
    .date()
    .required("O conteúdo tem que ser preenchido"),
  categoria: yup
    .string()
    .required("O conteúdo tem que ser preenchido")
    .max(500, "Tamanho máximo permitido"),    
});

export default function Posts() {
  let navigate = useNavigate();
  const token = localStorage.getItem('token');

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
      categoria: data.categoria
    };
  
  
    axios
    .post(`http://localhost:8080/produtos`, produtoDTO,{
      headers:{Authorization:`Bearer ${token}`}
    })
      .then(() => {
        console.log("Produto cadastrado com sucesso");
        navigate("/produtos");
      })
      .catch((err) => {
        console.error("Erro ao cadastrar produto:", err.response?.data || err.message);
      });
  };
  
  return (
    <div className={styles.themeLocal}>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Cadastrar Produto</h1>
          <hr />
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
              <input type="number" id="preco" {...register("preco")} />
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
      </main>
    </div>
  );
}