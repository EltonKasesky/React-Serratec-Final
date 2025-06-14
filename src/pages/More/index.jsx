import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function More() {
  const [leiaMais, setLeiaMais] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/produtos/${id}`)
      .then((response) => {
        setLeiaMais(response.data);
      })
      .catch(() => {
        console.error("Deu problema na requisição");
      });
  }, []);

  return (
    <div>
      <Header />
      <main>
        <div>
          <div>
            <header>
              <h2>{leiaMais.nome}</h2>
            </header>
           <p>{leiaMais.preco}</p>
          </div>
        </div>
      </main>
    </div>
  );
}