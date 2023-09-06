import { useCallback, useEffect, useState } from 'react'
import './Feed.css'
import { api } from '../../services/api';
import Post from '../Post';
import { useNavigate } from 'react-router-dom';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();


    const getPosts = useCallback(async () => {
        try {
            const { data } = await api.get('posts/all')
            setPosts(data.reverse());
            setLoading(false);
            console.log(data);
        } catch (err) {
            console.error('Erro ao buscar posts', err);
            setLoading(false);
        }

    }, [])

    const handleLogout = () => {
        // Remova o token JWT do armazenamento
        sessionStorage.removeItem("jwtToken");
      
        // Redirecione o usuário para a página de login
        navigate("/");
      };

    const handleSubmit = () => {
        // Crie um objeto de post com título e conteúdo
        const newPost = {
            title,
            content,
        };

        // Adicione o novo post à lista de posts
        api.post('/posts', newPost)

        // Limpe os campos de título e conteúdo
        setTitle("");
        setContent("");
    };

    useEffect(() => {
        getPosts()
    }, []);


    return (

        <section className='feed'>
        {/* O restante do seu código do feed aqui */}
            <div className='formpost'>
            <h2>Crie seu post</h2>
                <input
                    className='input'
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className='area'
                    placeholder="Conteúdo"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button className='buttoninput' onClick={handleSubmit}>Enviar Post</button>
            </div>
                <button className='btn-logout' onClick={handleLogout}>Logout</button>
            <div className='postcreated'>
                <h2>Feed de Posts</h2>

                {loading ? (
                    <p>Carregando posts...</p>
                    ) : (
                        posts.map(post => (
                            <Post key={post.id} post={post} />
                            ))
                            
                            )}
            </div>
        </section>

    );
}

export default Feed;