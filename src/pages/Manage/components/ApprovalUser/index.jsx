import React from 'react';
import { Table, Button } from 'react-bootstrap';

export default function ApprovalUser({ users, onToggleActive }) {
    return (
        <div>
            <h2>Aprovação de Usuários</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.status === "ativo" ? "Ativo" : "Inativo"}</td>
                            <td>
                                <Button
                                    variant={user.status === "ativo" ? "danger" : "success"}
                                    onClick={() => onToggleActive(user.id)}
                                >
                                    {user.status === "ativo" ? "Desativar" : "Ativar"}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
