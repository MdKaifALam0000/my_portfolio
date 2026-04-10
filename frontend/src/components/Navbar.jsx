import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navLinks = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center transition-all duration-300 pointer-events-none mt-6">
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`glass pointer-events-auto flex items-center justify-between transition-all duration-500 ease-in-out ${
          scrolled 
            ? 'w-[90%] md:w-[70%] py-3 px-8 rounded-full shadow-[0_5px_20px_rgba(0,0,0,0.5)] border-white/20' 
            : 'w-[95%] md:w-[85%] py-5 px-10 rounded-2xl shadow-xl'
        }`}
      >
        <div className="text-2xl font-outfit text-white font-bold tracking-widest cursor-pointer">
          PORT<span className="text-neonCyan">FOLIO</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link, i) => (
             <a key={i} href={`#${link.toLowerCase()}`} className="text-lightGrey hover:text-white transition-colors duration-300 relative group text-sm uppercase tracking-wider font-semibold">
              {link}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-neonCyan transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#00f0ff]"></span>
            </a>
          ))}
        </div>

        <div className="md:hidden text-white cursor-pointer">
          {/* Placeholder for mobile menu button */}
          ☰
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
