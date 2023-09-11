import React, { useEffect, useState } from "react"
import { api } from "../../services/api";
import './Post.css'
import jwt_decode from "jwt-decode";
import Modal from "../Modal";


const Post = ({ post }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const { id } = post;
    const token = sessionStorage.getItem("jwtToken")
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.id;
    const isAdmin = decodedToken.isAdmin;


    const handleConfirmUpdate = async () => {

        const updatedPost = {
            title: newTitle,
            content: newContent
        }
        
        await api.put(`/posts/${id}`, updatedPost);
        setIsModalOpen(false);
        window.location.reload();
    };

    const handleUpdateClick = () => {
        setIsModalOpen(true);
    };

    const handleDeleteClick = async () => {
        try {

            await api.delete(`/posts/${id}`);
            window.location.reload();

        } catch (error) {
            console.error('Erro ao excluir o post:', error);
        }
    };

    return (
        <section className="post">
            <div className="postcontent">
                <h3 className="title">{post.title}</h3>
                <p>{post.content}</p>

                <button className="delete-button" onClick={handleDeleteClick}>
                    Excluir
                </button>

                <button className="update-button" onClick={handleUpdateClick}>
                    Atualizar
                </button>

                {/* Modal de atualização */}
                {isModalOpen && (
                    <Modal>
                        <h2>Update Post</h2>
                        <input
                            type="text"
                            placeholder="New Title"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                        <textarea
                            placeholder="New Content"
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                        />
                        <button onClick={handleConfirmUpdate}>Confirm</button>
                        <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                    </Modal>
                )}

            </div>
        </section>

    )
}

export default Post;