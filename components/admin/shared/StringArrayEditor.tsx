"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { UniversalUploader } from "./UniversalUploader";

interface StringArrayEditorProps {
  label: string;
  description?: string;
  values: string[];
  onChange: (newValues: string[]) => void;
  placeholder?: string;
  mode?: "text" | "media";
}

export function StringArrayEditor({
  label,
  description,
  values = [],
  onChange,
  placeholder = "Add item...",
  mode = "text"
}: StringArrayEditorProps) {
  const [newValue, setNewValue] = useState("");

  const handleAdd = () => {
    if (newValue.trim()) {
      onChange([...(values || []), newValue.trim()]);
      setNewValue("");
    }
  };

  const handleRemove = (index: number) => {
    const newArr = [...values];
    newArr.splice(index, 1);
    onChange(newArr);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleChange = (index: number, val: string) => {
    const newArr = [...values];
    newArr[index] = val;
    onChange(newArr);
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs font-bold text-foreground">{label}</label>
        {description && <p className="text-[10px] text-muted-foreground mt-0.5">{description}</p>}
      </div>
      
      <div className="space-y-4">
        {values?.map((val, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="flex-1 w-full min-w-0">
              {mode === "media" ? (
                <UniversalUploader
                  value={val}
                  onChange={(newUrl) => handleChange(idx, newUrl)}
                  placeholder={placeholder}
                  label={`Media Item ${idx + 1}`}
                />
              ) : (
                <input
                  type="text"
                  value={val}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  className="w-full text-sm bg-background border border-input rounded-lg px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
                />
              )}
            </div>
            
            <button
              onClick={() => handleRemove(idx)}
              className="mt-8 h-8 w-8 flex items-center justify-center shrink-0 text-destructive hover:bg-destructive/10 rounded-lg transition-colors border border-transparent hover:border-destructive/20"
              title="Remove item"
            >
              <X className="size-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-4 pt-2 border-t border-border">
        {mode === "media" ? (
          <Button onClick={() => onChange([...(values || []), ""])} type="button" variant="outline" size="sm" className="w-full border-dashed">
            <Plus className="size-4 mr-1.5" />
            Add New Media Item
          </Button>
        ) : (
          <>
            <input
              type="text"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => {
                if (newValue.trim()) {
                  handleAdd();
                }
              }}
              placeholder={placeholder}
              className="flex-1 text-sm bg-muted/30 border border-input rounded-lg px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
            />
            <Button onClick={handleAdd} type="button" variant="secondary" size="sm" className="h-[38px] px-4 shrink-0">
              <Plus className="size-4 mr-1.5" />
              Add
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
