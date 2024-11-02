import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link  } from 'react-router-dom'; 

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
            <div className="mx-auto max-w-2xl text-center mt-10">
                <h2 className="text-balance text-4xl font-semibold sm:text-5xl">Welcome Back!</h2>
                <p className='mt-2 text-lg/8 text-gray-600'>Let's get you signed in</p>
            </div> 
            <form className="mx-auto mt-10 max-w-xl sm:mt-10 px-10">
                <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">Email</label>
                <div className='mt-1.5 mb-2.5'>
                    <input 
                        id='email'
                        name='email'
                        type='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#e4627d] sm:text-sm/6"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm/6 font-semibold text-gray-900">Password</label>
                    <div className='mt-1.5 mb-2.5'>
                        <input 
                            id='password'
                            name='password'
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#e4627d] sm:text-sm/6"
                        />
                    </div>
                </div>
                <div className='mt-10'>
                    <button
                        type='submit'
                        className="block w-full rounded-md bg-[#e4627d] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#eb7b91] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={login}
                    > 
                        Login
                    </button>
                </div>
                <div className='flex flex-start mt-5'>
                    <span className="text-sm/6 text-gray-600">Don't have an account?  <Link className="font-semibold text-[#eb7b91]" to="/register">Sign up here</Link></span>
                   
                </div>
            </form>        
        </>
    )
}

export default PageLogin