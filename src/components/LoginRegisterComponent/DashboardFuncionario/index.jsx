import React, { useState, useEffect, useContext } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import { AuthContext } from "../AuthContext"; 

export default function DashboardFuncionario() {
  const { user, logout } = useContext(AuthContext);
  const [alunos, setAlunos] = useState([]);
  const [statusFilter, setStatusFilter] = useState("todos");

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const alunosReg = users.filter(user => user.user_type === "aluno");
    setAlunos(alunosReg);
  }, []);

  const handleAprovar = (email) => {
    const updatedUsers = alunos.map(user => {
      if (user.email === email) {
        user.status = "aprovado";
      }
      return user;
    });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setAlunos(updatedUsers);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredAlunos = alunos.filter(aluno => {
    if (statusFilter === "todos") return true;
    return aluno.status === statusFilter;
  });

  if (!user || user.user_type !== "funcionario") {
    return (
      <Container className="mt-5">
        <h2>Você não está autenticado como funcionário.</h2>
        <Button variant="danger" onClick={logout}>Sair</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Dashboard do Funcionário</h2>

      <Form.Group controlId="formStatusFilter">
        <Form.Label>Filtrar por Status</Form.Label>
        <Form.Control as="select" value={statusFilter} onChange={handleStatusChange}>
          <option value="todos">Todos</option>
          <option value="pendente">Pendente</option>
          <option value="aprovado">Aprovado</option>
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
          {filteredAlunos.map((aluno) => (
            <tr key={aluno.email}>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.status}</td>
              <td>
                {aluno.status === "pendente" && (
                  <Button variant="success" onClick={() => handleAprovar(aluno.email)}>Aprovar</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
