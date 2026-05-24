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

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center transition-all duration-300 pointer-events-none mt-6">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`glass pointer-events-auto flex items-center justify-between transition-all duration-500 ease-in-out ${
            scrolled
              ? 'w-[90%] md:w-[65%] py-3 px-8 rounded-full border border-carRed/20 shadow-[0_8px_32px_rgba(9,5,13,0.8)] bg-carPlum/80'
              : 'w-[95%] md:w-[80%] py-4 px-10 rounded-full border border-white/5 shadow-xl bg-transparent'
          }`}
        >
          {/* Logo */}
          <a href="#hero" className="text-xl md:text-2xl font-outfit text-white font-extrabold tracking-widest cursor-pointer">
            KAIF<span className="text-carRed">.DEV</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={`#${link.toLowerCase()}`}
                className="text-lightGrey hover:text-white transition-colors duration-300 relative group text-xs uppercase tracking-widest font-bold"
              >
                {link}
                <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-gradient-to-r from-carRed to-carGold transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#b53237]" />
              </a>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden flex flex-col gap-[5px] cursor-pointer p-2 z-50 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
              className="block w-6 h-[2px] bg-white rounded-full origin-center"
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
              className="block w-6 h-[2px] bg-white rounded-full"
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
              className="block w-6 h-[2px] bg-white rounded-full origin-center"
            />
          </button>
        </motion.nav>
      </div>

      {/* Mobile Fullscreen Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-carBg/98 backdrop-blur-xl flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={i}
                href={`#${link.toLowerCase()}`}
                onClick={handleLinkClick}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-3xl font-extrabold text-white hover:text-carRed transition-colors duration-300 font-outfit tracking-widest uppercase"
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
