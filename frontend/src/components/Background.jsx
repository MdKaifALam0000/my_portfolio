const Background = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-darkBg pointer-events-none">
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] blur-[120px] bg-neonPurple/20 rounded-full animate-blob"></div>
      <div className="absolute top-[40%] right-[-10%] w-[40vw] h-[40vw] blur-[120px] bg-neonCyan/20 rounded-full animate-blob" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] blur-[150px] bg-[#002d70]/20 rounded-full animate-blob" style={{ animationDelay: '4s' }}></div>
      
      {/* Grid overlay for a structural tech feel */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMGg0MHYxbS00MCAzOWg0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz4KPHBhdGggZD0iTTAgMHY0MG0zOS00MHY0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] opacity-30 z-0"></div>
    </div>
  );
};

export default Background;
