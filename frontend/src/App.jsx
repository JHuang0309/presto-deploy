import { useState, useEffect } from 'react';
import PageRegister from './pages/PageRegister.jsx';
import PageLogin from './pages/PageLogin.jsx';
import PageDashboard from './pages/PageDashboard.jsx';
import Logout from './components/Logout.jsx';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate
} from 'react-router-dom';

function App() {

  const [token, setToken] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      setToken(localStorage.getItem('token'));
    }
  }, []);


  return (
    <>
      <BrowserRouter>
      <div className='mx-auto flex justify-end p-6 lg:px-8'>
        { token ? (
          <>
            <Link
              to="/dashboard"
              className="rounded-md bg-[#e4627d] px-3.5 py-1.5 mx-1 text-center text-sm/6 font-semibold text-white shadow-sm hover:bg-[#eb7b91] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-300"
            >Dashboard</Link>
            <Logout 
              token={token}
              setTokenFn={setToken} />
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="rounded-md bg-white px-3.5 py-1.5 mx-1 text-center text-sm/6 font-semibold text-black shadow-sm hover:text-[#eb7b91] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-300" 
            >Login</Link>
            <Link 
              to="/register"
              className="rounded-md bg-[#e4627d] px-3.5 py-1.5 mx-1 text-center text-sm/6 font-semibold text-white shadow-sm hover:bg-[#eb7b91] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-300"
            >Sign up</Link>
          </>
        )}  
      </div>
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<PageRegister setTokenFn={setToken}/>} />
          <Route path="/login" element={<PageLogin setTokenFn={setToken}/>}/>
          <Route path="/dashboard" element={<PageDashboard token={token}/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
