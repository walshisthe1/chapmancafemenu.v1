'use client';

import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef } from 'react';

interface FileUploadProps {
  onUploadCompleteAction: (url: string) => void;
}

export default function FileUpload({ onUploadCompleteAction }: FileUploadProps) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    try {
      setUploading(true);
      const file = inputFileRef.current.files[0];
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: 'POST',
        body: formData,
      });

      const blob = (await response.json()) as PutBlobResult;
      
      if (blob.url) {
        onUploadCompleteAction(blob.url);
        if (inputFileRef.current) {
          inputFileRef.current.value = '';
        }
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input 
        name="file" 
        ref={inputFileRef} 
        type="file" 
        required 
        accept="image/*"
        className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      <button 
        type="submit" 
        disabled={uploading}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  );
} 