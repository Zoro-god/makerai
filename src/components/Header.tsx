import React from 'react';
import { Hammer } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="mb-12 border-b-2 border-black pb-6">
      <div className="flex items-center gap-4 mb-2">
        <div className="bg-black p-2 text-white">
          <Hammer size={32} />
        </div>
        <h1 className="text-5xl font-black uppercase tracking-tighter">MakerAI</h1>
      </div>
      <p className="text-lg font-medium italic opacity-70">
        Intelligent DIY product design assistant. Turn your ideas into buildable reality.
      </p>
    </header>
  );
};
