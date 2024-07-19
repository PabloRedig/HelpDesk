import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

import TicketList from '../../Components/Ticket List/TicketList';
import Ticketform from '../../Components/Ticket Form/Ticketform';

import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';

export default function Home() {
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
      <Header />     

      {user ? (
        <>
          <Ticketform userId={user.uid} onAdd={addChamado} />
          <TicketList chamados={chamados} setChamados={setChamados} />
        </>
      ) : (
        <p>Por favor, faça login para ver seus chamados.</p>
      )}

      <Footer />
    </>
  );
}
