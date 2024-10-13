import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './footer.css'; 
const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} className="text-center text-md-start">
            <span className="footer-text">Feito com <span className="heart">❤️</span> pelos alunos da PDA</span>
          </Col>
          <Col xs={12} md={6} className="text-center text-md-end mt-3 mt-md-0">
            <a href="#" className="footer-link">Linkedin</a>
            <span className="separator"> | </span>
            <a href="#" className="footer-link">Github</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;