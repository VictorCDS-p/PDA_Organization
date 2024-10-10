import React from 'react';
import { Container } from 'react-bootstrap';
import './bodySection.css';

const BodySection = () => {
  return (
    <section className="body-section"> 
      <Container className="texto">
        <p>
          Uma plataforma para os alunos centralizarem<br />
          seus projetos ao longo do curso<br />
          e terem um  <span> portifolio PDA</span>. 
        </p>
      </Container>
    </section>
  );
};

export default BodySection;