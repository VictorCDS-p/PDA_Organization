
import React from 'react';
import { Container, Image } from 'react-bootstrap';
import './sectionHome.css'

const SectionHome = () => {
  return (
    <div className="section-home">
      <Image 
        src="images/imagem.png"
        fluid 
      />
      <Container className="texto-sobreposto">
        <h1>O Instituto Programadores do Amanhã</h1>
        <p>nasceu com o objetivo de formar e empregar jovens pretos, pardos e indígenas no mercado de tecnologia.</p>
      </Container>
    </div>
  );
};

export default SectionHome;