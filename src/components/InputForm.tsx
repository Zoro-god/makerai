import React, { useState, useRef } from 'react';
import { Upload, Send, X, Image as ImageIcon } from 'lucide-react';

interface InputFormProps {
  onSubmit: (prompt: string, image?: { data: string; mimeType: string }) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<{ data: string; mimeType: string; preview: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setImage({
          data: base64String,
          mimeType: file.type,
          preview: URL.createObjectURL(file),
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() || image) {
      onSubmit(prompt, image ? { data: image.data, mimeType: image.mimeType } : undefined);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="brutal-card mb-12">
      <div className="mb-6">
        <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">
          Describe your project or upload a photo
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'I want to build a simple wooden desk organizer for my pens and phone. It should be about 20cm wide.'"
          className="brutal-input min-h-[120px] resize-none"
          disabled={isLoading}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          {!image ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-black hover:bg-black/5 transition-colors text-sm font-bold uppercase"
              disabled={isLoading}
            >
              <Upload size={18} />
              Upload Image
            </button>
          ) : (
            <div className="relative inline-block">
              <img
                src={image.preview}
                alt="Preview"
                className="h-24 w-24 object-cover brutal-border"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 bg-black text-white p-1 rounded-full hover:scale-110 transition-transform"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || (!prompt.trim() && !image)}
          className="brutal-button flex items-center gap-2"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
          ) : (
            <>
              <Send size={18} />
              Generate Design
            </>
          )}
        </button>
      </div>
    </form>
  );
};
