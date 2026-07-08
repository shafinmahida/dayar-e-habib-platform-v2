"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Save, ArrowLeft, Trash2, ShieldCheck, Clock, Copy } from "lucide-react";
import Link from "next/link";

export default function PackageEditorPage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;
  const isNew = slug === 'new';
  const router = useRouter();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [pkg, setPkg] = useState<any>({
    title: "",
    slug: "",
    duration: "",
    availability: "Open",
    status: "draft",
    is_template: false,
    itinerary: [],
    inclusions: [],
    hotels: [],
    flights: []
  });

  useEffect(() => {
    if (!isNew) fetchPackage();
  }, [slug]);

  const fetchPackage = async () => {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('slug', slug)
      .single();
      
    if (data) setPkg(data);
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    // basic validation
    if (!pkg.title || !pkg.slug) {
      alert("Title and Slug are required.");
      setSaving(false);
      return;
    }
    // Remove auto-generated columns that cannot be explicitly inserted
    const { search_vector, created_at, ...saveData } = pkg;

    const { error } = await supabase
      .from('packages')
      .upsert({
        ...saveData,
        updated_at: new Date().toISOString()
      }, { onConflict: 'slug' });
      
    setSaving(false);
    if (error) {
      alert(`Error saving: ${error.message}`);
    } else {
      if (isNew) {
        router.push(`/admin/packages/${pkg.slug}`);
      } else {
        alert("Saved successfully!");
      }
    }
  };

  if (loading) return <div className="p-8 text-sm text-stone-500">Loading editor...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200 pb-24">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between sticky top-0 z-10 bg-background/80 backdrop-blur-md py-4 border-b border-border/50">
        <div className="flex items-center space-x-4">
          <Link href="/admin/packages" className="p-2 -ml-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              {isNew ? "Create New Package" : "Edit Package"}
            </h1>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
              {pkg.slug || "new-package"}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <select 
            value={pkg.status}
            onChange={e => setPkg({...pkg, status: e.target.value})}
            className="text-xs font-semibold bg-muted text-foreground border-none rounded-lg focus:ring-0"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
          
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-1.5 px-4 py-2 bg-foreground text-background text-xs font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Save className="h-3.5 w-3.5" />
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Basic Info */}
          <section className="space-y-4">
            <h2 className="text-sm font-black uppercase tracking-wider text-muted-foreground">Basic Information</h2>
            <div className="p-6 bg-card border border-border rounded-2xl shadow-sm space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Package Title</label>
                <input 
                  type="text" 
                  value={pkg.title}
                  onChange={e => setPkg({...pkg, title: e.target.value})}
                  className="w-full text-sm bg-background border border-input rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="e.g. Grand Stay (34+Days)"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground">URL Slug</label>
                  <input 
                    type="text" 
                    value={pkg.slug}
                    onChange={e => setPkg({...pkg, slug: e.target.value})}
                    disabled={!isNew}
                    className="w-full text-sm bg-muted/50 border border-input rounded-xl px-4 py-2.5 outline-none"
                    placeholder="premium-hajj"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground">Duration Label</label>
                  <input 
                    type="text" 
                    value={pkg.duration}
                    onChange={e => setPkg({...pkg, duration: e.target.value})}
                    className="w-full text-sm bg-background border border-input rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="e.g. Tentative or 15 Days"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* This is a placeholder for the massive JSONB editor for itinerary, hotels, etc. */}
          <section className="space-y-4">
            <h2 className="text-sm font-black uppercase tracking-wider text-muted-foreground">Detailed Content</h2>
            <div className="p-8 bg-muted/30 border border-dashed border-border rounded-2xl flex flex-col items-center justify-center text-center space-y-2">
              <span className="text-sm font-bold text-foreground">Advanced JSONB Editors</span>
              <p className="text-xs text-muted-foreground max-w-sm">
                The UI for editing Itineraries, Inclusions, Hotels, and Flights will be implemented in the next phase. The schema is ready to accept JSON arrays.
              </p>
            </div>
          </section>

        </div>

        {/* Sidebar Settings */}
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-sm font-black uppercase tracking-wider text-muted-foreground">Status & Visibility</h2>
            <div className="p-6 bg-card border border-border rounded-2xl shadow-sm space-y-4">
              
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-foreground">Template</label>
                <input 
                  type="checkbox"
                  checked={pkg.is_template}
                  onChange={e => setPkg({...pkg, is_template: e.target.checked})}
                  className="rounded border-input text-foreground focus:ring-foreground"
                />
              </div>
              <p className="text-[10px] text-muted-foreground">
                Marking this as a template allows you to use it as a blueprint for future packages without affecting the public site.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
