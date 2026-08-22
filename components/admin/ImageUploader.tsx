'use client';

import React, { useState } from 'react';
import { Upload, RefreshCw } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  className?: string;
}

export default function ImageUploader({
  value,
  onChange,
  placeholder = 'https://... ou téléchargez',
  className = '',
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Erreur lors du téléchargement');
      }

      const data = await res.json();
      if (data.url) {
        onChange(data.url);
      }
    } catch (err: any) {
      console.error('Erreur upload:', err);
      alert(err.message || "Erreur lors du téléchargement de l'image.");
    } finally {
      setUploading(false);
      // Reset file input so the same file can be uploaded again if needed
      e.target.value = '';
    }
  };

  return (
    <div className={`flex gap-2 items-center ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-brand-gold"
      />
      <label className="p-3.5 rounded-xl bg-brand-gold/20 border border-brand-gold/40 text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-colors cursor-pointer flex items-center justify-center shrink-0">
        {uploading ? (
          <RefreshCw className="w-5 h-5 animate-spin" />
        ) : (
          <Upload className="w-5 h-5" />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
          className="hidden"
        />
      </label>
    </div>
  );
}
