// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";

// const Feed = () => {
//     const [posts, setPosts] = useState([]);

//     useEffect(() => {
//         axios.get("http://localhost:8080/produtos")
//             .then((response) => {
//                 setPosts(response.data);
//             }).catch((error) => {
//                 console.error("Erro ao enviar requisição: ", error)
//             })
//     }, [])

//     function deletePost(id) {
//         axios.delete(`http://localhost:8080/produtos/${id}`)
//             .then(() => {
//                 console.log("Apagado");
//                 setPosts(posts.filter((post) => post.id !== id))

//             }).catch(() => {
//                 console.error("Não encontrado");

//             })

//     }

//     return (
//         <>
//                     {posts.map((post, index) => (
//                 <main>
//                     <div >
//                         <div key={index} >
//                             <header>
//                                 <h2>{post.nome}</h2>
//                             </header>
//                             <div  />
//                             <p>
//                                 {post.categoria}
//                             </p>
//                             <div>
//                                 <div >
//                                     <Link to={`/update/${post.id}`}>
//                                         <button>Editar</button>
//                                     </Link>
//                                 </div>

//                                 <div >
//                                     <Link to={`/more/${post.id}`}>
//                                         <button>Informações adicionais</button>
//                                     </Link>
//                                 </div>

//                                 <div>
//                                     <button onClick={() => deletePost(post.id)}>Apagar</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </main>
//             ))}
//         </>
//     );
// }

// export default Feed;