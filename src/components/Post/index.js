import React, { useEffect, useState } from "react"
import { api } from "../../services/api";
import './Post.css'
import jwt_decode from "jwt-decode";


const Post = ({ post }) => {

    const { id } = post;
    const token = sessionStorage.getItem("jwtToken")
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.id;
    const isAdmin = decodedToken.isAdmin;
    const [rating, setRating] = useState(0);
    const [averageRating, setAverageRating] = useState(null);

    /* const sendRating = () => {

        const ratingObject = {
            value: 2,
            userId: 1,
            itemId: 2
        }
       
        // Substitua 'url_da_sua_api' pela URL real da sua API de avaliação de posts
        api.post('/ratings', ratingObject)
            .then((response) => {
                // Lógica de manipulação de resposta bem-sucedida, se necessário
            })
            .catch((error) => {
                console.error('Erro ao enviar avaliação:', error);
            });
        

    };
 */
    const handleDeleteClick = async () => {
        try {
            // Faça uma solicitação DELETE para excluir o post.
            await api.delete(`/posts/${id}`);

            // Atualize a interface do usuário conforme necessário (remova o post da lista, etc.).
        } catch (error) {
            console.error('Erro ao excluir o post:', error);
        }
    };

    const fetchAverageRating = async () => {
        try {
            const response = await api.get(`posts/${id}/average-rating`);
            setAverageRating(response.data);

        } catch (error) {
            console.error("Erro ao buscar a média de avaliações:", error);
        }
    };


    const handleButtonClick = () => {
        // Construa o objeto de dados para enviar com base no seu DTO
        const data = {
            value: rating, // Valor do rating
            userId: userId,     // ID do usuário (substitua pelo valor apropriado)
            postId: id     // ID do item (substitua pelo valor apropriado)
        };

        console.log(data)

        // Faça a solicitação POST usando o Axios
        api.post('/ratings', data)
            .then((response) => {
                console.log('Resposta do servidor: ', response.data)
                fetchAverageRating();
            })
            .catch(err => {
                console.error('Erro na solicitacao: ', err)
            });




    };

    const handleRatingChange = (event) => {
        setRating(parseInt(event.target.value));
    }

    return (
        <section className="post">
            <div className="postcontent">
                <h3 className="title">{post.title}</h3>
                <p>{post.content}</p>

                {averageRating !== null && (
                    <p>Avaliação Média: {averageRating}</p>
                )}

                {isAdmin && (
                    <button className="delete-button" onClick={handleDeleteClick}>
                        Excluir Post
                    </button>
                )}
                <div className="rating">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <div key={value}>
                            <input
                                type="radio"
                                name={`rating-${id}`}
                                id={`star${value}-${id}`}
                                value={value}
                                checked={rating === value}
                                onChange={handleRatingChange}
                            />
                            <label htmlFor={`star${value}-${id}`}></label>
                        </div>
                    ))}
                </div>


                <button className="buttonsend" onClick={handleButtonClick}>
                    Enviar avaliacao
                </button>
            </div>
        </section>

    )
}

export default Post;