import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import * as styles from "../Produtos/Produtos.module.css";

const Produtos = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/produtos?size=1000")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Erro ao enviar requisição: ", error));
  }, []);

  function deletePost(id) {
    axios.delete(`http://localhost:8080/produtos/${id}`)
      .then(() => {
        console.log("Apagado");
        setPosts(posts.filter((post) => post.id !== id));
      })
      .catch(() => console.error("Não encontrado"));
  }

  return (
    <div className={styles.themeLocal}>
      <div className={styles.container}>
        {posts.map((post) => (
          <div className={styles.card} key={post.id}>
            <header className={styles.cardHeader}>
              <h2>{post.nome}</h2>
            </header>
            <p className={styles.cardCategory}>{post.categoria}</p>
            <div className={styles.cardButtons}>
              <Link to={`/update/${post.id}`} className={styles.button}>
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
  );
};

export default Produtos;