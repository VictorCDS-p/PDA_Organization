import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";

export default function Registration() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    password: "",
    cpf: "",
  });
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegistration = (e) => {
    e.preventDefault();

    const newUser = {
      ...formData,
      user_type: "aluno",
      status: "pendente",
    };

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
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Insira seu email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Insira sua senha"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCpf" className="mt-3">
          <Form.Label>CPF</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insira seu CPF"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {mensagem && <p className="text-success mt-3">{mensagem}</p>}

        <Button variant="primary" type="submit" className="mt-3">
          Registrar
        </Button>

        <p className="mt-3">
          Já tem uma conta? <Link to="/auth">Faça login</Link>
        </p>
      </Form>
    </Container>
  );
}
