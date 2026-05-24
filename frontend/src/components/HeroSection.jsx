import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiGithub, FiLinkedin, FiMail, FiNavigation } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const ctaRef = useRef(null);
  const currentFrameRef = useRef(0);

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [frameCount, setFrameCount] = useState(0);
  const [loadedCountState, setLoadedCountState] = useState(0);

  const dragStartRef = useRef(0);
  const frameStartRef = useRef(0);
  const imagesRef = useRef([]);
  const isInteractedRef = useRef(false);

  // Responsive check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 1. Image Preloading & Initialization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');

    // Load local frames dynamically using Vite's import.meta.glob
    const frameModules = import.meta.glob('../ezgif-6f4a4af5fdddf08f-jpg/*.jpg', { eager: true, import: 'default' });
    const framePaths = Object.keys(frameModules).sort();
    const count = framePaths.length;
    setFrameCount(count);

    const currentFrame = index => frameModules[framePaths[index]];
    const images = [];

    let loaded = 0;
    for (let i = 0; i < count; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loaded++;
        setLoadedCountState(loaded);
        if (loaded === 1) {
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          renderFrame(0);
        }
        if (loaded === count) {
          setImagesLoaded(true);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    // Canvas drawing function
    function renderFrame(index) {
      if (images[index] && images[index].complete) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[index], 0, 0);
      }
    }

    // Keep render frame accessible globally within this useEffect scope
    window.__renderHeroFrame = renderFrame;

  }, []);

  const renderFrame = (index) => {
    if (window.__renderHeroFrame) {
      window.__renderHeroFrame(index);
    }
  };

  // 2. GSAP ScrollTrigger Sequence (Desktop Only)
  useEffect(() => {
    if (isMobile || !imagesLoaded || frameCount === 0) return;

    const sequence = { frame: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 0.6,
        start: 'top top',
        end: '+=250%', // Scroll depth
        onUpdate: (self) => {
          // If the user scrolls, set interacted to true to stop idle rotation
          isInteractedRef.current = true;
        }
      }
    });

    // Animate car rotation over the scrub timeline
    tl.to(sequence, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      duration: 1.1,
      onUpdate: () => {
        currentFrameRef.current = sequence.frame;
        renderFrame(sequence.frame);
      },
    }, 0);

    // Text animations synced with the car rotation phases
    // Phase 1 (0 to 0.25) is active initially

    // Text Phase 1 Fades Out
    tl.to(text1Ref.current, {
      opacity: 0,
      y: -30,
      display: 'none',
      duration: 0.2,
      ease: 'power2.inOut',
    }, 0.15);

    // Text Phase 2 Fades In
    tl.fromTo(text2Ref.current, {
      opacity: 0,
      y: 30,
      display: 'none'
    }, {
      opacity: 1,
      y: 0,
      display: 'flex',
      duration: 0.25,
      ease: 'power2.out'
    }, 0.35);

    // Text Phase 2 Fades Out
    tl.to(text2Ref.current, {
      opacity: 0,
      y: -30,
      display: 'none',
      duration: 0.2,
      ease: 'power2.inOut'
    }, 0.6);

    // Text Phase 3 Fades In
    tl.fromTo(text3Ref.current, {
      opacity: 0,
      y: 30,
      display: 'none'
    }, {
      opacity: 1,
      y: 0,
      display: 'flex',
      duration: 0.25,
      ease: 'power2.out'
    }, 0.8);

    // Subtle scale-up/exit zoom of CTA at the very end
    tl.to(ctaRef.current, {
      scale: 0.95,
      opacity: 0.9,
      duration: 0.15
    }, 0.95);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isMobile, imagesLoaded, frameCount]);

  // 3. Automatic Idle Rotation (when not scrolling or dragging)
  useEffect(() => {
    if (!imagesLoaded || frameCount === 0) return;

    const interval = setInterval(() => {
      if (isDragging || isInteractedRef.current) return;
      
      // Increment frame slowly for a gentle idle rotation
      const nextFrame = (currentFrameRef.current + 1) % frameCount;
      currentFrameRef.current = nextFrame;
      renderFrame(nextFrame);
    }, 45); // Smooth idle rotation speed

    return () => clearInterval(interval);
  }, [imagesLoaded, frameCount, isDragging]);

  // 4. Drag & Swipe Interaction Handlers
  const handleDragStart = (clientX) => {
    isInteractedRef.current = true;
    setIsDragging(true);
    dragStartRef.current = clientX;
    frameStartRef.current = currentFrameRef.current;
  };

  const handleDragMove = (clientX) => {
    if (!isDragging || frameCount === 0) return;
    const deltaX = clientX - dragStartRef.current;
    
    // Control rotation sensitivity (pixels dragged per frame shift)
    const sensitivity = 8;
    const frameOffset = Math.round(deltaX / sensitivity);
    
    let targetFrame = (frameStartRef.current - frameOffset) % frameCount;
    if (targetFrame < 0) {
      targetFrame = frameCount + targetFrame;
    }
    
    currentFrameRef.current = targetFrame;
    renderFrame(targetFrame);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Reset interaction timer after 5 seconds of inactivity to resume idle rotation
  useEffect(() => {
    if (!isInteractedRef.current) return;
    
    const timeout = setTimeout(() => {
      isInteractedRef.current = false;
    }, 8000); // 8s of inactivity resumes idle spin
    
    return () => clearTimeout(timeout);
  }, [isDragging, currentFrameRef.current]);

  return (
    <section 
      id="hero" 
      ref={containerRef} 
      className="relative w-full min-h-screen overflow-hidden bg-carBg flex items-center justify-center pt-20 md:pt-0"
    >
      {/* Loading overlay for image frames */}
      {!imagesLoaded && (
        <div className="absolute inset-0 bg-carBg z-50 flex flex-col items-center justify-center gap-4">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-2 border-carRed/10" />
            <div className="absolute inset-0 rounded-full border-2 border-carRed border-t-transparent animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center text-xs font-outfit text-white font-extrabold tracking-wider">
              {Math.round((loadedCountState / Math.max(frameCount, 1)) * 100)}%
            </div>
          </div>
          <p className="text-carGold/80 text-xs uppercase tracking-widest font-bold animate-pulse">Loading Portfolio...</p>
        </div>
      )}

      {/* Hero Content Container */}
      <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 py-12 md:py-24">
        
        {/* Left Column: Typographic Showcase (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left min-h-[400px] md:min-h-[450px]">
          
          {/* Dedicated height-managed container for text phases */}
          <div className="relative w-full min-h-[300px] md:min-h-[340px]">
            
            {/* Phase 1 Text */}
            <div ref={text1Ref} className="absolute inset-0 flex flex-col justify-center items-center lg:items-start transition-opacity duration-300">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-carRed/20 bg-carRed/5 text-carRed text-xs uppercase tracking-widest font-extrabold mb-6 animate-fade-in mx-auto lg:mx-0">
                <span className="w-1.5 h-1.5 rounded-full bg-carRed animate-pulse"></span>
                Full-Stack Developer
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-6 font-outfit">
                I build <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-carRed via-carRose to-carGold">modern web apps</span>.
              </h1>
              <p className="text-lightGrey max-w-md text-base md:text-lg leading-relaxed mx-auto lg:mx-0">
                A full-stack software engineer crafting responsive, high-performance web applications. Blending robust backend architecture with intuitive, interactive user interfaces.
              </p>
            </div>

            {/* Phase 2 Text */}
            <div ref={text2Ref} className="absolute inset-0 hidden opacity-0 flex-col justify-center items-center lg:items-start text-white transition-opacity duration-300">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-carGold/20 bg-carGold/5 text-carGold text-xs uppercase tracking-widest font-extrabold mb-6 mx-auto lg:mx-0">
                <span className="w-1.5 h-1.5 rounded-full bg-carGold animate-pulse"></span>
                Frontend Experience
              </div>
              <h2 className="text-4xl md:text-6xl font-black leading-[1.1] mb-6 font-outfit">
                Responsive and <br />
                <span className="text-carRed italic">interactive</span> <br />
                user interfaces.
              </h2>
              <p className="text-lightGrey max-w-md text-base md:text-lg leading-relaxed mx-auto lg:mx-0">
                Focusing on clean design, micro-interactions, and modern layout aesthetics that provide seamless user experiences.
              </p>
            </div>

            {/* Phase 3 Text */}
            <div ref={text3Ref} className="absolute inset-0 hidden opacity-0 flex-col justify-center items-center lg:items-start text-white transition-opacity duration-300">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-carRose/20 bg-carRose/5 text-carRose text-xs uppercase tracking-widest font-extrabold mb-6 mx-auto lg:mx-0">
                <span className="w-1.5 h-1.5 rounded-full bg-carRose animate-pulse"></span>
                Backend Development
              </div>
              <h2 className="text-4xl md:text-6xl font-black leading-[1.1] mb-6 font-outfit">
                Scalable and <br />
                <span className="text-carGold">secure</span> <br />
                backend systems.
              </h2>
              <p className="text-lightGrey max-w-md text-base md:text-lg leading-relaxed mx-auto lg:mx-0">
                Structuring database environments and fast server APIs using Node.js, Express, and MongoDB to deliver robust performance.
              </p>
            </div>

          </div>

          {/* CTA & Socials */}
          <div 
            ref={ctaRef} 
            className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start w-full"
          >
            <a 
              href="#projects" 
              className="px-8 py-3.5 bg-carRed hover:bg-carRed/90 text-white text-xs uppercase tracking-widest font-extrabold rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(181,50,55,0.4)] flex items-center gap-2 group"
            >
              View Projects
              <FiNavigation size={12} className="transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            
            <div className="flex gap-3">
              <a 
                href="https://github.com/MdKaifALam0000" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-white/5 rounded-full border border-white/10 hover:border-carRed hover:bg-carRed/10 hover:text-white transition-all duration-300"
              >
                <FiGithub size={16} className="text-lightGrey hover:text-white" />
              </a>
              <a 
                href="https://www.linkedin.com/in/alam-kaif-67b443224/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-white/5 rounded-full border border-white/10 hover:border-carRed hover:bg-carRed/10 hover:text-white transition-all duration-300"
              >
                <FiLinkedin size={16} className="text-lightGrey hover:text-white" />
              </a>
              <a 
                href="mailto:alam.kaif9430@gmail.com" 
                className="p-3 bg-white/5 rounded-full border border-white/10 hover:border-carRed hover:bg-carRed/10 hover:text-white transition-all duration-300"
              >
                <FiMail size={16} className="text-lightGrey hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Car Showcase Stage (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center w-full mt-8 lg:mt-0 select-none">
          <div className="relative w-full max-w-[640px] aspect-[16/10] flex items-center justify-center">
            
            {/* Showroom Platform Stage Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-carRed/15 via-transparent to-transparent opacity-70 rounded-full blur-2xl pointer-events-none" />
            
            {/* The Active Showcase Canvas */}
            <canvas 
              ref={canvasRef} 
              className="w-full h-full object-contain z-10 filter drop-shadow-[0_20px_35px_rgba(181,50,55,0.4)] transition-all duration-300 cursor-grab"
              onMouseDown={(e) => handleDragStart(e.clientX)}
              onMouseMove={(e) => handleDragMove(e.clientX)}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
              onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
              onTouchEnd={handleDragEnd}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            />

            {/* Showroom mirror platform baseline */}
            <div className="absolute bottom-[6%] w-[90%] h-[16px] bg-black/85 blur-[4px] rounded-full z-0 border-t border-carRed/20 shadow-[0_-4px_16px_rgba(181,50,55,0.45)]"></div>
            <div className="absolute bottom-[5.5%] w-[75%] h-[4px] bg-gradient-to-r from-transparent via-carGold/30 to-transparent z-0 opacity-80 blur-[1px]"></div>

            {/* Micro Interaction Instruction Badge */}
            <div className="absolute bottom-4 bg-black/85 border border-carGold/20 text-carGold px-3.5 py-1 rounded-full text-[9px] uppercase tracking-widest z-20 flex items-center gap-2 select-none pointer-events-none font-bold shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-carRed animate-pulse"></span>
              Drag or Scroll to rotate 3D view
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
