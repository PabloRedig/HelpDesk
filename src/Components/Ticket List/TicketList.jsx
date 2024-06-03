import React from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import style from './TicketList.module.css'

const TicketList = ({ chamados, setChamados }) => {
  const cancelarChamado = async (id) => {
    const chamadoDoc = doc(db, 'chamados', id);
    await updateDoc(chamadoDoc, { status: 'Cancelado' });

    setChamados(chamados.map(chamado =>
      chamado.id === id ? { ...chamado, status: 'Cancelado' } : chamado
    ));
  };

  return (<>
    <div className={style.Container}>
      <h1> Chamados Abertos </h1>
      {chamados.map(chamado => (
        <div className={style.Card} key={chamado.id}>
          <label>SOLICITANTE <br />{chamado.solicitante}</label>
          <label>UNIDADE     <br />{chamado.unidade}</label>
          <label>O.S         <br />{chamado.ordemDeServico}</label>
          <label>STATUS      <br />{chamado.status}</label>
          <label>PROBLEMA    <br />{chamado.problema}</label>
          <div>
            {chamado.status !== 'Cancelado' && (
              <button className={style.btnCancelar} onClick={() => cancelarChamado(chamado.id)}>Cancelar</button>
            )}
          </div>
        </div>
      ))}
    </div>

  </>
  );
};

export default TicketList;
