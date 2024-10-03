import React, { useState, useEffect, useContext } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext"; 

export default function DashboardFuncionario() {
  const { user, logout } = useContext(AuthContext);
  const [alunos, setAlunos] = useState([]);
  const [statusFilter, setStatusFilter] = useState("todos");
  const navigate = useNavigate();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const alunosReg = users.filter(user => user.tipo_usuario === "aluno");
    setAlunos(alunosReg);
  }, []);

  const handleAprovar = (email) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map(user => {
      if (user.email === email && user.tipo_usuario === "aluno") {
        user.status = "aprovado";
      }
      return user;
    });
    localStorage.setItem("users", JSON.stringify(updatedUsers)); 
    setAlunos(updatedUsers.filter(user => user.tipo_usuario === "aluno"));
  };

  const handleDesativarAtivar = (email) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map(user => {
      if (user.email === email && user.tipo_usuario === "aluno") {
        user.status = user.status === "aprovado" ? "desativado" : "aprovado"; 
      }
      return user;
    });
    localStorage.setItem("users", JSON.stringify(updatedUsers)); 
    setAlunos(updatedUsers.filter(user => user.tipo_usuario === "aluno")); 
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredAlunos = alunos.filter(aluno => {
    if (statusFilter === "todos") return true;
    return aluno.status === statusFilter;
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user || user.tipo_usuario !== "funcionario") {
    return (
      <Container className="mt-5">
        <h2>Você não está autenticado como funcionário.</h2>
        <Button variant="danger" onClick={handleLogout}>Sair</Button> 
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Dashboard do Funcionário</h2>

      <Button variant="danger" onClick={handleLogout} className="mb-3">Sair</Button>

      <Form.Group controlId="formStatusFilter">
        <Form.Label>Filtrar por Status</Form.Label>
        <Form.Control as="select" value={statusFilter} onChange={handleStatusChange}>
          <option value="todos">Todos</option>
          <option value="pendente">Pendente</option>
          <option value="aprovado">Aprovado</option>
          <option value="desativado">Desativado</option>
        </Form.Control>
      </Form.Group>

      <h4>Alunos Registrados</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Status</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {filteredAlunos.length > 0 ? (
            filteredAlunos.map((aluno) => (
              <tr key={aluno.email}>
                <td>{aluno.nome}</td>
                <td>{aluno.email}</td>
                <td>{aluno.status}</td>
                <td>
                  {aluno.status === "pendente" && (
                    <Button variant="success" onClick={() => handleAprovar(aluno.email)}>Aprovar</Button>
                  )}
                  {aluno.status === "aprovado" && (
                    <Button variant="warning" onClick={() => handleDesativarAtivar(aluno.email)}>Desativar</Button>
                  )}
                  {aluno.status === "desativado" && (
                    <Button variant="primary" onClick={() => handleDesativarAtivar(aluno.email)}>Reativar</Button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Nenhum aluno encontrado.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}
