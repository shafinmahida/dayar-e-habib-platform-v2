"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Image as ImageIcon, Video, Link as LinkIcon, Trash2, Search, Plus, Loader2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminMediaHubPage() {
  const supabase = createClient();
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaTitle, setMediaTitle] = useState("");
  const [addingMedia, setAddingMedia] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('media_assets')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setAssets(data);
    setLoading(false);
  };

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const wipeAllLocalMedia = async () => {
    if (confirm("Are you sure you want to WIPE all existing media assets? This cannot be undone.")) {
      await supabase.from('media_assets').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      fetchMedia();
      alert("All media assets have been deleted.");
    }
  };

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaUrl) return;

    setAddingMedia(true);
    const { data: { user } } = await supabase.auth.getUser();

    const videoId = getYoutubeId(mediaUrl);
    let publicUrl = mediaUrl;
    let thumbnailUrl = null;
    let mediaType = 'link';
    let mimeType = 'external/link';

    if (videoId) {
      publicUrl = `https://www.youtube.com/embed/${videoId}`;
      thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      mediaType = 'video';
      mimeType = 'video/youtube';
    } else if (mediaUrl.includes('instagram.com') || mediaUrl.includes('facebook.com') || mediaUrl.includes('drive.google.com')) {
      mediaType = 'video';
      mimeType = 'external/social';
    } else if (mediaUrl.match(/\.(jpeg|jpg|gif|png)$/i)) {
      mediaType = 'image';
      mimeType = 'image/external';
    }

    const { error } = await supabase.from('media_assets').insert({
      folder: 'gallery',
      file_name: mediaTitle || `External_Link_${Date.now()}`,
      original_name: mediaUrl,
      mime_type: mimeType,
      media_type: mediaType,
      public_url: publicUrl,
      thumbnail_url: thumbnailUrl,
      created_by: user?.id
    });

    if (!error) {
      setMediaUrl("");
      setMediaTitle("");
      fetchMedia();
    } else {
      console.error(error);
      alert("Failed to save media link.");
    }
    setAddingMedia(false);
  };

  const deleteAsset = async (id: string) => {
    if (confirm("Are you sure you want to remove this asset?")) {
      await supabase.from('media_assets').delete().eq('id', id);
      fetchMedia();
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">External Media Hub</h1>
          <p className="text-muted-foreground">Manage your global gallery powered entirely by YouTube, Instagram, Facebook, and Google links.</p>
        </div>
        <Button variant="destructive" onClick={wipeAllLocalMedia}>
          Wipe Existing Media
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Main Gallery Grid */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl shadow-sm overflow-hidden min-h-[500px] flex flex-col">
          <div className="p-4 border-b border-border flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search assets..." 
                className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
          
          <div className="p-4 flex-1">
            {loading ? (
              <div className="h-full flex items-center justify-center text-muted-foreground animate-pulse">Loading gallery...</div>
            ) : assets.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4 py-12">
                <Globe className="size-12 opacity-20" />
                <p>No external media found. Add your first link!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {assets.map((asset) => (
                  <div key={asset.id} className="group relative aspect-square rounded-lg border border-border bg-muted/30 overflow-hidden shadow-sm">
                    {asset.thumbnail_url ? (
                      <div className="w-full h-full relative">
                        <img src={asset.thumbnail_url} alt={asset.file_name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <Video className="size-8 text-white drop-shadow-md" />
                        </div>
                      </div>
                    ) : asset.media_type === 'image' ? (
                       <img src={asset.public_url} alt={asset.file_name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground p-4 text-center">
                         <LinkIcon className="size-8 opacity-40 mb-2" />
                         <span className="text-[10px] break-all line-clamp-3">{asset.public_url}</span>
                      </div>
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-background/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-bold truncate">{asset.file_name}</div>
                        <div className="text-[10px] text-muted-foreground mt-1 uppercase">{asset.mime_type}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="icon" variant="destructive" className="h-8 w-8 ml-auto" onClick={() => deleteAsset(asset.id)}>
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Upload & Add Sidebar */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold">
              <LinkIcon className="size-5" />
              <h3>Add External Content</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Add links from YouTube, Instagram, Facebook, or Google. Your entire gallery runs directly from these external sources.
            </p>
            <form onSubmit={handleAddMedia} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Content Title</label>
                <input
                  type="text"
                  required
                  value={mediaTitle}
                  onChange={(e) => setMediaTitle(e.target.value)}
                  placeholder="e.g. Kaaba Tawaf 2026"
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Direct Link</label>
                <input
                  type="url"
                  required
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <Button type="submit" className="w-full" disabled={addingMedia}>
                {addingMedia ? <Loader2 className="size-4 animate-spin mr-2" /> : <Plus className="size-4 mr-2" />}
                Save Link to Gallery
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
