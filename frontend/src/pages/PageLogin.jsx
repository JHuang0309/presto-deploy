import { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom'; 

function PageLogin({ setTokenFn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const login = () => {
        // console.log(email, password);

        axios.post('http://localhost:5005/admin/auth/login', {
            email: email,
            password: password,
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
            <h2>Login</h2>
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
                <button onClick={login}>Login</button>
            </form>        
        </>
    )
}

export default PageLogin