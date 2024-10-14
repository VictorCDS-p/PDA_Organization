import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import './header.css';

export default function Header() {
    const { token, userType, logout } = useContext(AuthContext); 
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <Navbar className="custom-navbar" expand="lg">
            <Container className="primary-container">
                <Navbar.Brand as={Link} to="/">
                    <img 
                        src="/images/programadores-do-amanha-logo.png" 
                        alt="Programadores do Amanhã"
                        className="logo-image" 
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end"> 
                    <Nav className="menu-container">
                        <ul className="menu-items">
                            <li className="menu-item">
                                <Nav.Link as={Link} to="/" className="nav-link">Início</Nav.Link>
                            </li>
                            {token ? ( 
                                <>
                                    {userType === "administrator" && (
                                        <>
                                            <li className="menu-item">
                                                <Nav.Link as={Link} to="/manage" className="nav-link">Gerenciar</Nav.Link>
                                            </li>
                                            <li className="menu-item">
                                                <Nav.Link as={Link} to="/projects" className="nav-link">Projetos</Nav.Link>
                                            </li>
                                            <li className="menu-item">
                                                <Nav.Link as={Link} to="/edit-account" className="nav-link">Editar Conta</Nav.Link>
                                            </li>
                                        </>
                                    )}
                                    {userType === "student" && ( 
                                        <>
                                            <li className="menu-item">
                                                <Nav.Link as={Link} to="/projects" className="nav-link">Projetos</Nav.Link>
                                            </li>
                                            <li className="menu-item">
                                                <Nav.Link as={Link} to="/edit-account" className="nav-link">Editar Conta</Nav.Link>
                                            </li>
                                        </>
                                    )}
                                    <li className="menu-item">
                                        <Button variant="link" onClick={handleLogout} className="nav-link logout-button">Deslogar</Button>
                                    </li>
                                </>
                            ) : (
                                <li className="menu-item">
                                    <Nav.Link as={Link} to="/auth" className="nav-link item-nav">Login</Nav.Link>
                                </li>
                            )}
                        </ul>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
