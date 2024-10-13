import React, { useState, useContext, useEffect } from "react";  
import { Form, Button, Container, Alert } from "react-bootstrap";
import { AuthContext } from "../../components/Context/AuthContext";
import { readAdministratorById, updateAdministrator } from '../../services/administrators.services';
import { updateStudent, readStudentById } from '../../services/students.services';

export default function AccountEdit() {
  const { user, userType } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    birthDate: "",
    newPassword: "",
  });

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState("");

  const fetchUserData = async () => {
    try {
      const userData = userType === "administrator"
        ? await readAdministratorById(user.id)
        : await readStudentById(user.id);

      setFormData({
        fullName: userData.full_name || "",
        emailAddress: userData.email || "",
        birthDate: userData.date_birthday ? userData.date_birthday.split('T')[0] : "",
        newPassword: "",
      });
    } catch (error) {
      setFeedbackType("error");
      setFeedbackMessage("Erro ao buscar dados do usuário: " + error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user.id, userType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, birthDate, newPassword, emailAddress } = formData;
    const updates = {};

    if (fullName) updates.full_name = fullName;

    if (birthDate) {
      const dateObject = new Date(birthDate);
      if (!isValidDate(dateObject)) {
        setFeedbackType("error");
        setFeedbackMessage("Data de nascimento inválida");
        return;
      }
      updates.date_birthday = dateObject.toISOString();
    }

    if (newPassword) updates.password = newPassword;

    try {
      const userData = userType === "administrator"
        ? await readAdministratorById(user.id)
        : await readStudentById(user.id);

      if (emailAddress && emailAddress !== userData.email) {
        updates.email = emailAddress; 
      }

      console.log(updates); 

      if (userType === "administrator") {
        await updateAdministrator(user.id, updates);
      } else {
        await updateStudent(user.id, updates);
      }

      setFeedbackType("success");
      setFeedbackMessage("Dados atualizados com sucesso!");
      setFormData(prevData => ({ ...prevData, newPassword: "" }));
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
  };

  const handleErrorMessage = (error) => {
    console.error("Erro no servidor:", error);
    if (error.response && error.response.status === 403) {
      setFeedbackType("error");
      setFeedbackMessage("Você não tem permissão para realizar esta ação.");
    } else {
      setFeedbackType("error");
      setFeedbackMessage("Erro ao atualizar dados: " + error.message);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Editar Conta ({userType === "administrator" ? "Administrador" : "Estudante"})</h2>

      {feedbackMessage && (
        <Alert variant={feedbackType === "success" ? "success" : "danger"} onClose={() => setFeedbackMessage("")} dismissible>
          {feedbackMessage}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFullName" className="mb-3">
          <Form.Label>Nome Completo</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBirthDate" className="mb-3">
          <Form.Label>Data de Nascimento</Form.Label>
          <Form.Control
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="emailAddress" 
            value={formData.emailAddress} 
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Nova Senha</Form.Label>
          <Form.Control
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            placeholder="Digite sua nova senha"
          />
        </Form.Group>

        <Button type="submit" className="mt-3">
          Salvar Alterações
        </Button>
      </Form>
    </Container>
  );
}
