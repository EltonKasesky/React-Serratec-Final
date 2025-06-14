import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      validade: data.validade, // certifique-se que é uma string no formato ISO: "2025-03-01"
      categoria: data.categoria
    };
  
  
    axios
    .post(`http://localhost:8080/produtos`, produtoDTO,{
      headers:{Authorization:`Bearer ${token}`}
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
    <div>
      <main>
        <div>
          <h1>Cadastrar Produto</h1>
          <hr />
          <div>
            <form onSubmit={handleSubmit(addPost)}>
              <div>
                <label htmlFor="nome">Produto</label>
                <input type="text" id="nome" name="nome" {...register('nome')} />
                <p>{errors.nome?.message}</p>
              </div>

              <div>
                <label htmlFor="descricao">Descrição</label>
                <input type="text" id="descricao" name="descricao" {...register('descricao')} />
                <p>{errors.descricao?.message}</p>
              </div>

              <div>
                <label htmlFor="preco">Preço</label>
                <input               
                  type="number"
                  id="preco"
                  name="preco" {...register('preco')}
                />
                <p>{errors.preco?.message}</p>
              </div>
              <div>
                <label htmlFor="estoque">Estoque</label>
                <input type="number" id="estoque" name="estoque" {...register('estoque')} />
                <p>{errors.estoque?.message}</p>
              </div>
              <div>
                <label htmlFor="validade">Validade</label>
                <input type="date" id="validade" name="validade" {...register('validade')} />
                <p>{errors.validade?.message}</p>
              </div>
              <div>
                <label htmlFor="categoria">Categoria</label>
                <input type="text" id="categoria" name="categoria" {...register('categoria')} />
                <p>{errors.categoria?.message}</p>
              </div>
              
              
              <div>
                <button type="submit">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
