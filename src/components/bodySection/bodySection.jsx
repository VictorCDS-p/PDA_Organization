import React from 'react';
import { Container } from 'react-bootstrap';
import './bodySection.css';

const BodySection = () => {
  return (
    <section className="body-section"> {/* Adiciona a classe "body-section" */}
      <Container className="texto">
        <p>
          Uma plataforma para os alunos centralizarem<br />
          seus projetos ao longo do curso<br />
          e terem um portifolio <span>PDA</span>. {/* Adiciona a tag <span> */}
        </p>
      </Container>
    </section>
  );
};

export default BodySection;