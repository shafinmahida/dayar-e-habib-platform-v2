"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { LayoutDashboard, Building2, Navigation, Type, Save, Loader2, Check, FolderOpen, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// New Components
import { CategoriesManager } from "@/components/admin/builder/CategoriesManager";
import { HomepageHeroManager } from "@/components/admin/builder/HomepageHeroManager";

import { EnlightenmentEngineManager } from "@/components/admin/builder/EnlightenmentEngineManager";
import { LocationsManager } from "@/components/admin/builder/LocationsManager";

type Tab = 'business_profile' | 'homepage_hero' | 'categories' | 'enlightenment' | 'locations';

interface CompanyProfile {
  id?: string;
  name: string;
  legal_name: string;
  established_year: string;
  license_number: string;
  slogan: string;
  description: string;
}

export default function WebsiteBuilderPage() {
  const supabase = useMemo(() => createClient(), []);
  const [activeTab, setActiveTab] = useState<Tab>('business_profile');
  
  // Business Profile State
  const [businessProfile, setBusinessProfile] = useState<CompanyProfile | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (activeTab === 'business_profile') {
        const { data } = await supabase.from('company_profile').select('*').limit(1).single();
        if (data) {
          setBusinessProfile(data);
        } else {
          setBusinessProfile({
            name: "",
            legal_name: "",
            established_year: "",
            license_number: "",
            slogan: "",
            description: ""
          });
        }
      }
    };

    fetchData();
  }, [activeTab, supabase]);

  const handleSaveBusinessProfile = async () => {
    if (!businessProfile) return;
    setSaving(true);
    
    if (businessProfile.id) {
      await supabase.from('company_profile').update(businessProfile).eq('id', businessProfile.id);
    } else {
      await supabase.from('company_profile').insert(businessProfile);
    }
    
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const renderTabIcon = (tab: Tab) => {
    switch (tab) {
      case 'business_profile': return <Building2 className="size-4" />;
      case 'homepage_hero': return <ImageIcon className="size-4" />;
      case 'categories': return <FolderOpen className="size-4" />;

      case 'enlightenment': return <Type className="size-4" />;
      case 'locations': return <Navigation className="size-4" />;
    }
  };

  const renderTabLabel = (tab: Tab) => {
    switch (tab) {
      case 'business_profile': return 'Business Profile';
      case 'homepage_hero': return 'Homepage Hero';
      case 'categories': return 'Package Categories';

      case 'enlightenment': return 'Enlightenment';
      case 'locations': return 'Contact Offices';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 h-[calc(100vh-2rem)] flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <LayoutDashboard className="size-8 text-accent" />
            Website Builder
          </h1>
          <p className="text-muted-foreground">Flawless control over your platform&apos;s core data and visual identity.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">
        {/* Left Nav */}
        <div className="w-full lg:w-64 space-y-2 shrink-0 overflow-y-auto pb-4 custom-scrollbar">
          {(['business_profile', 'homepage_hero', 'categories', 'enlightenment', 'locations'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${
                activeTab === tab 
                  ? 'bg-foreground text-background shadow-md' 
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
              }`}
            >
              {renderTabIcon(tab)}
              {renderTabLabel(tab)}
            </button>
          ))}
        </div>

        {/* Right Content */}
        <div className="flex-1 bg-card border border-border rounded-xl shadow-sm flex flex-col min-h-0 overflow-hidden">
          
          <div className="p-4 border-b border-border bg-muted/20 flex justify-between items-center">
            <h2 className="font-bold">{renderTabLabel(activeTab)}</h2>
            {activeTab === 'business_profile' && (
               <Button onClick={handleSaveBusinessProfile} disabled={saving} size="sm" className="bg-primary text-primary-foreground">
                 {saving ? <Loader2 className="size-4 mr-2 animate-spin" /> : saved ? <Check className="size-4 mr-2" /> : <Save className="size-4 mr-2" />}
                 {saved ? "Saved" : "Save Changes"}
               </Button>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'business_profile' && (
              <div className="max-w-2xl space-y-6">
                {!businessProfile ? (
                  <div className="animate-pulse flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="size-4 animate-spin" /> Loading profile...
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground">Brand Name</label>
                      <input 
                        type="text" 
                        value={businessProfile.name || ''}
                        onChange={(e) => setBusinessProfile({...businessProfile, name: e.target.value})}
                        className="w-full p-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground">Legal Name</label>
                      <input 
                        type="text" 
                        value={businessProfile.legal_name || ''}
                        onChange={(e) => setBusinessProfile({...businessProfile, legal_name: e.target.value})}
                        className="w-full p-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground">Established Year</label>
                        <input 
                          type="text" 
                          value={businessProfile.established_year || ''}
                          onChange={(e) => setBusinessProfile({...businessProfile, established_year: e.target.value})}
                          className="w-full p-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground">License Number</label>
                        <input 
                          type="text" 
                          value={businessProfile.license_number || ''}
                          onChange={(e) => setBusinessProfile({...businessProfile, license_number: e.target.value})}
                          className="w-full p-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground">Slogan / Tagline</label>
                      <input 
                        type="text" 
                        value={businessProfile.slogan || ''}
                        onChange={(e) => setBusinessProfile({...businessProfile, slogan: e.target.value})}
                        className="w-full p-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground">Company Description</label>
                      <textarea 
                        rows={4}
                        value={businessProfile.description || ''}
                        onChange={(e) => setBusinessProfile({...businessProfile, description: e.target.value})}
                        className="w-full p-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === 'categories' && <CategoriesManager />}
            {activeTab === 'homepage_hero' && <HomepageHeroManager />}

            {activeTab === 'enlightenment' && <EnlightenmentEngineManager />}
            {activeTab === 'locations' && <LocationsManager />}
          </div>
        </div>
      </div>
    </div>
  );
}
