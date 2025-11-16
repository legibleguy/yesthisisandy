import { FileText } from 'lucide-react';
import './ProjectRow.css';

export function ProjectRow({ title, description, year }) {
  return (
    <div className="project-row">
      <div className="project-icon">
        <FileText size={20} strokeWidth={1.5} color="#1a1a1a" />
      </div>
      <div className="project-title">{title}</div>
      <div className="project-description">{description}</div>
      <div className="project-year">{year}</div>
    </div>
  );
}
