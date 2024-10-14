import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

export default function SuccessAdmin() {
  return (
    <Container className="mt-5 text-center">
      <h2>Registro bem-sucedido!</h2>
      <p>Seu registro foi completado com sucesso.</p>
      <Link to="/auth">
        <Button variant="primary" className="mt-3">
          Ir para a página de login
        </Button>
      </Link>
    </Container>
  );
}
