import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard3D from './ProjectCard3D';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_URL}/api/projects`);
        if (!res.ok) throw new Error('Failed to fetch projects');
        const data = await res.json();

        // Map DB field names (githubLink/liveLink) to what ProjectCard3D expects (github/live)
        // videoUrl is included directly from the database ✅
        const mapped = data.map(p => ({
          ...p,
          github: p.githubLink,
          live: p.liveLink,
        }));

        setProjects(mapped);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Could not load projects. Is the backend running?');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-48">
            <div className="w-10 h-10 border-2 border-neonCyan border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <p className="text-center text-red-400 font-outfit">{error}</p>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {projects.map((project, index) => (
              <motion.div
                key={project._id || index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <ProjectCard3D project={project} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && projects.length === 0 && (
          <p className="text-center text-lightGrey font-outfit">No projects found in the database.</p>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
