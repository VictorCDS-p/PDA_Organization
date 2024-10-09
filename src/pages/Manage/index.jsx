import React, { useState } from 'react';
import { Nav, Button, Container } from 'react-bootstrap';
import ManageClasses from './components/ManageClass';
import ManageStudents from './components/ManageStudents';

const Manage = () => {
  const [activeTab, setActiveTab] = useState('Classes');

  return (
    <Container>
      <Nav variant="tabs" activeKey={activeTab} onSelect={(selectedKey) => setActiveTab(selectedKey)}>
        <Nav.Item>
          <Nav.Link eventKey="Classes">Turmas</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Students">Alunos</Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="mt-4">
        {activeTab === 'Classes' && <ManageClasses />}
        {activeTab === 'Students' && <ManageStudents />}
      </div>
    </Container>
  );
};

export default Manage;
