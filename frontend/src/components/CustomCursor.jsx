import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      transition: {
        type: 'spring',
        mass: 0.1,
        stiffness: 800,
        damping: 40,
      }
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-neonCyan pointer-events-none z-[100] mix-blend-difference hidden md:block"
        variants={variants}
        animate="default"
      />
      <div 
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-neonPurple pointer-events-none z-[100] hidden md:block"
        style={{ left: mousePosition.x - 4, top: mousePosition.y - 4 }}
      />
    </>
  );
};

export default CustomCursor;
