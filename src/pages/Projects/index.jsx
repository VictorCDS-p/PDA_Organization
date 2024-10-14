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
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh', 
            width: '100vw',
            margin: 0,
            padding: 0,
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
        }}>
            
            {userType === 'administrator' ? <AdminProjects /> : <StudentProjects />}
        </div>
    );
};

export default Projects;
