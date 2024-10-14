import React, { useState } from 'react';
import { Form, Container } from 'react-bootstrap';
import ClassesManagement from './components/ClassesManagement';
import StudentsManagement from './components/StudentsManagement';
import "./style.css";

const MiniMenu = () => {
  const [selectedOption, setSelectedOption] = useState('classes'); 

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value); 
  };

  return (
    <Container className="mt-5" id="MiniMenuContainer">
      <h2 id="MiniMenuTitle">Gerenciamento</h2>
      <Form id="MiniMenuForm">
        <div className="mb-3" id="MenuOptionsContainer">
          <Form.Check
            type="radio"
            label="Gerenciar Turmas"
            name="menuOptions"
            value="classes"
            checked={selectedOption === 'classes'}
            onChange={handleOptionChange}
            id="ManageClassesOption"
          />
          <Form.Check
            type="radio"
            label="Gerenciar Alunos"
            name="menuOptions"
            value="students"
            checked={selectedOption === 'students'}
            onChange={handleOptionChange}
            id="ManageStudentsOption"
          />
        </div>
      </Form>

      {selectedOption === 'classes' && <ClassesManagement />}
      {selectedOption === 'students' && <StudentsManagement />}
    </Container>
  );
};

export default MiniMenu;
