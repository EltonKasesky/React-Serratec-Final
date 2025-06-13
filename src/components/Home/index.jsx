import * as styles from './Home.module.css';
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8080/produtos")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Erro ao enviar requisição GET em produtos:", error);
            });
    }, []);

    const groupedProducts = products.reduce((acc, product) => {
        const category = product.categoria;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(product);
        return acc;
    }, {});

    return (
        <main className={`${styles.container} ${styles.themeLocal}`}>
            {Object.entries(groupedProducts).map(([category, items]) => (
                <section key={category} className={styles.categorySection}>
                    <h2 className={styles.categoryTitle}>
                        {category
                            .replaceAll("_", " ")
                            .toLowerCase()
                            .split(" ")
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")
                        }
                    </h2>
                    <div className={styles.contentProducts}>
                        {items.map((product, index) => (
                            <div key={index} className={styles.product}>
                                <h3>{product.nome}</h3>
                                <div className={styles.productInfo}>
                                    <p>{product.descricao}</p>
                                    <p>R$: {product.preco}</p>
                                    <p>
                                        Categoria:ﾠ
                                        {product.categoria
                                            .replaceAll("_", " ")
                                            .toLowerCase()
                                            .split(" ")
                                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                            .join(" ")
                                        }
                                    </p>
                                </div>

                                <div className={styles.buyContent}>
                                    <button className={styles.buyButton}>Comprar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </main>
    );
};

export default Home;