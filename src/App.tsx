import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { DesignDisplay } from './components/DesignDisplay';
import { generateDesign } from './services/geminiService';
import { DesignResponse } from './types';
import { AlertCircle } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [design, setDesign] = useState<DesignResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (prompt: string, image?: { data: string; mimeType: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateDesign(prompt, image);
      setDesign(result);
    } catch (err) {
      console.error(err);
      setError('Failed to generate design. Please try again with more details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 py-12 md:px-8">
      <Header />
      
      <main>
        <InputForm onSubmit={handleSubmit} isLoading={isLoading} />

        {error && (
          <div className="brutal-card bg-red-50 border-red-500 mb-12 flex items-center gap-3 text-red-700">
            <AlertCircle />
            <p className="font-bold">{error}</p>
          </div>
        )}

        {isLoading && !design && (
          <div className="brutal-card flex flex-col items-center justify-center py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent mb-4" />
            <h3 className="text-xl font-black uppercase mb-2">Analyzing & Designing...</h3>
            <p className="italic opacity-60">Calculating dimensions, selecting materials, and drafting instructions.</p>
          </div>
        )}

        {design && <DesignDisplay design={design} />}
      </main>

      <footer className="mt-20 pt-8 border-t border-black/10 text-center opacity-40 text-xs font-bold uppercase tracking-widest">
        MakerAI &copy; {new Date().getFullYear()} • Powered by Gemini 3.1 Pro
      </footer>
    </div>
  );
}
