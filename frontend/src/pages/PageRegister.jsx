import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function PageRegister({ setTokenFn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const navigate = useNavigate();

    const register = () => {
        // console.log(email, password, name);

        axios.post('http://localhost:5005/admin/auth/register', {
            email: email,
            password: password,
            name: name,
        })
        .then(res => {
            localStorage.setItem('token', res.data.token);
            setTokenFn(res.data.token);
            navigate('/dashboard');
        })
        .catch(res => {
            console.log(res.response.data.error);
        })
    }

    return (
        <>
            <h2>Register</h2>
            <form>
                <div>
                    Email: 
                    <input 
                        type='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    Password:
                    <input
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    Name:
                    <input
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <button onClick={register}>Register</button>
            </form>
        </>
    )
}

export default PageRegister