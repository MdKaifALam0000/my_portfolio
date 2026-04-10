import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import ProjectCard3D from './ProjectCard3D';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects([
      { 
        title: 'CodeMaster', 
        description: 'A full-stack MERN coding platform designed to enhance problem-solving skills. Features a real-time Monaco Editor, JWT authentication, and an AI-driven assistant integrated with Google Gemini. Includes an admin dashboard and optimized performance using Redis caching.', 
        technologies: ['React', 'Node.js', 'MongoDB', 'Redis', 'Gemini AI'], 
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000',
        github: 'https://github.com/MdKaifALam0000/CodeMaster',
        live: 'https://codemaster-frontend.onrender.com/'
      },
      { 
        title: 'StudyNotion', 
        description: 'A full-stack MERN EdTech platform enabling instructors to create, manage, and monetize courses while providing students with a seamless learning experience through course discovery, enrollment, and progress tracking. Features secure JWT authentication, role-based access control, interactive video-based learning, and integrated payment functionality.', 
        technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT'], 
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000',
        github: 'https://github.com/MdKaifALam0000/Edtech'
      }
    ]);
  }, []);

  return (
    <section id="projects" className="min-h-screen py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-24"
        >
          <span className="text-neonCyan">03.</span> Featured Projects
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <ProjectCard3D project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
