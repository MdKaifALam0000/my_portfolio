import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SkillsSection = () => {
  const containerRef = useRef(null);
  const [activeConsole, setActiveConsole] = useState('node');
  const [terminalLogs, setTerminalLogs] = useState([
    'npm run dev',
    '[OK] Started dev server successfully...',
    'Ready. Select a module below to inspect.'
  ]);
  const [isCompiling, setIsCompiling] = useState(false);

  // Mouse coordinate tracker for Vercel-style spotlight hover border
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const cards = container.getElementsByClassName('spotlight-card');
      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Sandbox slider values for live physics mock
  const [sandboxStiffness, setSandboxStiffness] = useState(150);
  const [sandboxDamping, setSandboxDamping] = useState(15);
  const [sandboxScale, setSandboxScale] = useState(1);

  // Terminal compilation sequence simulator
  const runConsoleSim = (module) => {
    try {
      if (isCompiling) return;
      setIsCompiling(true);
      setActiveConsole(module);

      const configs = {
        node: [
          `$ node server.js`,
          `[INFO] Starting Node.js runtime environment...`,
          `[INFO] Initializing asynchronous event loop...`,
          `[SUCCESS] Server listening on port 5000.`
        ],
        express: [
          `$ npm run dev (Express)`,
          `[INFO] Mounting Express middleware...`,
          `[INFO] Mapping API routes...`,
          `[SUCCESS] Express routes configured.`
        ],
        mongodb: [
          `$ mongod --dbpath /data/db`,
          `[DB] Connecting to MongoDB...`,
          `[DB] Authenticating database user...`,
          `[SUCCESS] MongoDB connected successfully.`
        ]
      };

      if (!configs[module]) {
        throw new Error(`Module ${module} config is not defined.`);
      }

      setTerminalLogs([`Loading ${module.toUpperCase()} details...`]);

      let step = 0;
      const interval = setInterval(() => {
        try {
          if (step < configs[module].length) {
            const currentLine = configs[module][step];
            setTerminalLogs(prev => [...prev, currentLine]);
            step++;
          } else {
            clearInterval(interval);
            setIsCompiling(false);
          }
        } catch (err) {
          clearInterval(interval);
          setIsCompiling(false);
          setTerminalLogs(prev => [...prev, `[ERROR] ${err.message}`]);
        }
      }, 400);
    } catch (err) {
      setIsCompiling(false);
      setTerminalLogs([`[ERROR] ${err.message}`]);
    }
  };

  return (
    <section id="skills" className="min-h-screen py-24 px-6 flex items-center justify-center relative overflow-hidden bg-carBg">
      {/* Mesh Accent */}
      <div className="absolute top-[30%] right-[-10%] w-[35vw] h-[35vw] bg-carGold/5 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl w-full relative z-10" ref={containerRef}>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black mb-16 text-center lg:text-left"
        >
          <span className="text-carRed text-3xl font-mono mr-3">02.</span>
          My Skills
        </motion.h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
          
          {/* Card 1: Frontend Powertrain (Lg: 7 cols) */}
          <div className="lg:col-span-7 spotlight-card glass border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between min-h-[350px] relative overflow-hidden bg-carPlum/20">
            <div className="absolute top-0 right-0 w-48 h-48 bg-carGold/5 blur-[50px] rounded-full pointer-events-none"></div>
            
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-extrabold text-white font-outfit uppercase tracking-wider">Frontend Development</h3>
                  <p className="text-lightGrey text-xs font-mono mt-1">Client-side web applications</p>
                </div>
                <span className="text-2xl text-carGold animate-pulse">⚡</span>
              </div>

              {/* Technologies List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {[
                  { name: 'React.js', desc: 'Component architecture & state engines', level: '95%' },
                  { name: 'Next.js', desc: 'Server-side routing & optimization', level: '88%' },
                  { name: 'TypeScript', desc: 'Strict compiler structures', level: '82%' },
                  { name: 'Tailwind CSS', desc: 'Aesthetic layout styling utilities', level: '96%' }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-black/30 border border-white/5 flex flex-col justify-between hover:border-carGold/40 transition-all duration-300 group">
                    <div>
                      <h4 className="text-white font-extrabold text-sm uppercase tracking-wider group-hover:text-carGold transition-colors">{item.name}</h4>
                      <p className="text-lightGrey text-[11px] mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-3.5 relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: item.level }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.2 + idx * 0.1 }}
                        className="h-full bg-gradient-to-r from-carRed to-carGold"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Interactive Motion Dynamics Sandbox (Lg: 5 cols) */}
          <div className="lg:col-span-5 spotlight-card glass border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between min-h-[350px] relative overflow-hidden bg-carPlum/20">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-extrabold text-white font-outfit uppercase tracking-wider">Animation Sandbox</h3>
                  <p className="text-lightGrey text-xs font-mono mt-1">Testing custom spring configurations</p>
                </div>
                <span className="text-xs font-mono text-carRed bg-carRed/10 border border-carRed/20 px-2 py-0.5 rounded-full">ACTIVE</span>
              </div>

              {/* Slider Physics Playground */}
              <div className="space-y-4 my-6 font-mono text-[10px] text-lightGrey">
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span>STIFFNESS:</span>
                    <span className="text-white font-bold">{sandboxStiffness}</span>
                  </div>
                  <input 
                    type="range" min="50" max="400" 
                    value={sandboxStiffness} 
                    onChange={e => setSandboxStiffness(Number(e.target.value))}
                    className="w-full accent-carRed cursor-pointer bg-white/5 rounded-full h-1"
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span>DAMPING:</span>
                    <span className="text-white font-bold">{sandboxDamping}</span>
                  </div>
                  <input 
                    type="range" min="5" max="50" 
                    value={sandboxDamping} 
                    onChange={e => setSandboxDamping(Number(e.target.value))}
                    className="w-full accent-carGold cursor-pointer bg-white/5 rounded-full h-1"
                  />
                </div>
              </div>
            </div>

            {/* Simulated Live Animation Output Box */}
            <div className="w-full bg-black/40 border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center relative min-h-[140px]">
              <motion.button
                animate={{ scale: sandboxScale }}
                transition={{ type: 'spring', stiffness: sandboxStiffness, damping: sandboxDamping }}
                onHoverStart={() => setSandboxScale(1.2)}
                onHoverEnd={() => setSandboxScale(1)}
                onMouseDown={() => setSandboxScale(0.9)}
                onMouseUp={() => setSandboxScale(1.2)}
                className="px-6 py-3 bg-carRed text-white uppercase text-[10px] tracking-widest font-black rounded-full shadow-[0_4px_15px_rgba(181,50,55,0.3)] hover:shadow-[0_4px_25px_rgba(181,50,55,0.5)] transition-shadow cursor-pointer select-none"
              >
                Hover & Hold Test
              </motion.button>
              
              <div className="absolute bottom-2 left-4 font-mono text-[9px] text-white/30">
                scale: {sandboxScale.toFixed(2)} | stiffness: {sandboxStiffness} | damping: {sandboxDamping}
              </div>
            </div>
          </div>

          {/* Card 3: Backend Engine Console Terminal (Lg: 12 cols - full-width footer) */}
          <div className="lg:col-span-12 spotlight-card glass border border-white/5 rounded-3xl p-6 md:p-8 relative overflow-hidden bg-carPlum/20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Telemetry info */}
              <div className="lg:col-span-4 space-y-4">
                <div>
                  <h3 className="text-xl font-extrabold text-white font-outfit uppercase tracking-wider">Backend Development</h3>
                  <p className="text-lightGrey text-xs font-mono mt-1">API routing & database management</p>
                </div>
                <p className="text-lightGrey text-sm leading-relaxed">
                  Click on the items below to view details and simulate environment checks.
                </p>

                {/* Database triggers */}
                <div className="flex flex-col gap-2 pt-2">
                  {[
                    { id: 'node', label: 'Node.js Engine', color: 'border-carRed' },
                    { id: 'express', label: 'Express App server', color: 'border-carRose' },
                    { id: 'mongodb', label: 'MongoDB Database', color: 'border-carGold' }
                  ].map((btn) => (
                    <button
                      type="button"
                      key={btn.id}
                      onClick={() => runConsoleSim(btn.id)}
                      disabled={isCompiling}
                      className={`w-full py-2.5 px-4 rounded-xl border text-left font-mono text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-between cursor-pointer ${
                        activeConsole === btn.id
                          ? 'bg-white/10 text-white border-carGold shadow-[0_0_15px_rgba(205,193,158,0.2)]'
                          : 'bg-black/30 text-lightGrey border-white/5 hover:border-white/20'
                      }`}
                    >
                      <span>{btn.label}</span>
                      <span className={`w-2 h-2 rounded-full ${activeConsole === btn.id ? 'bg-carGold animate-ping' : 'bg-white/20'}`}></span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live interactive console output */}
              <div className="lg:col-span-8">
                <div className="w-full bg-black/75 border border-white/10 rounded-2xl p-5 md:p-6 font-mono text-xs text-lightGrey leading-relaxed shadow-inner min-h-[190px] flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 border-b border-white/5 pb-3 mb-3 text-white/30 text-[10px]">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                    <span className="ml-2">DEVELOPER_CONSOLE v1.0.0</span>
                  </div>
                  
                  <div className="flex-1 space-y-2 overflow-y-auto max-h-[120px] select-text">
                    {terminalLogs.map((log, idx) => (
                      <div key={idx} className={log.startsWith('$') ? 'text-carGold' : log.startsWith('[SUCCESS]') ? 'text-green-400 font-bold' : log.startsWith('[INFO]') ? 'text-blue-300' : log.startsWith('[ERROR]') ? 'text-red-500 font-bold' : 'text-lightGrey'}>
                        {log}
                      </div>
                    ))}
                    {isCompiling && (
                      <span className="inline-block animate-pulse text-carGold">▋</span>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
