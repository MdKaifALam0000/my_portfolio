import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [hovered, setHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for smooth delay-follow effect on the outer ring
  const springConfig = { damping: 30, stiffness: 350, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer');
      
      setHovered(!!isClickable);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Outer follow ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-carGold pointer-events-none z-[100] hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: hovered ? 1.6 : 1,
          borderColor: hovered ? '#b53237' : '#cdc19e',
          backgroundColor: hovered ? 'rgba(181, 50, 55, 0.1)' : 'rgba(0, 0, 0, 0)',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />
      {/* Inner precise dot */}
      <motion.div 
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-carRed pointer-events-none z-[100] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: hovered ? 0.6 : 1,
          backgroundColor: hovered ? '#cdc19e' : '#b53237',
        }}
      />
    </>
  );
};

export default CustomCursor;
