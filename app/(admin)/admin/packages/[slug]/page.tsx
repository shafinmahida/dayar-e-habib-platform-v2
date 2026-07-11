"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Save, ArrowLeft, Image as ImageIcon, Video, FileText, Tag, MapPin, AlignLeft, Info, Calendar, Search, Copy } from "lucide-react";
import Link from "next/link";
import { StringArrayEditor } from "@/components/admin/shared/StringArrayEditor";
import { ObjectArrayEditor, ObjectFieldSchema } from "@/components/admin/shared/ObjectArrayEditor";
import { UniversalUploader } from "@/components/admin/shared/UniversalUploader";
import { cn } from "@/lib/utils";

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

type TabId = 'general' | 'details' | 'itinerary' | 'transport' | 'media';

export default function PackageEditorPage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = use(params);
  const originalSlug = unwrappedParams.slug;
  const isNew = originalSlug === 'new';
  const router = useRouter();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('general');
  const [categories, setCategories] = useState<any[]>([]);

  
  // Media Arrays (Temporary state for UI)
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [videoUrls, setVideoUrls] = useState<string[]>([]);

  const [pkg, setPkg] = useState<any>({
    title: "",
    slug: "",
    category_id: null,
    duration: "",
    availability: "Open",
    status: "draft",
    is_template: false,
    featured: false,
    price_currency: "INR",
    cover_image: "",
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
  }, [originalSlug]);

  const fetchMetadata = async () => {
    const [cats] = await Promise.all([
      supabase.from('package_categories').select('id, name').order('name')
    ]);
    if (cats.data) setCategories(cats.data);
  };

  const fetchPackage = async () => {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('slug', originalSlug)
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
        price_currency: data.price_currency || "INR",
        cover_image: data.cover_image || ""
      });
      // Parse comma-separated strings back into arrays
      setImageUrls(data.image_url ? data.image_url.split(',').filter(Boolean) : []);
      setVideoUrls(data.video_url ? data.video_url.split(',').filter(Boolean) : []);
    }
    setLoading(false);
  };

  const handleTitleChange = (newTitle: string) => {
    if (isNew) {
      const autoSlug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setPkg((prev: any) => ({ ...prev, title: newTitle, slug: autoSlug }));
    } else {
      setPkg((prev: any) => ({ ...prev, title: newTitle }));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    if (!pkg.title || !pkg.slug) {
      alert("Title and Slug are required.");
      setActiveTab('general');
      setSaving(false);
      return;
    }

    const { search_vector, created_at, ...saveData } = pkg;

    // Convert price_min to numeric or null
    saveData.price_min = saveData.price_min ? parseFloat(saveData.price_min) : null;
    
    // Join arrays into comma-separated strings for database persistence
    saveData.image_url = imageUrls.join(',');
    saveData.video_url = videoUrls.join(',');

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
        // Show temporary success feedback
        const btn = document.getElementById("save-btn-text");
        if(btn) {
          const orig = btn.innerText;
          btn.innerText = "Saved!";
          setTimeout(() => btn.innerText = orig, 2000);
        }
      }
    }
  };

  const handleDelete = async () => {
    if (isNew) return;
    const confirmDelete = window.confirm(`Are you sure you want to permanently delete the package "${pkg.title}"? This action cannot be undone.`);
    if (!confirmDelete) return;

    setSaving(true);
    const { error } = await supabase
      .from('packages')
      .delete()
      .eq('slug', originalSlug);

    if (error) {
      alert(`Error deleting package: ${error.message}`);
      setSaving(false);
    } else {
      router.push('/admin/packages');
    }
  };

  const handleDuplicate = async () => {
    if (isNew) return;
    
    setSaving(true);
    const newSlug = `${pkg.slug}-copy-${Date.now()}`;
    const { id, search_vector, created_at, updated_at, ...rest } = pkg;
    
    const { error } = await supabase.from('packages').insert({
      ...rest,
      slug: newSlug,
      title: `${pkg.title} (Copy)`,
      status: 'draft',
      is_template: false,
    });
    
    if (error) {
      alert(`Failed to duplicate: ${error.message}`);
      setSaving(false);
    } else {
      router.push(`/admin/packages/${newSlug}`);
    }
  };

  if (loading) return <div className="p-8 text-sm text-stone-500 flex items-center justify-center min-h-[50vh] animate-pulse">Initializing cockpit...</div>;

  const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'general', label: 'General', icon: <Info className="size-4" /> },
    { id: 'details', label: 'Details', icon: <AlignLeft className="size-4" /> },
    { id: 'itinerary', label: 'Itinerary', icon: <Calendar className="size-4" /> },
    { id: 'transport', label: 'Transport & Stay', icon: <MapPin className="size-4" /> },
    { id: 'media', label: 'Media & SEO', icon: <ImageIcon className="size-4" /> },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300 pb-24">
      {/* Floating Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between sticky top-4 z-50 bg-background/70 backdrop-blur-xl py-3 px-4 border border-border/50 rounded-2xl shadow-lg">
        <div className="flex items-center space-x-4">
          <Link href="/admin/packages" className="p-2 -ml-1 rounded-xl bg-muted/50 hover:bg-muted text-muted-foreground transition-colors">
            <ArrowLeft className="size-4" />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-lg font-black tracking-tight text-foreground leading-tight">
              {isNew ? "Create Package" : "Edit Package"}
            </h1>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
              {pkg.slug || "new-package"}
            </span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {!isNew && (
            <>
              <button
                onClick={handleDuplicate}
                disabled={saving}
                className="text-xs font-bold text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 px-4 h-10 rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <Copy className="size-3.5" />
                <span>Duplicate</span>
              </button>
              <button
                onClick={handleDelete}
                disabled={saving}
                className="text-xs font-bold text-destructive hover:bg-destructive/10 px-4 h-10 rounded-xl transition-colors disabled:opacity-50"
              >
                Delete
              </button>
            </>
          )}
          <select 
            value={pkg.status}
            onChange={e => setPkg({...pkg, status: e.target.value})}
            className="text-xs font-bold bg-background text-foreground border border-border rounded-xl focus:ring-2 focus:ring-primary h-10 px-4 outline-none shadow-sm cursor-pointer"
          >
            <option value="draft">Draft Status</option>
            <option value="published">Published Live</option>
            <option value="archived">Archived</option>
          </select>
          
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 px-6 h-10 bg-foreground text-background text-xs font-black uppercase tracking-wider rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none shadow-md"
          >
            <Save className="size-4" />
            <span id="save-btn-text">{saving ? "Saving..." : "Save Config"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 text-sm font-bold rounded-xl transition-all duration-300",
                activeTab === tab.id 
                  ? "bg-foreground text-background shadow-md translate-x-1" 
                  : "bg-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:translate-x-0.5"
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}

          {/* Quick Properties Card */}
          <div className="mt-8 p-5 bg-card border border-border rounded-2xl shadow-sm space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Quick Config</h3>
            
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-muted/50 rounded-lg transition-colors">
                <input 
                  type="checkbox"
                  checked={pkg.is_template}
                  onChange={e => setPkg({...pkg, is_template: e.target.checked})}
                  className="rounded border-input text-foreground focus:ring-foreground size-4"
                />
                <span className="text-xs font-bold text-foreground">Template Preset</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-muted/50 rounded-lg transition-colors">
                <input 
                  type="checkbox"
                  checked={pkg.featured}
                  onChange={e => setPkg({...pkg, featured: e.target.checked})}
                  className="rounded border-input text-foreground focus:ring-foreground size-4"
                />
                <span className="text-xs font-bold text-foreground">Featured (Homepage)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="lg:col-span-3 min-h-[600px] bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
          
          {/* GENERAL TAB */}
          <div className={cn("space-y-8 transition-all duration-500 absolute inset-0 p-6 md:p-8 overflow-y-auto custom-scrollbar", activeTab === 'general' ? "opacity-100 translate-x-0 relative" : "opacity-0 translate-x-8 pointer-events-none")}>
            <div className="space-y-1">
              <h2 className="text-lg font-black text-foreground">General Configuration</h2>
              <p className="text-xs text-muted-foreground">Core package details and pricing</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground">Package Title <span className="text-destructive">*</span></label>
                <input 
                  type="text" 
                  value={pkg.title}
                  onChange={e => handleTitleChange(e.target.value)}
                  className="w-full text-sm bg-background border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="e.g. Grand Stay (34+Days)"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground">URL Slug <span className="text-destructive">*</span></label>
                  <input 
                    type="text" 
                    value={pkg.slug}
                    onChange={e => setPkg({...pkg, slug: e.target.value})}
                    disabled={!isNew}
                    className="w-full text-sm bg-muted/50 border border-input rounded-xl px-4 py-3 outline-none"
                    placeholder="premium-hajj"
                  />
                  {!isNew && <p className="text-[10px] text-muted-foreground font-medium">Slug locked after creation.</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground">Duration Label <span className="text-destructive">*</span></label>
                  <input 
                    type="text" 
                    value={pkg.duration}
                    onChange={e => setPkg({...pkg, duration: e.target.value})}
                    className="w-full text-sm bg-background border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="e.g. 15 Days / 14 Nights"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground">Category</label>
                  <select 
                    value={pkg.category_id || ""}
                    onChange={e => setPkg({...pkg, category_id: e.target.value || null})}
                    className="w-full text-sm bg-background border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  >
                    <option value="">No Category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground">Availability</label>
                  <select 
                    value={pkg.availability}
                    onChange={e => setPkg({...pkg, availability: e.target.value})}
                    className="w-full text-sm bg-background border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  >
                    <option value="Open">Open (Available)</option>
                    <option value="Limited">Limited Spaces</option>
                    <option value="Closed">Closed</option>
                    <option value="Sold Out">Sold Out</option>
                  </select>
                </div>
              </div>

              <div className="p-5 border border-border/80 bg-muted/20 rounded-2xl space-y-5">
                <h3 className="text-xs font-black uppercase tracking-widest text-foreground">Pricing Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-foreground flex items-center gap-2"><Tag className="size-3"/> Starting Price</label>
                    <input 
                      type="number" 
                      value={pkg.price_min}
                      onChange={e => setPkg({...pkg, price_min: e.target.value})}
                      className="w-full text-sm bg-background border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="e.g. 250000"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-foreground">Currency</label>
                    <select 
                      value={pkg.price_currency}
                      onChange={e => setPkg({...pkg, price_currency: e.target.value})}
                      className="w-full text-sm bg-background border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    >
                      <option value="INR">INR (₹)</option>
                      <option value="USD">USD ($)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="SAR">SAR (﷼)</option>
                    </select>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* DETAILS TAB */}
          <div className={cn("space-y-8 transition-all duration-500 absolute inset-0 p-6 md:p-8 overflow-y-auto custom-scrollbar", activeTab === 'details' ? "opacity-100 translate-x-0 relative" : "opacity-0 translate-x-8 pointer-events-none")}>
            <div className="space-y-1">
              <h2 className="text-lg font-black text-foreground">Package Details</h2>
              <p className="text-xs text-muted-foreground">Manage checklists and specific FAQs</p>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <StringArrayEditor
                label="Key Highlights"
                description="Top selling points displayed on the card"
                values={pkg.highlights}
                onChange={val => setPkg({...pkg, highlights: val})}
                placeholder="e.g. 5-Star VIP Tents"
              />
              <StringArrayEditor
                label="Inclusions"
                description="What is strictly included in the price"
                values={pkg.inclusions}
                onChange={val => setPkg({...pkg, inclusions: val})}
                placeholder="e.g. Round Trip Flights"
              />
              <StringArrayEditor
                label="Exclusions"
                description="What is explicitly not included"
                values={pkg.exclusions}
                onChange={val => setPkg({...pkg, exclusions: val})}
                placeholder="e.g. Personal Expenses"
              />
              <StringArrayEditor
                label="Complimentary Add-ons"
                description="Free additions like Zamzam or Ihram"
                values={pkg.complimentary}
                onChange={val => setPkg({...pkg, complimentary: val})}
                placeholder="e.g. 5L Zamzam Water"
              />
            </div>
            
            <div className="pt-6 border-t border-border">
              <ObjectArrayEditor
                label="Frequently Asked Questions (FAQs)"
                description="Specific Q&A tailored for this package"
                schema={FAQ_SCHEMA}
                values={pkg.faqs}
                onChange={val => setPkg({...pkg, faqs: val})}
                defaultItem={{ question: "", answer: "" }}
                itemTitleKey="question"
              />
            </div>
          </div>

          {/* ITINERARY TAB */}
          <div className={cn("space-y-8 transition-all duration-500 absolute inset-0 p-6 md:p-8 overflow-y-auto custom-scrollbar", activeTab === 'itinerary' ? "opacity-100 translate-x-0 relative" : "opacity-0 translate-x-8 pointer-events-none")}>
            <div className="space-y-1">
              <h2 className="text-lg font-black text-foreground">Itinerary Builder</h2>
              <p className="text-xs text-muted-foreground">Define the day-by-day travel plan</p>
            </div>
            
            <ObjectArrayEditor
              label="Daily Schedule"
              description="Construct the timeline of activities"
              schema={ITINERARY_SCHEMA}
              values={pkg.itinerary}
              onChange={val => setPkg({...pkg, itinerary: val})}
              defaultItem={{ dayNumber: (pkg.itinerary?.length || 0) + 1, title: "", description: "" }}
              itemTitleKey="title"
            />
          </div>

          {/* TRANSPORT & STAY TAB */}
          <div className={cn("space-y-8 transition-all duration-500 absolute inset-0 p-6 md:p-8 overflow-y-auto custom-scrollbar", activeTab === 'transport' ? "opacity-100 translate-x-0 relative" : "opacity-0 translate-x-8 pointer-events-none")}>
            <div className="space-y-1">
              <h2 className="text-lg font-black text-foreground">Transport & Stay</h2>
              <p className="text-xs text-muted-foreground">Manage locations, hotels, and flights</p>
            </div>



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
              label="Flights & Travel"
              description="Details of the journeys included"
              schema={FLIGHT_SCHEMA}
              values={pkg.flights}
              onChange={val => setPkg({...pkg, flights: val})}
              defaultItem={{ airline: "", route: "", class: "Economy", details: "" }}
              itemTitleKey="airline"
            />
          </div>

          {/* MEDIA & SEO TAB */}
          <div className={cn("space-y-8 transition-all duration-500 absolute inset-0 p-6 md:p-8 overflow-y-auto custom-scrollbar", activeTab === 'media' ? "opacity-100 translate-x-0 relative" : "opacity-0 translate-x-8 pointer-events-none")}>
            <div className="space-y-1">
              <h2 className="text-lg font-black text-foreground">Media Gallery & SEO</h2>
              <p className="text-xs text-muted-foreground">Add multiple images and optimize for search engines</p>
            </div>
            
            <div className="flex flex-col gap-8">
              <div className="bg-muted/20 p-6 rounded-2xl border border-border/80">
                <h3 className="text-sm font-black uppercase tracking-wider text-foreground mb-4">Dedicated Cover Image</h3>
                <div className="max-w-xl">
                  <UniversalUploader
                    value={pkg.cover_image}
                    onChange={(url) => setPkg({...pkg, cover_image: url})}
                    label="Package Cover Photo"
                    description="This is the main image shown on the Package Card and at the top of the details page."
                  />
                </div>
              </div>

              <div className="flex flex-col xl:grid xl:grid-cols-2 gap-8">
                <StringArrayEditor
                  label="Gallery Image URLs"
                  description="Secondary images for the carousel. Do not include the cover photo here."
                  values={imageUrls}
                  onChange={val => setImageUrls(val)}
                  placeholder="https://..."
                  mode="media"
                />
                <StringArrayEditor
                  label="Video URLs"
                  description="Links to YouTube, Vimeo, or direct MP4 files."
                  values={videoUrls}
                  onChange={val => setVideoUrls(val)}
                  placeholder="https://..."
                  mode="media"
                />
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="text-sm font-black uppercase tracking-wider text-foreground mb-4 flex items-center gap-2"><Search className="size-4"/> Search Engine Config</h3>
              <div className="space-y-6 max-w-2xl">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground">SEO Meta Title</label>
                  <input 
                    type="text" 
                    value={pkg.seo_title || ""}
                    onChange={e => setPkg({...pkg, seo_title: e.target.value})}
                    className="w-full text-sm bg-background border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="Optional SEO title override..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground">SEO Meta Description</label>
                  <textarea 
                    value={pkg.seo_description || ""}
                    onChange={e => setPkg({...pkg, seo_description: e.target.value})}
                    rows={4}
                    className="w-full text-sm bg-background border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-y"
                    placeholder="Short description for Google search results..."
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
