import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebaseConfig";
import { FaLock, FaUser } from 'react-icons/fa';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className='Background'>
      <div className='container'>
        <h1>Criar Cadastro</h1>
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
        <button onClick={handleRegister}>Register</button>
        <div className="signup-link">
          <p>
            Caso ja tenha Conta. <Link to="/login">Login</Link>
          </p>
          </div>
      </div>
    </div>
  );

}
