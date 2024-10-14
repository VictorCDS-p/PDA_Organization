import React, { useState, useEffect } from 'react'; 
import { Card, Button, Table, Modal, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import { readAllClasses } from '../../../../services/classes.services'; 
import { readStudents } from '../../../../services/students.services';
import { readAdministratorById } from '../../../../services/administrators.services'; // Importar a função
import './AdminProjects.css';

const AdminProjects = () => {
    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true); // Estado de loading
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const classData = await readAllClasses();
                const classesWithAdmins = await Promise.all(
                    classData.map(async (classItem) => {
                        const admin = await readAdministratorById(classItem.administrator_id);
                        return { ...classItem, administratorName: admin.full_name };
                    })
                );
                setClasses(classesWithAdmins);

                const studentData = await readStudents();
                setStudents(studentData);

                setLoading(false); 
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false); 
            }
        };

        fetchData();
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

    if (loading) {
        return (
            <div className="loading-spinner">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Carregando...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <div>
            <h2 className="title-projects">Gerenciar Projetos</h2>
            <div className="class-cards">
                {classes.map((classItem) => (
                    <Card key={classItem.id} style={{ width: '18rem', margin: '1rem', backgroundColor:'#f0e58b'}}>
                        <Card.Body>
                            <Card.Title id="class-card-title">{classItem.name}</Card.Title>
                            <p className="text"><strong>Professor Responsável:</strong> {classItem.administratorName || 'Desconhecido'}</p>
                            <p className="text"><strong>Data de Início:</strong> {new Date(classItem.date_started).toLocaleDateString() || 'Desconhecida'}</p>
                            <p className="text"><strong>Data de Fim:</strong> {new Date(classItem.date_end).toLocaleDateString() || 'Desconhecida'}</p>
                            <Button id="view-students-button" onClick={() => handleViewStudents(classItem.id)}>Ver Alunos</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton id="background-modal">
                    <Modal.Title>Alunos da Turma</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th id="subtitle-modal-one">Nome</th>
                                <th id="subtitle-modal-two">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.full_name}</td>
                                    <td>
                                        <Button id="bnt"
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
                    <Button variant="secondary" id="bnt-modal" onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminProjects;
