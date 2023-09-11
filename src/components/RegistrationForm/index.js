import axios from 'axios';
import Button from '../Button';
import TextField from '../TextField';
import './RegistrationForm.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

const RegistrationForm = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSave = async (event) => {
        event.preventDefault();

        try {
            const response = await api.post('/users/signup', {
                username: username,
                email: email,
                password: password
            });
        } catch (err) {
            console.error('Erro na requisicao => ', err);
        }

        console.log('Form foi submetido =>', username, email, password);
        navigate('/')
    }


    return (
        <section className='registration-form'>
            
            <form onSubmit={onSave}>
                <h2>Register</h2>
                <TextField
                    label="Username"
                    placeholder="Enter your username..."
                    inputValue={username}
                    onAlter={value => setUsername(value)}
                />
                <TextField
                    label="Email"
                    placeholder="Enter your email..."
                    inputValue={email}
                    onAlter={value => setEmail(value)}
                />
                <TextField
                    label="Password"
                    placeholder="Enter your password..."
                    inputValue={password}
                    onAlter={value => setPassword(value)}
                    type='password'
                />
                <Button>
                    Register
                </Button>
            </form>
        </section>
    );
};

export default RegistrationForm;