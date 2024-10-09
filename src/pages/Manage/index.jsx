import React, { useState, useEffect } from 'react';
import ApprovalUser from './components/ApprovalUser';

export default function Manage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const toggleUserActiveStatus = (userId) => {
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, status: user.status === "ativo" ? "inativo" : "ativo" } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers)); 
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
