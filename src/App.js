import React, { useState, useEffect } from 'react';
import './App.css';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import { db } from './firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

function App() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);

    useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'prueba'));
        const projectList = querySnapshot.docs.map((doc) => ({
          id: doc.id,  
          ...doc.data(),
        }));
        setProjects(projectList);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

    const handleAddProject = (newProject) => {
    setProjects([...projects, newProject]);
    setShowForm(false);
  };

   const handleDeleteProject = async (id) => {
    if (!id) {
      console.error('ID del proyecto no válido:', id);
      return;
    }

    try {
      await deleteDoc(doc(db, 'prueba', id));  
      setProjects(projects.filter((project) => project.id !== id)); 
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <div className="App">
      <h1>Gestión de Proyectos Dos</h1>
      {showForm ? (
        <ProjectForm onAddProject={handleAddProject} />
      ) : (
        <button onClick={() => setShowForm(true)}>Agregar Proyecto</button>
      )}
      {projects.length === 0 ? (
        <p>No hay proyectos.</p>
      ) : (
        <ProjectList projects={projects} onDeleteProject={handleDeleteProject} />
      )}
    </div>
  );
}

export default App;
