import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { FiExternalLink, FiGithub, FiPlay } from 'react-icons/fi';

const ProjectCard3D = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // Mouse position values for the subtle 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the 3D tilt (low stiffness, high damping for cinematic feel)
  const springConfig = { damping: 30, stiffness: 100, mass: 1 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Transform mouse position to rotation values (only active when not fully flipped)
  // When flipped we want the rotation to smoothly go to 180, so we mix hover states.
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e) => {
    if (isHovered || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate normalized mouse position from -0.5 to 0.5
    const width = rect.width;
    const height = rect.height;
    
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    // Reset mouse variables when leaving
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <div 
      className="w-full max-w-sm mx-auto h-[480px] rounded-2xl relative"
      style={{ perspective: '1200px' }} // Perspective required for realistic 3D space
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      // Added tap support for mobile interaction
      onClick={() => setIsHovered(!isHovered)}
    >
      <motion.div
        ref={cardRef}
        // Smooth transition using spring physics preventing jitter and snapping
        transition={{
          type: 'spring',
          stiffness: 60,
          damping: 15,
          mass: 1.2,
          restDelta: 0.001
        }}
        animate={{
          // Apply flip rotation when hovered, otherwise use subtle mouse tilt
          rotateY: isHovered ? 180 : rotateY.get(),
          rotateX: isHovered ? 0 : rotateX.get(),
          // Slight Z-depth scale up and translation on hover to give a floating/glow effect
          z: isHovered ? 50 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        style={{
          transformStyle: 'preserve-3d', // Extremely important for nested 3D elements
          width: '100%',
          height: '100%',
          position: 'relative'
        }}
        className="w-full h-full rounded-2xl shadow-2xl relative"
      >
        {/* ================= FRONT FACE ================= */}
        <motion.div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
          className="absolute inset-0 w-full h-full glass border border-white/10 rounded-2xl p-6 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-black/80 to-neonPurple/10 backdrop-blur-xl"
        >
          {/* Subtle Glow & Lighting Effect (Dynamic shadow) */}
          <div className="absolute -inset-1 opacity-20 bg-gradient-to-r from-neonCyan via-neonPurple to-neonCyan blur-xl -z-10 animate-pulse" />
          
          {/* Top image section with depth illustration */}
          <div className="w-full h-40 rounded-xl overflow-hidden mb-4 relative" style={{ transform: 'translateZ(30px)' }}>
            <div className="absolute inset-0 bg-neonPurple/20 mix-blend-multiply z-10" />
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>

          <div style={{ transform: 'translateZ(40px)' }}>
            <p className="text-neonCyan font-outfit text-xs font-bold tracking-widest uppercase mb-1">Featured</p>
            <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-lightGrey text-sm line-clamp-3 leading-relaxed mb-4">
              {project.description}
            </p>
            
            <ul className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 3).map((tech, i) => (
                <li key={i} className="text-xs font-outfit px-2 py-1 bg-white/5 rounded-md text-neonPurple border border-white/5">
                  {tech}
                </li>
              ))}
              {project.technologies.length > 3 && (
                <li className="text-xs font-outfit px-2 py-1 bg-white/5 rounded-md text-lightGrey border border-white/5">
                  +{project.technologies.length - 3}
                </li>
              )}
            </ul>
          </div>
          
          {/* Front Face Footer */}
          <div className="flex items-center justify-between mt-auto" style={{ transform: 'translateZ(50px)' }}>
            <p className="text-xs text-white/50 animate-pulse">Hover to view demo</p>
            <div className="flex gap-3">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-2 rounded-full bg-white/5 hover:bg-white/20 transition-colors text-white">
                  <FiGithub size={16} />
                </a>
              )}
              {project.live && project.live !== '#' && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-2 rounded-full bg-white/5 hover:bg-white/20 transition-colors text-white">
                  <FiExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </motion.div>


        {/* ================= BACK FACE ================= */}
        <motion.div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
          className="absolute inset-0 w-full h-full glass border border-neonCyan/30 rounded-2xl overflow-hidden bg-[#050505] backdrop-blur-3xl flex flex-col items-center justify-center shadow-[0_0_30px_rgba(0,255,255,0.1)]"
        >
          {/* Back side video container with soft fade-in synchronized with flip */}
          <div className="w-full h-full absolute inset-0 opacity-40 bg-gradient-to-t from-black via-transparent to-black z-10 pointer-events-none" />
          
          <div className="w-full h-full flex flex-col items-center justify-center p-6 relative z-20" style={{ transform: 'translateZ(60px)' }}>
            <p className="text-neonCyan mb-4 font-outfit tracking-widest text-sm font-bold uppercase">{project.title} Demo</p>
            
            <div className="w-full aspect-video bg-black/60 border border-white/10 rounded-xl flex items-center justify-center relative overflow-hidden group/video cursor-pointer shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              {/* Optional: Add video tag here, fallback to a play button for now */}
              <div className="w-16 h-16 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover/video:bg-neonCyan/20 group-hover/video:border-neonCyan transition-all duration-300 transform group-hover/video:scale-110">
                <FiPlay size={24} className="text-white ml-2 group-hover/video:text-neonCyan transition-colors" />
              </div>
              <p className="absolute bottom-4 text-xs font-outfit text-white/40">Demo Video Coming Soon</p>
            </div>

            <p className="text-center text-lightGrey text-sm mt-6 mb-8 px-4 opacity-80 leading-relaxed">
              Experience the cinematic performance and fluid transitions powered by React & Framer Motion.
            </p>

            {/* Quick Links on Back */}
            <div className="flex gap-4">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white text-sm font-outfit">
                  <FiGithub size={16} /> Code
                </a>
              )}
              {project.live && project.live !== '#' && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neonCyan/20 hover:bg-neonCyan/30 border border-neonCyan/30 transition-colors text-neonCyan text-sm font-outfit">
                  <FiExternalLink size={16} /> Live App
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProjectCard3D;
