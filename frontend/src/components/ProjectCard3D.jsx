import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiExternalLink, FiGithub, FiPlay, FiX, FiCheck } from 'react-icons/fi';

const ProjectCard3D = ({ project }) => {
  const [showDemo, setShowDemo] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const videoRef = useRef(null);

  // Framer Motion 3D tilt coordinates
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics config for ultra-smooth transitions
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), springConfig);
  const scale = useSpring(1, springConfig);

  const handleMouseMove = (e) => {
    if (showDemo) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Track relative coordinates centered around 0 (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);

    // Update spotlight border coordinates
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${px}px`);
    cardRef.current.style.setProperty('--mouse-y', `${py}px`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Sync hover/demo states with video and motion values
  useEffect(() => {
    if (videoRef.current && project.videoUrl) {
      if (showDemo) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      } else if (isHovered) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [showDemo, isHovered, project.videoUrl]);

  useEffect(() => {
    if (showDemo) {
      x.set(0);
      y.set(0);
      scale.set(1);
    } else if (isHovered) {
      scale.set(1.05);
    } else {
      x.set(0);
      y.set(0);
      scale.set(1);
    }
  }, [showDemo, isHovered, x, y, scale]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      className="w-full max-w-[360px] mx-auto h-[480px] rounded-3xl spotlight-card glass border border-white/5 bg-carPlum/10 relative overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-2xl group select-none cursor-pointer"
    >
      {/* Decorative accent glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-carRed/5 blur-[50px] rounded-full pointer-events-none -z-10"></div>

      {/* Main card body container */}
      <div 
        className={`relative w-full h-full flex flex-col justify-between p-5 md:p-6 z-10 transition-opacity duration-300 ${
          showDemo ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`} 
        style={{ transformStyle: 'preserve-3d' }}
      >
        
        {/* Visual Preview Header (translateZ pushes it out) */}
        <div 
          style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
          className="w-full h-44 rounded-2xl overflow-hidden relative border border-white/5 bg-black/60"
        >
          {/* Muted auto-loop hover video, or standard image */}
          {project.videoUrl ? (
            <>
              <video
                ref={videoRef}
                className={`w-full h-full object-cover transition-opacity duration-500 absolute top-0 left-0 ${
                  showDemo ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover:opacity-60'
                }`}
                src={project.videoUrl}
                muted
                loop
                playsInline
              />
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover filter grayscale group-hover:opacity-0 transition-all duration-500 absolute top-0 left-0"
              />
            </>
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
            />
          )}

          {/* Glowing overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-carBg/90 via-transparent to-transparent pointer-events-none z-10" />

          {/* Active play badge if video available */}
          {project.videoUrl && (
            <div className="absolute top-3 right-3 bg-black/75 border border-carGold/20 px-2 py-0.5 rounded-full text-[9px] uppercase tracking-widest text-carGold font-bold flex items-center gap-1 z-20">
              <span className="w-1 h-1 rounded-full bg-carRed animate-pulse"></span>
              Demo Available
            </div>
          )}
        </div>

        {/* Text Details (translateZ pushes details closer to screen) */}
        <div 
          style={{ transform: 'translateZ(45px)', transformStyle: 'preserve-3d' }}
          className="mt-4 flex-1 flex flex-col justify-start"
        >
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-carRed font-extrabold">Project Stack</span>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span className="text-[10px] font-mono text-carGold font-bold uppercase tracking-wider">{project.technologies[0] || 'Web Tech'}</span>
          </div>

          <h3 className="text-xl md:text-2xl font-black text-white mt-1.5 font-outfit uppercase tracking-wide group-hover:text-carGold transition-colors">
            {project.title}
          </h3>

          <p className="text-lightGrey text-sm mt-3 line-clamp-3 leading-relaxed">
            {project.description}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-2 mt-4" style={{ transform: 'translateZ(20px)' }}>
            {project.technologies.slice(0, 4).map((tech, i) => (
              <span 
                key={i} 
                className="text-[10px] font-mono px-2.5 py-1 bg-black/40 border border-white/5 text-lightGrey/90 rounded-lg hover:border-carRed/30 transition-colors"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-[10px] font-mono px-2 py-1 bg-white/5 border border-white/5 text-carGold rounded-lg">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Footer controls (translateZ handles button depth) */}
        <div 
          style={{ transform: 'translateZ(35px)' }}
          className="flex items-center justify-between mt-6 pt-4 border-t border-white/5"
        >
          {project.videoUrl ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // Avoid triggering card click
                setShowDemo(true);
              }}
              className="px-5 py-2 bg-carRed hover:bg-carRed/90 text-white font-extrabold text-[10px] uppercase tracking-widest rounded-full transition-all duration-300 shadow-[0_4px_12px_rgba(181,50,55,0.25)] flex items-center gap-1.5 cursor-pointer"
            >
              <FiPlay size={10} /> Watch Demo
            </button>
          ) : (
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest flex items-center gap-1">
              <FiCheck size={10} /> Verified Project
            </span>
          )}

          <div className="flex gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2.5 rounded-full bg-white/5 hover:bg-carRed/15 border border-white/10 hover:border-carRed/30 hover:text-white transition-all text-lightGrey"
                title="Codebase"
              >
                <FiGithub size={14} />
              </a>
            )}
            {project.live && project.live !== '#' && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2.5 rounded-full bg-white/5 hover:bg-carRed/15 border border-white/10 hover:border-carRed/30 hover:text-white transition-all text-lightGrey"
                title="Live Application"
              >
                <FiExternalLink size={14} />
              </a>
            )}
          </div>
        </div>

      </div>

      {/* Floating Interactive Video Demo Panel (standard 2D overlay inside card bounds) */}
      <AnimatePresence>
        {showDemo && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-0 bg-carBg/98 z-30 flex flex-col p-5 md:p-6 justify-between select-text cursor-default"
            style={{ transform: 'translateZ(60px)' }} // Render above 3D layers
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <div>
                <p className="text-[9px] font-mono text-carGold uppercase tracking-widest font-bold">Video Preview</p>
                <h4 className="text-white text-base font-black font-outfit uppercase tracking-wider">{project.title} Demo</h4>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDemo(false);
                }}
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-carRed/20 hover:border-carRed/40 text-lightGrey hover:text-white transition-all cursor-pointer"
              >
                <FiX size={14} />
              </button>
            </div>

            {/* Video Player (Removed rigid aspect-video to resolve flex vertical conflicts and set object-contain) */}
            <div className="flex-1 w-full bg-black/90 rounded-2xl overflow-hidden border border-white/10 my-4 flex items-center justify-center relative shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
              <video
                className="w-full h-full object-contain z-10"
                src={project.videoUrl}
                controls
                autoPlay
                playsInline
              />
            </div>

            {/* Subtext info */}
            <div className="flex justify-between items-center text-[10px] font-mono text-lightGrey/60 border-t border-white/5 pt-3">
              <span>Source: Cloudinary CDN</span>
              <span>Status: Streaming</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectCard3D;
