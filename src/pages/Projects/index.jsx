import React, { useContext } from 'react';
import { AuthContext } from '../../components/Context/AuthContext';
import StudentProjects from './components/StudentProjects';
import AdminProjects from './components/AdminProjects';


const Projects = () => {
    const { userType } = useContext(AuthContext);

    return (
        <div className="projects-page"
        style={{
            backgroundImage: "url('images/imagem.png')",
            backgroundSize: 'cover', 
            height: '100vh', 
            width: '100vw',
            margin: 0,
            color: 'white'
        }}>
            
            {userType === 'administrator' ? <AdminProjects /> : <StudentProjects />}
        </div>
    );
};

export default Projects;
