import * as styles from "../FormProdutos/FormProdutos.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const validationPost = yup.object().shape({
  produtos: yup
    .string()
    .required("O produto tem que ser preenchido!")
    .max(40, "Tamanho máximo permitido excedido!"),
  preco: yup
    .string()
    .required("O preço tem que ser preenchido!")
    .max(150, "Tamanho máximo permitido excedido!"),
  imagem: yup
    .mixed()
    .required("A imagem é obrigatória!"),
});

export default function Posts() {
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationPost) });

  const addPost = (data) => {
    const formData = new FormData();
    formData.append("produto", data.titulo);
    formData.append("preco", data.descricao);
    formData.append("imagem", data.imagem[0]);

    axios
      .post("http://localhost:8080/produtos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        console.log("Deu certo");
        navigate("/");
      })
      .catch(() => console.error("Deu errado"));
  };

  return (
    <div>
       <main>
        <div className={styles.cardPost}>
          <h1>Cadastro de produtos</h1>
          <hr />
          <div className={styles.cardBodyPost}>
            <form onSubmit={handleSubmit(addPost)}>
              <div className={styles.fields}>
                <label htmlFor="titulo">Produto</label>
                <input
                  type="text"
                  id="produto"
                  {...register("produto")}
                />
                <p className={styles.errorMessage}>{errors.produto?.message}</p>
              </div>

              <div className={styles.fields}>
                <label htmlFor="descricao">Preço</label>
                <input
                  type="text"
                  id="preco"
                  {...register("preco")}
                />
                <p className={styles.errorMessage}>{errors.preco?.message}</p>
              </div>

              <div className={styles.fields}>
                <label htmlFor="imagem">Imagem</label>
                <input
                  type="file"
                  accept="image/*"
                  id="imagem"
                  {...register("imagem")}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                />
                <p className={styles.errorMessage}>{errors.imagem?.message}</p>

                {preview && (
                  <div style={{ marginTop: "10px" }}>
                    <img
                      src={preview}
                      alt="Pré-visualização"
                      style={{
                        width: "100%",
                        maxHeight: "300px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                )}
              </div>

              <div className={styles.btnPost}>
                <button type="submit">Enviar</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}