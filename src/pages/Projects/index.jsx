import React, { useContext } from 'react';
import { AuthContext } from '../../components/Context/AuthContext';
import StudentProjects from './components/StudentProjects';
import AdminProjects from './components/AdminProjects';

const Projects = () => {
    const { userType } = useContext(AuthContext);

    return (
        <div className="projects-page">
            <h1>Projetos</h1>
            {userType === 'administrator' ? <AdminProjects /> : <StudentProjects />}
        </div>
    );
};

export default Projects;
