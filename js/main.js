// Load and render projects from JSON file
async function loadProjects() {
  try {
    const response = await fetch('data/projects.json');
    const projects = await response.json();
    renderProjects(projects);
  } catch (error) {
    console.error('Error loading projects:', error);
  }
}

function renderProjects(projects) {
  const tableBody = document.getElementById('projectsTable');
  
  projects.forEach(project => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="project-icon">📁</td>
      <td class="project-name">${project.name}</td>
      <td class="project-description">${project.description}</td>
      <td class="project-date">${project.date}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Load projects when DOM is ready
document.addEventListener('DOMContentLoaded', loadProjects);
