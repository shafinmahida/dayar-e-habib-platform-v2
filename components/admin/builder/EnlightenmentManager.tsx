"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Save, Loader2, Plus, Trash2, GripVertical, PlayCircle, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UniversalUploader } from "@/components/admin/shared/UniversalUploader";

export function EnlightenmentManager() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [contentId, setContentId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    visible: true,
    overline: "Spiritual Heritage",
    sectionTitle: "Enlightenment to Holy Places",
    sectionSubtitle: "Explore the sacred history, profound stories, and majestic significance of the most revered destinations in Islam.",
    holyPlaces: [
      {
        title: "Masjid Al-Haram",
        category: "Makkah",
        description: "The Great Mosque of Makkah, home to the Holy Kaaba.",
        videoUrl: "/kaaba-sunset.png"
      }
    ]
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase.from('content_blocks').select('*').eq('slug', 'homepage_enlightenment').single();
    if (data && data.content) {
      setContentId(data.id);
      setFormData(data.content);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      slug: 'homepage_enlightenment',
      title: 'Enlightenment Section Configuration',
      content: formData
    };
    
    if (contentId) {
      await supabase.from('content_blocks').update(payload).eq('id', contentId);
    } else {
      const { data } = await supabase.from('content_blocks').insert([payload]).select().single();
      if (data) setContentId(data.id);
    }
    setSaving(false);
    alert("Saved! Refresh the homepage to see changes.");
  };

  const addPlace = () => {
    setFormData({
      ...formData,
      holyPlaces: [
        ...formData.holyPlaces, 
        { title: "New Destination", category: "Makkah", description: "", videoUrl: "" }
      ]
    });
  };

  const updatePlace = (index: number, key: string, value: string) => {
    const newPlaces = [...formData.holyPlaces];
    newPlaces[index] = { ...newPlaces[index], [key]: value };
    setFormData({ ...formData, holyPlaces: newPlaces });
  };

  const removePlace = (index: number) => {
    const newPlaces = [...formData.holyPlaces];
    newPlaces.splice(index, 1);
    setFormData({ ...formData, holyPlaces: newPlaces });
  };

  const movePlace = (index: number, direction: -1 | 1) => {
    const newPlaces = [...formData.holyPlaces];
    if (index + direction < 0 || index + direction >= newPlaces.length) return;
    
    const temp = newPlaces[index];
    newPlaces[index] = newPlaces[index + direction];
    newPlaces[index + direction] = temp;
    
    setFormData({ ...formData, holyPlaces: newPlaces });
  };

  if (loading) return <div className="flex items-center gap-2 text-muted-foreground p-4"><Loader2 className="animate-spin size-4" /> Loading Enlightenment config...</div>;

  return (
    <div className="space-y-8 max-w-4xl pb-12">
      <div>
        <h2 className="text-lg font-bold">Enlightenment Section Manager</h2>
        <p className="text-sm text-muted-foreground">Supreme control over the 3D rotating video section.</p>
      </div>

      {/* Global Section Settings */}
      <div className="space-y-6 p-6 border border-border rounded-xl bg-card">
        <h3 className="font-bold flex items-center gap-2">Global Settings</h3>
        
        <div className="flex items-center gap-3 pb-4 border-b border-border/50">
          <input 
            type="checkbox" 
            id="visible-toggle"
            checked={formData.visible}
            onChange={(e) => setFormData({...formData, visible: e.target.checked})}
            className="w-5 h-5"
          />
          <label htmlFor="visible-toggle" className="font-bold cursor-pointer">Show this section on the homepage</label>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold">Overline Text (Small Gold Text)</label>
            <input 
              type="text" 
              value={formData.overline}
              onChange={e => setFormData({...formData, overline: e.target.value})}
              className="w-full p-3 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold">Main Heading</label>
            <input 
              type="text" 
              value={formData.sectionTitle}
              onChange={e => setFormData({...formData, sectionTitle: e.target.value})}
              className="w-full p-3 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/50 font-bold"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold">Subtitle / Description</label>
            <textarea 
              rows={3}
              value={formData.sectionSubtitle}
              onChange={e => setFormData({...formData, sectionSubtitle: e.target.value})}
              className="w-full p-3 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      </div>

      {/* Array Manager */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">Holy Places (Grid Items)</h3>
            <p className="text-sm text-muted-foreground">These appear in the categorized Ziyarat grid.</p>
          </div>
          <Button onClick={addPlace} size="sm" variant="outline" className="gap-2">
            <Plus className="size-4" /> Add Place
          </Button>
        </div>

        <div className="space-y-4">
          {formData.holyPlaces.map((place, idx) => (
            <div key={idx} className="p-5 border border-border rounded-xl bg-card flex gap-4 transition-all">
              {/* Order Controls */}
              <div className="flex flex-col items-center justify-center gap-2 border-r border-border/50 pr-4">
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => movePlace(idx, -1)} disabled={idx === 0}>
                  ▲
                </Button>
                <div className="text-xs font-bold text-muted-foreground">{idx + 1}</div>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => movePlace(idx, 1)} disabled={idx === formData.holyPlaces.length - 1}>
                  ▼
                </Button>
              </div>

              {/* Edit Form */}
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold">Title</label>
                    <input 
                      type="text" 
                      value={place.title}
                      onChange={e => updatePlace(idx, 'title', e.target.value)}
                      className="w-full p-2 bg-background border border-border rounded-lg text-sm"
                      placeholder="e.g. Masjid Al-Haram"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold">Category (Tab)</label>
                    <input 
                      type="text" 
                      value={place.category || ""}
                      onChange={e => updatePlace(idx, 'category', e.target.value)}
                      className="w-full p-2 bg-background border border-border rounded-lg text-sm"
                      placeholder="e.g. Makkah, Madinah, Jeddah"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold">Description (Optional)</label>
                    <input 
                      type="text" 
                      value={place.description}
                      onChange={e => updatePlace(idx, 'description', e.target.value)}
                      className="w-full p-2 bg-background border border-border rounded-lg text-sm"
                      placeholder="Short description..."
                    />
                  </div>
                </div>

                <div className="p-4 bg-muted/20 border border-border/50 rounded-lg">
                  <UniversalUploader 
                    value={place.videoUrl}
                    onChange={(url) => updatePlace(idx, 'videoUrl', url)}
                    label="Media (Video URL or Image fallback)"
                    placeholder="Paste YouTube/Insta link or upload MP4/JPG"
                  />
                </div>
              </div>

              {/* Delete */}
              <div className="pl-2">
                <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => removePlace(idx)}>
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))}
          {formData.holyPlaces.length === 0 && (
             <div className="text-center p-8 text-muted-foreground text-sm border border-dashed rounded-lg bg-muted/10">
               No holy places added. The grid will be empty.
             </div>
          )}
        </div>

        <div className="pt-6 border-t border-border flex justify-end">
          <Button onClick={handleSave} disabled={saving} size="lg" className="w-full md:w-auto shadow-xl">
            {saving ? <Loader2 className="animate-spin size-4 mr-2" /> : <Save className="size-4 mr-2" />}
            {saving ? "Deploying..." : "Save Enlightenment Configuration"}
          </Button>
        </div>
      </div>
    </div>
  );
}
