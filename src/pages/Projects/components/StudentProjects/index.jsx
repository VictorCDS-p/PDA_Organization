import React, { useState, useEffect, useContext } from 'react'; 
import { AuthContext } from '../../../../components/Context/AuthContext';
import { Modal, Button, Form, Alert, Card, Row, Col } from 'react-bootstrap';
import { readAllProjects, createProject } from '../../../../services/projects.services'; 
import './StudentProjects.css'

function StudentProjects() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [projectData, setProjectData] = useState({
    name: '',
    date: '',
    description: '',
    link_github: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useContext(AuthContext);

  const fetchProjects = async () => {
    if (!user || !user.id) {
      console.warn("Usuário não autenticado. Não é possível buscar projetos.");
      return;
    }

    try {
      const allProjects = await readAllProjects();
      const filteredProjects = allProjects.filter(project => project.student_id === user.id);
      setProjects(filteredProjects);
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
      setErrorMessage('Erro ao buscar projetos. Tente novamente mais tarde.');
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!user || !user.id) {
      console.error("Erro: ID de usuário não encontrado.");
      setErrorMessage("Erro: ID de usuário não encontrado.");
      return;
    }

    try {
      await createProject({ ...projectData, student_id: user.id });
      fetchProjects();
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
      setErrorMessage('Erro ao criar projeto. Verifique os dados e tente novamente.');
    }
  };

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => {
    setShowModal(false);
    setProjectData({ name: '', date: '', description: '', link_github: '' });
  };

  useEffect(() => {
    fetchProjects();
  }, [user]);

  return (
  <div className="projects-page">
    <h1 className="title-projects">Projetos do Estudante</h1>

    <Modal show={showModal} onHide={handleCloseModal} id="background-modal">
      <Modal.Header closeButton style={{background:'#4E2050'}}>
        <Modal.Title style={{color:'white'}}>Adicionar Projeto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form onSubmit={handleAddProject}>
          <Form.Group controlId="formProjectName">
            <Form.Label>Nome do Projeto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Insira o nome do projeto"
              value={projectData.name}
              onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="formProjectDate">
            <Form.Label>Data</Form.Label>
            <Form.Control
              type="date"
              value={projectData.date}
              onChange={(e) => setProjectData({ ...projectData, date: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="formProjectDescription">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={projectData.description}
              onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formProjectLink">
            <Form.Label>Link do GitHub</Form.Label>
            <Form.Control
              type="url"
              placeholder="Insira o link do projeto no GitHub"
              value={projectData.link_github}
              onChange={(e) => setProjectData({ ...projectData, link_github: e.target.value })}
            />
          </Form.Group>
          <Button variant="primary" type="submit" id="bnt-modal" style={{marginTop:'1rem'}}>
            Adicionar Projeto
          </Button>
        </Form>
      </Modal.Body>
    </Modal>

    {user && user.id && (
      <img
        width="50"
        height="50"
        src="https://img.icons8.com/ios/50/plus-math--v1.png"
        alt="Adicionar Projeto"
        onClick={handleShowModal}
        style={{ cursor: 'pointer' }}
      />
    )}

    <Row xs={1} md={2} lg={3} id="class-cards">
      {projects.length > 0 ? (
        projects.map(project => (
          <Col key={project.id}>
            <Card style={{background:'#EBDA4C', }}>
              <Card.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background:'#4E2050', color:'white' }}>
                <Card.Title id="class-card-title">{project.name}</Card.Title>
              </Card.Header>
              <Card.Body className="card-body" style={{background:'#EBDA4C', border:'none',color:'black'}}>
                <Card.Text style={{color:'black', fontSize:'1.25rem'}}>{project.description}</Card.Text>
                <Card.Text style={{color:'black', fontSize:'1.25rem'}}>
                  <strong>Data:</strong> {new Date(project.date).toLocaleDateString()}
                </Card.Text>
                <Card.Link style={{color:'black'}} href={project.link_github} target="_blank" rel="noopener noreferrer">
                  Ver no GitHub
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <p>Nenhum projeto encontrado.</p>
      )}
    </Row>
  </div>
  );
}

export default StudentProjects;
