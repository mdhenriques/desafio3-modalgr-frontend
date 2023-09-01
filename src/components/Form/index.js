import { useState } from 'react';
import Button from '../Button';
import TextField from '../TextField'
import axios from 'axios'
import './Form.css'


const Form = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSave = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:6969/auth', {
                username: username,
                password: password
            });
    
            console.log('Resposta da requisição =>', response.data);
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
                />
                <Button>
                    Login
                </Button>
            </form>
        </section>
    )
}

export default Form;