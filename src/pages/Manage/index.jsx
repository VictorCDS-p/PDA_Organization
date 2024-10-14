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

    <Container id="MiniMenuContainer" fluid style={{ backgroundImage: 'url("public/images/imagem.png")',  minHeight: '100vh',padding: '2rem', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
      <Container style={{background: '#4E2050', borderRadius: '1.5rem', marginBottom:'4rem', width:'30rem', height:'10rem', paddingRight:'3rem', paddingLeft:'3rem', textAlign:'center', display:'flex', justifyContent:'center', flexDirection:'column', marginTop:'3rem'}}>
        <h2 id="MiniMenuTitle" style={{color:'white'}}>Gerenciamento</h2>
        <Form id="MiniMenuForm">
          <div className="mb-3" id="MenuOptionsContainer">
            <Form.Check style={{background:'white', width:'10rem', height:'2rem', display:'flex', justifyContent:'center', alignItems:'center', borderRadius:'2rem', paddingleft:'0.1rem'}}
              type="radio"
              label="Gerenciar Turmas"
              name="menuOptions"
              value="classes"
              checked={selectedOption === 'classes'}
              onChange={handleOptionChange}
              id="ManageClassesOption"
            />
            <Form.Check style={{background:'white', width:'10rem', height:'2rem', display:'flex', justifyContent:'center', alignItems:'center', borderRadius:'2rem', paddingleft:'0.1rem'}}
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
      </Container>

      {selectedOption === 'classes' && <ClassesManagement />}
      {selectedOption === 'students' && <StudentsManagement />}
    </Container>
  );
};

export default MiniMenu;
