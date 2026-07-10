"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Trash2, Save, Loader2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UniversalUploader } from "@/components/admin/shared/UniversalUploader";

export function DestinationsManager() {
  const supabase = createClient();
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", slug: "", country: "", description: "", image_url: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    setLoading(true);
    const { data } = await supabase.from('destinations').select('*').order('created_at');
    if (data) setDestinations(data);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.slug) return alert("Name and Slug are required.");
    setSaving(true);
    
    if (editingId === "new") {
      const { error } = await supabase.from('destinations').insert([formData]);
      if (error) alert(error.message);
    } else {
      const { error } = await supabase.from('destinations').update(formData).eq('id', editingId);
      if (error) alert(error.message);
    }
    
    setEditingId(null);
    setFormData({ name: "", slug: "", country: "", description: "", image_url: "" });
    setSaving(false);
    fetchDestinations();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this destination?")) return;
    await supabase.from('destinations').delete().eq('id', id);
    fetchDestinations();
  };

  if (loading) return <div className="flex items-center gap-2 text-muted-foreground p-4"><Loader2 className="animate-spin size-4" /> Loading destinations...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">Destinations Manager</h2>
          <p className="text-sm text-muted-foreground">Manage sacred destinations like Makkah, Madinah, Al-Aqsa, etc.</p>
        </div>
        <Button onClick={() => { setEditingId("new"); setFormData({ name: "", slug: "", country: "", description: "", image_url: "" }); }} size="sm" className="gap-2">
          <Plus className="size-4" /> Add Destination
        </Button>
      </div>

      <div className="space-y-4">
        {editingId === "new" && (
          <div className="p-4 border border-border rounded-lg bg-muted/20 space-y-4">
            <h3 className="font-bold text-sm">New Destination</h3>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Name (e.g. Makkah)" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="p-2 text-sm border rounded-md w-full" />
              <input type="text" placeholder="Slug (e.g. makkah)" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="p-2 text-sm border rounded-md w-full" />
            </div>
            <input type="text" placeholder="Country (e.g. Saudi Arabia)" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} className="p-2 text-sm border rounded-md w-full" />
            <textarea placeholder="Description..." rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="p-2 text-sm border rounded-md w-full" />
            
            <UniversalUploader 
              value={formData.image_url} 
              onChange={(url) => setFormData({...formData, image_url: url})}
              label="Destination Image/Video" 
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setEditingId(null)}>Cancel</Button>
              <Button size="sm" onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save Destination"}</Button>
            </div>
          </div>
        )}

        {destinations.map(dest => (
          <div key={dest.id} className="p-4 border border-border rounded-lg bg-card flex flex-col sm:flex-row gap-4 justify-between">
            {editingId === dest.id ? (
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="p-2 text-sm border rounded-md w-full" />
                  <input type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="p-2 text-sm border rounded-md w-full" />
                </div>
                <input type="text" value={formData.country || ''} onChange={e => setFormData({...formData, country: e.target.value})} className="p-2 text-sm border rounded-md w-full" />
                <textarea rows={3} value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="p-2 text-sm border rounded-md w-full" />
                
                <UniversalUploader 
                  value={formData.image_url} 
                  onChange={(url) => setFormData({...formData, image_url: url})}
                  label="Destination Image/Video" 
                />

                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSave} disabled={saving}>Save</Button>
                  <Button variant="ghost" size="sm" onClick={() => setEditingId(null)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex gap-4 items-start">
                  {dest.image_url && (
                    <div className="w-24 h-24 shrink-0 rounded-md overflow-hidden bg-muted relative">
                      {dest.image_url.includes('mp4') || dest.image_url.includes('youtube') || dest.image_url.includes('instagram') ? (
                        <div className="flex items-center justify-center h-full bg-primary/10 text-[10px] font-bold text-primary">VIDEO</div>
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={dest.image_url} alt={dest.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-foreground">{dest.name} <span className="text-muted-foreground font-normal text-sm ml-2">{dest.country}</span></h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1 mb-2">
                      <span className="bg-muted px-2 py-0.5 rounded">/{dest.slug}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{dest.description}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => { setEditingId(dest.id); setFormData({ name: dest.name, slug: dest.slug, country: dest.country || "", description: dest.description || "", image_url: dest.image_url || "" }); }}>
                    <Edit className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(dest.id)}>
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
        {destinations.length === 0 && editingId !== "new" && (
          <div className="text-center p-8 text-muted-foreground text-sm border border-dashed rounded-lg">No destinations found. Create one above!</div>
        )}
      </div>
    </div>
  );
}
