import { motion } from 'framer-motion';
import { FiBriefcase } from 'react-icons/fi';

const ExperienceSection = () => {
  const experiences = [
    { 
      title: 'Web Developer Intern', 
      company: 'Dbert', 
      year: 'RECENT', 
      detail: 'Spearheaded the development of responsive client dashboards and engineered modular frontend codebases. Collaborated closely with core product teams to optimize application bundles, resulting in an 18% improvement in page rendering velocities and establishing clean-code standard operating guidelines.',
      tag: 'Frontend & API'
    },
  ];

  return (
    <section id="experience" className="py-24 px-6 max-w-4xl mx-auto min-h-[80vh] flex flex-col justify-center relative bg-carBg">
      <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] bg-carRed/5 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-black mb-16 text-center md:text-left"
      >
        <span className="text-carRed text-3xl font-mono mr-3">04.</span>
        Work Experience
      </motion.h2>

      <div className="relative border-l-2 border-carRed/30 ml-4 md:ml-6 py-4">
        {experiences.map((exp, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
            className="mb-12 pl-8 md:pl-10 relative group"
          >
            {/* Pulsing indicator node */}
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-carBg border-2 border-carRed flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-carGold group-hover:bg-carRed transition-colors duration-300"></span>
              <span className="absolute -inset-1 rounded-full border border-carRed/40 animate-ping opacity-75"></span>
            </div>

            {/* Date Tag */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-carRed/10 border border-carRed/20 text-carRed font-mono font-black text-xs uppercase tracking-widest mb-3">
              {exp.year}
            </span>

            {/* Job Title & Company */}
            <h3 className="text-2xl font-black text-white mt-1 font-outfit uppercase tracking-wide">
              {exp.title} <span className="text-carGold font-normal font-sans">@ {exp.company}</span>
            </h3>
            
            {/* Details panel */}
            <div className="glass p-6 md:p-8 rounded-2xl border border-white/5 bg-carPlum/10 hover:border-carRed/20 transition-all duration-300 relative overflow-hidden mt-4 w-full shadow-lg">
              <div className="absolute top-0 right-0 w-24 h-24 bg-carGold/5 blur-[40px] rounded-full pointer-events-none"></div>
              
              {/* Header metrics inside details box */}
              <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4 font-mono text-[10px] text-lightGrey/50">
                <span className="flex items-center gap-1.5">
                  <FiBriefcase size={12} className="text-carRed" />
                  ROLE: INTERN
                </span>
                <span className="text-carGold font-bold uppercase">{exp.tag}</span>
              </div>

              <p className="text-lightGrey leading-relaxed text-sm md:text-base font-medium">
                {exp.detail}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
