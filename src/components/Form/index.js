import { useState } from 'react';
import { Link } from 'react-router-dom'
import Button from '../Button';
import TextField from '../TextField'
import axios from 'axios'
import './Form.css'
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';


const Form = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    

    const onSave = async (event) => {
        event.preventDefault();

        try {
            const response = await api.post('/auth', {
                username: username,
                password: password
            });

            console.log(username, password)
    
            console.log('Resposta da requisição =>', response.data.access_token);
            
            const jwtToken = response.data.access_token;
            
            if(jwtToken) {
                sessionStorage.setItem('jwtToken', jwtToken);
                navigate('/feed')
            } else {
                navigate('signup')
            }
            
        } catch (error) {
            console.error('Erro na requisição =>', error);
        }

        console.log('Form foi submetido =>', username, password)
    }

    return (
        <section className="form">
            <form onSubmit={onSave}>
                <h2>Enter your credentials</h2>
                <TextField
                    label="Username"
                    placeholder="Enter your username..."
                    inputValue={username}
                    onAlter={value => setUsername(value)}
                    
                />
                <TextField
                    label="Password"
                    placeholder="Enter your password..."
                    inputValue={password}
                    onAlter={value => setPassword(value)}
                    type='password'
                />
                <Button>
                    Login
                </Button>
                <p>Do not have an account?<Link to="/signup"> Sign up.</Link></p>
            </form>
        </section>
    )
}

export default Form;