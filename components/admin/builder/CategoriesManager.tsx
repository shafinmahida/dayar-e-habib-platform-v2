"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Trash2, Save, Loader2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CategoriesManager() {
  const supabase = createClient();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", slug: "", description: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const { data } = await supabase.from('package_categories').select('*').order('created_at');
    if (data) setCategories(data);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.slug) return alert("Name and Slug are required.");
    setSaving(true);
    
    if (editingId === "new") {
      const { error } = await supabase.from('package_categories').insert([formData]);
      if (error) alert(error.message);
    } else {
      const { error } = await supabase.from('package_categories').update(formData).eq('id', editingId);
      if (error) alert(error.message);
    }
    
    setEditingId(null);
    setFormData({ name: "", slug: "", description: "" });
    setSaving(false);
    fetchCategories();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this category? Packages in this category will be uncategorized.")) return;
    await supabase.from('package_categories').delete().eq('id', id);
    fetchCategories();
  };

  if (loading) return <div className="flex items-center gap-2 text-muted-foreground p-4"><Loader2 className="animate-spin size-4" /> Loading categories...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">Package Categories</h2>
          <p className="text-sm text-muted-foreground">Manage tour types like Honeymoon, Ziyarat, World Tour, etc.</p>
        </div>
        <Button onClick={() => { setEditingId("new"); setFormData({ name: "", slug: "", description: "" }); }} size="sm" className="gap-2">
          <Plus className="size-4" /> Add Category
        </Button>
      </div>

      <div className="space-y-4">
        {editingId === "new" && (
          <div className="p-4 border border-border rounded-lg bg-muted/20 space-y-4">
            <h3 className="font-bold text-sm">New Category</h3>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Name (e.g. World Tour)" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="p-2 text-sm border rounded-md w-full" />
              <input type="text" placeholder="Slug (e.g. world-tour)" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="p-2 text-sm border rounded-md w-full" />
            </div>
            <input type="text" placeholder="Short description..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="p-2 text-sm border rounded-md w-full" />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setEditingId(null)}>Cancel</Button>
              <Button size="sm" onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save Category"}</Button>
            </div>
          </div>
        )}

        {categories.map(cat => (
          <div key={cat.id} className="p-4 border border-border rounded-lg bg-card flex items-center justify-between">
            {editingId === cat.id ? (
              <div className="flex-1 space-y-4 mr-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="p-2 text-sm border rounded-md w-full" />
                  <input type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="p-2 text-sm border rounded-md w-full" />
                </div>
                <input type="text" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="p-2 text-sm border rounded-md w-full" />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSave} disabled={saving}>Save</Button>
                  <Button variant="ghost" size="sm" onClick={() => setEditingId(null)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <h4 className="font-bold text-foreground">{cat.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span className="bg-muted px-2 py-0.5 rounded">/{cat.slug}</span>
                    <span>{cat.description || "No description"}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => { setEditingId(cat.id); setFormData({ name: cat.name, slug: cat.slug, description: cat.description || "" }); }}>
                    <Edit className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(cat.id)}>
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
        {categories.length === 0 && editingId !== "new" && (
          <div className="text-center p-8 text-muted-foreground text-sm border border-dashed rounded-lg">No categories found. Create one above!</div>
        )}
      </div>
    </div>
  );
}
