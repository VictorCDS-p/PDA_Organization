import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Spinner, Row, Col, Modal, Container } from 'react-bootstrap';
import { readAllProjects, updateProject } from '../../services/projects.services';
import './style.css';

const EvaluateProject = function () {
    const { studentId } = useParams();
    const [projects, setProjects] = useState([]);
    const [evaluation, setEvaluation] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [feedback, setFeedback] = useState('');
    const [activeProjectId, setActiveProjectId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchProjects = async () => {
        setLoading(true);
        setError('');
        try {
            const projectsResponse = await readAllProjects();
            const filteredProjects = projectsResponse.filter(project => project.student_id === studentId);
            setProjects(filteredProjects);
        } catch (error) {
            setError('Erro ao buscar projetos.');
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [studentId]);

    const handleEvaluationChange = (projectId, value) => {
        setEvaluation((prev) => ({
            ...prev,
            [projectId]: value,
        }));
    };

    const handleProjectSelect = (projectId) => {
        setActiveProjectId((prev) => (prev === projectId ? null : projectId));
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        setError('');
        setFeedback('');
        try {
            await Promise.all(
                Object.entries(evaluation).map(async ([projectId, rate]) => {
                    if (isNaN(parseInt(rate))) {
                        console.error(`Nota inválida para o projeto ${projectId}:`, rate);
                        return Promise.reject(`Nota inválida para o projeto ${projectId}`);
                    }

                    await updateProject(projectId, { rate: parseInt(rate) });
                })
            );
            setFeedback('Avaliações atualizadas com sucesso!');
            setShowModal(true);
            setEvaluation({});
            await fetchProjects();
        } catch (error) {
            setError('Erro ao atualizar as avaliações.');
            console.error('Error updating evaluations:', error.response ? error.response.data : error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    if (loading) {
        return (
            <div className="text-center">
                <Spinner animation="border" />
                <p>Carregando projetos...</p>
            </div>
        );
    }

    return (
        <Container>
            <h2 className="text-center" id='TextCenter1' style={{ fontFamily: '"Dela Gothic One", sans-serif', margin: '50px' }}>Avaliar Projetos do Estudante</h2>
            {error && <p className="text-danger">{error}</p>}

            <Row className="g-4" id="RowCard">
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <Col xs={12} sm={6} md={4} lg={4} key={project.id}>
                            <Card className="mb-3" style={{ backgroundColor: '#f0e58b', padding: '20px', borderRadius: '8px' }}>
                                <Card.Body>
                                    <Card.Title className="text-center" id='TextCenter2' style={{ backgroundColor: '#4e2050', color: 'white', padding: '15px', borderRadius: '4px' }}>
                                        {project.name}
                                    </Card.Title>
                                    <Card.Text className="mt-3" style={{ marginBottom: '10px', display: 'block' }}>
                                        <strong>Data de envio:</strong> {formatDate(project.date)}<br />
                                        <strong>Descrição:</strong> {project.description || 'Sem descrição disponível.'}<br />
                                        <strong>Link do GitHub:</strong> <a href={project.link_github} target="_blank" rel="noopener noreferrer">{project.link_github}</a><br />
                                        <strong>Nota:</strong> {project.rate || 'Sem avaliação ainda.'}
                                    </Card.Text>
                                    {activeProjectId === project.id && (
                                        <div className="mt-3">
                                            <input
                                                type="number"
                                                min="0"
                                                max="10"
                                                value={evaluation[project.id] || ''}
                                                onChange={(e) => handleEvaluationChange(project.id, e.target.value)}
                                                placeholder="Nota (0-10)"
                                                className="form-control"
                                                style={{
                                                    width: '100%',
                                                    marginBottom: '15px',
                                                    borderColor: '#007bff',
                                                    borderWidth: '2px',
                                                    borderRadius: '4px',
                                                }}
                                            />
                                            <Button id='ButtonRate'
                                                onClick={handleSubmit}
                                                disabled={submitting || !Object.keys(evaluation).length}
                                                style={{ backgroundColor: '#4e2050', color: 'white', border: 'none', fontFamily: '"Dela Gothic One", sans-serif' }}>
                                                {submitting ? 'Enviando...' : 'Enviar Avaliações'}
                                            </Button>
                                        </div>
                                    )}
                                    {evaluation[project.id] && (
                                        <div className="mt-3">
                                            Nota Atual: {evaluation[project.id]}
                                        </div>
                                    )}
                                    <Button id='ButtonRate2'
                                        onClick={() => handleProjectSelect(project.id)}
                                        style={{ backgroundColor: '#4e2050', color: 'white', border: 'none', marginTop: '15px', fontFamily: '"Dela Gothic One", sans-serif' }}>
                                        Avaliar
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p>Nenhum projeto enviado para avaliação.</p>
                )}
            </Row>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Avaliação Atualizada</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {feedback}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default EvaluateProject;
