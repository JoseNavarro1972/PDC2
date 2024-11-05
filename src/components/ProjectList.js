import React from 'react';

const ProjectList = ({ projects, onDeleteProject }) => {
  return (
    <React.Fragment>
      {projects.length === 0 ? (
        <p>No hay proyectos</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <button onClick={() => onDeleteProject(project.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </React.Fragment>
  );
};

export default ProjectList;
