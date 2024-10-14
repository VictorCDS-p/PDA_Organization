import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { readAdministrators } from '../../../../services/administrators.services'; 
import { readAllClasses } from '../../../../services/classes.services'; 
import { createStudent } from '../../../../services/students.services'; 

import '../registration.css';
import '../login.css'

export default function RegistrationStudent() {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    ClassId: "",
    AdministratorId: "",
    DateBirthday: "",
  });
  const [classes, setClasses] = useState([]);
  const [administrators, setAdministrators] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassesAndAdministrators = async () => {
      try {
        const [classResponse, adminResponse] = await Promise.all([
          readAllClasses(),
          readAdministrators()
        ]);
        setClasses(classResponse);
        setAdministrators(adminResponse);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setError("Não foi possível carregar as turmas ou administradores.");
      }
    };

    fetchClassesAndAdministrators();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.Password !== formData.ConfirmPassword) {
      setError("As senhas não correspondem.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.Email)) {
      setError("Email inválido.");
      return;
    }

    const today = new Date();
    const dateOfBirth = new Date(formData.DateBirthday);
    if (dateOfBirth > today) {
      setError("A data de nascimento não pode ser no futuro.");
      return;
    }

    const fullName = `${formData.FirstName} ${formData.LastName}`;

    try {
      await createStudent({
        full_name: fullName,
        email: formData.Email,
        password: formData.Password,
        date_birthday: formData.DateBirthday,
        administrator_id: formData.AdministratorId,
        class_id: formData.ClassId,
      });
      navigate("/succestudent");
    } catch (error) {
      if (error.response?.status === 409) {
        setError("O email já está cadastrado. Tente outro.");
      } else {
        setError(error.response?.data?.message || "Erro no registro. Tente novamente.");
      }
    }
  };

  return (
    <Container className="mt-5" id="RegisterStudentContainer">
      <Form onSubmit={handleRegistration}>
        <Form.Group className="input-group mb-3">
          <Form.Control
            type="text"
            placeholder="Nome"
            name="FirstName"
            value={formData.FirstName}
            onChange={handleChange}
            required
          />
          <Form.Control
            type="text"
            placeholder="Sobrenome"
            name="LastName"
            value={formData.LastName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="input-group mb-3">
          <Form.Control
            type="password"
            placeholder="Senha"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            required
          />
          <Form.Control
            type="password"
            placeholder="Confirmar Senha"
            name="ConfirmPassword"
            value={formData.ConfirmPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="FormEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Insira seu email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="FormDateBirthday" className="mt-3">
          <Form.Label>Data de Nascimento</Form.Label>
          <Form.Control
            type="date"
            name="DateBirthday"
            value={formData.DateBirthday}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="FormClass" className="mt-3">
          <Form.Label>Turma</Form.Label>
          <Form.Select
            name="ClassId"
            value={formData.ClassId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma turma</option>
            {classes.map((classItem) => (
              <option key={classItem.id} value={classItem.id}>
                {classItem.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="FormAdministrator" className="mt-3">
          <Form.Label>Administrador</Form.Label>
          <Form.Select
            name="AdministratorId"
            value={formData.AdministratorId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um administrador</option>
            {administrators.map((admin) => (
              <option key={admin.id} value={admin.id}>
                {admin.full_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {error && <p className="text-danger mt-3">{error}</p>}

        <Button variant="primary" type="submit" className="mt-3" id="AdminLoginButton">
          Registrar
        </Button>
      </Form>
    </Container>
  );
}
