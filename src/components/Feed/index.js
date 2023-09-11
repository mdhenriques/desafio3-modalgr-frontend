import { useCallback, useEffect, useState } from 'react'
import './Feed.css'
import { api } from '../../services/api';
import Post from '../Post';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode"

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const token = sessionStorage.getItem("jwtToken")
    const decodedToken = jwt_decode(token)
    const userId = decodedToken.id;

    const navigate = useNavigate();


    const getPosts = useCallback(async () => {
        try {
            const { data } = await api.get(`posts/user/${userId}`)
            setPosts(data.reverse());
            setLoading(false);
            console.log(data);
        } catch (err) {
            console.error('Erro ao buscar posts', err);
            setLoading(false);
        }

    }, [])

    const handleLogout = () => {

        sessionStorage.removeItem("jwtToken");


        navigate("/");
    };

    const handleSubmit = async () => {

        const newPost = {
            userId,
            title,
            content,
        };


        await api.post('/posts', newPost)
        getPosts();
        setTitle("");
        setContent("");
        window.location.reload();
    };

    useEffect(() => {
        getPosts()
    }, []);


    return (

        <section className='feed'>
            {/* O restante do seu código do feed aqui */}
            <div className='formpost'>
                <h2>Crie seu lembrete</h2>
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
                <button className='buttoninput' onClick={handleSubmit}>Criar</button>
            </div>
            <button className='btn-logout' onClick={handleLogout}>Logout</button>
            <div className='postcreated'>
                <h2>Seus Lembretes</h2>

                {loading ? (
                    <p>Carregando lembretes...</p>
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