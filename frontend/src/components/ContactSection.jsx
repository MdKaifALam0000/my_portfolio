import { useState } from 'react';
import { motion } from 'framer-motion';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('Message Sent! 🚀');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Error sending message.');
      }
    } catch (err) {
      setStatus('Server connection failed.');
    }
  };

  return (
    <section id="contact" className="min-h-screen py-24 px-6 flex items-center justify-center relative">
      <div className="max-w-3xl w-full text-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-neonCyan font-outfit tracking-widest mb-4"
        >
          05. WHAT'S NEXT?
        </motion.p>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-white mb-8"
        >
          Get In Touch
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-lightGrey mb-12 text-lg max-w-xl mx-auto"
        >
          Whether you have a question, a project proposal, or just want to say hi, my inbox is always open. I'll endeavor to get back to you within 24 hours.
        </motion.p>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          onSubmit={handleSubmit} 
          className="glass p-8 md:p-12 rounded-sm flex flex-col gap-6 text-left relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-neonCyan/10 blur-[80px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10">
            <label className="block text-white mb-2 font-bold tracking-wide text-sm uppercase">Name</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full bg-[#0a0726]/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neonCyan transition-all duration-300"
            />
          </div>
          <div className="relative z-10">
            <label className="block text-white mb-2 font-bold tracking-wide text-sm uppercase">Email</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full bg-[#0a0726]/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neonCyan transition-all duration-300"
            />
          </div>
          <div className="relative z-10">
            <label className="block text-white mb-2 font-bold tracking-wide text-sm uppercase">Message</label>
            <textarea 
              rows="5" 
              required
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
              className="w-full bg-[#0a0726]/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neonCyan transition-all duration-300 resize-none"
            ></textarea>
          </div>
          
          <button type="submit" className="relative z-10 mt-4 w-full py-4 bg-transparent text-neonCyan border border-neonCyan hover:bg-neonCyan hover:text-[#030014] font-bold tracking-widest rounded-sm transition-all duration-300 overflow-hidden group">
            <span className="relative z-20">{status || 'SEND MESSAGE'}</span>
            <div className="absolute inset-0 h-full w-0 bg-neonCyan group-hover:w-full transition-all duration-300 z-10"></div>
          </button>
        </motion.form>
      </div>
      
      <footer className="absolute bottom-6 w-full text-center text-lightGrey text-sm">
        <p>Built with <span className="text-neonPurple">♥</span> and <span className="text-neonCyan">MERN</span> stack.</p>
      </footer>
    </section>
  );
};

export default ContactSection;
