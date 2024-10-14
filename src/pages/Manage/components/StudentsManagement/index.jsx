import React, { useState, useEffect, useContext } from 'react'; 
import { Table, Button, Container, Modal, Pagination, Form } from 'react-bootstrap';
import { AuthContext } from '../../../../components/Context/AuthContext';
import { readStudents, updateStudent } from '../../../../services/students.services';
import { readAllClasses } from '../../../../services/classes.services';

const StudentsManagement = () => {
    const { user } = useContext(AuthContext);
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState({});
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 3;

    // State for filtering
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [isActiveFilter, setIsActiveFilter] = useState('');

    const fetchStudents = async () => {
        try {
            const studentsData = await readStudents();
            setStudents(Array.isArray(studentsData) ? studentsData : []);
        } catch (err) {
            console.error("Erro ao buscar estudantes", err);
            setError("Erro ao buscar estudantes.");
        }
    };

    const fetchClasses = async () => {
        try {
            const classData = await readAllClasses();
            const classMap = classData.reduce((acc, currentClass) => {
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
        try {
            const updatedStatus = !selectedStudent.isAccepted;
            await updateStudent(selectedStudent.id, {
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

    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

    const filteredStudents = students.filter(student => {
        const matchesName = student.full_name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesClass = selectedClass ? student.class_id === selectedClass : true;
        const matchesStatus = isActiveFilter ? student.isAccepted.toString() === isActiveFilter : true;

        return matchesName && matchesClass && matchesStatus;
    });

    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

    return (
        <Container className="mt-5" style={{ background: '#4E2050', borderRadius: '1.5rem', marginBottom: '4rem', paddingRight: '3rem', paddingLeft: '3rem', textAlign: 'center' }}>
            <h2 style={{ margin: '2rem', color: 'white' }}>Gerenciar Alunos</h2>
            {error && <p className="text-danger">{error}</p>}

            <div className="d-flex justify-content-between mb-3">
                <Form.Control
                    type="text"
                    placeholder="Pesquisar por nome"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '30%' }}
                />
                <Form.Select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    style={{ width: '30%' }}
                >
                    <option value="">Todas as turmas</option>
                    {Object.entries(classes).map(([id, name]) => (
                        <option key={id} value={id}>{name}</option>
                    ))}
                </Form.Select>
                <Form.Select
                    value={isActiveFilter}
                    onChange={(e) => setIsActiveFilter(e.target.value)}
                    style={{ width: '30%' }}
                >
                    <option value="">Todos os status</option>
                    <option value="true">Ativos</option>
                    <option value="false">Inativos</option>
                </Form.Select>
            </div>

            <div style={{ background: '#4E2050', borderRadius: '1rem', padding: '1rem' }}>
                <Table striped bordered hover style={{ background: 'white' }} className="mt-4">
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
                        {currentStudents.length > 0 ? (
                            currentStudents.map((student) => (
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
            </div>

            <Pagination>
                <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
            </Pagination>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton style={{ background: '#4E2050', color: 'white' }}>
                    <Modal.Title>{selectedStudent ? (selectedStudent.isAccepted ? 'Desativar' : 'Ativar') : ''} Aluno</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedStudent && `Tem certeza que deseja ${selectedStudent.isAccepted ? 'desativar' : 'ativar'} a conta de ${selectedStudent.full_name}?`}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className='btn btn-warning' onClick={toggleStudentStatus} disabled={!selectedStudent}>
                        Confirmar
                    </Button>
                    <Button className='btn btn-dark' variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default StudentsManagement;
