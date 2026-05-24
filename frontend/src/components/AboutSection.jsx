import { motion } from 'framer-motion';
import myPhoto from '../assets/My_photo.jpeg';

const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen py-24 px-6 flex items-center justify-center relative overflow-hidden bg-carBg/50">
      {/* Light decorative accent */}
      <div className="absolute top-1/2 left-[-10%] w-[35vw] h-[35vw] bg-carRed/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl w-full relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl md:text-5xl font-black mb-16 text-center lg:text-left"
        >
          <span className="text-carRed text-3xl font-mono mr-3">01.</span>
          About Me
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass p-8 md:p-10 rounded-3xl border border-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-carRed/5 blur-[60px] rounded-full pointer-events-none"></div>
              
              <div className="text-base md:text-lg text-lightGrey leading-relaxed space-y-6 relative z-10 font-medium">
                <p>
                  I am a software engineer dedicated to building high-performance web applications. My philosophy revolves around speed, optimization, and intuitive user experiences—translating complex logic into clean, responsive software.
                </p>
                <p>
                  By fusing secure backend databases with interactive React architectures, I build scalable applications. I specialize in the MERN stack, ensuring every line of code is optimized for performance and reliability.
                </p>
                <p>
                  I approach development with meticulous attention to detail, optimizing bundle sizes, database query times, and user interface responsiveness to create efficient software systems.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Engineer Telemetry Widget (5 cols on lg) */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
              className="w-full max-w-sm glass border border-carRed/20 rounded-3xl p-6 relative overflow-hidden bg-gradient-to-b from-carPlum/60 to-carBg/85 shadow-2xl"
            >
              {/* Telemetry Grid Line accents */}
              <div className="absolute inset-0 saas-grid opacity-10 pointer-events-none"></div>

              {/* Profile Image Badge */}
              <div className="relative w-36 h-44 mx-auto rounded-2xl overflow-hidden border border-carGold/30 p-1.5 bg-black/40 mb-6 group">
                <div className="absolute inset-0 bg-gradient-to-t from-carRed/20 to-transparent opacity-60 z-10 pointer-events-none"></div>
                <img 
                  src={myPhoto} 
                  alt="Kaif" 
                  className="w-full h-full object-cover rounded-xl filter grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Profile Details */}
              <div className="font-mono text-xs space-y-3.5 border-t border-white/10 pt-6 text-lightGrey">
                <div className="flex justify-between items-center">
                  <span className="text-carGold font-bold uppercase">Location:</span>
                  <span className="text-white">India</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-carGold font-bold uppercase">Specialty:</span>
                  <span className="text-white">Full-Stack Development</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-carGold font-bold uppercase">Focus:</span>
                  <span className="text-carRed font-extrabold">Web Apps & APIs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-carGold font-bold uppercase">Stack:</span>
                  <span className="text-white">MongoDB, Express, React, Node</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-carGold font-bold uppercase">Interactions:</span>
                  <span className="text-white">Framer Motion, GSAP</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-carGold font-bold uppercase">Availability:</span>
                  <span className="inline-flex items-center gap-1.5 text-green-400 font-extrabold animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                    OPEN FOR OPPORTUNITIES
                  </span>
                </div>
              </div>

              {/* Decorative telemetry bar */}
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-6 relative border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '85%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-carRed via-carRose to-carGold"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
