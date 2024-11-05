import React, { useState } from 'react';
import { db } from '../firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import SimpleReactValidator from 'simple-react-validator';

const ProjectForm = ({ onAddProject }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const validator = new SimpleReactValidator();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validator.allValid()) {
      try {
        const docRef = await addDoc(collection(db, 'prueba'), {
          name,
          description,
        });
        onAddProject({ id: docRef.id, name, description }); 
        setName('');
        setDescription('');
        validator.hideMessages();
      } catch (error) {
        console.error("Error adding project:", error);
      }
    } else {
      validator.showMessages();
      e.target.classList.add('was-validated');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '1rem' }}>
        <label>Nombre del Proyecto:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => validator.showMessageFor('name')}
        />
        {validator.message('name', name, 'required')}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Descripción:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => validator.showMessageFor('description')}
        />
        {validator.message('description', description, 'required|min:10')}
      </div>

      <button type="submit">Agregar Proyecto</button>
    </form>
  );
};

export default ProjectForm;
