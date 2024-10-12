import React, { useState, useEffect } from 'react';
import { Card, Button, Table, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const AdminProjects = ({ adminId }) => {
    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get('http://localhost:3030/class/read'); 
                setClasses(response.data);
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        };

        fetchClasses();
    }, []);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:3030/student/read'); 
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    const handleViewStudents = (classId) => {
        const filtered = students.filter(student => student.class_id === classId); 
        setFilteredStudents(filtered);
        setSelectedClass(classId);
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false); 

    const handleEvaluateProject = (studentId) => {
        navigate(`/evaluate-project/${studentId}`); 
    };

    return (
        <div>
            <h2>Gerenciar Projetos</h2>
            <div className="class-cards">
                {classes.map((classItem) => (
                    <Card key={classItem.id} style={{ width: '18rem', margin: '1rem' }}>
                        <Card.Body>
                            <Card.Title>{classItem.name}</Card.Title>
                            <Button onClick={() => handleViewStudents(classItem.id)}>Ver Alunos</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Alunos da Turma</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.full_name}</td>
                                    <td>
                                        <Button 
                                            variant="primary" 
                                            onClick={() => handleEvaluateProject(student.id)}
                                        >
                                            Avaliar Projetos
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminProjects;
