import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when a link is clicked
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center transition-all duration-300 pointer-events-none mt-6">
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`glass pointer-events-auto flex items-center justify-between transition-all duration-500 ease-in-out ${
            scrolled
              ? 'w-[90%] md:w-[70%] py-3 px-6 md:px-8 rounded-sm shadow-[0_5px_20px_rgba(0,0,0,0.5)] border-white/20'
              : 'w-[95%] md:w-[85%] py-4 px-6 md:px-10 rounded-sm shadow-xl'
          }`}
        >
          {/* Logo */}
          <div className="text-xl md:text-2xl font-outfit text-white font-bold tracking-widest cursor-pointer">
            PORT<span className="text-neonCyan">FOLIO</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={`#${link.toLowerCase()}`}
                className="text-lightGrey hover:text-white transition-colors duration-300 relative group text-sm uppercase tracking-wider font-semibold"
              >
                {link}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-neonCyan transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#00f0ff]" />
              </a>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden flex flex-col gap-[5px] cursor-pointer p-2 z-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
              className="block w-6 h-[2px] bg-white rounded-full origin-center"
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
              className="block w-6 h-[2px] bg-white rounded-full"
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
              className="block w-6 h-[2px] bg-white rounded-full origin-center"
            />
          </button>
        </motion.nav>
      </div>

      {/* Mobile Fullscreen Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={i}
                href={`#${link.toLowerCase()}`}
                onClick={handleLinkClick}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-3xl font-bold text-white hover:text-neonCyan transition-colors duration-300 font-outfit tracking-widest uppercase"
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
