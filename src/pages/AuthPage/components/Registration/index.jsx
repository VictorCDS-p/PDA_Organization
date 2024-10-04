import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";

export default function Registration() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleRegistration = (e) => {
    e.preventDefault();
    
    const newUser = { nome, email, password, cpf, user_type: "aluno", status: "pendente" }; // Alterado aqui
    
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    
    setMensagem("Cadastro realizado com sucesso! Aguarde a aprovação.");
    
    setTimeout(() => {
      navigate("/auth"); 
    }, 3000);
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={handleRegistration}>
        <Form.Group controlId="formNome">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insira seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Insira seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCpf" className="mt-3">
          <Form.Label>CPF</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insira seu CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </Form.Group>

        {mensagem && <p className="text-success mt-3">{mensagem}</p>}

        <Button variant="primary" type="submit" className="mt-3">Registrar</Button>
      </Form>
    </Container>
  );
}
