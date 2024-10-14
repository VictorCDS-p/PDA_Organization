import React from 'react';
import { Container, Image } from 'react-bootstrap';
import './sectionHome.css';

const SectionHome = () => {
  return (
    <div className="section-home">
      {/* <Image
        className="image-pda"
        src="images/imagem.png"
        alt="Programadores do Amanhã"
        fluid
      /> */}
      <Container className="texto-sobreposto">
        <h1>O Instituto Programadores do Amanhã</h1>
        <p id="subtitle-home">
          Nasceu com o objetivo de formar e empregar jovens pretos, pardos e
          indígenas no mercado de tecnologia.
        </p>
      </Container>
    </div>
  );
};

export default SectionHome;
