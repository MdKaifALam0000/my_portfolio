import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import myPhoto from '../assets/My_photo.jpeg';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const profileRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const ctaRef = useRef(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);
  // Detect mobile: skip heavy canvas+GSAP animation on touch devices
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    // ── Skip all canvas + GSAP work on mobile to prevent scroll breaking ──
    if (isMobile) return;
    // ---- 1. CANVASS RENDER SETUP ----
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    // Load local frames dynamically using Vite's import.meta.glob
    const frameModules = import.meta.glob('../ezgif-6f4a4af5fdddf08f-jpg/*.jpg', { eager: true, import: 'default' });
    
    // Sort paths to ensure sequential order
    const framePaths = Object.keys(frameModules).sort();
    const frameCount = framePaths.length;
    
    // Access the imported standard URL from the Vite glob output
    const currentFrame = index => frameModules[framePaths[index]];

    const images = [];
    const sequence = { frame: 0 };

    // Preload image routine for butter smooth 60fps requestAnimationFrame performance
    let loadedCount = 0;
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) {
          // Set canvas dimensions based on the initial intrinsic native image size 
          // to ensure perfect aspect ratio before CSS scaling (object-cover)
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          // Draw first frame immediately when ready
          render();
        }
        if (loadedCount === frameCount) {
          setImagesLoaded(true);
        }
      };
      images.push(img);
    }

    const render = () => {
      if (images[sequence.frame] && images[sequence.frame].complete) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        // Draw the image onto the canvas
        context.drawImage(images[sequence.frame], 0, 0);
      }
    };


    // ---- 2. GSAP SCROLLTRIGGER SETUP ----
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 0.5, // 0.5s smoothing effect so it isn't completely rigid
        start: 'top top',
        // Pin for 4 screens worth of scrolling -> this dictates length of the animation
        end: '+=400%', 
      }
    });

    /**
     * The timeline sequence is normalized from 0 to 1 time units inside `tl` using position parameters.
     * We spread out the background frame draw, profile translation, and text swapping carefully.
     */

    // A) Background Animation - scrub through all frames across the entire duration
    tl.to(sequence, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      duration: 1.1, // Matches total text animation length
      onUpdate: () => requestAnimationFrame(render),
    }, 0); // Start at 0

    // B) Profile Image Animation (subtle parallax)
    tl.to(profileRef.current, {
      y: 30,
      opacity: 0.8,
      duration: 1.1, // Matches total timeline length
      ease: 'power1.inOut'
    }, 0);

    // C) Text Phase 1: "I build digital realities" Fades OUT
    tl.to(text1Ref.current, {
      opacity: 0,
      y: -50,
      duration: 0.2,
      ease: 'power2.inOut',
    }, 0.1);

    // D) Text Phase 2: "Crafting immersive experiences" Fades IN then OUT
    tl.fromTo(text2Ref.current, {
      opacity: 0,
      y: 50,
      display: 'none'
    }, {
      opacity: 1,
      y: 0,
      display: 'block',
      duration: 0.2,
      ease: 'power2.out'
    }, 0.3);

    tl.to(text2Ref.current, {
      opacity: 0,
      y: -50,
      duration: 0.2,
      ease: 'power2.inOut'
    }, 0.5);

    // E) Text Phase 3: "Building intelligent systems" Fades IN
    tl.fromTo(text3Ref.current, {
      opacity: 0,
      y: 50,
      display: 'none'
    }, {
      opacity: 1,
      y: 0,
      display: 'block',
      duration: 0.2,
      ease: 'power2.out'
    }, 0.7);

    // F) Fade out final components for exit transition
    tl.to([text3Ref.current, ctaRef.current, profileRef.current], {
      opacity: 0,
      y: -30,
      duration: 0.15,
      ease: 'power1.inOut'
    }, 0.95);

    // Cleanup triggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isMobile]);

  // ─── MOBILE HERO: Simple, clean, no canvas ───────────────────────────────
  if (isMobile) {
    return (
      <section id="hero" className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black px-6 py-24 text-center overflow-hidden">
        {/* Subtle background glow for mobile */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-neonCyan/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-neonPurple/10 blur-[100px] rounded-full pointer-events-none" />

        {/* Profile Image on Mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-40 h-48 rounded-sm border border-white/10 overflow-hidden mb-8 relative"
        >
          <img src={myPhoto} alt="Profile" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
        </motion.div>

        {/* Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-neonCyan font-outfit tracking-widest mb-3 text-sm"
        >
          WELCOME TO MY UNIVERSE
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-4xl font-bold text-white leading-tight mb-4"
        >
          I build <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonCyan to-neonPurple">digital realities</span>.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lightGrey text-base max-w-sm mx-auto mb-10"
        >
          Full-Stack Software Engineer specializing in building cutting-edge, premium web applications.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-4 items-center"
        >
          <a href="#projects" className="w-48 text-center px-8 py-3 bg-white text-black font-semibold rounded-sm hover:bg-white/90 transition-all duration-300">
            View Work
          </a>
          <div className="flex gap-4">
            <a href="https://github.com/MdKaifALam0000" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-sm border border-white/10 hover:bg-white/10 transition-all text-white"><FiGithub size={20}/></a>
            <a href="https://www.linkedin.com/in/alam-kaif-67b443224/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-sm border border-white/10 hover:bg-white/10 transition-all text-white"><FiLinkedin size={20}/></a>
            <a href="mailto:alam.kaif9430@gmail.com" className="p-3 bg-white/5 rounded-sm border border-white/10 hover:bg-white/10 transition-all text-white"><FiMail size={20}/></a>
          </div>
        </motion.div>
      </section>
    );
  }

  // ─── DESKTOP HERO: Full canvas + GSAP cinematic experience ────────────────
  return (
    <section 
      id="hero" 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* 1. CINEMATIC CANVAS BACKGROUND */}
      <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center opacity-40 mix-blend-screen pointer-events-none">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-cover"
        />
        {/* Subtle grid/gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none"></div>
      </div>

      {/* 2. FOREGROUND CONTENT */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center">
        
        {/* Left Col: Text Swap Container */}
        <div className="relative h-64 flex flex-col justify-center [perspective:1000px]">
          
          {/* Phase 1 Text */}
          <div ref={text1Ref} className="absolute left-0 w-full">
            <p className="text-neonCyan font-outfit tracking-widest mb-4">WELCOME TO MY UNIVERSE</p>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              I build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonCyan to-neonPurple">digital realities</span>.
            </h1>
            <p className="text-lightGrey mt-6 max-w-md text-lg">
              Full-Stack Software Engineer specializing in building cutting-edge, 
              premium web applications.
            </p>
          </div>

          {/* Phase 2 Text */}
          <div ref={text2Ref} className="absolute left-0 w-full hidden opacity-0 text-white">
            <h2 className="text-5xl md:text-7xl font-bold leading-tight">
              Crafting <br/>
              <span className="text-neonPurple italic">immersive</span> <br/>
              experiences.
            </h2>
          </div>

          {/* Phase 3 Text */}
          <div ref={text3Ref} className="absolute left-0 w-full hidden opacity-0 text-white">
            <h2 className="text-5xl md:text-7xl font-bold leading-tight">
              Building <br/>
              <span className="text-neonCyan">intelligent</span> <br/>
              systems.
            </h2>
          </div>

          {/* Fixed CTA Buttons that persist for most of scroll */}
          <div ref={ctaRef} className="absolute bottom-[-80px] left-0 flex gap-6 items-center">
            <a href="#projects" className="px-8 py-3 bg-white text-black font-semibold rounded-sm hover:bg-white/90 transition-all duration-300">
              View Work
            </a>
            <div className="flex gap-4 items-center">
              <a href="https://github.com/MdKaifALam0000" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-sm border border-white/10 hover:bg-white/10 hover:text-white transition-all"><FiGithub size={20} className="text-lightGrey"/></a>
              <a href="https://www.linkedin.com/in/alam-kaif-67b443224/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-sm border border-white/10 hover:bg-white/10 hover:text-white transition-all"><FiLinkedin size={20} className="text-lightGrey"/></a>
              <a href="mailto:alam.kaif9430@gmail.com" className="p-3 bg-white/5 rounded-sm border border-white/10 hover:bg-white/10 hover:text-white transition-all"><FiMail size={20} className="text-lightGrey"/></a>
            </div>
          </div>
        </div>

        {/* Right Col: Profile Frame */}
        <div className="flex items-center justify-center h-full hidden lg:flex">
          <div 
            ref={profileRef}
            className="relative w-80 h-[400px] rounded-sm border border-white/10 p-2 flex items-center justify-center bg-white/5 backdrop-blur-sm"
          >
            {/* Image Mask */}
            <div className="w-full h-full relative rounded-sm overflow-hidden bg-black object-cover z-20">
              <img 
                src={myPhoto} 
                alt="Profile" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 absolute top-0 left-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
