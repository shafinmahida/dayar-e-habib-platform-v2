"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Sliders, Save, Loader2, Globe, Shield, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SiteSettings {
  id?: string;
  site_name: string;
  site_description: string;
  announcement_enabled: boolean;
  announcement_text: string;
  maintenance_mode: boolean;
  enable_bookings: boolean;
  seo_keywords: string[];
}

export default function AdminSettingsPage() {
  const supabase = createClient();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('site_settings').select('*').limit(1).single();
    
    if (data) {
      setSettings(data as SiteSettings);
    } else {
      setSettings({
        site_name: "Dayar-E-Habib",
        site_description: "Premium Hajj & Umrah Services",
        announcement_enabled: false,
        announcement_text: "",
        maintenance_mode: false,
        enable_bookings: true,
        seo_keywords: []
      });
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSettings();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchSettings]);

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    setError(null);
    setSuccess(false);
    
    try {
      if (settings.id) {
        const { error: updateError } = await supabase.from('site_settings').update(settings).eq('id', settings.id);
        if (updateError) throw updateError;
      } else {
        const { data: inserted, error: insertError } = await supabase.from('site_settings').insert([settings]).select().single();
        if (insertError) throw insertError;
        if (inserted) setSettings(inserted as SiteSettings);
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: unknown) {
      console.error(err);
      const errMsg = err instanceof Error ? err.message : "Failed to save global configurations.";
      setError(errMsg);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-primary size-8" /></div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-200 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Sliders className="size-8 text-primary" />
            Control Center Settings
          </h1>
          <p className="text-muted-foreground">
            Configure global platform behavior, SEO defaults, and feature toggles.
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="shadow-sm">
          {saving ? <Loader2 className="size-4 mr-2 animate-spin" /> : <Save className="size-4 mr-2" />}
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </div>

      {/* Success/Error Banner Feedback */}
      {success && (
        <div className="p-4 text-sm bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-xl animate-in slide-in-from-top-2 duration-300">
          Global Settings Saved Successfully!
        </div>
      )}
      {error && (
        <div className="p-4 text-sm bg-destructive/10 text-destructive border border-destructive/20 rounded-xl animate-in slide-in-from-top-2 duration-300">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* General Details */}
        <section className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-muted/30 p-4 border-b border-border flex items-center gap-2">
            <Globe className="size-5 text-primary" />
            <h2 className="font-bold">Global Site Meta</h2>
          </div>
          <div className="p-6 space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold">Site Name (Title Prefix)</label>
              <input 
                className="w-full p-3 border border-border rounded-xl text-sm outline-none focus:border-primary" 
                value={settings.site_name || ""} 
                onChange={e => setSettings({...settings, site_name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">Default SEO Description</label>
              <textarea 
                className="w-full p-3 border border-border rounded-xl text-sm outline-none focus:border-primary" 
                rows={3}
                value={settings.site_description || ""} 
                onChange={e => setSettings({...settings, site_description: e.target.value})}
              />
              <p className="text-[10px] text-muted-foreground">This is used as the default fallback meta description for search engines.</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">SEO Keywords (Comma Separated)</label>
              <input 
                className="w-full p-3 border border-border rounded-xl text-sm outline-none focus:border-primary" 
                value={(settings.seo_keywords || []).join(', ')} 
                onChange={e => setSettings({...settings, seo_keywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean)})}
                placeholder="hajj, umrah, premium packages, ziayarat"
              />
            </div>
          </div>
        </section>

        {/* Feature Toggles */}
        <section className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-muted/30 p-4 border-b border-border flex items-center gap-2">
            <Shield className="size-5 text-primary" />
            <h2 className="font-bold">Feature Access & Maintenance</h2>
          </div>
          <div className="p-6 grid gap-6 md:grid-cols-2">
            
            <label className="flex items-start gap-3 p-4 border border-border rounded-xl cursor-pointer hover:border-primary/50 transition-colors">
              <input 
                type="checkbox" 
                checked={settings.enable_bookings !== false} 
                onChange={e => setSettings({...settings, enable_bookings: e.target.checked})}
                className="mt-1 w-4 h-4"
              />
              <div>
                <div className="font-bold text-sm">Accept New Bookings</div>
                <div className="text-xs text-muted-foreground mt-1">If unchecked, all package enquiry forms will be disabled.</div>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 border border-border rounded-xl cursor-pointer hover:border-destructive/50 transition-colors">
              <input 
                type="checkbox" 
                checked={settings.maintenance_mode === true} 
                onChange={e => setSettings({...settings, maintenance_mode: e.target.checked})}
                className="mt-1 w-4 h-4"
              />
              <div>
                <div className="font-bold text-sm text-destructive">Maintenance Mode</div>
                <div className="text-xs text-muted-foreground mt-1">If checked, normal visitors will see a maintenance screen.</div>
              </div>
            </label>

          </div>
        </section>

        {/* Announcement Banner */}
        <section className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-muted/30 p-4 border-b border-border flex items-center gap-2">
            <MessageSquare className="size-5 text-primary" />
            <h2 className="font-bold">Global Announcement Banner</h2>
          </div>
          <div className="p-6 space-y-5">
            <label className="flex items-center gap-3 cursor-pointer mb-4">
              <input 
                type="checkbox" 
                checked={settings.announcement_enabled === true} 
                onChange={e => setSettings({...settings, announcement_enabled: e.target.checked})}
                className="w-4 h-4"
              />
              <span className="font-bold text-sm">Enable top-bar announcement banner</span>
            </label>

            {settings.announcement_enabled && (
              <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                <label className="text-sm font-bold">Banner Text</label>
                <input 
                  className="w-full p-3 border border-border rounded-xl text-sm outline-none focus:border-primary" 
                  value={settings.announcement_text || ""} 
                  onChange={e => setSettings({...settings, announcement_text: e.target.value})}
                  placeholder="e.g., Early bird discount: Book Hajj 2027 packages by end of month!"
                />
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
