import React from 'react';

function NotFound() {
  return (
    <div className="not-found-page">
      <h1>Página Não Encontrada</h1>
      <p>
        Desculpe, mas a página que você está procurando não existe. Por favor, verifique o URL 
        ou volte à página inicial.
        <br />
        <strong>Funcionalidade:</strong>
        - Um link de retorno à página inicial.
      </p>
    </div>
  );
}

export default NotFound;
