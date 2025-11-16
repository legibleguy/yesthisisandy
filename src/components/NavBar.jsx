import './NavBar.css';

export function NavBar() {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          linkedin
        </a>
        <a href="https://itch.io" target="_blank" rel="noopener noreferrer">
          itch
        </a>
        <a href="#cv">CV</a>
      </div>
      <p className="nav-subtitle">most recent position: software engineer @ FatalFox Studio</p>
    </nav>
  );
}
