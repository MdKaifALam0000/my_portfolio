import { motion } from 'framer-motion';

const skills = [
  { name: 'React', level: '95%' },
  { name: 'Node.js', level: '90%' },
  { name: 'Express', level: '92%' },
  { name: 'MongoDB', level: '88%' },
  { name: 'Tailwind CSS', level: '98%' },
  { name: 'Framer Motion', level: '85%' },
  { name: 'TypeScript', level: '80%' },
  { name: 'Next.js', level: '82%' },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="min-h-screen py-24 px-6 flex items-center justify-center">
      <div className="max-w-5xl w-full">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          <span className="text-neonCyan">02.</span> Technical Arsenal
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="glass p-6 rounded-sm border border-white/5 flex flex-col items-center justify-center gap-4 group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-sm bg-[#0a0726] border border-white/10 flex items-center justify-center group-hover:border-neonCyan transition-all duration-300 shadow-inner">
                <span className="text-2xl text-neonPurple group-hover:text-neonCyan transition-colors">⚡</span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-wide">{skill.name}</h3>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-2">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: skill.level }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-neonPurple to-neonCyan"
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
