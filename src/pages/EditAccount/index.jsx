import React, { useState, useContext, useEffect } from "react";
import { Modal, Form, Button, Container, Alert } from "react-bootstrap";
import { AuthContext } from "../../components/Context/AuthContext";
import axios from "axios";

export default function AccountEdit() {
  const { user, userType } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    birthDate: "",
    newPassword: "",
    existingEmail: "",
    existingPassword: "",
  });
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newEmail, setNewEmail] = useState(""); 
  const [feedbackMessage, setFeedbackMessage] = useState(""); // Estado para a mensagem de feedback
  const [feedbackType, setFeedbackType] = useState(""); // Estado para o tipo de feedback (success ou error)

  const fetchUserData = async () => {
    try {
      const endpoint = userType === "administrator"
        ? `http://localhost:3030/administrator/readById/${user.id}`
        : `http://localhost:3030/student/readById/${user.id}`;

      const response = await axios.get(endpoint);
      const userData = response.data;

      setFormData({
        fullName: userData.full_name || "",
        emailAddress: userData.email || "",
        birthDate: userData.date_birthday ? userData.date_birthday.split('T')[0] : "",
      });
    } catch (error) {
      setFeedbackType("error");
      setFeedbackMessage("Erro ao buscar dados do usuário: " + error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user.id, userType]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = userType === "administrator"
        ? `http://localhost:3030/administrator/update/${user.id}`
        : `http://localhost:3030/student/update/${user.id}`;

      const { fullName, birthDate } = formData;
      const updates = {};

      if (fullName !== "") {
        updates.full_name = fullName;
      }
      if (birthDate !== "") {
        updates.date_birthday = birthDate;
      }

      if (Object.keys(updates).length > 0) {
        await axios.put(endpoint, updates);
        setFeedbackType("success");
        setFeedbackMessage("Dados atualizados com sucesso!");
      } else {
        setFeedbackType("info");
        setFeedbackMessage("Nenhuma alteração detectada nos dados.");
      }
    } catch (error) {
      setFeedbackType("error");
      setFeedbackMessage("Erro ao atualizar dados: " + error.response?.data?.message);
    }
  };

  const handleEmailChange = async () => {
    if (formData.existingEmail !== "" && newEmail !== "") {
      try {
        const endpoint = userType === "administrator"
          ? `http://localhost:3030/administrator/update/${user.id}`
          : `http://localhost:3030/student/update/${user.id}`;

        await axios.put(endpoint, {
          currentEmail: formData.existingEmail,
          email: newEmail,
        });

        setFormData({ ...formData, emailAddress: newEmail });
        setFeedbackType("success");
        setFeedbackMessage("Email atualizado com sucesso!");
        setShowEmailModal(false);
      } catch (error) {
        setFeedbackType("error");
        setFeedbackMessage("Erro ao atualizar email: " + error.response?.data?.message);
      }
    } else {
      setFeedbackType("error");
      setFeedbackMessage("Por favor, preencha todos os campos para alterar o email.");
    }
  };

  const handlePasswordChange = async () => {
    if (formData.existingPassword !== "" && formData.newPassword !== "") {
      try {
        const endpoint = userType === "administrator"
          ? `http://localhost:3030/administrator/update/${user.id}`
          : `http://localhost:3030/student/update/${user.id}`;

        await axios.put(endpoint, {
          currentPassword: formData.existingPassword,
          password: formData.newPassword,
        });
        setFeedbackType("success");
        setFeedbackMessage("Senha atualizada com sucesso!");
        setShowPasswordModal(false);
      } catch (error) {
        setFeedbackType("error");
        setFeedbackMessage("Erro ao atualizar senha: " + error.response?.data?.message);
      }
    } else {
      setFeedbackType("error");
      setFeedbackMessage("Por favor, preencha todos os campos para alterar a senha.");
    }
  };

  const partiallyHiddenEmail = (email) => {
    const [localPart, domain] = email.split("@");
    const visiblePart = localPart.length > 2 ? localPart.slice(0, 2) : localPart;
    return `${visiblePart}****@${domain}`;
  };

  return (
    <Container className="mt-5">
      <h2>Editar Conta ({userType === "administrator" ? "Administrador" : "Estudante"})</h2>
      
      {feedbackMessage && (
        <Alert variant={feedbackType === "success" ? "success" : feedbackType === "error" ? "danger" : "info"} onClose={() => setFeedbackMessage("")} dismissible>
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
            type="text"
            value={partiallyHiddenEmail(formData.emailAddress)}
            readOnly
          />
          <Button variant="link" onClick={() => {
            setNewEmail(""); 
            setShowEmailModal(true);
          }}>
            Alterar Email
          </Button>
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            value="****" 
            readOnly
          />
          <Button variant="link" onClick={() => {
            setShowPasswordModal(true);
          }}>
            Alterar Senha
          </Button>
        </Form.Group>

        <Button type="submit" className="mt-3">
          Salvar Alterações
        </Button>
      </Form>

      <Modal show={showEmailModal} onHide={() => setShowEmailModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Alterar Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formCurrentEmail" className="mb-3">
            <Form.Label>Email Atual</Form.Label>
            <Form.Control
              type="email"
              name="existingEmail"
              value={formData.existingEmail}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formNewEmail" className="mb-3">
            <Form.Label>Novo Email</Form.Label>
            <Form.Control
              type="email"
              value={newEmail} 
              onChange={(e) => setNewEmail(e.target.value)} 
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEmailModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleEmailChange}>
            Alterar Email
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Alterar Senha</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formCurrentPassword" className="mb-3">
            <Form.Label>Senha Atual</Form.Label>
            <Form.Control
              type="password"
              name="existingPassword"
              value={formData.existingPassword}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formNewPassword" className="mb-3">
            <Form.Label>Nova Senha</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handlePasswordChange}>
            Alterar Senha
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
