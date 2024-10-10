import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../registration.css';

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
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:3030/class/read");
        setClasses(response.data);
      } catch (error) {
        console.error("Erro ao buscar turmas:", error);
      }
    };

    const fetchAdministrators = async () => {
      try {
        const response = await axios.get("http://localhost:3030/administrator/read");
        setAdministrators(response.data);
      } catch (error) {
        console.error("Erro ao buscar administradores:", error);
      }
    };

    fetchClasses();
    fetchAdministrators();
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
      await axios.post("http://localhost:3030/student/create", {
        full_name: fullName,
        email: formData.Email,
        password: formData.Password,
        date_birthday: formData.DateBirthday,
        administrator_id: formData.AdministratorId,
        class_id: formData.ClassId,
      });
      navigate("/success");
    } catch (error) {
      setError(error.response?.data?.message || "Erro no registro. Tente novamente.");
    }
  };

  return (
    <Container className="mt-5">
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
          <Form.Control
            as="select"
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
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="FormAdministrator" className="mt-3">
          <Form.Label>Professor</Form.Label>
          <Form.Control
            as="select"
            name="AdministratorId"
            value={formData.AdministratorId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um professor</option>
            {administrators.map((admin) => (
              <option key={admin.id} value={admin.id}>
                {admin.full_name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        {error && <p className="text-danger mt-3">{error}</p>}

        <Button variant="primary" type="submit" className="mt-3">
          Registrar
        </Button>
      </Form>
    </Container>
  );
}
