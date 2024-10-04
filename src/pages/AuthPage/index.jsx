import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import Login from "./components/Login";
import Registration from "./components/Registration";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Container className="mt-5">
      <h2 className="mb-4">{isLogin ? "Login" : "Registro"}</h2>

      <div className="d-flex justify-content-center mb-4">
        <Button
          variant={isLogin ? "primary" : "outline-primary"}
          onClick={() => setIsLogin(true)}
          className="me-2"
        >
          Login
        </Button>
        <Button
          variant={!isLogin ? "primary" : "outline-primary"}
          onClick={() => setIsLogin(false)}
        >
          Registrar
        </Button>
      </div>

      {isLogin ? <Login /> : <Registration />}
    </Container>
  );
}
