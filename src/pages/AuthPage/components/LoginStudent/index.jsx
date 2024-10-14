import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { AuthContext } from "../../../../components/Context/AuthContext";
import { loginStudent } from '../../../../services/students.services';
import '../login.css';

export default function LoginStudent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { token, isAccepted, id } = await loginStudent({ email, password });

      if (!isAccepted) {
        setError("Sua conta ainda está pendente de aprovação.");
      } else {
        login(token, "student", id);
        navigate("/");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.response?.data ||
        "Erro ao fazer login. Tente novamente mais tarde.";

      setError(errorMessage);
    }
  };

  return (
    <Container id="LoginStudentContainer" className="mt-5">
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="StudentFormEmail" className="FormControl">
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/material-sharp/24/email.png"
            alt="email"
            className="input-icon"
          />
          <Form.Control
            type="email"
            placeholder="Insira seu email de estudante"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="StudentFormPassword" className="mt-3 FormControl">
          <img width="24"
            height="24"
            src="https://img.icons8.com/material-outlined/24/password.png"
            alt="password"
            className="input-icon"
          />
          <Form.Control
            type="password"
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Entrar
        </Button>

        {error && <p className="text-danger mt-2">{error}</p>}
      </Form>
    </Container>
  );
}
