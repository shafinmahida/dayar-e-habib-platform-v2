"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Save, Loader2, Image as ImageIcon, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UniversalUploader } from "@/components/admin/shared/UniversalUploader";

export function HomepageHeroManager() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [contentId, setContentId] = useState<string | null>(null);
  
  const [heroData, setHeroData] = useState({
    mediaType: "image",
    mediaUrl: "/kaaba-sunset.png",
    caption: "Masjid Al-Haram — Golden Hour",
  });

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    setLoading(true);
    const { data } = await supabase.from('content_blocks').select('*').eq('slug', 'home_hero').single();
    if (data && data.content) {
      setContentId(data.id);
      setHeroData({
        mediaType: data.content.mediaType || "image",
        mediaUrl: data.content.mediaUrl || "/kaaba-sunset.png",
        caption: data.content.caption || "Masjid Al-Haram — Golden Hour",
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      slug: 'home_hero',
      title: 'Homepage Hero Configuration',
      content: heroData
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

  if (loading) return <div className="flex items-center gap-2 text-muted-foreground p-4"><Loader2 className="animate-spin size-4" /> Loading hero config...</div>;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-lg font-bold">Homepage Hero Section</h2>
        <p className="text-sm text-muted-foreground">Customize the main visual that visitors see first.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-bold text-foreground">Media Type</label>
          <div className="flex gap-4">
            <button
              onClick={() => setHeroData({...heroData, mediaType: 'image'})}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border transition-all ${
                heroData.mediaType === 'image' ? 'bg-primary text-primary-foreground border-primary shadow-sm' : 'bg-background hover:bg-muted'
              }`}
            >
              <ImageIcon className="size-4" /> Static Image
            </button>
            <button
              onClick={() => setHeroData({...heroData, mediaType: 'video'})}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border transition-all ${
                heroData.mediaType === 'video' ? 'bg-primary text-primary-foreground border-primary shadow-sm' : 'bg-background hover:bg-muted'
              }`}
            >
              <Video className="size-4" /> Cinematic Video
            </button>
          </div>
        </div>

        <UniversalUploader 
          value={heroData.mediaUrl}
          onChange={(url) => setHeroData({...heroData, mediaUrl: url})}
          label={heroData.mediaType === 'video' ? "Video URL (Upload or Paste Link)" : "Image URL (Upload or Paste Link)"}
          placeholder={heroData.mediaType === 'video' ? "https://youtube.com/... or browse .mp4" : "https://... or browse .jpg"}
        />

        <div className="space-y-2">
          <label className="text-sm font-bold text-foreground">Live Status Badge (Caption)</label>
          <input 
            type="text" 
            value={heroData.caption}
            onChange={e => setHeroData({...heroData, caption: e.target.value})}
            className="w-full p-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="e.g. Masjid Al-Haram — Golden Hour"
          />
        </div>

        <div className="pt-4 border-t border-border">
          <Button onClick={handleSave} disabled={saving} className="w-full">
            {saving ? <Loader2 className="animate-spin size-4 mr-2" /> : <Save className="size-4 mr-2" />}
            {saving ? "Deploying changes..." : "Save & Update Homepage"}
          </Button>
        </div>
      </div>
    </div>
  );
}
