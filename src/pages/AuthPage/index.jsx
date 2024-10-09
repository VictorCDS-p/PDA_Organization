import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import LoginAdmin from "./components/LoginAdmin";
import LoginStudent from "./components/LoginStudent";
import RegistrationStudent from "./components/RegistrationStudent";  
import RegistrationAdmin from "./components/RegistrationAdmin";   

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); 
  const [userType, setUserType] = useState("student"); 

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

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

      <Form.Group className="d-flex justify-content-center mb-4">
        <Form.Check
          type="radio"
          label="Estudante"
          value="student"
          checked={userType === "student"}
          onChange={handleUserTypeChange}
          className="me-3"
        />
        <Form.Check
          type="radio"
          label="Administrador"
          value="admin"
          checked={userType === "admin"}
          onChange={handleUserTypeChange}
        />
      </Form.Group>

      {isLogin ? (
        userType === "student" ? (
          <LoginStudent />
        ) : (
          <LoginAdmin />
        )
      ) : (
        userType === "student" ? (
          <RegistrationStudent />   
        ) : (
          <RegistrationAdmin />   
        )
      )}
    </Container>
  );
}
