import React from 'react';
import { Container } from 'react-bootstrap';
import './bodySection.css';

const BodySection = () => {
  return (
    <section className="body-section"> 
      <Container className="texto">
        <p>
          <span className="code-bracket">&lt;/</span> Uma plataforma para os alunos centralizarem<br />
          seus projetos ao longo do curso<br />
          e terem um  portifolio PDA <span className="code-bracket">&gt;</span>
        </p>
      </Container>
    </section>
  );
};

export default BodySection;