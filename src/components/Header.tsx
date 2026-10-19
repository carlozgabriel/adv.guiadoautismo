import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-[#c4170c] text-white sticky top-0 z-50 shadow-md p-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="font-black text-xl tracking-tight uppercase">Guia do Autismo</span>
        <div className="h-6 w-[1px] bg-white/30 mx-1"></div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-red-100">Portugal</span>
      </div>
      
      <div className="flex gap-4 items-center">
        <div className="w-5 h-5 border-2 border-white/50 rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
        </div>
        <div className="w-8 h-1 bg-white/50 rounded-full"></div>
      </div>
    </header>
  );
};
