import { motion } from 'framer-motion';

const ExperienceSection = () => {
  const experiences = [
    { title: 'Senior Engineer', company: 'Tech Corp', year: '2023 - Present', detail: 'Led the core architecture transition to modern microservices, improving load times by 40%. Directed a team of 4 frontend engineers.' },
    { title: 'Fullstack Developer', company: 'Startup Inc', year: '2021 - 2023', detail: 'Built primary MERN stack platform from ground up. Integrated complex payment gateways and designed scalable MongoDB schemas.' },
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
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="mb-12 pl-8 relative"
          >
            <div className="absolute w-4 h-4 rounded-full bg-neonCyan shadow-[0_0_10px_#00f0ff] -left-[9px] top-1"></div>
            <p className="text-neonCyan font-bold tracking-widest text-sm mb-1">{exp.year}</p>
            <h3 className="text-2xl font-bold text-white mt-1">{exp.title} <span className="text-neonPurple">@ {exp.company}</span></h3>
            <p className="text-lightGrey mt-4 glass p-6 rounded-lg inline-block w-full leading-relaxed">{exp.detail}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
