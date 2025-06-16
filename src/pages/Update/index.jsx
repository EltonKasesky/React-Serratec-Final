import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer/footer";
import Header from "../../components/Header";
import * as styles from './Update.module.css';


const validationPost = yup.object().shape({
  nome: yup.string().required("O título tem que ser preenchido").max(40),
  descricao: yup.string().required("A descrição tem que ser preenchida").max(150),
  preco: yup.number().required("O conteúdo tem que ser preenchido"),
  estoque: yup.number().required("O conteúdo tem que ser preenchido").max(500),
  validade: yup.date().required("O conteúdo tem que ser preenchido"),
  categoria: yup.string().required("O conteúdo tem que ser preenchido").max(500),
});

export default function Update() {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(validationPost) });

  useEffect(() => {
    axios.get(`http://localhost:8080/produtos/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        const produto = response.data;

        reset({
          nome: produto.nome,
          descricao: produto.descricao,
          preco: produto.preco,
          estoque: produto.estoque,
          validade: produto.validade,
          categoria: produto.categoria
        });
      })
      .catch(() => {
        console.error("Erro ao buscar produto");
      });
  }, [id, reset, token]);

  const updateProduto = (data) => {
    const produtoDTO = {
      nomeProduto: data.nome,
      descricaoProduto: data.descricao,
      precoProduto: parseFloat(data.preco),
      estoque: parseInt(data.estoque),
      validade: data.validade,
      categoria: data.categoria
    };

    axios.put(`http://localhost:8080/produtos/${id}`, produtoDTO, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        console.log("Produto atualizado");
        navigate("/admin-produtos");
      })
      .catch((error) => {
        console.error("Erro ao atualizar produto", error.response?.data || error.message);
      });
  };

   return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Editar Produto</h1>
          <form onSubmit={handleSubmit(updateProduto)}>
            <div className={styles.formGroup}>
              <label htmlFor="nome">Produto</label>
              <input type="text" id="nome" {...register('nome')} />
              <p className={styles.errorMessage}>{errors.nome?.message}</p>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="descricao">Descrição</label>
              <input type="text" id="descricao" {...register('descricao')} />
              <p className={styles.errorMessage}>{errors.descricao?.message}</p>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="preco">Preço</label>
              <input type="number" step="0.01" id="preco" {...register('preco')} />
              <p className={styles.errorMessage}>{errors.preco?.message}</p>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="estoque">Estoque</label>
              <input type="number" id="estoque" {...register('estoque')} />
              <p className={styles.errorMessage}>{errors.estoque?.message}</p>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="validade">Validade</label>
              <input type="date" id="validade" {...register('validade')} />
              <p className={styles.errorMessage}>{errors.validade?.message}</p>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="categoria">Categoria</label>
              <input type="text" id="categoria" {...register('categoria')} />
              <p className={styles.errorMessage}>{errors.categoria?.message}</p>
            </div>
            <button type="submit" className={styles.button}>
              Salvar Alterações
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}