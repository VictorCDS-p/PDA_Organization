import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Spinner, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const EvaluateProject = function () {
    const { studentId } = useParams();
    const [projects, setProjects] = useState([]);
    const [evaluation, setEvaluation] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [feedback, setFeedback] = useState('');
    const [activeProjectId, setActiveProjectId] = useState(null);

    const fetchProjects = async () => {
        setLoading(true);
        setError('');
        try {
            const projectsResponse = await axios.get('http://localhost:3030/project/readAll');
            const filteredProjects = projectsResponse.data.filter(project => project.student_id === studentId);
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
                Object.entries(evaluation).map(([projectId, rate]) => {
                    if (isNaN(parseInt(rate))) {
                        console.error(`Nota inválida para o projeto ${projectId}:`, rate);
                        return Promise.reject(`Nota inválida para o projeto ${projectId}`);
                    }

                    return axios.put(`http://localhost:3030/project/update/${projectId}`, {
                        rate: parseInt(rate),
                    });
                })
            );
            setFeedback('Avaliações atualizadas com sucesso!');
            setEvaluation({});
        } catch (error) {
            setError('Erro ao atualizar as avaliações.');
            console.error('Error updating evaluations:', error.response ? error.response.data : error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleReload = () => {
        fetchProjects(); 
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
        <div>
            <h2>Avaliar Projetos do Estudante</h2>
            {error && <p className="text-danger">{error}</p>}
            {feedback && <p className="text-success">{feedback}</p>}

            <img
                width="50"
                height="50"
                src="https://img.icons8.com/ios/50/recurring-appointment.png"
                alt="recurring-appointment"
                onClick={handleReload}
                style={{ cursor: 'pointer', marginBottom: '1rem' }} 
            />

            {projects.length > 0 ? (
                <Row>
                    {projects.map((project) => (
                        <Col md={4} key={project.id} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{project.name}</Card.Title>
                                    <Card.Text>
                                        <strong>Data:</strong> {project.date}<br />
                                        <strong>Descrição:</strong> {project.description || 'Sem descrição disponível.'}<br />
                                        <strong>Link do GitHub:</strong> <a href={project.link_github} target="_blank" rel="noopener noreferrer">{project.link_github}</a><br />
                                        <strong>Nota:</strong> {project.rate || 'Sem avaliação ainda.'}
                                    </Card.Text>
                                    <Button onClick={() => handleProjectSelect(project.id)}>
                                        Avaliar
                                    </Button>
                                    {activeProjectId === project.id && (
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                min="0"
                                                max="10"
                                                value={evaluation[project.id] || ''}
                                                onChange={(e) => handleEvaluationChange(project.id, e.target.value)}
                                                placeholder="Nota (0-10)"
                                            />
                                        </div>
                                    )}
                                    {evaluation[project.id] && (
                                        <div className="mt-2">
                                            Nota Atual: {evaluation[project.id]}
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <p>Nenhum projeto enviado para avaliação.</p>
            )}

            <Button onClick={handleSubmit} disabled={submitting || !Object.keys(evaluation).length}>
                {submitting ? 'Enviando...' : 'Enviar Avaliações'}
            </Button>
        </div>
    );
};

export default EvaluateProject;
