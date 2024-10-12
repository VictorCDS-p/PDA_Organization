import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { AuthContext } from "../../../../components/Context/AuthContext";
import axios from "axios";
import '../login.css';

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post("http://localhost:3030/administrator/login", {
      email,
      password,
    });
    
    login(response.data.token, "administrator");
    navigate("/");
  } catch (error) {
    setError(
      error.response?.data?.message || 
      "Erro ao fazer login. Verifique suas credenciais."
    );
  }
};


  return (
    <Container id="LoginAdminContainer" className="mt-5">
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="AdminFormEmail" className="FormControl">
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/material-sharp/24/email.png"
            alt="email"
            className="input-icon"
          />
          <Form.Control
            type="email"
            placeholder="Insira seu email de professor"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="AdminFormPassword" className="mt-3 FormControl">
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/windows/32/password.png"
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

        {error && <p id="AdminLoginError" className="text-danger mt-3">{error}</p>}

        <Button id="AdminLoginButton" variant="primary" type="submit" className="mt-3">
          Entrar
        </Button>
      </Form>
    </Container>
  );
}
