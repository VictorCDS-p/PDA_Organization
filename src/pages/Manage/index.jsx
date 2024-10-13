import React, { useState } from 'react';
import { Form, Container } from 'react-bootstrap';
import ClassesManagement from './components/ClassesManagement';
import StudentsManagement from './components/StudentsManagement';

const MiniMenu = () => {
  const [selectedOption, setSelectedOption] = useState('classes'); 

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value); 
  };

  return (
    <Container className="mt-5">
      <h2>Gerenciamento</h2>
      <Form>
        <div className="mb-3">
          <Form.Check
            type="radio"
            label="Gerenciar Turmas"
            name="menuOptions"
            value="classes"
            checked={selectedOption === 'classes'}
            onChange={handleOptionChange}
          />
          <Form.Check
            type="radio"
            label="Gerenciar Alunos"
            name="menuOptions"
            value="students"
            checked={selectedOption === 'students'}
            onChange={handleOptionChange}
          />
        </div>
      </Form>

      {selectedOption === 'classes' && <ClassesManagement />}
      {selectedOption === 'students' && <StudentsManagement />}
    </Container>
  );
};

export default MiniMenu;
