import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegistrationStudent() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    class_id: "",
    administrator_id: "",
    date_birthday: "",  
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

    try {
      await axios.post("http://localhost:3030/student/create", formData);
      navigate("/success");
    } catch (error) {
      setError(error.response?.data?.message || "Erro no registro. Tente novamente.");
    }
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={handleRegistration}>
        <Form.Group controlId="formNome">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insira seu nome"
            name="full_name"
            value={formData.full_name}
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

        <Form.Group controlId="formBirthday" className="mt-3">
          <Form.Label>Data de Nascimento</Form.Label>
          <Form.Control
            type="date"
            name="date_birthday"
            value={formData.date_birthday}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formClass" className="mt-3">
          <Form.Label>Turma</Form.Label>
          <Form.Control
            as="select"
            name="class_id"
            value={formData.class_id}
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

        <Form.Group controlId="formAdministrator" className="mt-3">
          <Form.Label>Professor</Form.Label>
          <Form.Control
            as="select"
            name="administrator_id"
            value={formData.administrator_id}
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
