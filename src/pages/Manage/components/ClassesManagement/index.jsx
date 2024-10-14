import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Container, Modal } from 'react-bootstrap';
import { readAllClasses, createClass, deleteClass } from '../../../../services/classes.services';
import { readAllModules, createModule, deleteModule } from '../../../../services/modules.services';
import { readAdministrators } from '../../../../services/administrators.services';
import "./ClassesManagement.css"

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
      const classesData = await readAllClasses();
      setClasses(classesData);
    } catch (error) {
      setError("Erro ao buscar turmas.");
    } finally {
      setLoading(false);
    }
  };

  const fetchModules = async () => {
    try {
      const modulesData = await readAllModules();
      setModules(modulesData);
    } catch (error) {
      setError("Erro ao buscar módulos.");
    }
  };

  const fetchAdministrators = async () => {
    try {
      const administratorsData = await readAdministrators();
      setAdministrators(administratorsData);
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
      await createClass(newClass);
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
      await deleteClass(classId);
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
        await createModule(payload);
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
      await deleteModule(moduleId);
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
    <Container className="mt-5" id="ClassesManagementContainer">
      {error && <p className="text-danger" id="ErrorMessage">{error}</p>}

      <h3 id="RegisteredClassesTitle">Turmas Cadastradas</h3>
      <Table striped bordered hover id="ClassesTable">
        <thead>
          <tr>
            <th id="ClassNameHeader">Nome</th>
            <th id="StartDateHeader">Data de Início</th>
            <th id="EndDateHeader">Data de Término</th>
            <th id="AdministratorHeader">Administrador</th>
            <th id="ActionsHeader">Ações</th>
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
                  <Button variant="info" onClick={() => handleShowModuleModal(classItem)} id={`ManageButton-${classItem.id}`}>
                    Gerenciar
                  </Button>
                  <Button variant="danger" onClick={() => handleDeleteClass(classItem.id)} id={`DeleteButton-${classItem.id}`}>
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

      <Button variant="primary" onClick={handleShowClassModal} className="mb-3" id="CreateClassButton">
        Criar Turma
      </Button>

      <Modal show={showClassModal} onHide={handleCloseClassModal} id="ClassModal">
        <Modal.Header closeButton>
          <Modal.Title id="CreateClassModalTitle">Criar Turma</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateClass} id="CreateClassForm">
            <Form.Group>
              <Form.Label id="ClassNameLabel">Nome da Turma</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newClass.name}
                onChange={handleClassInputChange}
                required
                id="ClassNameInput"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label id="StartDateLabel">Data de Início</Form.Label>
              <Form.Control
                type="date"
                name="date_started"
                value={newClass.date_started}
                onChange={handleClassInputChange}
                required
                id="StartDateInput"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label id="EndDateLabel">Data de Término</Form.Label>
              <Form.Control
                type="date"
                name="date_end"
                value={newClass.date_end}
                onChange={handleClassInputChange}
                required
                id="EndDateInput"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label id="AdministratorLabel">Administrador</Form.Label>
              <Form.Control
                as="select"
                name="administrator_id"
                value={newClass.administrator_id}
                onChange={handleClassInputChange}
                required
                id="AdministratorSelect"
              >
                <option value="">Selecione um administrador</option>
                {administrators.map((admin) => (
                  <option key={admin.id} value={admin.id}>
                    {admin.full_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button type="submit" id="SubmitCreateClassButton">Criar Turma</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseClassModal} id="CloseClassModalButton">
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModuleModal} onHide={handleCloseModuleModal} id="ModuleModal">
        <Modal.Header closeButton>
          <Modal.Title id="ModuleModalTitle">Módulos da Turma: {selectedClass?.name || ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 id="LinkedModulesTitle">Módulos Vinculados</h5>
          <Table striped bordered hover id="ModulesTable">
            <thead>
              <tr>
                <th id="ModuleNameHeader">Nome do Módulo</th>
                <th id="ModuleDescriptionHeader">Descrição</th>
                <th id="ActionsHeader">Ações</th>
              </tr>
            </thead>
            <tbody>
              {modules.length > 0 ? (
                modules.map((moduleItem) => (
                  <tr key={moduleItem.id}>
                    <td>{moduleItem.name}</td>
                    <td>{moduleItem.description}</td>
                    <td>
                      <Button variant="danger" onClick={() => handleDeleteModule(moduleItem.id)} id={`DeleteModuleButton-${moduleItem.id}`}>
                        Deletar
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">Nenhum módulo encontrado</td>
                </tr>
              )}
            </tbody>
          </Table>

          <Form onSubmit={handleCreateModule} id="CreateModuleForm">
            <Form.Group>
              <Form.Label id="ModuleNameLabel">Nome do Módulo</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newModule.name}
                onChange={handleModuleInputChange}
                required
                id="ModuleNameInput"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label id="ModuleDescriptionLabel">Descrição</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={newModule.description}
                onChange={handleModuleInputChange}
                required
                id="ModuleDescriptionInput"
              />
            </Form.Group>
            <Button type="submit" id="SubmitCreateModuleButton">Criar Módulo</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModuleModal} id="CloseModuleModalButton">
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ClassesManagement;
