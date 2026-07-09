"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Save, ArrowLeft, Image as ImageIcon, Video, FileText, Tag, MapPin } from "lucide-react";
import Link from "next/link";
import { StringArrayEditor } from "@/components/admin/shared/StringArrayEditor";
import { ObjectArrayEditor, ObjectFieldSchema } from "@/components/admin/shared/ObjectArrayEditor";

const ITINERARY_SCHEMA: ObjectFieldSchema[] = [
  { key: "dayNumber", label: "Day Number", type: "number", required: true },
  { key: "title", label: "Title", type: "text", required: true, placeholder: "e.g. Arrival in Makkah" },
  { key: "description", label: "Description", type: "textarea", required: true }
];

const HOTEL_SCHEMA: ObjectFieldSchema[] = [
  { key: "name", label: "Hotel Name", type: "text", required: true },
  { key: "location", label: "Location / City", type: "text", required: true },
  { key: "rating", label: "Star Rating (e.g. 5-Star)", type: "text", required: true },
  { key: "distance", label: "Distance (e.g. 100m from Haram)", type: "text", required: true }
];

const FLIGHT_SCHEMA: ObjectFieldSchema[] = [
  { key: "airline", label: "Airline Name", type: "text", required: true },
  { key: "route", label: "Route (e.g. LHR -> JED)", type: "text", required: true },
  { key: "class", label: "Class", type: "select", options: ["Economy", "Premium Economy", "Business", "First"], required: true },
  { key: "details", label: "Flight Details", type: "text" }
];

const FAQ_SCHEMA: ObjectFieldSchema[] = [
  { key: "question", label: "Question", type: "text", required: true },
  { key: "answer", label: "Answer", type: "textarea", required: true }
];

