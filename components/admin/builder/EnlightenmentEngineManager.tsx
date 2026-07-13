"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Plus, Edit2, Trash2, MapPin, Image as ImageIcon, Video, Save, X, Link2 } from "lucide-react";
import { UniversalUploader } from "@/components/admin/shared/UniversalUploader";
import { StringArrayEditor } from "@/components/admin/shared/StringArrayEditor";

export function EnlightenmentEngineManager() {
  const supabase = createClient();
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPlace, setEditingPlace] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('enlightenment_places')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setPlaces(data);
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const isNew = !editingPlace.id;

    if (!editingPlace.title || !editingPlace.short_description) {
      alert("Title and Short Description are required.");
      setSaving(false);
      return;
    }

    const payload = {
      title: editingPlace.title,
      category: editingPlace.category || "Uncategorized",
      short_description: editingPlace.short_description,
      presentation_overview: editingPlace.presentation_overview || "",
      video_url: editingPlace.video_url || "",
      gallery_images: editingPlace.gallery_images || []
    };

    if (isNew) {
      const { error } = await supabase.from('enlightenment_places').insert(payload);
      if (error) alert(`Error: ${error.message}`);
    } else {
      const { error } = await supabase.from('enlightenment_places').update(payload).eq('id', editingPlace.id);
      if (error) alert(`Error: ${error.message}`);
    }

    setSaving(false);
    setEditingPlace(null);
    fetchPlaces();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this place?")) return;
    await supabase.from('enlightenment_places').delete().eq('id', id);
    fetchPlaces();
  };

  if (loading) {
    return <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-[#8A6A36]" /></div>;
  }

  if (editingPlace) {
    return (
      <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-black/5 animate-in fade-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-lg font-black text-black">
            {editingPlace.id ? "Edit Place" : "Add New Place"}
          </h3>
          <button onClick={() => setEditingPlace(null)} className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <X className="w-5 h-5 text-black/60" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-black/70">Place Name (Title)</label>
            <input 
              value={editingPlace.title || ""} 
              onChange={e => setEditingPlace({...editingPlace, title: e.target.value})}
              className="w-full text-sm p-3 border border-black/10 rounded-xl focus:border-[#8A6A36] outline-none"
              placeholder="e.g. Masjid Al-Haram"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-black/70">Category</label>
            <input 
              value={editingPlace.category || ""} 
              onChange={e => setEditingPlace({...editingPlace, category: e.target.value})}
              className="w-full text-sm p-3 border border-black/10 rounded-xl focus:border-[#8A6A36] outline-none"
              placeholder="e.g. Makkah"
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold text-black/70">Short Description (For Search/List View)</label>
            <textarea 
              value={editingPlace.short_description || ""} 
              onChange={e => setEditingPlace({...editingPlace, short_description: e.target.value})}
              className="w-full text-sm p-3 border border-black/10 rounded-xl focus:border-[#8A6A36] outline-none"
              rows={2}
              placeholder="Brief summary..."
            />
          </div>

          <div className="space-y-2 md:col-span-2 bg-[#FAF8F5] p-5 rounded-2xl border border-black/5">
            <h4 className="text-sm font-black mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#8A6A36]" />
              Presentation Data
            </h4>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-black/70">Presentation Overview Text</label>
                <textarea 
                  value={editingPlace.presentation_overview || ""} 
                  onChange={e => setEditingPlace({...editingPlace, presentation_overview: e.target.value})}
                  className="w-full text-sm p-3 border border-black/10 rounded-xl focus:border-[#8A6A36] outline-none"
                  rows={4}
                  placeholder="Detailed history and story of this place..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-black/70 flex items-center gap-2"><Video className="w-3 h-3"/> Media URL (YouTube, Vimeo, MP4)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-black/40"><Link2 className="w-4 h-4"/></div>
                  <input
                    type="url"
                    value={editingPlace.video_url || ""} 
                    onChange={e => setEditingPlace({...editingPlace, video_url: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-white/50 border-2 border-black/5 rounded-2xl text-sm focus:border-black/20 focus:bg-white outline-none transition-all placeholder:text-black/30 text-black font-medium"
                    placeholder="https://youtube.com/..."
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-black/5">
                <StringArrayEditor
                  label="Mini-Gallery Photos (Unlimited)"
                  description="Upload as many photos as you want for the presentation gallery."
                  values={editingPlace.gallery_images || []}
                  onChange={val => setEditingPlace({...editingPlace, gallery_images: val})}
                  placeholder="Image URL..."
                  mode="media"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-[#1A1A1A] text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-[#8A6A36] transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Place
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-black text-black">Enlightenment Engine</h2>
          <p className="text-xs text-black/60 mt-1">Manage interactive Ziyarat locations and presentations.</p>
        </div>
        <button 
          onClick={() => setEditingPlace({})}
          className="flex items-center gap-2 bg-[#8A6A36] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#72572a] transition-colors shadow-lg shadow-[#8A6A36]/20"
        >
          <Plus className="w-4 h-4" />
          Add New Place
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {places.map((place) => (
          <div key={place.id} className="bg-white p-5 rounded-2xl border border-black/5 shadow-sm hover:border-[#8A6A36]/30 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="inline-block px-2.5 py-1 bg-[#FAF8F5] text-[#8A6A36] text-[9px] font-black uppercase tracking-widest rounded-md border border-[#8A6A36]/20">
                  {place.category}
                </span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setEditingPlace(place)} className="p-1.5 hover:bg-black/5 rounded-md text-black/60 hover:text-black">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(place.id)} className="p-1.5 hover:bg-red-50 rounded-md text-black/60 hover:text-red-500">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <h3 className="font-bold text-black line-clamp-1">{place.title}</h3>
              <p className="text-xs text-black/60 mt-1 line-clamp-2">{place.short_description}</p>
            </div>
            
            <div className="mt-4 pt-4 border-t border-black/5 flex items-center gap-4 text-xs font-bold text-black/40">
              <span className="flex items-center gap-1"><Video className="w-3.5 h-3.5"/> {place.video_url ? 'Yes' : 'No'}</span>
              <span className="flex items-center gap-1"><ImageIcon className="w-3.5 h-3.5"/> {(place.gallery_images || []).length} Photos</span>
            </div>
          </div>
        ))}

        {places.length === 0 && (
          <div className="col-span-full py-12 text-center text-black/40 font-medium bg-[#FAF8F5] rounded-3xl border border-black/5">
            No places in the database. Click "Add New Place" to begin.
          </div>
        )}
      </div>
    </div>
  );
}
