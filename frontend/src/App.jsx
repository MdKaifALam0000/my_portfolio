import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Background from './components/Background';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';

function App() {
  return (
    <>
      <CustomCursor />
      <Background />
      <Navbar />
      <main className="relative z-10 w-full overflow-hidden">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </>
  );
}

export default App;