export default function PackageEditorPage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;
  const isNew = slug === 'new';
  const router = useRouter();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [allDestinations, setAllDestinations] = useState<any[]>([]);
  
  const [pkg, setPkg] = useState<any>({
    title: "",
    slug: "",
    category_id: null,
    duration: "",
    availability: "Open",
    status: "draft",
    is_template: false,
    price_min: "",
    price_currency: "USD",
    image_url: "",
    video_url: "",
    seo_title: "",
    seo_description: "",
    destination_ids: [],
    highlights: [],
    inclusions: [],
    exclusions: [],
    complimentary: [],
    itinerary: [],
    hotels: [],
    flights: [],
    faqs: []
  });

  useEffect(() => {
    fetchMetadata();
    if (!isNew) fetchPackage();
  }, [slug]);

  const fetchMetadata = async () => {
    const [cats, dests] = await Promise.all([
      supabase.from('package_categories').select('id, name').order('name'),
      supabase.from('destinations').select('id, name').order('name')
    ]);
    if (cats.data) setCategories(cats.data);
    if (dests.data) setAllDestinations(dests.data);
  };

  const fetchPackage = async () => {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('slug', slug)
      .single();
      
    if (data) {
      setPkg({
        ...data,
        highlights: data.highlights || [],
        inclusions: data.inclusions || [],
        exclusions: data.exclusions || [],
        complimentary: data.complimentary || [],
        itinerary: data.itinerary || [],
        hotels: data.hotels || [],
        flights: data.flights || [],
        faqs: data.faqs || [],
        destination_ids: data.destination_ids || [],
        price_min: data.price_min || ""
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    if (!pkg.title || !pkg.slug) {
      alert("Title and Slug are required.");
      setSaving(false);
      return;
    }

    const { search_vector, created_at, ...saveData } = pkg;

    // Convert price_min to numeric or null
    saveData.price_min = saveData.price_min ? parseFloat(saveData.price_min) : null;

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

  const toggleDestination = (destId: string) => {
    const current = pkg.destination_ids || [];
    if (current.includes(destId)) {
      setPkg({ ...pkg, destination_ids: current.filter((id: string) => id !== destId) });
    } else {
      setPkg({ ...pkg, destination_ids: [...current, destId] });
    }
  };

  if (loading) return <div className="p-8 text-sm text-stone-500 flex items-center justify-center min-h-[50vh]">Loading editor...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-200 pb-24">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between sticky top-0 z-20 bg-background/80 backdrop-blur-md py-4 border-b border-border/50">
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
        
        <div className="flex items-center space-x-3">
          <select 
            value={pkg.status}
            onChange={e => setPkg({...pkg, status: e.target.value})}
            className="text-xs font-semibold bg-muted text-foreground border border-border rounded-lg focus:ring-1 focus:ring-primary h-9 px-3 outline-none"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
          
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-1.5 px-5 h-9 bg-foreground text-background text-xs font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
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
            <h2 className="text-sm font-black uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <FileText className="size-4" /> Core Information
            </h2>
            <div className="p-6 bg-card border border-border rounded-2xl shadow-sm space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Package Title *</label>
                <input 
                  type="text" 
                  value={pkg.title}
                  onChange={e => setPkg({...pkg, title: e.target.value})}
                  className="w-full text-sm bg-background border border-input rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="e.g. Grand Stay (34+Days)"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground">URL Slug *</label>
                  <input 
                    type="text" 
                    value={pkg.slug}
                    onChange={e => setPkg({...pkg, slug: e.target.value})}
                    disabled={!isNew}
                    className="w-full text-sm bg-muted/50 border border-input rounded-xl px-4 py-2.5 outline-none"
                    placeholder="premium-hajj"
                  />
                  {!isNew && <p className="text-[10px] text-muted-foreground">Slug cannot be changed after creation.</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground">Duration Label *</label>
                  <input 
                    type="text" 
                    value={pkg.duration}
                    onChange={e => setPkg({...pkg, duration: e.target.value})}
                    className="w-full text-sm bg-background border border-input rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="e.g. 15 Days / 14 Nights"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Category</label>
                <select 
                  value={pkg.category_id || ""}
                  onChange={e => setPkg({...pkg, category_id: e.target.value || null})}
                  className="w-full text-sm bg-background border border-input rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                >
                  <option value="">No Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Pricing & Media */}
          <section className="space-y-4">
            <h2 className="text-sm font-black uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Tag className="size-4" /> Pricing & Media
            </h2>
            <div className="p-6 bg-card border border-border rounded-2xl shadow-sm space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground">Starting Price</label>
                  <input 
                    type="number" 
                    value={pkg.price_min}
                    onChange={e => setPkg({...pkg, price_min: e.target.value})}
                    className="w-full text-sm bg-background border border-input rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="e.g. 2500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground">Currency</label>
                  <select 
                    value={pkg.price_currency}
                    onChange={e => setPkg({...pkg, price_currency: e.target.value})}
                    className="w-full text-sm bg-background border border-input rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-border/50">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground flex items-center gap-1"><ImageIcon className="size-3"/> Cover Image URL</label>
                  <input 
                    type="text" 
                    value={pkg.image_url}
                    onChange={e => setPkg({...pkg, image_url: e.target.value})}
                    className="w-full text-sm bg-background border border-input rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground flex items-center gap-1"><Video className="size-3"/> Promotional Video URL</label>
                  <input 
                    type="text" 
                    value={pkg.video_url}
                    onChange={e => setPkg({...pkg, video_url: e.target.value})}
                    className="w-full text-sm bg-background border border-input rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="https://youtube.com/..."
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Simple String Arrays */}
          <section className="space-y-4">
            <h2 className="text-sm font-black uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <FileText className="size-4" /> Highlights & Inclusions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-6 bg-card border border-border rounded-2xl shadow-sm">
              <StringArrayEditor
                label="Highlights"
                description="Key selling points of the package"
                values={pkg.highlights}
                onChange={val => setPkg({...pkg, highlights: val})}
              />
              <StringArrayEditor
                label="Inclusions"
                description="What is strictly included in the price"
                values={pkg.inclusions}
                onChange={val => setPkg({...pkg, inclusions: val})}
              />
              <StringArrayEditor
                label="Complimentary"
                description="Free additions (e.g. Ihram, Zamzam)"
                values={pkg.complimentary}
                onChange={val => setPkg({...pkg, complimentary: val})}
              />
              <StringArrayEditor
                label="Exclusions"
                description="What is explicitly not included"
                values={pkg.exclusions}
                onChange={val => setPkg({...pkg, exclusions: val})}
              />
            </div>
          </section>

          {/* Advanced Object Arrays */}
          <section className="space-y-6 pt-4">
            <ObjectArrayEditor
              label="Itinerary"
              description="Day-by-day travel plan and activities"
              schema={ITINERARY_SCHEMA}
              values={pkg.itinerary}
              onChange={val => setPkg({...pkg, itinerary: val})}
              defaultItem={{ dayNumber: (pkg.itinerary?.length || 0) + 1, title: "", description: "" }}
              itemTitleKey="title"
            />

            <ObjectArrayEditor
              label="Hotels & Accommodation"
              description="Where the pilgrims will stay"
              schema={HOTEL_SCHEMA}
              values={pkg.hotels}
              onChange={val => setPkg({...pkg, hotels: val})}
              defaultItem={{ name: "", location: "", rating: "5-Star", distance: "" }}
              itemTitleKey="name"
            />

            <ObjectArrayEditor
              label="Flights & Transport"
              description="Details of the journeys included"
              schema={FLIGHT_SCHEMA}
              values={pkg.flights}
              onChange={val => setPkg({...pkg, flights: val})}
              defaultItem={{ airline: "", route: "", class: "Economy", details: "" }}
              itemTitleKey="airline"
            />

            <ObjectArrayEditor
              label="Frequently Asked Questions (FAQs)"
              description="Specific Q&A for this package"
              schema={FAQ_SCHEMA}
              values={pkg.faqs}
              onChange={val => setPkg({...pkg, faqs: val})}
              defaultItem={{ question: "", answer: "" }}
              itemTitleKey="question"
            />
          </section>

        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <section className="space-y-4">
            <h2 className="text-sm font-black uppercase tracking-wider text-muted-foreground">Properties</h2>
            <div className="p-6 bg-card border border-border rounded-2xl shadow-sm space-y-6">
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Availability</label>
                <select 
                  value={pkg.availability}
                  onChange={e => setPkg({...pkg, availability: e.target.value})}
                  className="w-full text-sm bg-background border border-input rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                >
                  <option value="Open">Open</option>
                  <option value="Limited">Limited Spaces</option>
                  <option value="Closed">Closed</option>
                  <option value="Sold Out">Sold Out</option>
                </select>
              </div>

              <div className="space-y-3 pt-4 border-t border-border/50">
                <label className="text-xs font-bold text-foreground flex items-center gap-1"><MapPin className="size-3"/> Linked Destinations</label>
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                  {allDestinations.map(dest => (
                    <label key={dest.id} className="flex items-center space-x-2 p-2 rounded hover:bg-muted/50 cursor-pointer transition-colors">
                      <input 
                        type="checkbox"
                        checked={(pkg.destination_ids || []).includes(dest.id)}
                        onChange={() => toggleDestination(dest.id)}
                        className="rounded border-input text-primary focus:ring-primary size-3.5"
                      />
                      <span className="text-xs font-medium">{dest.name}</span>
                    </label>
                  ))}
                  {allDestinations.length === 0 && (
                    <span className="text-xs text-muted-foreground">No destinations found.</span>
                  )}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-border/50">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={pkg.is_template}
                    onChange={e => setPkg({...pkg, is_template: e.target.checked})}
                    className="rounded border-input text-foreground focus:ring-foreground size-4"
                  />
                  <span className="text-sm font-bold text-foreground">Is Template</span>
                </label>
                <p className="text-[10px] text-muted-foreground ml-7">
                  Blueprints for future packages. Templates won't appear on the public site.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-border/50">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={pkg.featured}
                    onChange={e => setPkg({...pkg, featured: e.target.checked})}
                    className="rounded border-input text-foreground focus:ring-foreground size-4"
                  />
                  <span className="text-sm font-bold text-foreground">Featured Package</span>
                </label>
                <p className="text-[10px] text-muted-foreground ml-7">
                  Display prominently on the homepage and top of listings.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-black uppercase tracking-wider text-muted-foreground">Search Engine (SEO)</h2>
            <div className="p-6 bg-card border border-border rounded-2xl shadow-sm space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">SEO Title</label>
                <input 
                  type="text" 
                  value={pkg.seo_title || ""}
                  onChange={e => setPkg({...pkg, seo_title: e.target.value})}
                  className="w-full text-sm bg-background border border-input rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="Optional SEO override..."
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Meta Description</label>
                <textarea 
                  value={pkg.seo_description || ""}
                  onChange={e => setPkg({...pkg, seo_description: e.target.value})}
                  rows={4}
                  className="w-full text-sm bg-background border border-input rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-y"
                  placeholder="Short description for Google search results..."
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
