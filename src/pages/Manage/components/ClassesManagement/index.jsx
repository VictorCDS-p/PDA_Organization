import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Container, Modal } from 'react-bootstrap';

const ClassesManagement = () => {
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState({ name: '', date_started: '', date_end: '', administrator_id: '' });
  const [newModule, setNewModule] = useState({ name: '', description: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showClassModal, setShowClassModal] = useState(false);
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [modules, setModules] = useState([]);
  const [administrators, setAdministrators] = useState([]);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:3030/class/read');
      setClasses(response.data);
    } catch (error) {
      setError("Erro ao buscar turmas.");
    } finally {
      setLoading(false);
    }
  };

  const fetchModules = async () => {
    try {
      const response = await axios.get('http://localhost:3030/module/readAll');
      setModules(response.data);
    } catch (error) {
      setError("Erro ao buscar módulos.");
    }
  };

  const fetchAdministrators = async () => {
    try {
      const response = await axios.get('http://localhost:3030/administrator/read');
      setAdministrators(response.data);
    } catch (error) {
      setError("Erro ao buscar administradores.");
    }
  };

  const handleClassInputChange = (e) => {
    const { name, value } = e.target;
    setNewClass(prev => ({ ...prev, [name]: value }));
  };

  const handleModuleInputChange = (e) => {
    const { name, value } = e.target;
    setNewModule(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateClass = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://localhost:3030/class/create', newClass);
      fetchClasses();
      handleCloseClassModal();
      resetForms();
    } catch (error) {
      setError("Erro ao criar turma.");
    }
  };

  const handleDeleteClass = async (classId) => {
    setError('');

    try {
      await axios.delete(`http://localhost:3030/class/delete/${classId}`);
      fetchClasses();
    } catch (error) {
      setError("Erro ao deletar turma.");
    }
  };

  const handleCreateModule = async (e) => {
    e.preventDefault();
    setError('');
  
    if (selectedClass && selectedClass.id) {
      try {
        const payload = {
          ...newModule,
          class_id: selectedClass.id,
          administrator_id: selectedClass.administrator_id
        };
        await axios.post('http://localhost:3030/module/create', payload);
        fetchModules();
        handleCloseModuleModal();
        resetForms();
      } catch (error) {
        setError("Erro ao criar módulo.");
      }
    } else {
      setError("Selecionar uma turma antes de criar um módulo.");
    }
  };

  const handleDeleteModule = async (moduleId) => {
    setError('');

    try {
      await axios.delete(`http://localhost:3030/module/delete/${moduleId}`);
      fetchModules();
    } catch (error) {
      setError("Erro ao deletar módulo.");
    }
  };

  const handleShowClassModal = () => setShowClassModal(true);
  const handleCloseClassModal = () => {
    setShowClassModal(false);
    resetForms();
  };

  const handleShowModuleModal = (classItem) => {
    setSelectedClass(classItem);
    fetchModules();
    setShowModuleModal(true);
  };

  const handleCloseModuleModal = () => {
    setShowModuleModal(false);
    setSelectedClass(null);
    setModules([]);
  };

  const resetForms = () => {
    setNewClass({ name: '', date_started: '', date_end: '', administrator_id: '' });
    setNewModule({ name: '', description: '' });
  };

  useEffect(() => {
    fetchClasses();
    fetchAdministrators();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Container className="mt-5">
      <h2>Gerenciar Turmas</h2>
      {error && <p className="text-danger">{error}</p>}
      
      <Button variant="primary" onClick={handleShowClassModal} className="mb-3">
        Criar Turma
      </Button>

      <h3>Turmas Cadastradas</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data de Início</th>
            <th>Data de Término</th>
            <th>Administrador</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {classes.length > 0 ? (
            classes.map((classItem) => (
              <tr key={classItem.id}>
                <td>{classItem.name}</td>
                <td>{new Date(classItem.date_started).toLocaleDateString('pt-BR')}</td>
                <td>{new Date(classItem.date_end).toLocaleDateString('pt-BR')}</td>
                <td>
                  {administrators.find(admin => admin.id === classItem.administrator_id)?.full_name || 'Sem administrador'}
                </td>
                <td>
                  <Button variant="info" onClick={() => handleShowModuleModal(classItem)}>
                    Gerenciar
                  </Button>
                  <Button variant="danger" onClick={() => handleDeleteClass(classItem.id)}>
                    Deletar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Nenhuma turma encontrada</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal de Criação de Turma */}
      <Modal show={showClassModal} onHide={handleCloseClassModal}>
        <Modal.Header closeButton>
          <Modal.Title>Criar Turma</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateClass}>
            <Form.Group>
              <Form.Label>Nome da Turma</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newClass.name}
                onChange={handleClassInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Data de Início</Form.Label>
              <Form.Control
                type="date"
                name="date_started"
                value={newClass.date_started}
                onChange={handleClassInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Data de Término</Form.Label>
              <Form.Control
                type="date"
                name="date_end"
                value={newClass.date_end}
                onChange={handleClassInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Administrador</Form.Label>
              <Form.Control
                as="select"
                name="administrator_id"
                value={newClass.administrator_id}
                onChange={handleClassInputChange}
                required
              >
                <option value="">Selecione um administrador</option>
                {administrators.map((admin) => (
                  <option key={admin.id} value={admin.id}>
                    {admin.full_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button type="submit">Criar Turma</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseClassModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Gerenciamento de Módulos */}
      <Modal show={showModuleModal} onHide={handleCloseModuleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Módulos da Turma: {selectedClass?.name || ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Módulos Vinculados</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {selectedClass ? (
                modules.filter(module => module.class_id === selectedClass.id).length > 0 ? (
                  modules.filter(module => module.class_id === selectedClass.id).map((moduleItem) => (
                    <tr key={moduleItem.id}>
                      <td>{moduleItem.name}</td>
                      <td>{moduleItem.description}</td>
                      <td>
                        <Button variant="danger" onClick={() => handleDeleteModule(moduleItem.id)}>
                          Deletar
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">Nenhum módulo encontrado para esta turma</td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan="3">Nenhuma turma selecionada</td>
                </tr>
              )}
            </tbody>
          </Table>
          <Form onSubmit={handleCreateModule}>
            <Form.Group>
              <Form.Label>Nome do Módulo</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newModule.name}
                onChange={handleModuleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={newModule.description}
                onChange={handleModuleInputChange}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">Criar Módulo</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModuleModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ClassesManagement;
