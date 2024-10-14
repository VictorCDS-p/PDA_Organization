import React, { useState } from 'react'; 
import { Button, Container } from 'react-bootstrap';
import ClassesManagement from './components/ClassesManagement';
import StudentsManagement from './components/StudentsManagement';
import "./style.css";

const MiniMenu = () => {
  const [selectedOption, setSelectedOption] = useState('classes'); 

  const handleOptionChange = (option) => {
    setSelectedOption(option); 
  };

  return (
    <Container id="MiniMenuContainer" fluid style={{ backgroundImage: 'url("images/imagem.png")', minHeight: '100vh', padding: '2rem', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
      <Container 
        style={{ background: '#4E2050', borderRadius: '1.5rem', marginBottom: '4rem', width: '30rem', height: '10rem', paddingRight: '3rem', paddingLeft: '3rem', textAlign: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: '3rem' }}
      >
        <h2 id="MiniMenuTitle" style={{ color: 'white' }}>Gerenciamento</h2>
        <div className="mb-3" id="MenuOptionsContainer">
          <Button 
            onClick={() => handleOptionChange('classes')} 
            className="me-2" 
            style={{ width: '10rem', backgroundColor: selectedOption === 'classes' ? '#f0e58b' : 'white', color: selectedOption === 'classes' ? 'black' : '#4E2050', border: '1px solid #4E2050', borderRadius: '20px', transition: 'background-color 0.3s, color 0.3s' }}
            onMouseEnter={(e) => { if (selectedOption !== 'classes') e.currentTarget.style.backgroundColor = '#e0e0e0'; }}
            onMouseLeave={(e) => { if (selectedOption !== 'classes') e.currentTarget.style.backgroundColor = 'white'; }}
          >
            Gerenciar Turmas
          </Button>
          <Button 
            onClick={() => handleOptionChange('students')} 
            style={{ width: '10rem', backgroundColor: selectedOption === 'students' ? '#f0e58b' : 'white', color: selectedOption === 'students' ? 'black' : '#4E2050', border: '1px solid #4E2050', borderRadius: '20px', transition: 'background-color 0.3s, color 0.3s' }}
            onMouseEnter={(e) => { if (selectedOption !== 'students') e.currentTarget.style.backgroundColor = '#e0e0e0'; }}
            onMouseLeave={(e) => { if (selectedOption !== 'students') e.currentTarget.style.backgroundColor = 'white'; }}
          >
            Gerenciar Alunos
          </Button>
        </div>
      </Container>

      {selectedOption === 'classes' && <ClassesManagement />}
      {selectedOption === 'students' && <StudentsManagement />}
    </Container>
  );
};

export default MiniMenu;
