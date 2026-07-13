"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Plus, Edit2, Trash2, MapPin, Mail, Phone, Save, X } from "lucide-react";

export function LocationsManager() {
  const supabase = createClient();
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingLocation, setEditingLocation] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('contact_offices')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (data) setLocations(data);
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const isNew = !editingLocation.id;

    if (!editingLocation.name || !editingLocation.slug) {
      alert("Name and Slug are required.");
      setSaving(false);
      return;
    }

    const payload = {
      name: editingLocation.name,
      slug: editingLocation.slug,
      address: editingLocation.address || "",
      phone: editingLocation.phone || "",
      email: editingLocation.email || "",
      map_link: editingLocation.map_link || "",
      working_hours: editingLocation.working_hours || "",
      active: editingLocation.active !== false,
      display_order: editingLocation.display_order || 0
    };

    if (isNew) {
      const { error } = await supabase.from('contact_offices').insert(payload);
      if (error) alert(`Error: ${error.message}`);
    } else {
      const { error } = await supabase.from('contact_offices').update(payload).eq('id', editingLocation.id);
      if (error) alert(`Error: ${error.message}`);
    }

    setSaving(false);
    setEditingLocation(null);
    fetchLocations();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this office location?")) return;
    await supabase.from('contact_offices').delete().eq('id', id);
    fetchLocations();
  };

  if (loading) {
    return <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>;
  }

  if (editingLocation) {
    return (
      <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-border animate-in fade-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-lg font-bold">
            {editingLocation.id ? "Edit Office Location" : "Add New Office"}
          </h3>
          <button onClick={() => setEditingLocation(null)} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground">Office Name</label>
            <input 
              value={editingLocation.name || ""} 
              onChange={e => {
                const name = e.target.value;
                const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                setEditingLocation({...editingLocation, name, slug: editingLocation.id ? editingLocation.slug : slug});
              }}
              className="w-full text-sm p-3 border border-border rounded-xl focus:border-primary outline-none"
              placeholder="e.g. Headquarters"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground">Slug (Internal ID)</label>
            <input 
              value={editingLocation.slug || ""} 
              onChange={e => setEditingLocation({...editingLocation, slug: e.target.value})}
              className="w-full text-sm p-3 border border-border rounded-xl focus:border-primary outline-none font-mono"
              placeholder="e.g. headquarters"
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold text-foreground">Physical Address</label>
            <textarea 
              value={editingLocation.address || ""} 
              onChange={e => setEditingLocation({...editingLocation, address: e.target.value})}
              className="w-full text-sm p-3 border border-border rounded-xl focus:border-primary outline-none"
              rows={3}
              placeholder="Full street address..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground">Phone Number</label>
            <input 
              value={editingLocation.phone || ""} 
              onChange={e => setEditingLocation({...editingLocation, phone: e.target.value})}
              className="w-full text-sm p-3 border border-border rounded-xl focus:border-primary outline-none"
              placeholder="+1234567890"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground">Email Address</label>
            <input 
              value={editingLocation.email || ""} 
              onChange={e => setEditingLocation({...editingLocation, email: e.target.value})}
              className="w-full text-sm p-3 border border-border rounded-xl focus:border-primary outline-none"
              placeholder="office@example.com"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold text-foreground">Google Maps URL</label>
            <input 
              value={editingLocation.map_link || ""} 
              onChange={e => setEditingLocation({...editingLocation, map_link: e.target.value})}
              className="w-full text-sm p-3 border border-border rounded-xl focus:border-primary outline-none"
              placeholder="https://maps.google.com/..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground">Working Hours</label>
            <input 
              value={editingLocation.working_hours || ""} 
              onChange={e => setEditingLocation({...editingLocation, working_hours: e.target.value})}
              className="w-full text-sm p-3 border border-border rounded-xl focus:border-primary outline-none"
              placeholder="Mon-Fri: 9 AM - 6 PM"
            />
          </div>

          <div className="space-y-2 flex flex-col justify-end">
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-xl border border-border">
              <input 
                type="checkbox" 
                id="loc-active"
                checked={editingLocation.active !== false} 
                onChange={e => setEditingLocation({...editingLocation, active: e.target.checked})}
                className="w-4 h-4 rounded border-gray-300"
              />
              <label htmlFor="loc-active" className="text-sm font-bold cursor-pointer">Active Location</label>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Location
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">Contact Offices</h2>
          <p className="text-xs text-muted-foreground mt-1">Manage physical locations displayed on the contact page.</p>
        </div>
        <button 
          onClick={() => setEditingLocation({})}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Office
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {locations.map((loc) => (
          <div key={loc.id} className="bg-card p-5 rounded-2xl border border-border shadow-sm hover:border-primary/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className={`inline-block px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-md border ${loc.active ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-muted text-muted-foreground border-border'}`}>
                  {loc.active ? 'Active' : 'Hidden'}
                </span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setEditingLocation(loc)} className="p-1.5 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(loc.id)} className="p-1.5 hover:bg-destructive/10 rounded-md text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <h3 className="font-bold text-foreground text-lg flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" />{loc.name}</h3>
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{loc.address}</p>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2 text-xs font-medium text-muted-foreground">
              <span className="flex items-center gap-2"><Phone className="w-3.5 h-3.5"/> {loc.phone}</span>
              <span className="flex items-center gap-2"><Mail className="w-3.5 h-3.5"/> {loc.email}</span>
            </div>
          </div>
        ))}

        {locations.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground font-medium bg-muted/20 rounded-3xl border border-border">
            No contact offices configured.
          </div>
        )}
      </div>
    </div>
  );
}
