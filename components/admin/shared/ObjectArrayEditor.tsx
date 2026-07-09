"use client";

import { useState } from "react";
import { Plus, X, GripVertical, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ObjectFieldSchema {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "select";
  options?: string[]; // for select
  placeholder?: string;
  required?: boolean;
}

interface ObjectArrayEditorProps {
  label: string;
  description?: string;
  schema: ObjectFieldSchema[];
  values: any[];
  onChange: (newValues: any[]) => void;
  defaultItem: any;
  itemTitleKey?: string; // which key to show as title when collapsed
}

export function ObjectArrayEditor({
  label,
  description,
  schema,
  values = [],
  onChange,
  defaultItem,
  itemTitleKey
}: ObjectArrayEditorProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleAdd = () => {
    onChange([...(values || []), { ...defaultItem }]);
    setExpandedIndex((values || []).length);
  };

  const handleRemove = (index: number) => {
    const newArr = [...values];
    newArr.splice(index, 1);
    onChange(newArr);
    if (expandedIndex === index) setExpandedIndex(null);
  };

  const handleChange = (index: number, key: string, val: any) => {
    const newArr = [...values];
    newArr[index] = { ...newArr[index], [key]: val };
    onChange(newArr);
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 bg-card border border-border p-5 rounded-2xl shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <label className="text-sm font-black uppercase tracking-wider text-muted-foreground">{label}</label>
          {description && <p className="text-[10px] text-muted-foreground mt-1 max-w-sm">{description}</p>}
        </div>
        <Button onClick={handleAdd} type="button" variant="outline" size="sm" className="h-8 text-xs font-bold shadow-none">
          <Plus className="size-3 mr-1.5" />
          Add Item
        </Button>
      </div>

      <div className="space-y-3 pt-2">
        {values?.map((item, idx) => {
          const isExpanded = expandedIndex === idx;
          const title = itemTitleKey ? item[itemTitleKey] : `Item ${idx + 1}`;
          
          return (
            <div key={idx} className="border border-border/80 rounded-xl overflow-hidden bg-muted/10 transition-colors hover:bg-muted/30">
              {/* Header / Collapsed View */}
              <div 
                className="flex items-center justify-between p-3 cursor-pointer select-none"
                onClick={() => toggleExpand(idx)}
              >
                <div className="flex items-center gap-3">
                  <div className="text-muted-foreground/50 hover:text-foreground">
                    <GripVertical className="size-4" />
                  </div>
                  <span className="text-sm font-semibold text-foreground truncate max-w-[200px] sm:max-w-xs">
                    {title || `New ${label} Item`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(idx);
                    }}
                    className="p-1.5 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                  >
                    <X className="size-4" />
                  </button>
                  <div className="p-1.5 text-muted-foreground hover:bg-muted rounded-lg">
                    {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                  </div>
                </div>
              </div>

              {/* Expanded Form View */}
              {isExpanded && (
                <div className="p-4 border-t border-border/50 bg-background space-y-4">
                  {schema.map((field) => (
                    <div key={field.key} className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground/80">
                        {field.label}
                        {field.required && <span className="text-destructive ml-1">*</span>}
                      </label>
                      
                      {field.type === 'textarea' ? (
                        <textarea
                          value={item[field.key] || ""}
                          onChange={(e) => handleChange(idx, field.key, e.target.value)}
                          placeholder={field.placeholder}
                          rows={3}
                          className="w-full text-sm bg-background border border-input rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-y"
                        />
                      ) : field.type === 'select' && field.options ? (
                        <select
                          value={item[field.key] || ""}
                          onChange={(e) => handleChange(idx, field.key, e.target.value)}
                          className="w-full text-sm bg-background border border-input rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        >
                          <option value="" disabled>Select {field.label}</option>
                          {field.options.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type === 'number' ? 'number' : 'text'}
                          value={item[field.key] || ""}
                          onChange={(e) => handleChange(idx, field.key, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full text-sm bg-background border border-input rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        {(!values || values.length === 0) && (
          <div className="text-center py-6 text-xs text-muted-foreground border border-dashed rounded-xl">
            No {label.toLowerCase()} added yet.
          </div>
        )}
      </div>
    </div>
  );
}
