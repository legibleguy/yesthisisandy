import { useState, useEffect } from 'react';
import { ProjectRow } from './ProjectRow';
import './ProjectsList.css';

export function ProjectsList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Load projects from public/data/projects.json
    fetch('/data/projects.json')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error('Error loading projects:', err));
  }, []);

  return (
    <div className="projects-list-container">
      <div className="projects-list-border">
        <div className="projects-list">
          {projects.map((project, index) => (
            <ProjectRow
              key={index}
              title={project.name}
              description={project.description}
              year={project.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
