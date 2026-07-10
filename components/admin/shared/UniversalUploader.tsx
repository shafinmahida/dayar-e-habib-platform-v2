"use client";

import { useState, useRef } from "react";
import { UploadCloud, Link as LinkIcon, Loader2, FileVideo, Image as ImageIcon, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UniversalUploaderProps {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
}

export function UniversalUploader({ value, onChange, placeholder = "Paste URL or Upload File", className, label = "Media URL" }: UniversalUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Upload failed");
      }

      const data = await res.json();
      onChange(data.url);
    } catch (error: any) {
      alert("Upload failed: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const onDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-bold text-foreground">{label}</label>
      
      <div 
        className={cn(
          "relative flex items-center bg-background border rounded-lg transition-all focus-within:ring-2 focus-within:ring-primary/50 overflow-hidden",
          dragActive ? "border-primary bg-primary/5" : "border-border"
        )}
        onDragEnter={onDrag}
        onDragLeave={onDrag}
        onDragOver={onDrag}
        onDrop={onDrop}
      >
        <div className="pl-3 text-muted-foreground">
          <LinkIcon className="size-4" />
        </div>
        
        <input 
          type="text" 
          value={value}
          onChange={e => onChange(e.target.value)}
          className="flex-1 p-3 text-sm bg-transparent border-none focus:outline-none"
          placeholder={placeholder}
          disabled={isUploading}
        />
        
        <div className="flex items-center gap-2 pr-2">
          {value && (
            <button
              onClick={() => onChange("")}
              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              title="Clear"
            >
              <X className="size-4" />
            </button>
          )}
          
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
            accept="image/*,video/*,application/pdf"
          />
          
          <Button 
            variant="secondary" 
            size="sm" 
            className="h-8 gap-2 bg-muted hover:bg-muted/80 text-foreground"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? <Loader2 className="size-4 animate-spin" /> : <UploadCloud className="size-4" />}
            {isUploading ? "Uploading..." : "Browse"}
          </Button>
        </div>
        
        {/* Drag overlay */}
        {dragActive && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center border-2 border-dashed border-primary rounded-lg z-10 pointer-events-none">
            <span className="text-sm font-bold text-primary flex items-center gap-2">
              <UploadCloud className="size-5" /> Drop file to upload
            </span>
          </div>
        )}
      </div>
      
      <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
        Paste a YouTube, Instagram, or external URL. Or click <strong>Browse</strong> to upload an image/video file directly from your device. Direct uploads ensure permanent playback bypassing social media restrictions.
      </p>
    </div>
  );
}
