import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebaseConfig";
import "./Login.css";
import { FaLock, FaUser } from 'react-icons/fa';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className='Background'>
      <div className="container">
        <h1>Acessar o Sistema</h1>
        <div className="input-field">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>        

        <button onClick={handleLogin}>Login</button>

        <div className="signup-link">
          <p>
            Não tem uma conta? <Link to="/register">Registrar-se</Link>
          </p>
        </div>        
      </div>
    </div>
  );
}

export default Login;
