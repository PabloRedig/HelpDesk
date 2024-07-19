import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

import LogoutButton from '../../Components/Logout Button/LogoutButton';
import Login from '../../Pages/Login/Login';

import style from "./Header.module.css";


export default function Header() {
    const [chamados, setChamados] = useState([]);
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState('');
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
          fetchChamados(currentUser.uid);
          setUserName(currentUser.displayName || currentUser.email);
        } else {
          setUserName('');
        }
      });
      return () => unsubscribe();
    }, []);
  
    const fetchChamados = async (userId) => {
      const chamadosCollection = collection(db, 'chamados');
      const q = query(chamadosCollection, where("userId", "==", userId));
      const chamadosSnapshot = await getDocs(q);
      const chamadosList = chamadosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setChamados(chamadosList);
    };
  
    const addChamado = (newChamado) => {
      setChamados([...chamados, newChamado]);
    };
  
    return (
      <>
        <div className={style.header}>
          <p>Seja Bem-vindo ao Sistema, {userName}</p>
          {user ? <LogoutButton onLogout={() => setUser(null)} /> : <Login onLogin={setUser} />}
        </div>  
       
      </>
    );
  }
