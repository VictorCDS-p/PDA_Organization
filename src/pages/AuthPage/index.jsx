import React, { useState } from "react";
import { Button, Container, Form, Image, Card } from "react-bootstrap";
import LoginAdmin from "./components/LoginAdmin";
import LoginStudent from "./components/LoginStudent";
import RegistrationStudent from "./components/RegistrationStudent";
import RegistrationAdmin from "./components/RegistrationAdmin";
import logo from '../../../public/images/logo-pda.png';
import './auth.css';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState("student");

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  return (
    <Container id="authPage" className="d-flex justify-content-center align-items-center">
      <Card
        id="authCard"
        className="p-4"
        style={{ width: isLogin ? "400px" : "800px" }}
      >
        <Card.Body className="text-center">
          <Image src={logo} alt="Logo" id="authLogo" className="mb-4" />
          <h2 id="authTitle">{isLogin ? "Login" : "Registro"}</h2>

          <div id="toggleButtons" className="d-flex justify-content-center mb-4">
            <Button
              variant={isLogin ? "primary" : "outline-primary"}
              onClick={() => setIsLogin(true)}
              className={`me-2 ${isLogin ? 'active' : ''}`}
            >
              Login
            </Button>
            <Button
              variant={!isLogin ? "primary" : "outline-primary"}
              onClick={() => setIsLogin(false)}
              className={`${!isLogin ? 'active' : ''}`}
            >
              Registrar
            </Button>
          </div>

          <Form.Group id="userTypeSelect" className="d-flex justify-content-center mb-4">
            <Form.Check
              type="radio"
              value="student"
              checked={userType === "student"}
              onChange={handleUserTypeChange}
              className="me-3"
              label={<span className="custom-radio">Estudante</span>}
            />
            <Form.Check
              type="radio"
              value="admin"
              checked={userType === "admin"}
              onChange={handleUserTypeChange}
              label={<span className="custom-radio">Administrador</span>}
            />
          </Form.Group>

          {isLogin ? (
            userType === "student" ? <LoginStudent /> : <LoginAdmin />
          ) : (
            userType === "student" ? <RegistrationStudent /> : <RegistrationAdmin />
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
