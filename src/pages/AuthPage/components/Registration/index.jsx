import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";

export default function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpf: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cpf") {
      const formattedCpf = value
        .replace(/\D/g, "")  
        .slice(0, 11)  
        .replace(/(\d{3})(\d)/, "$1.$2") 
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedCpf,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let soma = 0;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.substring(10, 11));
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    setError("");

    const { email, cpf } = formData;
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = users.some((user) => user.email === email);
    const cpfExists = users.some((user) => user.cpf === cpf);

    if (emailExists) {
      setError("Este email já está cadastrado.");
      return;
    }

    if (cpfExists) {
      setError("Este CPF já está cadastrado.");
      return;
    }

    if (!validarCPF(cpf)) {
      setError("CPF inválido.");
      return;
    }

    const newId = users.length ? users[users.length - 1].id + 1 : 1;

    const newUser = {
      id: newId, 
      ...formData,
      user_type: "student", 
      status: "pending",    
      approved_by: null,    
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    navigate("/success");
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={handleRegistration}>
        <Form.Group controlId="formNome">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insira seu nome"
            name="name"
            value={formData.name}
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
            placeholder="Insira o seu CPF"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            maxLength="14" 
            required
          />
        </Form.Group>

        {error && <p className="text-danger mt-3">{error}</p>}

        <Button variant="primary" type="submit" className="mt-3">
          Registrar
        </Button>
      </Form>
    </Container>
  );
}
