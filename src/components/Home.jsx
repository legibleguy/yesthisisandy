import { NavBar } from './NavBar';
import { SectionHeader } from './SectionHeader';
import { ProjectsList } from './ProjectsList';
import { HeroIdentity } from './HeroIdentity';
import { FooterPrompt } from './FooterPrompt';
import './Home.css';

export function Home() {
  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <NavBar />

      {/* Section Header */}
      <SectionHeader />

      {/* Projects List */}
      <ProjectsList />

      {/* Logo */}
      <div className="home-logo">
        <img src="/images/logo.png" alt="yes this is andy" />
      </div>

      {/* Hero Identity */}
      <HeroIdentity />

      {/* Footer Prompt */}
      <FooterPrompt />
    </div>
  );
}
