import Button from '../Button';
import TextField from '../TextField';
import './RegistrationForm.css'
import React, { useState } from 'react'

const RegistrationForm = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSave = async (event) => {
        event.preventDefault();

        console.log('Form foi submetido =>', username, email, password);
    }


    return (
        <div>
            
            <form onSubmit={onSave}>
                <h2>Registro</h2>
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
                />
                <Button>
                    Register
                </Button>
            </form>
        </div>
    );
};

export default RegistrationForm;