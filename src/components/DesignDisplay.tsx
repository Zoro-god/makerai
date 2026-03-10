import React from 'react';
import { DesignResponse } from '../types';
import { Ruler, Package, Wrench, ListOrdered, ShieldAlert, Layout } from 'lucide-react';
import { motion } from 'motion/react';

interface DesignDisplayProps {
  design: DesignResponse;
}

export const DesignDisplay: React.FC<DesignDisplayProps> = ({ design }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      <div className="md:col-span-2 brutal-card bg-black text-white">
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">{design.project_name}</h2>
        <p className="text-lg italic opacity-80">{design.design_concept}</p>
        <div className="mt-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest opacity-60">
          <Layout size={16} />
          Object Detected: {design.object_detected}
        </div>
      </div>

      {design.image_url && (
        <div className="md:col-span-2 brutal-card p-0 overflow-hidden">
          <img
            src={design.image_url}
            alt={design.project_name}
            className="w-full h-auto object-cover max-h-[500px]"
            referrerPolicy="no-referrer"
          />
          <div className="p-4 bg-black text-white text-xs font-bold uppercase tracking-widest text-center">
            AI-Generated Visualization of your DIY Project
          </div>
        </div>
      )}

      <div className="brutal-card">
        <div className="flex items-center gap-2 mb-4">
          <Ruler className="text-black" />
          <h3 className="text-xl font-black uppercase">Dimensions</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 border border-black/10 bg-black/5">
            <span className="block text-[10px] font-bold uppercase opacity-50">Height</span>
            <span className="font-mono font-bold">{design.recommended_dimensions.height}</span>
          </div>
          <div className="p-3 border border-black/10 bg-black/5">
            <span className="block text-[10px] font-bold uppercase opacity-50">Width</span>
            <span className="font-mono font-bold">{design.recommended_dimensions.width}</span>
          </div>
          <div className="p-3 border border-black/10 bg-black/5">
            <span className="block text-[10px] font-bold uppercase opacity-50">Depth</span>
            <span className="font-mono font-bold">{design.recommended_dimensions.depth}</span>
          </div>
        </div>
      </div>

      <div className="brutal-card">
        <div className="flex items-center gap-2 mb-4">
          <Package className="text-black" />
          <h3 className="text-xl font-black uppercase">Materials</h3>
        </div>
        <ul className="space-y-2">
          {design.materials.map((material, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black shrink-0" />
              <span className="text-sm font-medium">{material}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="brutal-card">
        <div className="flex items-center gap-2 mb-4">
          <Wrench className="text-black" />
          <h3 className="text-xl font-black uppercase">Tools Needed</h3>
        </div>
        <ul className="space-y-2">
          {design.tools_needed.map((tool, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black shrink-0" />
              <span className="text-sm font-medium">{tool}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="brutal-card">
        <div className="flex items-center gap-2 mb-4">
          <ShieldAlert className="text-black" />
          <h3 className="text-xl font-black uppercase">Stability Notes</h3>
        </div>
        <p className="text-sm font-medium leading-relaxed">{design.stability_notes}</p>
      </div>

      <div className="md:col-span-2 brutal-card">
        <div className="flex items-center gap-2 mb-4">
          <ListOrdered className="text-black" />
          <h3 className="text-xl font-black uppercase">Build Steps</h3>
        </div>
        <div className="space-y-4">
          {design.build_steps.map((step, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center font-bold shrink-0">
                  {idx + 1}
                </div>
                {idx < design.build_steps.length - 1 && (
                  <div className="w-0.5 h-full bg-black/10 mt-2" />
                )}
              </div>
              <p className="text-sm font-medium pt-1.5">{step}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="md:col-span-2 brutal-card bg-[#1a1a1a] text-emerald-400">
        <div className="flex items-center gap-2 mb-4">
          <Layout className="text-emerald-400" />
          <h3 className="text-xl font-black uppercase">ASCII Diagram</h3>
        </div>
        <pre className="font-mono text-xs overflow-x-auto p-4 bg-black/50 border border-emerald-400/20">
          {design.ascii_diagram}
        </pre>
      </div>
    </motion.div>
  );
};
