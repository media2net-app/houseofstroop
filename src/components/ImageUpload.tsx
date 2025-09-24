'use client';

import { useState, useRef } from 'react';
import { Upload, X, Check, AlertCircle } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (url: string) => void;
  currentImage?: string;
  label?: string;
  className?: string;
}

export default function ImageUpload({ 
  onImageUpload, 
  currentImage, 
  label = "Upload Image",
  className = ""
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Invalid file type. Only JPEG, PNG, and WebP images are allowed.');
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setUploadError('File too large. Maximum size is 10MB.');
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await response.json();
      onImageUpload(data.url);
      setUploadSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => setUploadSuccess(false), 3000);

    } catch (error) {
      console.error('Upload error:', error);
      setUploadError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    onImageUpload('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <label className="block text-sm font-medium text-stroop-700">
        {label}
      </label>
      
      {/* Current Image Display */}
      {currentImage && (
        <div className="relative">
          <img 
            src={currentImage} 
            alt="Current" 
            className="w-full h-48 object-cover rounded-lg border border-stroop-200"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Upload Area */}
      <div 
        onClick={handleClick}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isUploading 
            ? 'border-stroop-400 bg-stroop-50' 
            : 'border-stroop-300 hover:border-stroop-400 hover:bg-stroop-50'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        {isUploading ? (
          <div className="flex flex-col items-center space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stroop-600"></div>
            <p className="text-stroop-600">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <Upload className="w-8 h-8 text-stroop-500" />
            <p className="text-stroop-600">
              {currentImage ? 'Click to change image' : 'Click to upload image'}
            </p>
            <p className="text-sm text-stroop-500">
              JPEG, PNG, WebP up to 10MB
            </p>
          </div>
        )}
      </div>

      {/* Error Message */}
      {uploadError && (
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm">{uploadError}</p>
        </div>
      )}

      {/* Success Message */}
      {uploadSuccess && (
        <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
          <Check className="w-5 h-5" />
          <p className="text-sm">Image uploaded successfully!</p>
        </div>
      )}
    </div>
  );
}
