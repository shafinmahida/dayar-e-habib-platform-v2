"use client";

import { useState } from "react";
import { Plus, X, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StringArrayEditorProps {
  label: string;
  description?: string;
  values: string[];
  onChange: (newValues: string[]) => void;
  placeholder?: string;
}

export function StringArrayEditor({
  label,
  description,
  values = [],
  onChange,
  placeholder = "Add item..."
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
      
      <div className="space-y-2">
        {values?.map((val, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className="p-2 text-muted-foreground/50 cursor-grab active:cursor-grabbing hover:bg-muted rounded">
              <GripVertical className="size-4" />
            </div>
            <input
              type="text"
              value={val}
              onChange={(e) => handleChange(idx, e.target.value)}
              className="flex-1 text-sm bg-background border border-input rounded-lg px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
            />
            <button
              onClick={() => handleRemove(idx)}
              className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-2">
        <input
          type="text"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 text-sm bg-muted/30 border border-input rounded-lg px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
        />
        <Button onClick={handleAdd} type="button" variant="secondary" size="sm" className="h-[38px] px-4 shrink-0">
          <Plus className="size-4 mr-1.5" />
          Add
        </Button>
      </div>
    </div>
  );
}
