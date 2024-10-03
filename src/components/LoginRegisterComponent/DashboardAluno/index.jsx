import React, { useContext } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { AuthContext } from "../AuthContext"; 

export default function DashboardAluno() {
  const { user, logout } = useContext(AuthContext); 

  if (!user) {
    return <Container className="mt-5"><p>Usuário não autenticado.</p></Container>;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Dashboard do Aluno</h2>
      <Form>
        <h5>Nome: {user.nome}</h5>
        <h5>Email: {user.email}</h5>
        <h5>CPF: {user.cpf}</h5>
      </Form>
      <Button variant="danger" onClick={handleLogout} className="mt-3">
        Sair
      </Button>
    </Container>
  );
}