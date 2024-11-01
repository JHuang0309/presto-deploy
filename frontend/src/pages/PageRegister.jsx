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
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Register</h2>
            <form>
                <div>
                    Email: 
                    <input 
                        type='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    />
                </div>
                <div>
                    Password:
                    <input
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    />
                </div>
                <div>
                    Name:
                    <input
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    />
                </div>
                <button
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
                    onClick={register}
                > 
                    Register
                </button>
            </form>
        </>
    )
}

export default PageRegister