// Header.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

export default function Header() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate(); 

    const handleLogout = () => {
        logout();
        navigate("/"); 
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Início</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Sobre</Nav.Link>
                        {user ? (
                            <>
                                {user.role === "administrator" ? ( 
                                    <>
                                        <Nav.Link as={Link} to="/manage">Gerenciar</Nav.Link>
                                        <Nav.Link as={Link} to="/projects">Projetos</Nav.Link>
                                        <Nav.Link as={Link} to="/edit-account">Editar Conta</Nav.Link>
                                    </>
                                ) : (
                                    user.role === "student" && ( 
                                        <>
                                            <Nav.Link as={Link} to="/projects">Projetos</Nav.Link>
                                            <Nav.Link as={Link} to="/edit-account">Editar Conta</Nav.Link>
                                        </>
                                    )
                                )}
                                <Button variant="link" onClick={handleLogout}>Deslogar</Button> 
                            </>
                        ) : (
                            <Nav.Link as={Link} to="/auth">Login</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
