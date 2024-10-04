// src/pages/Manage.js
import React from 'react';
// import ApprovalUser from './components/ApprovalUser';

function Manage() {
  return (
    <div className="manage-page">
      <h1>Gerenciar</h1>
      <p>
        Nesta página, os funcionários têm acesso a funcionalidades de gerenciamento de usuários, 
        turmas e módulos. Eles podem aprovar ou rejeitar contas de alunos, além de criar, editar e 
        excluir turmas e módulos associados.
        <br />
        <strong>Funcionalidade:</strong>
        - Opção para aprovar ou rejeitar contas de alunos.
        - Ferramentas para criar e gerenciar turmas.
        - Ferramentas para criar e gerenciar módulos dentro das turmas.
      </p>
      {/* <ApprovalUser /> */}

    </div>
  );
}

export default Manage;
