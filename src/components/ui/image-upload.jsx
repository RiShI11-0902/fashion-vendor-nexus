import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { cn } from '@/lib/utils';

const ImageUpload = ({ 
  value, 
  onChange, 
  onUrlChange,
  placeholder = "Upload image or enter URL",
  className,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB default
  showUrlOption = true,
  ...props 
}) => {
  const [preview, setPreview] = useState(value || '');
  const [uploadMode, setUploadMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file && file.size <= maxSize) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target.result;
        setPreview(result);
        onChange?.(file);
      };
      reader.readAsDataURL(file);
    } else if (file && file.size > maxSize) {
      alert(`File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleUrlChange = (url) => {
    setPreview(url);
    onUrlChange?.(url);
  };

  const clearImage = () => {
    setPreview('');
    onChange?.(null);
    onUrlChange?.('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn("space-y-4", className)} {...props}>
      {/* Mode Toggle */}
      {showUrlOption && (
        <div className="flex gap-2">
          <Button
            type="button"
            variant={!uploadMode ? "default" : "outline"}
            size="sm"
            onClick={() => setUploadMode(false)}
          >
            URL
          </Button>
          <Button
            type="button"
            variant={uploadMode ? "default" : "outline"}
            size="sm"
            onClick={() => setUploadMode(true)}
          >
            Upload
          </Button>
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="h-24 w-24 object-cover rounded-lg border border-border"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6"
            onClick={clearImage}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}

      {/* Upload Area */}
      {(uploadMode || !showUrlOption) && (
        <div
          className={cn(
            "border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer transition-colors",
            isDragging && "border-primary bg-primary/5",
            "hover:border-primary/50"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file);
            }}
          />
          
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <div className="text-sm">
              <span className="font-medium text-primary cursor-pointer">
                Click to upload
              </span>
              <span className="text-muted-foreground"> or drag and drop</span>
            </div>
            <p className="text-xs text-muted-foreground">
              PNG, JPG, GIF up to {Math.round(maxSize / (1024 * 1024))}MB
            </p>
          </div>
        </div>
      )}

      {/* URL Input */}
      {(!uploadMode && showUrlOption) && (
        <div className="space-y-2">
          <Label>Image URL</Label>
          <Input
            type="url"
            placeholder={placeholder}
            value={preview}
            onChange={(e) => handleUrlChange(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export { ImageUpload };