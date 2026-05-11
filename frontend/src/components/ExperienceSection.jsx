import { motion } from 'framer-motion';

const ExperienceSection = () => {
  const experiences = [
    { title: 'Web dev internship', company: 'Dbert', year: 'Recent', detail: 'Developed modern web applications and designed scalable frontend architectures. Focused on clean, maintainable code and performance optimizations.' },
  ];

  return (
    <section id="experience" className="py-24 px-6 max-w-4xl mx-auto min-h-screen flex flex-col justify-center">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold mb-16"
      >
        <span className="text-neonCyan">04.</span> Experience
      </motion.h2>

      <div className="relative border-l-2 border-white/10 ml-4 md:ml-0">
        {experiences.map((exp, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4, ease: 'easeOut' }}
            className="mb-12 pl-8 relative"
          >
            <div className="absolute w-3 h-3 bg-neonCyan -left-[7px] top-1.5"></div>
            <p className="text-neonCyan font-bold tracking-widest text-sm mb-1">{exp.year}</p>
            <h3 className="text-2xl font-bold text-white mt-1">{exp.title} <span className="text-neonPurple">@ {exp.company}</span></h3>
            <p className="text-lightGrey mt-4 glass p-6 rounded-sm inline-block w-full leading-relaxed">{exp.detail}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
