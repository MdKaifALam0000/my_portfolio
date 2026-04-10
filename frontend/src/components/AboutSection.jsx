import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen py-24 px-6 flex items-center justify-center relative">
      <div className="max-w-4xl w-full">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
        >
          <span className="text-neonCyan">01.</span> About Me
        </motion.h2>
        
        <div className="glass p-8 md:p-12 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-neonPurple/20 blur-[50px] rounded-full"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-lightGrey leading-relaxed space-y-6 relative z-10"
          >
            <p>
              I am a visionary developer with a passion for creating immersive digital experiences. 
              My journey started with a fascination for how logic can render beauty, leading me to master the MERN stack.
            </p>
            <p>
              By fusing robust backend architecture with buttery-smooth React interfaces, I build scalable applications 
              that don't just function—they captivate. I specialize in turning complex problems into elegant, 
              user-centric solutions.
            </p>
            <p>
              When I'm not writing code, I'm exploring the latest advancements in web technologies and 
              generative art to stay at the cutting edge.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
