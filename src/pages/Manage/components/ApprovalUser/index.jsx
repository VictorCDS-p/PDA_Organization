import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';

export default function ApprovalUser() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        setUsers(storedUsers);
    }, []);

    const toggleUserStatus = (email) => {
        const updatedUsers = users.map(user => {
            if (user.email === email) {
                return { ...user, status: user.status === "ativo" ? "inativo" : "ativo" };
            }
            return user;
        });
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
    };

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
                        <tr key={user.email}>
                            <td>{user.nome}</td>
                            <td>{user.email}</td>
                            <td>{user.status}</td>
                            <td>
                                <Button
                                    variant={user.status === "ativo" ? "danger" : "success"}
                                    onClick={() => toggleUserStatus(user.email)}
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
