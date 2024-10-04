import React from 'react';

export default function Projects() {
  return (
    <div className="projects-page">
      <h1>Projetos</h1>
      <p>
        Esta página permite que os usuários visualizem e gerenciem seus projetos. Os alunos podem 
        criar novos projetos e editá-los, enquanto os funcionários podem avaliar os projetos.
        <br />
        <strong>Funcionalidade:</strong>
        - Uma lista de projetos existentes, com opções para criar, editar ou excluir.
        - Funcionalidade de filtro para visualizar projetos por status (aprovado, pendente, etc.).
      </p>
    </div>
  );
}

