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
      <div>
        { token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Logout token={token} setTokenFn={setToken}/>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            &nbsp;
            <Link to="/login">Login</Link>
          </>
        )}  
      </div>
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<PageRegister setTokenFn={setToken}/>} />
          <Route path="/login" element={<PageLogin setTokenFn={setToken}/>}/>
          <Route path="/dashboard" element={<PageDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
