import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { AuthContext } from "../../../../components/Context/AuthContext";

const mockUsers = [
  { id: 1, nome: "Funcionário 1", email: "funcionario1@exemplo.com", password: "senha123", user_type: "employee", cpf: "12345678900", status: "approved", approved_by: null },
  { id: 2, nome: "Funcionário 2", email: "funcionario2@exemplo.com", password: "senha123", user_type: "employee", cpf: "98765432100", status: "approved", approved_by: null },
  { id: 3, nome: "Aluno 1", email: "aluno1@exemplo.com", password: "senha123", user_type: "student", cpf: "55566677788", status: "pending", approved_by: null }
];

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (user) {
      if (user.status === "pending") {
        setError("Sua conta está pendente de aprovação.");
      } else {
        setError("");
        login(user); 
        navigate("/");
      }
    } else {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const foundUser = users.find(u => u.email === email && u.password === password);

      if (foundUser) {
        if (foundUser.status === "pending") {
          setError("Sua conta está pendente de aprovação.");
        } else if (foundUser.status === "inativo") {
          setError("Sua conta está inativa. Entre em contato com o suporte.");
        } else {
          setError("");
          login(foundUser);
          navigate("/");
        }
      } else {
        setError("Credenciais inválidas. Tente novamente.");
      }
    }
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formEmail">
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

        {error && <p className="text-danger mt-3">{error}</p>}

        <Button variant="primary" type="submit" className="mt-3">Entrar</Button>
      </Form>
    </Container>
  );
}
