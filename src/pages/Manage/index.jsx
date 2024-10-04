// src/pages/Manage.js
import React, { useState } from 'react';
import ApprovalUser from './components/ApprovalUser';

export default function Manage() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Usuário 1', isActive: true },
    { id: 2, name: 'Usuário 2', isActive: false },
  ]);

  const toggleUserActiveStatus = (userId) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

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
      <ApprovalUser users={users} onToggleActive={toggleUserActiveStatus} />
    </div>
  );
}

