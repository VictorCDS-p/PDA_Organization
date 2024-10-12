import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Table, Button, Container, Modal } from 'react-bootstrap';
import { AuthContext } from '../../../../components/Context/AuthContext';

const StudentsManagement = () => {
    const { user } = useContext(AuthContext);
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState({});
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:3030/student/read');
            setStudents(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error("Erro ao buscar estudantes", err);
            setError("Erro ao buscar estudantes.");
        }
    };

    const fetchClasses = async () => {
        try {
            const response = await axios.get('http://localhost:3030/class/read');
            const classMap = response.data.reduce((acc, currentClass) => {
                acc[currentClass.id] = currentClass.name;
                return acc;
            }, {});
            setClasses(classMap);
        } catch (err) {
            console.error("Erro ao buscar turmas", err);
            setError("Erro ao buscar turmas.");
        }
    };

    useEffect(() => {
        fetchStudents();
        fetchClasses();
    }, []);

    const handleShowModal = (student) => {
        setSelectedStudent(student);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedStudent(null);
        setShowModal(false);
    };

    const toggleStudentStatus = async () => {

        if (!selectedStudent) {
            console.error("Nenhum estudante selecionado.");
            return;
        }

        if (!user || !user.id) {
            console.error("Usuário não autenticado ou ID do usuário não encontrado.");
            setError("Usuário não autenticado.");
            return;
        }

        try {
            const updatedStatus = !selectedStudent.isAccepted;
            const response = await axios.put(`http://localhost:3030/student/update/${selectedStudent.id}`, {
                isAccepted: updatedStatus,
                administrator_id: user.id 
            });


            setStudents(prevStudents =>
                prevStudents.map(student =>
                    student.id === selectedStudent.id ? { ...student, isAccepted: updatedStatus } : student
                )
            );

            handleCloseModal();
        } catch (err) {
            console.error("Erro ao atualizar estudante", err);
            setError("Erro ao atualizar estudante.");
        }
    };

    return (
        <Container className="mt-5">
            <h2>Gerenciar Alunos</h2>
            {error && <p className="text-danger">{error}</p>}

            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Turma</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length > 0 ? (
                        students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.full_name}</td>
                                <td>{student.email}</td>
                                <td>{student.isAccepted ? 'Ativo' : 'Inativo'}</td>
                                <td>{classes[student.class_id] || 'Não vinculado'}</td>
                                <td>
                                    <Button onClick={() => handleShowModal(student)}>
                                        {student.isAccepted ? 'Desativar' : 'Ativar'}
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">Nenhum aluno encontrado</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedStudent ? (selectedStudent.isAccepted ? 'Desativar' : 'Ativar') : ''} Aluno</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedStudent && `Tem certeza que deseja ${selectedStudent.isAccepted ? 'desativar' : 'ativar'} a conta de ${selectedStudent.full_name}?`}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={toggleStudentStatus} disabled={!selectedStudent}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default StudentsManagement;
