import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import * as styles from "../Produtos/Produtos.module.css";
import { useTheme } from "../../context/ThemeContext";

const Produtos = () => {
  const [posts, setPosts] = useState([]);
  const [busca, setBusca] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:8080/produtos")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Erro ao enviar requisição: ", error));
  }, []);

  function deletePost(id) {
    const token = localStorage.getItem("token");
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este produto?"
    );
    if (!confirmDelete) return;

    axios
      .delete(`http://localhost:8080/produtos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        console.log("Produto apagado");
        setPosts(posts.filter((post) => post.id !== id));
      })
      .catch((err) =>
        console.error(
          "Erro ao deletar produto:",
          err.response?.data || err.message
        )
      );
  }

  return (
    <div className={styles.themeLocal}>
      <div className={styles.container}>
        <div className={styles.feedWrapper}>
          {posts.map((post) => (
            <div className={styles.card} key={post.id}>
              <header className={styles.cardHeader}>
                <h2>{post.nome}</h2>
              </header>
              <p className={styles.cardCategory}>{post.categoria}</p>
              <div className={styles.cardButtons}>
                <Link
                  to={`/admin-produtos/editar/${post.id}`}
                  className={styles.button}
                >
                  Editar
                </Link>
                <Link to={`/more/${post.id}`} className={styles.button}>
                  Leia Mais
                </Link>
                <button
                  onClick={() => deletePost(post.id)}
                  className={`${styles.button} ${styles.buttonDelete}`}
                >
                  Apagar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Produtos;
