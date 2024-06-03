import React, { useState } from 'react';
import { collection, addDoc, doc, runTransaction } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

import style from './Ticketform.module.css'

const Ticketform = ({ userId, onAdd }) => {
  const [solicitante, setSolicitante] = useState('');
  const [unidade, setUnidade] = useState('');
  const [problema, setProblema] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ordemDeServico = await getNextOrdemDeServico();

      const newChamado = {
        solicitante,
        unidade,
        problema,
        status: 'Aberto',
        ordemDeServico,
        userId
      };

      const docRef = await addDoc(collection(db, 'chamados'), newChamado);
      onAdd({ id: docRef.id, ...newChamado });

      setSolicitante('');
      setUnidade('');
      setProblema('');
      setError(null);
    } catch (err) {
      setError('Erro ao adicionar chamado: ' + err.message);
    }
  };

  const getNextOrdemDeServico = async () => {
    const ordemDeServicoRef = doc(db, 'ordemDeServicoCounter', 'uniqueCounter');

    const newOrdemDeServico = await runTransaction(db, async (transaction) => {
      const ordemDeServicoDoc = await transaction.get(ordemDeServicoRef);
      if (!ordemDeServicoDoc.exists()) {
        throw new Error('Contador de ordem de serviço não encontrado!');
      }

      const newCounter = ordemDeServicoDoc.data().counter + 1;
      transaction.update(ordemDeServicoRef, { counter: newCounter });
      return newCounter;
    });

    return newOrdemDeServico;
  };

  return (<>
    <div className={style.Container}>
      <h1>Abertura de Chamados</h1>
      <form onSubmit={handleSubmit}>
        {error && <alert color="danger">{error}</alert>}
        <input
          type="text"
          id="solicitante"
          value={solicitante}
          onChange={(e) => setSolicitante(e.target.value)}
          placeholder='Solicitante'
          required
        />
        <input
          type="text"
          id="unidade"
          value={unidade}
          onChange={(e) => setUnidade(e.target.value)}
          placeholder='Unidade'
          required
        />
        <input
          type="text"
          id="problema"
          value={problema}
          onChange={(e) => setProblema(e.target.value)}
          placeholder='Problema'
          required
        />
        <button type="submit">Criar Chamado</button>
      </form>
    </div>
  </>
  );
};

export default Ticketform;
