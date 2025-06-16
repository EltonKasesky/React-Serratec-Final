import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./More.module.css";
import Header from '../../components/Header';
import Footer from "../../components/Footer/footer";


export default function More() {
  const [leiaMais, setLeiaMais] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("Token não encontrado");
      return;
    }

    axios
      .get(`http://localhost:8080/produtos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLeiaMais(response.data);
      })
      .catch((error) => {
        console.error("Erro ao enviar requisição GET em produtos:", error);
      });
  }, [id]);

  if (!leiaMais) {
    return <p>Carregando produto...</p>;
  }

  return (
    <>
    <Header />
    <div className={styles.page}>
      <div className={styles.card}>
        <h2>{leiaMais.nome}</h2>
        <hr />
        <p><strong>Descrição:</strong> {leiaMais.descricao}</p>
        <p><strong>Preço:</strong> R$ {leiaMais.preco}</p>
        <p><strong>Estoque:</strong> {leiaMais.estoque}</p>
        <p><strong>Validade:</strong> {leiaMais.validade}</p>
        <p><strong>Categoria:</strong> {leiaMais.categoria}</p>
      </div>
    </div>
    <Footer />
    </>
  );
}
