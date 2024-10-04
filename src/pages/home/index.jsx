import React from 'react';

function Home() {
  return (
    <div className="home-page">
      <h1>Bem-vindo ao Sistema de Gerenciamento</h1>
      <p>
        Esta é a página inicial da nossa plataforma. Aqui, os usuários podem se 
        registrar ou fazer login para acessar suas contas. O sistema permite que 
        alunos e funcionários gerenciem turmas, projetos e suas informações pessoais.
        <br />
        <strong>Funcionalidade:</strong> 
        - Um link para login e registro, que leva os usuários para a página de autenticação.
        - Uma breve descrição do que a plataforma oferece.
      </p>
    </div>
  );
}

export default Home;
