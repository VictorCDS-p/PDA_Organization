import React, { useContext } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { AuthContext } from "../AuthContext"; 
import { useNavigate } from "react-router-dom";

export default function DashboardAluno() {
  const { user, logout } = useContext(AuthContext); 
  const navigate = useNavigate();

  if (!user || user.tipo_usuario !== 'aluno') {
    return (
      <Container className="mt-5">
        <p>Usuário não autenticado ou não é um aluno.</p>
      </Container>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/login"); 
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Dashboard do Aluno</h2>
      <Form>
        <Form.Group>
          <Form.Label><strong>Nome:</strong></Form.Label>
          <p>{user.nome}</p>
        </Form.Group>

        <Form.Group>
          <Form.Label><strong>Email:</strong></Form.Label>
          <p>{user.email}</p>
        </Form.Group>

        <Form.Group>
          <Form.Label><strong>CPF:</strong></Form.Label>
          <p>{user.cpf}</p>
        </Form.Group>
      </Form>
      
      <Button variant="danger" onClick={handleLogout} className="mt-3">
        Sair
      </Button>
    </Container>
  );
}
